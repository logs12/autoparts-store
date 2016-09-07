<?php
namespace app\controllers;

use app\components\controllers\BaseActiveController;

class TestController extends BaseActiveController
{
    public $modelClass = 'app\models\Test';

    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

        return $actions;
    }

    public function prepareDataProvider()
    {
        $searchModel = new TestSearch();

        $query = $searchModel->search(\Yii::$app->request->get());
        
        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 100,
            ],
        ]);
    }
}