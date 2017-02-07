<?php

use app\components\BaseActiveRecord;
use app\components\Migration;
use app\models\AuthItem;
use yii\base\InvalidConfigException;
use yii\db\Query;
use yii\rbac\DbManager;

class m161026_045930_rbac_init extends Migration
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
                        'user_id' => $this->integer()->unsigned()->comment('ID пользователя'),
                        'created_at' => $this->integer(),
                        'PRIMARY KEY (item_name, user_id)',
                        'FOREIGN KEY (item_name) REFERENCES ' . $authManager->itemTable . ' (name) ON DELETE CASCADE ON UPDATE CASCADE',
                        'CONSTRAINT auth_item_2_user_id FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE',
                    ], $tableOptions);
                },
                'down' => function () use ($authManager) {
                    $this->dropTable($authManager->assignmentTable);
                },
                'transactional' => false,
            ],
            [
                'up' => function () use ($authManager, $tableOptions) {
                    $permissionsObjects = [];
                    $permissions = [

                        // Настройки
                        AuthItem::PERMISSION_CONFIG_GET => 'Получение настройки',
                        AuthItem::PERMISSION_CONFIG_CREATE => 'Добавление настройки',
                        AuthItem::PERMISSION_CONFIG_UPDATE => 'Изменение настройки',
                        AuthItem::PERMISSION_CONFIG_DELETE => 'Удаление настройки',

                        // Файлы
                        AuthItem::PERMISSION_FILE_GET => 'Получение файлы',
                        AuthItem::PERMISSION_FILE_CREATE => 'Добавление файлы',
                        AuthItem::PERMISSION_FILE_UPDATE => 'Изменение файлы',
                        AuthItem::PERMISSION_FILE_DELETE => 'Удаление файлы',

                        // Разрешения
                        AuthItem::PERMISSION_PERMISSION_GET => 'Получение разрешения',
                        AuthItem::PERMISSION_PERMISSION_CREATE => 'Добавление разрешения',
                        AuthItem::PERMISSION_PERMISSION_UPDATE => 'Изменение разрешения',
                        AuthItem::PERMISSION_PERMISSION_DELETE => 'Удаление разрешения',

                        // Статусы
                        AuthItem::PERMISSION_STATUS_GET => 'Получение статуса',
                        AuthItem::PERMISSION_STATUS_CREATE => 'Добавление статуса',
                        AuthItem::PERMISSION_STATUS_UPDATE => 'Изменение статуса',
                        AuthItem::PERMISSION_STATUS_DELETE => 'Удаление статуса',

                        // Пользователи
                        AuthItem::PERMISSION_USER_GET => 'Получение пользователя',
                        AuthItem::PERMISSION_USER_CREATE => 'Добавление пользователя',
                        AuthItem::PERMISSION_USER_UPDATE => 'Изменение пользователя',
                        AuthItem::PERMISSION_USER_DELETE => 'Удаление пользователя',

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
                        AuthItem::ROLE_ROOT => [
                            'description' => 'суперадмин',
                            'permissions' => array_keys($permissions),
                        ],
                        AuthItem::ROLE_ADMIN => [
                            'description' => 'Администратор портала',
                            'permissions' => array_keys($permissions),
                        ],
                        AuthItem::ROLE_USER => [
                            'description' => 'Представитель магазина',
                            'permissions' => [

                                AuthItem::PERMISSION_FILE_GET,
                                AuthItem::PERMISSION_FILE_CREATE,
                                AuthItem::PERMISSION_FILE_UPDATE,
                                AuthItem::PERMISSION_FILE_DELETE,
                                AuthItem::PERMISSION_STATUS_GET,
                                AuthItem::PERMISSION_STATUS_CREATE,
                                AuthItem::PERMISSION_STATUS_UPDATE,
                                AuthItem::PERMISSION_STATUS_DELETE,

                                // RBAC
                                AuthItem::PERMISSION_ROLE_GET,
                                AuthItem::PERMISSION_ROLE_CREATE,
                                AuthItem::PERMISSION_ROLE_UPDATE,
                                AuthItem::PERMISSION_ROLE_DELETE,
                                AuthItem::PERMISSION_PERMISSION_GET,
                                AuthItem::PERMISSION_PERMISSION_CREATE,
                                AuthItem::PERMISSION_PERMISSION_UPDATE,
                                AuthItem::PERMISSION_PERMISSION_DELETE,
                                AuthItem::PERMISSION_USER_GET,
                                AuthItem::PERMISSION_USER_CREATE,
                                AuthItem::PERMISSION_USER_UPDATE,
                                AuthItem::PERMISSION_USER_DELETE,
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
                    Yii::$app->db->createCommand('delete from ' . $authManager->assignmentTable);
                    Yii::$app->db->createCommand('delete from ' . $authManager->itemChildTable);
                    Yii::$app->db->createCommand('delete from ' . $authManager->itemTable);
                    Yii::$app->db->createCommand('delete from ' . $authManager->ruleTable);
                },
                'transactional' => true,
            ],
        ];
    }
}
