<?php

namespace app\models;

class TestSearch extends Test
{
    public function search($params)
    {
        
        $query = static::find();

        return $query;
    }
}