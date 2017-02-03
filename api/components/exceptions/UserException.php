<?php

namespace app\components\exceptions;

use yii\helpers\Json;

class UserException extends \yii\base\UserException
{
    public function __construct($message, $code = 0, \Exception $previous = null)
    {
        if (is_array($message)) {
            $message = Json::encode($message);
        }

        parent::__construct($message, $code, $previous);
    }
}