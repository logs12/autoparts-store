<?php
namespace app\components\services;

use libphonenumber\PhoneNumberFormat;
use libphonenumber\PhoneNumberUtil;
use yii;
use yii\helpers\ArrayHelper;

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

    public static function getFloatOrNull($value)
    {
        return $value ? (float)$value : null;
    }

    public static function getDateOrNull($value)
    {
        return $value ? date('d.m.Y H:i:s', strtotime($value)) : null;
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
            'environment' => YII_ENV,
        ];

        // Отдавать данные только если пользователь аутентифицирован
        if ($authenticatedUser) {
            $config = ArrayHelper::merge($config, [
                'statuses' => Cache::getStatuses(),
                'types' => Cache::getTypes(),
            ]);
        }

        return $config;
    }

}