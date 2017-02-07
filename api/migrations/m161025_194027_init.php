<?php

use app\components\Migration;
use yii\db\Schema;

class m161025_194027_init extends Migration
{
    public function init()
    {
        $this->operations = [

            [
                'up' => function () {
                    $this->createTable('{{%status}}', [
                        'id' => $this->primaryKey()->unsigned()->comment('Идентификатор записи'),
                        'title' => $this->string(255)->notNull()->comment('Название'),
                        'name' => $this->string(255)->notNull()->comment('Системное название'),
                        'UNIQUE KEY `status-name--unique` (`name`)',
                    ], $this->getTableOptions('Все статусы системы'));
                },
                'down' => function () {
                    $this->dropTable('status');
                },
                'transactional' => false,
            ],
            [
                'up' => function () {
                    $this->createTable('{{%file}}', [
                        'id' => $this->primaryKey()->unsigned()->comment('Идентификатор записи'),
                        'name' => $this->string(255)->notNull()->comment('Название файла в нашей файловой системе'),
                        'filename' => $this->string(255)->notNull()->comment('Оригинальное название файла'),
                        'extension' => $this->string(10)->notNull()->comment('Расширение файла'),
                        'created' => $this->integer(11)->comment('Дата добавления записи'),
                        'updated' => $this->integer(11)->comment('Дата изменения записи'),
                        'deleted' => $this->integer(11)->comment('Дата удаления записи'),
                    ], $this->getTableOptions('Файлы'));
                },
                'down' => function () {
                    $this->dropTable('file');
                },
                'transactional' => false,
            ],
            [
                'up' => function () {
                    $this->createTable('{{%user}}', [
                        'id' => $this->primaryKey()->unsigned()->comment('Идентификатор записи'),
                        'first_name' => $this->string(150)->notNull()->comment('Имя'),
                        'second_name' => $this->string(150)->comment('Фамилия'),
                        'third_name' => $this->string(150)->comment('Отчество'),
                        'email' => $this->string(255)->notNull()->comment('Электропочта'),
                        'file_id' => $this->integer()->unsigned()->comment('Идентификатор файла фотографии'),
                        'phone' => $this->string(25)->comment('Телефон'),
                        'password_hash' => $this->string(60)->notNull()->comment('Хэш пароля'),
                        'auth_key' => $this->string(32)->comment('Ключ подтверждения для cookie аутентификации'),
                        'status_id' => $this->integer()->unsigned()->notNull()->comment('Идентификатор статуса'),
                        //'role_name' => $this->string(64)->comment('Наименование роли'),
                        'created' => $this->integer(11)->comment('Дата добавления записи'),
                        'updated' => $this->integer(11)->comment('Дата изменения записи'),
                        'deleted' => $this->integer(11)->comment('Дата удаления записи'),
                        'CONSTRAINT user_2_status FOREIGN KEY (status_id) REFERENCES status (id) ON DELETE CASCADE ON UPDATE CASCADE',
                        'CONSTRAINT user_2_file FOREIGN KEY (file_id) REFERENCES file (id) ON DELETE CASCADE ON UPDATE CASCADE',
                    ], $this->getTableOptions('Пользователи'));
                },
                'down' => function () {
                    $this->dropTable('{{%user}}');
                },
                'transactional' => false,
            ],
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
            ],
            [
                'up' => function () {
                    $this->createTable('{{%type}}', [
                        'id' => $this->primaryKey()->unsigned()->comment('Идентификатор записи'),
                        'title' => $this->string(255)->notNull()->comment('Название'),
                        'name' => $this->string(255)->notNull()->comment('Системное название'),
                        'UNIQUE KEY `type-name--unique` (`name`)',
                    ], $this->getTableOptions('Все типы системы'));
                },
                'down' => function () {
                    $this->dropTable('type');
                },
                'transactional' => false,
            ],
        ];
    }
}
