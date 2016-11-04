<?php

use app\models\WebService;
use app\components\Migration;
use app\models\User;

class m161912_192623_seed_init extends Migration
{
    public function init()
    {
        $this->operations = [
            [
                'up' => function () {
                    // Вебсервисы
                    $brand0 = new WebService([
                        'name' => 'PartKom',
                        'login' => 'nizhbel',
                        'password' => 'YhG5D0Lk442kZ',
                        'active' => 1
                    ]);

                    $brand1 = new WebService([
                        'name' => 'Emex',
                        'login' => 'nizhbel_gs',
                        'password' => '2200516nb',
                        'active' => 0
                    ]);
                    $brand2 = new WebService([
                        'name' => 'Автопитер',
                        'login' => 'WebNizh@mail.ru',
                        'password' => '3835325E',
                        'active' => 0
                    ]);
                    $brand3 = new WebService([
                        'name' => 'armtek',
                        'login' => 'webs1',
                        'password' => '12345',
                        'active' => 0
                    ]);
                    $brand0->saveOrError();
                    $brand1->saveOrError();
                    $brand2->saveOrError();
                    $brand3->saveOrError();

                    $user = new User([
                        'first_name' => 'www',
                        'second_name' => 'Фамилия #',
                        'third_name' => 'Отчество #',
                        'email' => 'user-1@mail.ru',
                        'phone' => '909123',
                        'password' => '12345',
                    ]);
                    $user->saveOrError();
                },
                'down' => function () {
                    //$webServiceName = ['PartKom'];
                    //WebService::deleteAll(['name' => $webServiceName]);
                    User::deleteAll();
                },
                'transactional' => true,
            ]
        ];
    }
}
