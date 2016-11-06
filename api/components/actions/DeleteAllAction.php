<?php

namespace app\components\actions;

use app\components\BaseActiveRecord;
use yii;
use yii\base\UserException;
use yii\helpers\ArrayHelper;
use yii\rest\Action;

class DeleteAllAction extends Action
{
    public function run()
    {
        if ($this->checkAccess) {
            call_user_func($this->checkAccess, $this->id);
        }

        // Получение идентификаторов сущностей для удаления
        $params = Yii::$app->getRequest()->getBodyParams();
        if (!$ids = ArrayHelper::getValue($params, 'ids')) {
            throw new UserException('Не переданы идентификаторы сущностей для удаления');
        }

        // Поиск указанных сущностей
        /* @var $modelClass BaseActiveRecord */
        $modelClass = $this->modelClass;
        $models = $modelClass::findAll([$modelClass::field('id') => $ids]);

        // Если в БД не найдены все указанные сущности
        /** @var BaseActiveRecord[] $modelsCount */
        $modelsCount = count($models);
        if (!$modelsCount || $modelsCount !== count($ids)) {
            throw new UserException('Найдены не все указанные сущности для удаления');
        }

        // Удаление указанных сущностей
        if ($models[0]->hasAttribute('status_id')) {
            foreach ($models as $model) {
                $model->softDelete();
            }
        } else {
            $modelClass::deleteAll([$modelClass::field('id') => $ids]);
        }

        Yii::$app->getResponse()->setStatusCode(204);

    }
}