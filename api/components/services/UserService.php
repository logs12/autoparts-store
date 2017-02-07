<?php
namespace app\components\services;

use app\components\BaseActiveRecord;
use yii;

class UserService extends BaseService
{
    public static function getPermissions($user)
    {
        if (!$user) {
            return [];
        }

        $authManager = Yii::$app->authManager;
        $authenticatedUserPermissions = $authManager->getPermissionsByUser($user->id);
        $_permissions = [];
        foreach ($authenticatedUserPermissions as $authenticatedUserPermission) {
            $_permissions[] = [
                'name' => $authenticatedUserPermission->name,
                'description' => $authenticatedUserPermission->description,
            ];
        }

        return $_permissions;
    }

    public static function getFio(BaseActiveRecord $person, $withThirdName = false)
    {
        $fio = $person->first_name;

        if (!empty($person->second_name)) {
            $fio = $person->second_name . ' ' . $fio;
        }

        if ($withThirdName && !empty($person->third_name)) {
            $fio = $fio . ' ' . $person->third_name;
        }

        return $fio;
    }

    /**
     * Админ ли...
     * @return mixed
     */
    public static function isAdmin()
    {
        return Yii::$app->user->identity->isAdmin();
    }

    /**
     * root ли...
     * @return mixed
     */
    public static function isRoot()
    {
        return Yii::$app->user->identity->isRoot();
    }

    /**
     * ID
     * @return int|string
     */
    public static function getId()
    {
        return Yii::$app->user->identity->getId();
    }
}
