<?php

namespace app\components\behaviors;

use Yii;

use app\components\BaseBehavior;
use app\components\services\RoleService;
//use app\components\services\UserService;
use app\models\AuthItem;
use app\modules\user\models\User;

class UserBehavior extends BaseBehavior
{
    /**
     * @var User
     */
    public $owner;

    public function beforeInsert()
    {
        $this->owner->auth_key = Yii::$app->security->generateRandomString();

        parent::beforeInsert();
    }

    public function beforeSave()
    {
        if ($this->owner->password) {
            $this->owner->password_hash = '$2y$13$JXd1YdAt6rSKMImKgQmiCedLgrQWvjYwfR24KgjeOrRYN0EBKyqTW'; // ТОЛЬКО ПРИ РАЗРАБОТКЕ: для ускорения миграций. Пароль - 12345.
//            $this->owner->password_hash = Yii::$app->security->generatePasswordHash($this->owner->password);
        }
    }

    public function afterSave()
    {

        if (Yii::$app instanceof \yii\web\Application && ! empty($this->owner->id) && ! empty($this->owner->role_name)) {
                $roleName = $this->owner->role;
                $authManager = Yii::$app->authManager;
                $currentRoles = $authManager->getRolesByUser($this->owner->id);
                $role = $authManager->getRole($roleName);
                foreach ($currentRoles as $currentRole) {
                    $authManager->revoke($currentRole, $this->owner->id);
                }
                $authManager->assign($role, $this->owner->id);
        }
    }

    /*
    public function afterSave()
    {
        if (Yii::$app instanceof \yii\web\Application && ! empty($this->owner->id) && ! empty($this->owner->role_id)) {
            if (($roleName = RoleService::getNameById($this->owner->role_id))) {
                $authManager = Yii::$app->authManager;
                $currentRoles = $authManager->getRolesByUser($this->owner->id);
                $role = $authManager->getRole($roleName);
                foreach ($currentRoles as $currentRole) {
                    $authManager->revoke($currentRole, $this->owner->id);
                }
                $authManager->assign($role, $this->owner->id);
            }
        }

        /**
         * Очистить кэш authManager
         *
        $authManager = Yii::$app->authManager;
        $authManager->invalidateCache();
    }

   public function getFio($withThirdName = false)
    {
        if (! empty($this->owner->person)) {

            return UserService::getFio($this->owner->person, $withThirdName);
        } else {

            return $this->owner->login;
        }
    }*/

    public function getRole()
    {
        return Yii::$app->authManager->getRolesByUser($this->owner->getId());
    }

    public function isAdmin()
    {
        return $this->isRoot() || ! empty($this->getRole()[AuthItem::ROLE_ADMIN]);
    }

    public function isRoot()
    {
        return ! empty($this->getRole()[AuthItem::ROLE_ROOT]);
    }

    public function getContractor()
    {
        if ($this->havePerson()) {
            return $this->owner->person->contractor;
        }

        return null;
    }

    public function havePerson()
    {
        return ! empty($this->owner->person);
    }
}
