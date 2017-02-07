<?php

use app\models\WebService;
use app\components\Migration;
use app\modules\user\models\User;
use app\models\Status;
use app\models\AuthItem;

class m161912_192623_seed_init extends Migration
{
    public function init()
    {
        $this->operations = [
            [
                'up' => function () {
                    $this->execute('ALTER TABLE `user` AUTO_INCREMENT=1');
                },
                'transactional' => false,
            ],
            [
                'up' => function () {
                    $this->execute('ALTER TABLE `file` AUTO_INCREMENT=1');
                },
                'transactional' => false,
            ],
            [
                'up' => function () {
                    $this->execute('ALTER TABLE `status` AUTO_INCREMENT=1');
                },
                'transactional' => false,
            ],
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

                },
                'down' => function () {
                    WebService::deleteAll();
                    Status::deleteAll();
                },
                'transactional' => true,
            ],
            [
                'up' => function () {
                    for($i = 1; $i<= 90; $i++) {
                        // Пользователи
                        $authManager = Yii::$app->authManager;
                        $rootRole = $authManager->getRole(AuthItem::ROLE_ROOT);
                        $adminRole = $authManager->getRole(AuthItem::ROLE_ADMIN);
                        $userRole = $authManager->getRole(AuthItem::ROLE_USER);

                        if ($i === 1) {
                            $userName = $rootRole->description;
                        } elseif ($i === 2) {
                            $userName = $adminRole->description;
                        } elseif ($i === 3) {
                            $userName = $adminRole->description;
                        } else {
                            $userName = $userRole->description . ' #' . $i;
                        }

                        $phoneSuffix = str_pad($i, 4, "0", STR_PAD_LEFT);

                        $user = new User([
                            'first_name' => $userName,
                            'second_name' => 'Фамилия #' . $i,
                            'third_name' => 'Отчество #' . $i,
                            'email' => 'user-'. $i .'@mail.ru',
                            'phone' => '+7908123' . $phoneSuffix,
                            'password' => '12345',
                        ]);
                        $user->saveOrError();

                        if ($i === 1) {
                            $authManager->assign($rootRole, $user->id);
                        } elseif ($i === 2) {
                            $authManager->assign($adminRole, $user->id);
                        } elseif ($i === 3) {
                            $authManager->assign($adminRole, $user->id);
                        } else {
                            $authManager->assign($userRole, $user->id);
                        }
                    }
                },
                'down' => function () {
                    User::deleteAll();

                    Yii::$app->authManager->removeAllAssignments();
                }
            ]
        ];
    }
}
