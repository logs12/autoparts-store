<?php
namespace app\components;

use app\components\queries\BaseQuery;
use yii\base\UserException;
use yii\db\ActiveRecord;

class BaseActiveRecord extends ActiveRecord
{
    use BaseModelTrait;

    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';
    const STATUS_DELETED = 'deleted';

    const TYPE_DUPLICATE = 'duplicate';

    public static $fieldsSet;

    public static function setFieldsSet($fieldsSet)
    {
        static::$fieldsSet = $fieldsSet;
    }

    public function saveOrError($runValidation = true, $attributeNames = null)
    {
        if (!$this->save($runValidation, $attributeNames)) {
            $errors = $this->getFirstErrors();
            throw new UserException(array_shift($errors));
        }
    }

    public function transactions()
    {
        return [
            'default' => self::OP_ALL,
        ];
    }

    /**
     * @return BaseQuery
     */
    public static function find()
    {
        return new BaseQuery(get_called_class());
    }

    public static function field($field)
    {
        return static::tableName() . '.[[' . $field . ']]';
    }
}