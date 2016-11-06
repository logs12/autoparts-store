<?php

namespace app\models\search;

use app\models\WebService as WebServiceModel;

class WebService extends WebServiceModel
{
    public function search($params)
    {
        $query = static::find();

        return $query;
    }
}