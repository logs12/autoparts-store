<?php
namespace app\components\controllers;

use app\components\actions\CreateAllAction;
use app\components\actions\DeleteAction;
use app\components\actions\DeleteAllAction;
use app\components\actions\UpdateAllAction;
use app\components\BaseActiveRecord;
use app\components\queries\BaseQuery;
use yii\data\ActiveDataProvider;
use yii\helpers\ArrayHelper;
use yii\rest\ActiveController;
use yii;

class BaseActiveController extends ActiveController
{
    const ACTION_INDEX = 'index';
    const ACTION_VIEW = 'view';
    const ACTION_UPDATE = 'update';
    const ACTION_UPDATE_ALL = 'update-all';
    const ACTION_CREATE = 'create';
    const ACTION_DELETE = 'delete';

    use BaseControllerTrait;

    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
        $actions['create-all'] = [
            'class' => CreateAllAction::className(),
            'modelClass' => $this->modelClass,
            'checkAccess' => [$this, 'checkAccess'],
            'scenario' => $this->createScenario,
        ];
        $actions['update-all'] = [
            'class' => UpdateAllAction::className(),
            'modelClass' => $this->modelClass,
            'checkAccess' => [$this, 'checkAccess'],
            'scenario' => $this->createScenario,
        ];
        $actions['delete-all'] = [
            'class' => DeleteAllAction::className(),
            'modelClass' => $this->modelClass,
            'checkAccess' => [$this, 'checkAccess'],
        ];
        $actions['delete'] = [
            'class' => DeleteAction::className(),
            'modelClass' => $this->modelClass,
            'checkAccess' => [$this, 'checkAccess'],
        ];

        return $actions;
    }

    public function beforeAction($action)
    {
        $this->handleFieldsSet();
        return parent::beforeAction($action);
    }

    /**
     * Выборка, фильтрация и сортировка данных
     * @return ActiveDataProvider
     */
    public function prepareDataProvider()
    {
        return new ActiveDataProvider([
            'query' => $this->getQuery(),
            'pagination' => [
                'pageSize' => Yii::$app->request->get('pageSize'),
            ],
        ]);
    }

    public function handleFieldsSet()
    {

        if ($fieldsSet = ArrayHelper::getValue(Yii::$app->request->get(), 'fieldsSet')) {
            /** @var BaseActiveRecord $model */
            $model = $this->modelClass;
            $model::setFieldsSet($fieldsSet);
        }

    }

    public function getQuery()
    {
        $chunkStringOfModelClass = explode('\\', $this->modelClass);
        $modelClass = 'app\models\search\\' . $chunkStringOfModelClass[2];

        $modelSearch = new $modelClass;

        /** @var BaseQuery $query */
        $query = $modelSearch->search(Yii::$app->request->get());

        return $query;
    }
}