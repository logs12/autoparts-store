<?php

namespace app\components;

use yii\base\Behavior;
use yii\db\ActiveRecord;

class BaseBehavior extends Behavior
{
    public function events()
    {
        return [
            ActiveRecord::EVENT_BEFORE_VALIDATE => 'beforeValidate',
            ActiveRecord::EVENT_BEFORE_INSERT => 'beforeInsert',
            ActiveRecord::EVENT_BEFORE_UPDATE => 'beforeUpdate',
            ActiveRecord::EVENT_AFTER_VALIDATE => 'afterValidate',
            ActiveRecord::EVENT_AFTER_INSERT => 'afterInsert',
            ActiveRecord::EVENT_AFTER_UPDATE => 'afterUpdate',
            BaseActiveRecord::AFTER_SOFT_DELETE => 'softDelete',
        ];
    }

    public function beforeValidate()
    {

    }

    public function afterValidate()
    {

    }

    public function beforeInsert()
    {
        $this->beforeSave();
    }

    public function beforeUpdate()
    {
        $this->beforeSave();
    }

    public function afterInsert()
    {
        $this->afterSave();
    }

    public function afterUpdate()
    {
        $this->afterSave();
    }

    public function beforeSave()
    {

    }

    public function afterSave()
    {

    }

    public function softDelete()
    {

    }
}
