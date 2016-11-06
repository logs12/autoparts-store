<?php

namespace app\components\actions;

use app\components\BaseActiveRecord;
use yii;
use yii\rest\DeleteAction as BaseDeleteAction;
use yii\web\ServerErrorHttpException;

class DeleteAction extends BaseDeleteAction
{
    public function run($id)
    {
        /** @var BaseActiveRecord $model */
        $model = $this->findModel($id);

        if ($this->checkAccess) {
            call_user_func($this->checkAccess, $this->id, $model);
        }

        if ($model->hasAttribute('status_id')) {
            $model->softDelete();
            if ($model->save(false) === false) {
                throw new ServerErrorHttpException('Не удалось удалить запись по неизвестным причинам');
            }
        } elseif ($model->delete() === false) {
            throw new ServerErrorHttpException('Не удалось удалить запись по неизвестным причинам');
        }

        Yii::$app->getResponse()->setStatusCode(204);
    }
}