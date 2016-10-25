<?php

use app\components\BaseActiveRecord;
use app\components\Migration;
use app\models\AuthItem;
use yii\base\InvalidConfigException;
use yii\rbac\DbManager;

class m170816_045930_rbac_init extends Migration
{
    protected function getAuthManager()
    {
        $authManager = Yii::$app->getAuthManager();
        if (!$authManager instanceof DbManager) {
            throw new InvalidConfigException('You should configure "authManager" component to use database before executing this migration.');
        }
        return $authManager;
    }

    public function init()
    {
        $authManager = $this->getAuthManager();
        $this->db = $authManager->db;

        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            // http://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }
        $this->operations = [
            [
                'up' => function () use ($authManager, $tableOptions) {

                    $this->createTable($authManager->ruleTable, [
                        'name' => $this->string(64)->notNull(),
                        'data' => $this->text(),
                        'created_at' => $this->integer(),
                        'updated_at' => $this->integer(),
                        'PRIMARY KEY (name)',
                    ], $tableOptions);
                },
                'down' => function () use ($authManager) {
                    $this->dropTable($authManager->ruleTable);
                },
                'transactional' => false,
            ],
            [
                'up' => function () use ($authManager, $tableOptions) {

                    $this->createTable($authManager->itemTable, [
                        'id' => 'integer NOT NULL AUTO_INCREMENT',
                        'name' => $this->string(64)->notNull(),
                        'type' => $this->integer()->notNull(),
                        'description' => $this->text(),
                        'rule_name' => $this->string(64),
                        'data' => $this->text(),
                        'created_at' => $this->integer(),
                        'updated_at' => $this->integer(),
                        'PRIMARY KEY (name)',
                        'KEY (id)',
                        'FOREIGN KEY (rule_name) REFERENCES ' . $authManager->ruleTable . ' (name)' .
                        ' ON DELETE SET NULL ON UPDATE CASCADE',
                    ], $tableOptions);
                    $this->createIndex('idx-auth_item-type', $authManager->itemTable, 'type');
                },
                'down' => function () use ($authManager) {
                    $this->dropTable($authManager->itemTable);
                },
                'transactional' => false,
            ],
            [
                'up' => function () use ($authManager, $tableOptions) {

                    $this->createTable($authManager->itemChildTable, [
                        'parent' => $this->string(64)->notNull(),
                        'child' => $this->string(64)->notNull(),
                        'PRIMARY KEY (parent, child)',
                        'FOREIGN KEY (parent) REFERENCES ' . $authManager->itemTable . ' (name)' .
                        ' ON DELETE CASCADE ON UPDATE CASCADE',
                        'FOREIGN KEY (child) REFERENCES ' . $authManager->itemTable . ' (name)' .
                        ' ON DELETE CASCADE ON UPDATE CASCADE',
                    ], $tableOptions);
                },
                'down' => function () use ($authManager) {
                    $this->dropTable($authManager->itemChildTable);
                },
                'transactional' => false,
            ],
            [
                'up' => function () use ($authManager, $tableOptions) {

                    $this->createTable($authManager->assignmentTable, [
                        'item_name' => $this->string(64)->notNull(),
                        'user_id' => $this->string(64)->notNull(),
                        'created_at' => $this->integer(),
                        'PRIMARY KEY (item_name, user_id)',
                        'FOREIGN KEY (item_name) REFERENCES ' . $authManager->itemTable . ' (name) ON DELETE CASCADE ON UPDATE CASCADE',
                    ], $tableOptions);

                    $permissionsObjects = [];
                    $permissions = [

                        // Производители
                        AuthItem::PERMISSION_PRODUCTOR_GET => 'Получение производителя',
                        AuthItem::PERMISSION_PRODUCTOR_CREATE => 'Добавление производителя',
                        AuthItem::PERMISSION_PRODUCTOR_UPDATE => 'Изменение производителя',
                        AuthItem::PERMISSION_PRODUCTOR_DELETE => 'Удаление производителя',

                        // Пользователи
                        AuthItem::PERMISSION_USER_GET => 'Получение пользователя',
                        AuthItem::PERMISSION_USER_CREATE => 'Добавление пользователя',
                        AuthItem::PERMISSION_USER_UPDATE => 'Изменение пользователя',
                        AuthItem::PERMISSION_USER_DELETE => 'Удаление пользователя',

                        // Категории
                        AuthItem::PERMISSION_CATEGORY_GET => 'Получение категории',
                        AuthItem::PERMISSION_CATEGORY_CREATE => 'Добавление категории',
                        AuthItem::PERMISSION_CATEGORY_UPDATE => 'Изменение категории',
                        AuthItem::PERMISSION_CATEGORY_DELETE => 'Удаление категории',

                        // Бренды
                        AuthItem::PERMISSION_BRAND_GET => 'Получение бренда',
                        AuthItem::PERMISSION_BRAND_CREATE => 'Добавление бренда',
                        AuthItem::PERMISSION_BRAND_UPDATE => 'Изменение бренда',
                        AuthItem::PERMISSION_BRAND_DELETE => 'Удаление бренда',

                        // Товары
                        AuthItem::PERMISSION_PRODUCT_GET => 'Получение товара',
                        AuthItem::PERMISSION_PRODUCT_CREATE => 'Добавление товара',
                        AuthItem::PERMISSION_PRODUCT_UPDATE => 'Изменение товара',
                        AuthItem::PERMISSION_PRODUCT_DELETE => 'Удаление товара',

                        // Разрешения
                        AuthItem::PERMISSION_PERMISSION_GET => 'Получение разрешения',
                        AuthItem::PERMISSION_PERMISSION_CREATE => 'Добавление разрешения',
                        AuthItem::PERMISSION_PERMISSION_UPDATE => 'Изменение разрешения',
                        AuthItem::PERMISSION_PERMISSION_DELETE => 'Удаление разрешения',

                        // Excel
//                        AuthItem::PERMISSION_EXCEL_GET => 'Получение excel',
//                        AuthItem::PERMISSION_EXCEL_CREATE => 'Добавление excel',
//                        AuthItem::PERMISSION_EXCEL_UPDATE => 'Изменение excel',
//                        AuthItem::PERMISSION_EXCEL_DELETE => 'Удаление excel',

                        // Эталоны
                        AuthItem::PERMISSION_STANDARD_CREATE => 'Создание эталона',
                        AuthItem::PERMISSION_STANDARD_GET => 'Получение эталона',
                        AuthItem::PERMISSION_STANDARD_UPDATE => 'Изменение эталона',
                        AuthItem::PERMISSION_STANDARD_DELETE => 'Удаление эталона',

                        // Роли
                        AuthItem::PERMISSION_ROLE_GET => 'Получение роли',
                        AuthItem::PERMISSION_ROLE_CREATE => 'Добавление роли',
                        AuthItem::PERMISSION_ROLE_UPDATE => 'Изменение роли',
                        AuthItem::PERMISSION_ROLE_DELETE => 'Удаление роли',
                    ];
                    foreach ($permissions as $permissionName => $permissionDescription) {
                        $permission = $authManager->createPermission($permissionName);
                        $permission->description = $permissionDescription;
                        $authManager->add($permission);
                        $permissionsObjects[$permissionName] = $permission;
                    }

                    $rbac = [
                        AuthItem::ROLE_ADMIN => [
                            'description' => 'Администратор портала',
                            'permissions' => array_keys($permissions),
                        ],
                        AuthItem::ROLE_SHOP => [
                            'description' => 'Представитель магазина',
                            'permissions' => [
                                AuthItem::PERMISSION_PRODUCTOR_GET,
                                AuthItem::PERMISSION_PRODUCTOR_CREATE,
                                AuthItem::PERMISSION_PRODUCTOR_UPDATE,
                                AuthItem::PERMISSION_PRODUCTOR_DELETE,
                                AuthItem::PERMISSION_CATEGORY_GET,
                                AuthItem::PERMISSION_CATEGORY_CREATE,
                                AuthItem::PERMISSION_CATEGORY_UPDATE,
                                AuthItem::PERMISSION_CATEGORY_DELETE,
                                AuthItem::PERMISSION_BRAND_GET,
                                AuthItem::PERMISSION_BRAND_CREATE,
                                AuthItem::PERMISSION_BRAND_UPDATE,
                                AuthItem::PERMISSION_BRAND_DELETE,
                                AuthItem::PERMISSION_PRODUCT_GET,
                                AuthItem::PERMISSION_PRODUCT_CREATE,
                                AuthItem::PERMISSION_PRODUCT_UPDATE,
                                AuthItem::PERMISSION_PRODUCT_DELETE,
                            ],
                        ],
                        AuthItem::ROLE_DISTRIBUTOR => [
                            'description' => 'Представитель дистрибьютора',
                            'permissions' => [
                                AuthItem::PERMISSION_PRODUCTOR_GET,
                                AuthItem::PERMISSION_PRODUCTOR_CREATE,
                                AuthItem::PERMISSION_PRODUCTOR_UPDATE,
                                AuthItem::PERMISSION_PRODUCTOR_DELETE,
                                AuthItem::PERMISSION_CATEGORY_GET,
                                AuthItem::PERMISSION_CATEGORY_CREATE,
                                AuthItem::PERMISSION_CATEGORY_UPDATE,
                                AuthItem::PERMISSION_CATEGORY_DELETE,
                                AuthItem::PERMISSION_BRAND_GET,
                                AuthItem::PERMISSION_BRAND_CREATE,
                                AuthItem::PERMISSION_BRAND_UPDATE,
                                AuthItem::PERMISSION_BRAND_DELETE,
                                AuthItem::PERMISSION_PRODUCT_GET,
                                AuthItem::PERMISSION_PRODUCT_CREATE,
                                AuthItem::PERMISSION_PRODUCT_UPDATE,
                                AuthItem::PERMISSION_PRODUCT_DELETE,
                            ],
                        ],
                        AuthItem::ROLE_DISTRIBUTOR2 => [
                            'description' => 'Представитель дистрибьютора-2',
                            'permissions' => [
                                AuthItem::PERMISSION_PRODUCTOR_GET,
                                AuthItem::PERMISSION_PRODUCTOR_CREATE,
                                AuthItem::PERMISSION_PRODUCTOR_UPDATE,
                                AuthItem::PERMISSION_PRODUCTOR_DELETE,
                                AuthItem::PERMISSION_CATEGORY_GET,
                                AuthItem::PERMISSION_CATEGORY_CREATE,
                                AuthItem::PERMISSION_CATEGORY_UPDATE,
                                AuthItem::PERMISSION_CATEGORY_DELETE,
                                AuthItem::PERMISSION_BRAND_GET,
                                AuthItem::PERMISSION_BRAND_CREATE,
                                AuthItem::PERMISSION_BRAND_UPDATE,
                                AuthItem::PERMISSION_BRAND_DELETE,
                                AuthItem::PERMISSION_PRODUCT_GET,
                                AuthItem::PERMISSION_PRODUCT_CREATE,
                                AuthItem::PERMISSION_PRODUCT_UPDATE,
                                AuthItem::PERMISSION_PRODUCT_DELETE,
                            ],
                        ],
                        AuthItem::ROLE_SUPPLIER => [
                            'description' => 'Представитель поставщика',
                            'permissions' => [
                                AuthItem::PERMISSION_PRODUCTOR_GET,
                                AuthItem::PERMISSION_PRODUCTOR_CREATE,
                                AuthItem::PERMISSION_PRODUCTOR_UPDATE,
                                AuthItem::PERMISSION_PRODUCTOR_DELETE,
                                AuthItem::PERMISSION_CATEGORY_GET,
                                AuthItem::PERMISSION_CATEGORY_CREATE,
                                AuthItem::PERMISSION_CATEGORY_UPDATE,
                                AuthItem::PERMISSION_CATEGORY_DELETE,
                                AuthItem::PERMISSION_BRAND_GET,
                                AuthItem::PERMISSION_BRAND_CREATE,
                                AuthItem::PERMISSION_BRAND_UPDATE,
                                AuthItem::PERMISSION_BRAND_DELETE,
                                AuthItem::PERMISSION_PRODUCT_GET,
                                AuthItem::PERMISSION_PRODUCT_CREATE,
                                AuthItem::PERMISSION_PRODUCT_UPDATE,
                                AuthItem::PERMISSION_PRODUCT_DELETE,
                            ],
                        ],
                    ];
                    foreach ($rbac as $roleName => $roleData) {
                        $role = $authManager->createRole($roleName);
                        $role->description = $roleData['description'];
                        $authManager->add($role);
                        foreach ($roleData['permissions'] as $permissionName) {
                            $permission = $permissionsObjects[$permissionName];
                            $authManager->addChild($role, $permission);
                        }
                    }
                },
                'down' => function () use ($authManager) {
                    $this->dropTable($authManager->assignmentTable);
                },
                'transactional' => false,
            ]
        ];
    }
}
