<?php

namespace app\models;

use app\components\BaseActiveRecord;
use app\components\behaviors\AuthItemBehavior;
use yii\helpers\ArrayHelper;
use yii\behaviors\SluggableBehavior;

class AuthItem extends BaseActiveRecord{

    //========== ROLES ==========//
    const ROLE_ROOT = 'ROLE_ROOT';
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_USER = 'ROLE_USER';
    //========== /ROLES ==========//

    //========== PERMISSIONS ==========//

    // Роли
    const PERMISSION_ROLE_GET = 'PERMISSION_ROLE_GET';
    const PERMISSION_ROLE_CREATE = 'PERMISSION_ROLE_CREATE';
    const PERMISSION_ROLE_UPDATE = 'PERMISSION_ROLE_UPDATE';
    const PERMISSION_ROLE_DELETE = 'PERMISSION_ROLE_DELETE';

    // Настройки
    const PERMISSION_CONFIG_GET = 'PERMISSION_CONFIG_GET';
    const PERMISSION_CONFIG_CREATE = 'PERMISSION_CONFIG_CREATE';
    const PERMISSION_CONFIG_UPDATE = 'PERMISSION_CONFIG_UPDATE';
    const PERMISSION_CONFIG_DELETE = 'PERMISSION_CONFIG_DELETE';

    // Файлы
    const PERMISSION_FILE_GET = 'PERMISSION_FILE_GET';
    const PERMISSION_FILE_CREATE = 'PERMISSION_FILE_CREATE';
    const PERMISSION_FILE_UPDATE = 'PERMISSION_FILE_UPDATE';
    const PERMISSION_FILE_DELETE = 'PERMISSION_FILE_DELETE';

    // Статусы
    const PERMISSION_STATUS_GET = 'PERMISSION_STATUS_GET';
    const PERMISSION_STATUS_CREATE = 'PERMISSION_STATUS_CREATE';
    const PERMISSION_STATUS_UPDATE = 'PERMISSION_STATUS_UPDATE';
    const PERMISSION_STATUS_DELETE = 'PERMISSION_STATUS_DELETE';

    // Пользователи
    const PERMISSION_USER_GET = 'PERMISSION_USER_GET';
    const PERMISSION_USER_CREATE = 'PERMISSION_USER_CREATE';
    const PERMISSION_USER_UPDATE = 'PERMISSION_USER_UPDATE';
    const PERMISSION_USER_DELETE = 'PERMISSION_USER_DELETE';

    // Разрешения
    const PERMISSION_PERMISSION_GET = 'PERMISSION_PERMISSION_GET';
    const PERMISSION_PERMISSION_CREATE = 'PERMISSION_PERMISSION_CREATE';
    const PERMISSION_PERMISSION_UPDATE = 'PERMISSION_PERMISSION_UPDATE';
    const PERMISSION_PERMISSION_DELETE = 'PERMISSION_PERMISSION_DELETE';

    //========== /PERMISSIONS ==========//

    public $permissions = [];

    public static function tableName()
    {
        return 'auth_item';
    }

    public static function primaryKey()
    {
        return ['id'];
    }

    public function behaviors()
    {
        return ArrayHelper::merge(
            parent::behaviors(),
            [
                [
                    'class' => SluggableBehavior::className(),
                    'attribute' => 'description',
                    'slugAttribute' => 'name',
                ],
                'authItemBehavior' => AuthItemBehavior::className(),
            ]
        );
    }

    public function rules()
    {
        return [
            ['description', 'required'],
            ['description', 'unique', 'targetAttribute' => ['description', 'contractor_id']],
            ['description', 'string', 'max' => 50],

            ['name', 'trim'],
            ['name', 'required'],
            ['name', 'unique', 'targetAttribute' => ['name', 'contractor_id']],
            ['name', 'string', 'max' => 64],

            ['contractor_id', 'required', 'when' => function () {
                return ! \Yii::$app->user->identity->isAdmin();
            }],
        ];
    }

    public function attributeLabels()
    {
        return [
            'description' => 'Название',
        ];
    }

    public function fields()
    {
        $fields = ArrayHelper::merge(parent::fields(), [
            'name',
            'description',
        ]);

        // Если это роль - прибавление к результату разрешений этой роли
        if ($this->type == 1) {
            $fields['permissions'] = function ($model) {
                $permissions = [];

                foreach (\Yii::$app->authManager->getPermissionsByRole($model->name) as $permission) {
                    $permissions[] = [
                        'name' => $permission->name,
                        'description' => $permission->description,
                    ];
                }

                return $permissions;
            };
        }

        return $fields;
    }
}