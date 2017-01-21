<?php

//если apache
$_SERVER['REQUEST_URI'] = str_replace('api/', '', $_SERVER['REQUEST_URI']);
$_SERVER['SCRIPT_NAME'] = str_replace('/api/web', '', $_SERVER['SCRIPT_NAME']);

/*
 * Установка среды выполнения. Допустимые значения среды:
 *
 * prod: production среда
 * dev: development среда
 * test: testing среда
 */

defined('YII_ENV') or define('YII_ENV', 'dev');
if (YII_ENV === 'dev') {
    defined('YII_DEBUG') or define('YII_DEBUG', true);
}

require(__DIR__ . '/../vendor/autoload.php');
require(__DIR__ . '/../vendor/yiisoft/yii2/Yii.php');

$config = require(__DIR__ . '/../config/web.php');

(new yii\web\Application($config))->run();
sleep(1);