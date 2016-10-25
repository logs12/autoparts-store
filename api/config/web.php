<?php

use yii\helpers\ArrayHelper;

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
    'language' => 'ru',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'authManager' => [
            'class' => 'yii\rbac\DbManager',
        ],
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'E2zOyK9QPZMxwTO4uyX7KGc1Lg94O5Oy',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'response' => [
            'format' => \yii\web\Response::FORMAT_JSON,
            'formatters' => [
                'json' => 'app\components\formatters\JsonResponseFormatter',
            ],
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
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
