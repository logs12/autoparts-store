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
        $roleRoot = $auth->createRole(AuthItem::ROLE_ROOT);
        $roleRoot->description = AuthItem::ROLE_ROOT;
        $auth->add($roleRoot);

        $roleAdmin = $auth->createRole(AuthItem::ROLE_ADMIN);
        $roleAdmin->description = AuthItem::ROLE_ADMIN;
        $auth->add($roleAdmin);

        //========== CREATE PERMISSIONS ==========//

        // Пользователи
        $permissions = [
            AuthItem::PERMISSION_USER_GET => function() use ($auth){
                $permission = $auth->createPermission(AuthItem::PERMISSION_USER_GET);
                $permission->description = AuthItem::PERMISSION_USER_GET;
                return $permission;
            },
            AuthItem::PERMISSION_USER_CREATE => function() use ($auth){
                $permission = $auth->createPermission(AuthItem::PERMISSION_USER_CREATE);
                $permission->description = AuthItem::PERMISSION_USER_CREATE;
                return $permission;
            },
            AuthItem::PERMISSION_USER_UPDATE => function() use ($auth){
                $permission = $auth->createPermission(AuthItem::PERMISSION_USER_UPDATE);
                $permission->description = AuthItem::PERMISSION_USER_UPDATE;
                return $permission;
            },
            AuthItem::PERMISSION_USER_DELETE => function() use ($auth){
                $permission = $auth->createPermission(AuthItem::PERMISSION_USER_DELETE);
                $permission->description = AuthItem::PERMISSION_USER_DELETE;
                return $permission;
            },
        ];



        foreach ($permissions as $permission) {
            $auth->add($permission());
        }

        $auth->addChild($roleAdmin, $roleRoot);

        $this->stdout('Done!' . PHP_EOL);
    }
}