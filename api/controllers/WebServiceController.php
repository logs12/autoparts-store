<?php
namespace app\controllers;

use app\components\controllers\BaseActiveController;
use app\components\XmlService;
use app\models\WebServiceSearch;
use yii\data\ActiveDataProvider;

class WebServiceController extends BaseActiveController
{
    public $modelClass = 'app\models\WebService';

    public function actions()
    {
        $actions = parent::actions();

        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

        return $actions;
    }

    public function prepareDataProvider()
    {
        $searchModel = new WebServiceSearch();

        $query = $searchModel->search(\Yii::$app->request->get());
        
        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 100,
            ],
        ]);
    }

    public function actionGetItems()
    {
        $service = 'PartKom';
        $articul = 'OP570';
        $curl = curl_init('http://skladapi.automig.ru/connect-web-services/web-service?service='.$service);

        $user = "api";
        $password = "SweerEjhys";


        curl_setopt($curl,CURLOPT_USERPWD,$user . ":" . $password);
        curl_setopt($curl,CURLOPT_RETURNTRANSFER, 1);
        //curl_setopt($curl, CURLOPT_POST, false);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_POSTFIELDS, 'articul='.$articul);

        $result = curl_exec($curl);
        curl_close($curl);

        $offers = XmlService::xmlToArray($result);
        echo $offers;
        //echo $result;
        //$return = str_replace(['"'], '', $result);
        //echo stripslashes($return);
    }
}