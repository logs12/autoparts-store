<?php

namespace app\components\actions;

use app\components\BaseActiveRecord;
use yii;
use yii\base\UserException;
use yii\helpers\ArrayHelper;
use yii\web\ServerErrorHttpException;
use yii\base\Model;

class UpdateAllAction extends yii\rest\Action
{
    /**
     * @var string the scenario to be assigned to the model before it is validated and updated.
     */
    public $scenario = Model::SCENARIO_DEFAULT;

    public function run()
    {
        if ($this->checkAccess) {
            call_user_func($this->checkAccess, $this->id);
        }

        $params = Yii::$app->getRequest()->post('models');
        if (!ArrayHelper::isIndexed($params)) {
            throw new UserException('Данные должны быть индексированным массивом');
        }

        $transaction = Yii::$app->db->beginTransaction();
        $model = [];
        try {
            foreach ($params as $modelParams) {
                $model = $this->updateModel($modelParams);
            }
            $transaction->commit();
        } catch (\Exception $exception) {
            $transaction->rollBack();
            throw $exception;
        }

        return $model;
    }

    private function updateModel($params)
    {
        /* @var $model BaseActiveRecord */
        $model = $this->findModel($params['id']);

        $model->scenario = $this->scenario;
        $model->load($params, '');
        $model->saveOrError();

        return $model;
    }
}