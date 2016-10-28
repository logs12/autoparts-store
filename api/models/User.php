<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property integer $id
 * @property string $first_name
 * @property string $second_name
 * @property string $third_name
 * @property string $email
 * @property integer $file_id
 * @property string $phone
 * @property string $password_hash
 * @property string $access_token
 * @property integer $status_id
 * @property string $created
 * @property string $updated
 * @property string $deleted
 * @property string $role
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['first_name', 'email', 'password_hash', 'status_id'], 'required'],
            [['file_id', 'status_id'], 'integer'],
            [['created', 'updated', 'deleted'], 'safe'],
            [['first_name', 'second_name', 'third_name'], 'string', 'max' => 150],
            [['email'], 'string', 'max' => 255],
            [['phone'], 'string', 'max' => 25],
            [['password_hash'], 'string', 'max' => 60],
            [['access_token'], 'string', 'max' => 32],
            [['role'], 'string', 'max' => 64],
            [['file_id'], 'exist', 'skipOnError' => true, 'targetClass' => File::className(), 'targetAttribute' => ['file_id' => 'id']],
            [['status_id'], 'exist', 'skipOnError' => true, 'targetClass' => Status::className(), 'targetAttribute' => ['status_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'first_name' => 'First Name',
            'second_name' => 'Second Name',
            'third_name' => 'Third Name',
            'email' => 'Email',
            'file_id' => 'File ID',
            'phone' => 'Phone',
            'password_hash' => 'Password Hash',
            'access_token' => 'Access Token',
            'status_id' => 'Status ID',
            'created' => 'Created',
            'updated' => 'Updated',
            'deleted' => 'Deleted',
            'role' => 'Role',
        ];
    }
}
