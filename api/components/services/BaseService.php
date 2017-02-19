<?php
namespace app\components\services;

use yii;
use yii\helpers\ArrayHelper;
use yii\helpers\Json;

use app\modules\user\models\User;
use libphonenumber\PhoneNumberFormat;
use libphonenumber\PhoneNumberUtil;

class BaseService
{

    private static $languageToCountryCode = [
        'ru-RU' => 'RU',
        'ru_RU' => 'RU',
        'ru' => 'RU',
    ];

    public static function getCountryCode()
    {
        if (!empty(self::$languageToCountryCode[Yii::$app->language])) {
            return self::$languageToCountryCode[Yii::$app->language];
        }

        return Yii::$app->language;
    }

    public static function getIntOrNull($value)
    {
        return $value ? (int)$value : null;
    }

    public static function getIntOrZero($value)
    {
        return $value ? (int)$value : 0;
    }

    public static function getDoubleOrZero($value)
    {
        return $value ? (float)$value : 0;
    }

    public static function getFloatOrNull($value)
    {
        return $value ? (float)$value : null;
    }

    public static function getDateOrNull($value, $format = 'd.m.Y H:i:s')
    {
        return $value ? date($format, strtotime($value)) : null;
    }

    public static function getBoolean($value)
    {
        return $value ? true : false;
    }

    public static function formatPhone($phone)
    {
        if (!$phone) {
            return null;
        }

        $phoneUtil = PhoneNumberUtil::getInstance();
        $numberProto = $phoneUtil->parse($phone, BaseService::getCountryCode());

        return $phoneUtil->format($numberProto, PhoneNumberFormat::INTERNATIONAL);
    }


    public static function getConfig($authenticatedUser)
    {
        $config = [
            'user' => $authenticatedUser,
            'environment' => Yii::$app->params['environment'],
            'info' => [
                'usersCount' => (int) User::find()->count(),
            ],
        ];

        // Отдавать данные только если пользователь аутентифицирован
        if ($authenticatedUser) {
            $config = ArrayHelper::merge($config, [
                'statuses' => CacheService::getStatuses(),
                'types' => CacheService::getTypes(),
            ]);
        }

        return $config;
    }


    public static function handleResponse()
    {
        $responseData = [
            'statusCode' => 200,
            'error' => null,
            'data' => [],
        ];
        $response = Yii::$app->getResponse();
        $statusCode = $response->statusCode;

        if ($statusCode === 200 || $statusCode === 201) {
            // Если данные отдаются для API
            if (Yii::$app->controller->module->id === 'api') {
                $responseData['data'] = $response->data;
            } else {
                $responseData = $response->data;
            }
        } elseif ($statusCode === 404) {
            if (Yii::$app->controller->module->id === 'api') {
                $error = 'Метод не найден';
            } else {
                $error = 'Страница не найдена';
            }
            $responseData['statusCode'] = $statusCode;
            $responseData['error'] = self::translateError($error);
        } elseif ($statusCode === 422) {
            // На случай изпользования UserException который возвращает 500
            $response->setStatusCode($statusCode);
            // Если данные отдаются для API
            if (Yii::$app->controller->module->id === 'api') {
                $responseData['statusCode'] = $statusCode;
                $responseData['error'] = self::translateError(self::stringToJson($response->data['message']));
            } else {
                $responseData = $response->data;
            }
        } else {
            $responseData['statusCode'] = $statusCode;
            $responseData['error'] = self::translateError(self::stringToJson($response->data['message']));
        }

        if (YII_ENV_DEV && !empty($response->data['stack-trace'])) {
            $responseData['stackTrace'] = $response->data['stack-trace'];
        }

        $response->data = $responseData;
    }

    public static function stringToJson($string)
    {
        try {

            return Json::decode($string);

        } catch (yii\base\InvalidParamException $er) {

            return $string;
        }
    }

    public static function translateError($string)
    {
        if (is_string($string)) {
            return Yii::t('app/error', $string);
        }

        return $string;
    }
}
