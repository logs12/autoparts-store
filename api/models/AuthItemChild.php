<?php

namespace app\models;

use app\components\BaseActiveRecord;
use yii;

/**
 * This is the model class for table "brand".
 *
 * @property string $parent
 * @property string $child
 */
class AuthItemChild extends BaseActiveRecord
{
    public static function tableName()
    {
        return 'auth_item_child';
    }

    public function rules()
    {
        return [
            ['parent', 'required'],
            ['parent', 'string', 'max' => 64],

            ['child', 'required'],
            ['child', 'string', 'max' => 64],
        ];
    }

    public function getItem()
    {
        return $this->hasOne(AuthItem::className(), ['name' => 'child']);
    }
}
