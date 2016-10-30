<?php
namespace app\commands;

use Yii;
use yii\console\Controller;

class RbacController
{
    public function actionInit()
    {
        $auth = Yii::$app->getAuthManager();
        $auth->removeAll();

        $user = $auth->createRole('user');
        $user->description = 'User';
        $auth->add($user);

        $admin = $auth->createRole('admin');
        $admin->description = 'Admin';
        $admin->add($admin);

        $auth->addChild($admin, $user);

        $this->stdout('Done!' . PHP_EOL);
    }
}