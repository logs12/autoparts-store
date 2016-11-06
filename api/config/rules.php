<?php
return [
    'login' => 'auth/login',
    'logout' => 'auth/logout',
    [
        'class' => 'yii\rest\UrlRule',
        'controller' => [
            'web-service',
            'user/user',
            'user/auth',
        ],
    ],
    '<controller:[a-zA-Z0-9-_]+>/<action:[a-zA-Z-_]+>/<id:\d+>' => '<controller>/<action>',
    '<module:[\w-]+>/<controller:[\w-]+>/<action:[\w-]+>/<id:\d+>] => <module>/<controller>/<action>'
];