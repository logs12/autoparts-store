<?php

namespace app\models;

use app\components\BaseActiveRecord;

/**
 * This is the model class for table "{{%web_service}}".
 *
 * @property integer $id
 * @property string $name
 * @property string $login
 * @property string $password
 * @property integer $active
 */
class WebService extends BaseActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%web_service}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['active'], 'required'],
            [['active'], 'integer'],
            [['name'], 'string', 'max' => 255],
            [['login', 'password'], 'string', 'max' => 60],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'login' => 'Login',
            'password' => 'Password',
            'active' => 'Active',
        ];
    }
}
