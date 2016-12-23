<?php

namespace app\modules\user\controllers;

use app\components\controllers\BaseActiveController;
use app\modules\user\models\search\UserSearch;



class UserController extends BaseActiveController
{
    public $modelClass = 'app\modules\user\models\User';

    public function getQuery()
    {

        $modelSearch = new UserSearch;

        /** @var BaseQuery $query */
        $query = $modelSearch->search(\Yii::$app->request->get());

        $query->with(['file', 'status']);

        return $query;
    }
}
