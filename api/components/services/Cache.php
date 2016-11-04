<?php
namespace app\components\services;

use app\models\Type as TypeModel;
use app\models\Status as StatusModel;
use yii\base\UserException;

class Cache extends BaseService
{
    private static $statuses = [];
    private static $types = [];

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

    public static function getTypeByName($id, $throwException = true)
    {
        return static::getType('name', $id, $throwException);
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