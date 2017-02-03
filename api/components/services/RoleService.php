<?php

namespace app\components\services;


use app\models\AuthItem;

class RoleService extends BaseService
{
    public static function getName($nameRole)
    {

        $role = constant('app\models\AuthItem::'. $nameRole);
        echo $role."<br>";
        if (! empty($role[0])) {

            return $role['0'];
        }

        return null;
    }
}