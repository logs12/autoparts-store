<?php
namespace app\commands;

use Yii;
use yii\console\Controller;
use app\models\AuthItem;

class RbacController extends Controller
{
    public function actionInit()
    {
        $auth = Yii::$app->getAuthManager();
        $auth->removeAll();

        //========== CREATE ROLES ==========//
        $user = $auth->createRole(AuthItem::ROLE_ROOT);
        $user->description = AuthItem::ROLE_ROOT;
        $auth->add($user);

        $admin = $auth->createRole(AuthItem::ROLE_ADMIN);
        $admin->description = AuthItem::ROLE_ADMIN;
        $auth->add($admin);

        //========== CREATE PERMISSIONS ==========//

        // Пользователи
        $permissions = [
            AuthItem::PERMISSION_USER_GET => $auth->createPermission(AuthItem::PERMISSION_USER_GET),
            AuthItem::PERMISSION_USER_CREATE => $auth->createPermission(AuthItem::PERMISSION_USER_CREATE),
            AuthItem::PERMISSION_USER_UPDATE => $auth->createPermission(AuthItem::PERMISSION_USER_UPDATE),
            AuthItem::PERMISSION_USER_DELETE => $auth->createPermission(AuthItem::PERMISSION_USER_DELETE),
        ];

        // !!!!!!!!!!!!!!!!!!!!!
        //$authManager->addChild($talent, $update);

        foreach ($permissions as $permission) {
            $auth->add($permission);
        }

        $auth->addChild($admin, $user);

        $this->stdout('Done!' . PHP_EOL);
    }
}