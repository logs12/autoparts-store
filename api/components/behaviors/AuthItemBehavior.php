<?php

namespace app\components\behaviors;

use Yii;

use app\components\services\AuthItemService;
use app\models\AuthItemChild;
use app\components\services\UserService;
use app\models\AuthItem;
use app\components\BaseBehavior;

class AuthItemBehavior extends BaseBehavior
{
    /**
     * @var AuthItem
     */
    public $owner;

    public function beforeValidate()
    {
        if (! Yii::$app->user->identity->isAdmin()) {
            $this->owner->contractor_id = UserService::getContractorId();
        }

        // Обрабатываем name после yii\behaviors\SluggableBehavior
        // исключаем предопределенные роли
        if ($this->owner->name !== AuthItem::ROLE_ADMIN
            && $this->owner->name !== AuthItem::ROLE_ROOT
            && $this->owner->name !== AuthItem::ROLE_USER
        ) {

            $rolePrefix = 'ROLE_' . $this->owner->contractor_id . '_';
            $this->owner->name = (preg_match('/' . $rolePrefix . '/ui', $this->owner->name) ? '' : $rolePrefix) . mb_strtoupper(str_replace('-', '_', $this->owner->name));
        }
    }

    public function beforeSave()
    {
        /**
         * Создавать только роли
         * @var int
         */
        if ($this->owner->isNewRecord) {
            $this->owner->type = 1;
        }
    }

    public function afterValidate()
    {
        AuthItemService::handlePermissions($this->owner);
    }

    public function afterSave()
    {
        AuthItemChild::deleteAll(['parent' => $this->owner->name]);

        foreach ($this->owner->permissions as $permission) {
            $child = new AuthItemChild([
                'parent' => $this->owner->name,
                'child' => $permission,
            ]);
            $child->saveOrError();
        }

        /**
         * Очистить кэш authManager
         */
        $authManager = Yii::$app->authManager;
        $authManager->invalidateCache();
    }
}
