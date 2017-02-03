<?php

namespace app\models;

use app\components\BaseActiveRecord;
use app\components\behaviors\UserBehavior;
use app\components\validators\Phone;
use app\models\File;
use app\models\Status;
use app\components\services\User as UserService;
use Yii;
use app\components\services\CacheService;
use yii\base\UserException;
use yii\db\ActiveQuery;
use app\modules\user\Module;
use yii\helpers\ArrayHelper;
use yii\web\IdentityInterface;

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
 * @property integer $status_id
 * @property string $created
 * @property string $updated
 * @property string $deleted
 * @property string $role_name
 */
class User extends BaseActiveRecord implements IdentityInterface
{
    const FIELDS_USER_PERMISSIONS = 'FIELDS_USER_PERMISSIONS';

    public static $fieldsSet;

    public $password;

    public function behaviors()
    {
        return [
            [
                'class' => UserBehavior::className()
            ]
        ];
    }

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%user}}';
    }

    public function beforeSave($insert)
    {
        if ($this->password) {
//            $this->password_hash = '$2y$13$JXd1YdAt6rSKMImKgQmiCedLgrQWvjYwfR24KgjeOrRYN0EBKyqTW'; // ТОЛЬКО ПРИ РАЗРАБОТКЕ: для ускорения миграций. Пароль - 12345.
            $this->password_hash = Yii::$app->security->generatePasswordHash($this->password);
        }

        return parent::beforeSave($insert);
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            ['first_name', 'trim'],
            ['first_name', 'required'],
            ['first_name', 'string', 'max' => 150,],
            ['first_name', 'trim'],

            ['second_name', 'trim'],
            ['second_name', 'required'],
            ['second_name', 'string', 'max' => 150,],
            ['second_name', 'trim'],
            ['second_name', 'default', 'value' => null],

            ['third_name', 'trim'],
            ['third_name', 'string', 'max' => 150,],
            ['third_name', 'trim'],
            ['third_name', 'default', 'value' => null],

            ['phone', Phone::className()],
            ['phone', 'unique'],

            ['email', 'required'],
            ['email', 'string', 'max' => 255,],
            ['email', 'email',],
            ['email', 'trim'],
            ['email', 'default', 'value' => null],

            ['password', 'required', 'when' => function ($model){
                return $model->isNewRecord;
            }],
            ['password', 'string', 'min' => 5, 'max' => 25],

            ['file_id', 'integer'],
            ['file_id', 'exist', 'targetClass' => File::className(), 'targetAttribute' => 'id'],

            ['status_id', 'integer'],
            ['status_id', 'default', 'value' => CacheService::getStatusByName(static::STATUS_ACTIVE)->id],
            ['status_id', 'exist', 'targetClass' => Status::className(), 'targetAttribute' => 'id'],

            ['role_name', 'string', 'max' => 64],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'first_name' => 'Имя',
            'second_name' => 'Фамилия',
            'third_name' => 'Отчество',
            'phone' => 'Телефон',
            'email' => 'Почта',
            'password' => 'Пароль',
            'file_id' => 'Фотография',
            'status_id' => 'Статус',
            'role_name' => Module::t('module', 'USER_ROLE')
        ];
    }

    public function fields()
    {
        $fields = ArrayHelper::merge(parent::fields(), [
            'id' => function ($model) {
                return $this->getIntOrNull($model->id);
            },
            'status_id' => function ($model) {
                return $this->getIntOrNull($model->status_id);
            },
            'first_name',
            'second_name',
            'third_name',
            'phone',
            'email',
            'role_name',
        ]);

        switch (static::$fieldsSet) {
            case static::FIELDS_USER_PERMISSIONS:
                $fields['permissions'] = function ($model) {
                    return UserService::getPermissions($model);
                };
                break;
        }

        return $fields;
    }

    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    public static function findIdentity($id)
    {
        return (new ActiveQuery(get_called_class()))
            ->where([static::field('id') => $id])
            ->innerJoin(
                Status::tableName(),
                static::field('status_id') . ' = ' . Status::field('id') . ' AND ' . Status::field('name') . ' = :name',
                [':name' => Status::STATUS_ACTIVE]
            )
            ->one();
    }

    public function getId()
    {
        return $this->getPrimaryKey();
    }

    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        $user = static::find()
            ->innerJoin(
                Status::tableName(),
                static::field('status_id') . ' = ' . Status::field('id') . ' AND ' . Status::field('name') . ' = :name',
                [':name' => Status::STATUS_ACTIVE]
            )
            ->where([static::field('access_token') => $token])
            ->one();
        return $user;
    }

    public static function findByEmail($email)
    {
        /** @var User $user */
        $user = (new ActiveQuery(get_called_class()))
            ->where(['email' => $email])
            ->innerJoin(
                Status::tableName(),
                User::field('status_id') . ' = ' . Status::field('id') . ' AND ' . Status::field('name') . ' = :name',
                [':name' => Status::STATUS_ACTIVE]
            )
            ->one();

        return $user;
    }

    public function getFio($withThirdName = false)
    {
        return UserService::getFio($this, $withThirdName);
    }

    public function getStatus()
    {
        return $this->hasOne(Status::className(), ['id' => 'status_id']);
    }

    public function getFile()
    {
        return $this->hasOne(File::className(), ['id' => 'file_id']);
    }
}
