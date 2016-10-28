<?php
namespace app\commands;

use Yii;
use yii\console\Controller;

class RbacController
{
    public function actionInit()
    {
        $auth = Yii::$app->getAuthManager();
    }
}