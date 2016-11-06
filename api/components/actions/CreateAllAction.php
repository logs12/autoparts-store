<?php

namespace app\components\actions;

use app\components\BaseActiveRecord;
use yii;
use yii\base\Model;
use yii\base\UserException;
use yii\helpers\ArrayHelper;
use yii\rest\Action;
use yii\web\ServerErrorHttpException;

class CreateAllAction extends Action
{
    /**
     * @var string the scenario to be assigned to the new model before it is validated and saved.
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
                $model[] = $this->createModel($modelParams);
            }
            $transaction->commit();
        } catch (\Exception $exception) {
            $transaction->rollBack();
            throw $exception;
        }

        return $model;
    }

    private function createModel($params)
    {
        /** @var BaseActiveRecord $model */
        $model = new $this->modelClass([
            'scenario' => $this->scenario,
        ]);

        $model->load($params, '');
        $model->saveOrError();

        return $model;
    }
}