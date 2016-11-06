<?php

use app\models\WebService;
use app\components\Migration;
use app\models\User;
use app\models\Status;

class m161912_192623_seed_init extends Migration
{
    public function init()
    {
        $this->operations = [
            [
                'up' => function () {

                    // Инициализация статусов
                    $status = new Status([
                        'title' => 'Активный',
                        'name' => 'active',
                    ]);
                    $status->saveOrError();

                    $status = new Status([
                        'title' => 'Неактивный',
                        'name' => 'inactive',
                    ]);
                    $status->saveOrError();

                    $status = new Status([
                        'title' => 'Удалён',
                        'name' => 'deleted',
                    ]);
                    $status->saveOrError();

                    $status = new Status([
                        'title' => 'Не применён',
                        'name' => 'not_applied',
                    ]);
                    $status->saveOrError();

                    $status = new Status([
                        'title' => 'Применён',
                        'name' => 'applied',
                    ]);
                    $status->saveOrError();

                    // Инициализация конфигураций вебсервисов
                    $webService = new WebService([
                        'name' => 'PartKom',
                        'login' => 'nizhbel',
                        'password' => 'YhG5D0Lk442kZ',
                        'active' => 1
                    ]);
                    $webService->saveOrError();

                    $webService = new WebService([
                        'name' => 'Emex',
                        'login' => 'nizhbel_gs',
                        'password' => '2200516nb',
                        'active' => 0
                    ]);
                    $webService->saveOrError();

                    $webService = new WebService([
                        'name' => 'Автопитер',
                        'login' => 'WebNizh@mail.ru',
                        'password' => '3835325E',
                        'active' => 0
                    ]);
                    $webService->saveOrError();

                    $webService = new WebService([
                        'name' => 'armtek',
                        'login' => 'webs1',
                        'password' => '12345',
                        'active' => 0
                    ]);
                    $webService->saveOrError();

                    // Инициализация юзеров
                    $user = new User([
                        'first_name' => 'Имя',
                        'second_name' => 'Фамилия',
                        'third_name' => 'Отчество',
                        'email' => 'admin@mail.ru',
                        'phone' => '+79091237035',
                        'password' => '12345',
                    ]);
                    $user->saveOrError();

                },
                'down' => function () {
                    WebService::deleteAll();
                    Status::deleteAll();
                    User::deleteAll();
                },
                'transactional' => true,
            ]
        ];
    }
}
