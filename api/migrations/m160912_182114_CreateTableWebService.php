<?php

use app\components\Migration;

class m160912_182114_CreateTableWebService extends Migration
{
    public function init()
    {
        $this->operations = [
            [
                'up' => function () {
                    $this->createTable('{{%web_service}}', [
                        'id' => $this->primaryKey(),
                        'name' => $this->string(255)->unsigned()->comment('Наименование сервиса'),
                        'login' => $this->string(60)->comment('Логин от аккаунта вебсервиса'),
                        'password' => $this->string(60)->comment('Пароль от аккаунта вебсервиса'),
                        'active' => $this->smallInteger(1)->notNull()->comment('Статус сервиса, 1 - включен, 0 - выключен')
                    ], $this->getTableOptions('Доступы к вебсервисам'));
                },
                'down' => function () {
                    $this->dropTable('{{%web_service}}');
                },
                'transactional' => true,
            ]
        ];
    }
}
