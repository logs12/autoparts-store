<?php

namespace app\components\controllers;

use app\components\filters\AccessControl;
use yii;
use yii\web\ForbiddenHttpException;
use yii\web\Response;

trait BaseControllerTrait
{
    public function behaviors()
    {
        $behaviours['access'] = [
            'class' => AccessControl::className(),
            'rules' => [
                [
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];

        // Указание делать вывод в формате JSON
        $behaviours['contentNegotiator']['formats'] = [
            'application/json' => Response::FORMAT_JSON,
        ];

        return $behaviours;
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        if (Yii::$app->user->isGuest) {
            throw new ForbiddenHttpException('Необходимо выполнить авторизацию');
        }
    }

    public function checkPermissions($permissions, $throwException = true)
    {
        $permissions = is_array($permissions) ? $permissions : [$permissions];

        foreach ($permissions as $permission) {
            if (!Yii::$app->getUser()->can($permission)) {
                if ($throwException) {
                    throw new ForbiddenHttpException('Вам не разрешено данное действие');
                } else {
                    return false;
                }
            }
        }

        return true;
    }
}