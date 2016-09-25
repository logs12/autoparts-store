<?php

use app\models\WebService;
use app\components\Migration;

class m160912_192623_seed_init extends Migration
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
                },
                'down' => function () {
                    $webServiceName = ['PartKom'];
                    WebService::deleteAll(['name' => $webServiceName]);
                },
                'transactional' => true,
            ]
        ];
    }
}
