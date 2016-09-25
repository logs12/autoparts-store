<?php
/**
 * Created by PhpStorm.
 * User: vasil
 * Date: 13.09.2016
 * Time: 21:58
 */

namespace app\components\webServices;


class PartKom implements WebServiceInterface
{
    public function search()
    {
        $json = ['flagTest' => false, 'orderItems' => $itemsList];
        try {
            $response = \Httpful\Request::post('http://www.part-kom.ru/engine/api/v2/search/parts')
                ->sendsJson()
                ->authenticateWith($this->_login, $this->_pass)
                ->body(json_encode($json))
                ->send();
            foreach($response->body as $row) {
                $errors[] = $row->errorMessage;
            }
        }
        catch(\Exception $ex) {
            $errors[] = 'Ошибка добавления заказа: '.$ex->getMessage();
        }
        if($errors) {
            $this->setError(implode("\r\n", $errors));
            return false;
        }
        return true;
    }

    public function setData($data)
    {

    }

    public function getData() {

    }

    public function getArticul() {

    }

    public function getItems($articul)
    {

    }

    public function sortByArticul($articul)
    {

    }
}