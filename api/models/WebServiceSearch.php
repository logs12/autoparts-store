<?php

namespace app\models;

class WebServiceSearch extends WebService
{
    public function search($params)
    {
        $query = static::find();

        return $query;
    }
}