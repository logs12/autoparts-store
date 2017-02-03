<?php
namespace app\models\search;

use app\modules\user\models\User as UserModel;
use yii\helpers\ArrayHelper;

class UserSearch extends UserModel
{
    public function search($params)
    {
        $query = static::find();

        if ($firstName = ArrayHelper::getValue($params, 'condition.first_name')) {
            $query->where(['like', static::field('first_name'), $firstName]);
        }

        if ($secondName = ArrayHelper::getValue($params, 'condition.second_name')) {
            $query->orWhere(['like', static::field('second_name'), $secondName]);
        }

        if ($thirdName = ArrayHelper::getValue($params, 'condition.third_name')) {
            $query->orWhere(['like', static::field('third_name'), $thirdName]);
        }

        if (($order = ArrayHelper::getValue($params, 'order')) && is_array($order)) {
            $query = static::queryOrder($order, $query);
        }

        return $query;
    }
}