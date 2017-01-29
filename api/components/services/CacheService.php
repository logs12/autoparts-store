<?php

namespace app\components\services;

use app\models\Type as TypeModel;
use app\models\Status as StatusModel;
use yii\base\UserException;
use yii\helpers\ArrayHelper;

class CacheService extends BaseService
{
    public static $statuses = [];
    public static $types = [];
    public static $fiasIds = [];

    public static function getFiasDataById($fiasId)
    {
        if ($fiasObjectData = ArrayHelper::getValue(static::$fiasIds, $fiasId)) {
            return $fiasObjectData;
        }

        return null;
    }

    public static function getTypes()
    {
        if (!static::$types) {
            static::$types = TypeModel::find()->all();
        }

        return static::$types;
    }

    public static function getStatuses()
    {
        if (!static::$statuses) {
            static::$statuses = StatusModel::find()->all();
        }

        return static::$statuses;
    }

    public static function getTypeById($id, $throwException = true)
    {
        return static::getType('id', $id, $throwException);
    }

    public static function getTypeByName($name, $throwException = true)
    {
        return static::getType('name', $name, $throwException);
    }

    private static function getType($field, $value, $throwException = true)
    {
        $types = static::getTypes();

        /** @var TypeModel $type */
        foreach ($types as $type) {
            if ($type->$field == $value) {
                return $type;
            }
        }

        if ($throwException) {
            throw new UserException('Такой тип не найден');
        }

        return false;
    }

    public static function getStatusById($id, $throwException = true)
    {
        return static::getStatus('id', $id, $throwException);
    }

    public static function getStatusByName($name, $throwException = true)
    {
        return static::getStatus('name', $name, $throwException);
    }

    private static function getStatus($field, $value, $throwException = true)
    {
        $statuses = static::getStatuses();

        /** @var StatusModel $status */
        foreach ($statuses as $status) {
            if ($status->$field == $value) {
                return $status;
            }
        }

        if ($throwException) {
            throw new UserException('Такой статуст не найден');
        }

        return false;
    }
}