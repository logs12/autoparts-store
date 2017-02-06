<?php

namespace app\components\validators;

use app\components\services\ValidatorService;

class Phone extends BaseValidator
{
    public $message;

    public function validateAttribute($model, $attribute)
    {
        $skip = $this->skipOnError && $model->hasErrors($attribute)
            || $this->skipOnEmpty && $this->isEmpty($model->$attribute);

        if (!$skip) {
            if (!$result = ValidatorService::phone($model->$attribute)) {
                $model->addError($attribute, 'Неверный формат телефона');
            }

            $model->$attribute = $result;
        }
    }
}