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
                        $this->createTable('status', [
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
                        $this->createTable('file', [
                            'id' => $this->primaryKey()->unsigned()->comment('Идентификатор записи'),
                            'name' => $this->string(255)->notNull()->comment('Название файла в нашей файловой системе'),
                            'filename' => $this->string(255)->notNull()->comment('Оригинальное название файла'),
                            'extension' => $this->string(10)->notNull()->comment('Расширение файла'),
                            'created' => Schema::TYPE_TIMESTAMP . ' DEFAULT CURRENT_TIMESTAMP COMMENT "Дата добавления записи"',
                            'updated' => Schema::TYPE_TIMESTAMP . ' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT "Дата изменения записи"',
                            'deleted' => Schema::TYPE_TIMESTAMP . ' NULL COMMENT "Дата удаления записи"',
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
                            'access_token' => $this->string(32)->comment('Токен досутпа к API'),
                            'status_id' => $this->integer()->unsigned()->notNull()->comment('Идентификатор статуса'),
                            'created' => Schema::TYPE_TIMESTAMP . ' DEFAULT CURRENT_TIMESTAMP COMMENT "Дата добавления записи"',
                            'updated' => Schema::TYPE_TIMESTAMP . ' DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT "Дата изменения записи"',
                            'deleted' => Schema::TYPE_TIMESTAMP . ' NULL COMMENT "Дата удаления записи"',
                            'CONSTRAINT user_2_status FOREIGN KEY (status_id) REFERENCES status (id) ON DELETE CASCADE ON UPDATE CASCADE',
                            'CONSTRAINT user_2_file FOREIGN KEY (file_id) REFERENCES file (id) ON DELETE CASCADE ON UPDATE CASCADE',
                        ], $this->getTableOptions('Пользователи'));
                    },
                    'down' => function () {
                        $this->dropTable('{{%user}}');
                    },
                    'transactional' => false,
            ],
        ];
    }
}
