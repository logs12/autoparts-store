<?php
namespace app\components\formatters;

use yii\helpers\Json;
use yii\web\JsonResponseFormatter as BaseJsonResponseFormatter;

class JsonResponseFormatter extends BaseJsonResponseFormatter
{
    /**
     * @inheritdoc
     */
    protected function formatJson($response)
    {
        $response->getHeaders()->set('Content-Type', 'application/json; charset=UTF-8');
        if ($response->data !== null) {
            $response->content = Json::encode($response->data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        }
    }
}