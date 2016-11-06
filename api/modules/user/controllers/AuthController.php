<?php

namespace app\controllers;

use app\components\controllers\BaseRestController;
use app\components\filters\AccessControl;
use app\components\services\BaseService;
use app\models\LoginForm;
use app\modules\user\models\User;
use yii;
use yii\web\ServerErrorHttpException;

class AuthController extends BaseRestController
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'allow' => true,
                    ],
                ],
            ],
        ];

    }

    public function actionLogin()
    {
        User::setFieldsSet(User::FIELDS_USER_PERMISSIONS);
        $model = new LoginForm();

        $model->load(Yii::$app->getRequest()->getBodyParams(), '');
        if ($model->validate() === false && !$model->hasErrors()) {
            throw new ServerErrorHttpException('Не удалось обновить запись по непонятным причинам');
        }

        if (!$model->hasErrors()) {
            $webUser = Yii::$app->user;
            $user = $model->getUser();
            $webUser->login($user);
            $model->configData = BaseService::getConfig($user);
            return $model;
        }

        return $model;
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return [];
    }
}
