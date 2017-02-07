<?php

namespace app\components\services;

use app\models\AuthItem as AuthItemModel;
use Yii;
use yii\base\UserException;
use yii\web\ServerErrorHttpException;

class AuthItemService extends BaseService
{
    public static function save(AuthItemModel $model)
    {
        $model->load(Yii::$app->getRequest()->getBodyParams(), '');
        if ($model->save() === false && !$model->hasErrors()) {
            throw new ServerErrorHttpException('Failed to update the object for unknown reason.');
        }

        return $model;
    }

    public static function handlePermissions(AuthItemModel $model)
    {
        if (!$model->permissions) {
            $model->addError('permissions', 'Не указаны разрешения для роли');
        } else {

            // Сбор название разрешений из пришедших данных
            $rolePermissions = [];
            foreach ($model->permissions as $permission) {
                if (is_array($permission)) {
                    $rolePermissions[] = $permission['name'];
                } else {
                    $rolePermissions[] = $permission;
                }
            }
            $model->permissions = $rolePermissions;

            // Поиск всех разрешений, которые пришли из в запросе из браузера
            $foundPermissions = AuthItemModel::find()
                ->select('name')
                ->where(['type' => 2, 'name' => $model->permissions])
                ->asArray()
                ->column();

            // Поиск разрешений, которые не нашлись в БД
            $absentPermissions = array_diff($model->permissions, $foundPermissions);
            if ($absentPermissions) {
                throw new UserException('Не найдены разрешения "' . implode($absentPermissions, '", "') . '"');
            }
        }
    }
}