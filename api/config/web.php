<?php

use yii\helpers\ArrayHelper;
use app\components\services\BaseService;
use yii\log\FileTarget;
use yii\web\Response;

// Слияние глобальных и локальных парамертов
$params = file_exists(__DIR__ . '/params.local.php')
    ? ArrayHelper::merge(require(__DIR__ . '/params.php'), require(__DIR__ . '/params.local.php'))
    : require(__DIR__ . '/params.php');


// Слияние глобальных и локальных парамертов БД
$db = file_exists(__DIR__ . '/db.local.php')
    ? ArrayHelper::merge(require(__DIR__ . '/db.php'), require(__DIR__ . '/db.local.php'))
    : require(__DIR__ . '/db.php');


/**
 * КОНФИГУРАЦИЯ ОСНОВНАЯ
 */

$config = [
    'id' => 'autoparts-store',
    'language' => 'ru-RU',
    'basePath' => dirname(__DIR__),
    'bootstrap' => [
        'log',
        'app\modules\user\Bootstrap',
    ],
    'modules' => [
        'debug' => [
            'class' => 'yii\debug\Module',
        ],
        /*'user' => [
            'class' => 'app\modules\user\Module',
            'controllerNamespace' => 'app\modules\user\controllers',
        ]*/
    ],
    'components' => [
        'i18n' => [
            'translations' => [
                'app*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    //'basePath' => '@app/messages',
                    'sourceLanguage' => 'en-US',
                    'fileMap' => [
                        'app' => 'app.php',
                        'app/error' => 'error.php',
                    ],
                ],
            ],
        ],

        'formatter' => [
            'dateFormat' => 'dd.MM.yyyy',
            'decimalSeparator' => ',',
            'thousandSeparator' => ' ',
            'currencyCode' => 'RUR',
            'locale' => 'ru-RU',
            'defaultTimeZone' => 'Europe/Moscow',
        ],
        'authManager' => [
            //'class' => 'app\components\rbac\AuthManager',
            'class' => 'yii\rbac\DbManager',
            //'cache' => 'cache',
        ],
        'user' => [
            //'identityClass' => 'app\modules\user\models\User',
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'tVBqer4KQDz0t_dUaQtjmoPkXzmZg-a_yM',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'response' => [
            'format' => Response::FORMAT_JSON,
            'formatters' => [
                'json' => 'app\components\formatters\JsonResponseFormatter',
            ],
            'on ' . Response::EVENT_BEFORE_SEND => function () {
                BaseService::handleResponse();
            }
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => require(__DIR__ . '/rules.php')
        ],
    ],
    'params' => $params,
];

/*
 * КОНФИГУРАЦИЯ DEVELOPMENT
 * Здесь можно добавить или убавить элементы основной конфигурации
 *
 * $config['id'] = 'development-web';
 * unset $config['bootstrap'];
 */
if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
    ];
}

return $config;
