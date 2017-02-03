<?php

use app\components\Migration;
use yii\db\Schema;

class m161025_200131_add_user_role_fields extends Migration
{
    public function init()
    {
        /*$this->operations = [
            [
                'up' => function () {
                    $this->addColumn('{{%user}}', 'role', $this->string(64));

                    $this->update('{{%user}}', ['role' => 'user']);
                },
                'down' => function () {
                    $this->dropColumn('{{%user}}', 'role');
                },
                'transactional' => false,
            ],
        ];*/
    }
}
