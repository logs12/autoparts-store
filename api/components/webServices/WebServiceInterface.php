<?php

namespace app\components\webServices;


interface WebServiceInterface
{
    /**
     * @return mixed
     */
    public function search();

    public function setData($data);

    public function getData();

    public function getArticul();

    public function getItems($articul);

    public function sortByArticul($articul);
}