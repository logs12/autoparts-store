<?php
namespace app\components;

use app\components\queries\BaseQuery;
use app\components\services\BaseService;
use app\components\services\CacheService;
use app\components\services\UserService;
use app\models\User;
use yii;
use yii\base\UserException;
use yii\behaviors\BlameableBehavior;
use yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;
use yii\helpers\Json;

/**
 * @property string $created
 * @property string $updated
 * @property string $deleted
 * @property string $status_id
 */
class BaseActiveRecord extends ActiveRecord
{
    use BaseModelTrait;

    const STATUS_ACTIVE = 'active';
    const STATUS_INACTIVE = 'inactive';
    const STATUS_DELETED = 'deleted';
    const STATUS_PENDING = 'pending';
    const STATUS_APPLIED = 'applied';
    const STATUS_NOT_APPLIED = 'not_applied';
    const STATUS_NOT_CHECKED = 'not_checked';
    const STATUS_OVERDUE = 'overdue';

    const TYPE_DUPLICATE = 'duplicate';
    const TYPE_NOT_FOUND = 'not_found';
    const TYPE_DECIMAL = 'decimal';
    const TYPE_STRING = 'string';
    const TYPE_LIST = 'list';

    const AFTER_SOFT_DELETE = 'after_soft_delete';

    public static $fieldsSet;
    public $backboneToYiiRelation = [];
    public $_model_cid;

    public function behaviors()
    {
        return ArrayHelper::merge(
            parent::behaviors(),
            [
                'blameableBehavior' => [
                    'class' => BlameableBehavior::className(),
                    'createdByAttribute' => $this->hasAttribute('created_by') ? 'created_by' : false,
                    'updatedByAttribute' => $this->hasAttribute('updated_by') ? 'updated_by' : false
                ]
            ]
        );
    }

    public static function setFieldsSet($fieldsSet)
    {
        static::$fieldsSet = $fieldsSet;
    }

    public function validateOrError($attributeNames = null, $clearErrors = true)
    {
        if (!$this->validate($attributeNames, $clearErrors)) {
            $errors = $this->getFirstErrors();
            throw new UserException(array_shift($errors));
        }
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

    public function getIntOrNull($value)
    {
        return BaseService::getIntOrNull($value);
    }

    public function getIntOrZero($value)
    {
        return BaseService::getIntOrZero($value);
    }

    public function getDoubleOrZero($value)
    {
        return BaseService::getDoubleOrZero($value);
    }

    public function getDoubleOrNull($value)
    {
        return BaseService::getFloatOrNull($value);
    }

    public function getFloatOrNull($value)
    {
        return BaseService::getFloatOrNull($value);
    }

    public function getBoolean($value)
    {
        return BaseService::getBoolean($value);
    }

    /**
     * @param array $order - поля для сортировки
     * @param BaseQuery $query - activeQuery объект с запросом sql
     * @return BaseQuery
     */
    public static function queryOrder($order, BaseQuery $query)
    {
        $orderData = [];
        foreach ($order as $field => $sortDirection) {
            $sortDirection = mb_strtolower($sortDirection) === 'desc' ? SORT_DESC : SORT_ASC;
            $orderData[$field] = $sortDirection;
        }
        $query->orderBy($orderData);

        return $query;
    }

    /**
     * Мягкое удаление
     * @throws UserException
     */
    public function softDelete()
    {
        $this->status_id = CacheService::getStatusByName(BaseActiveRecord::STATUS_DELETED)->id;
        $this->deleted = date('Y-m-d');
        $this->off(self::EVENT_AFTER_UPDATE);

        if ($this->save(false) === false) {
            throw new UserException('Не удалось удалить запись по неизвестным причинам');
        }

        $this->trigger(self::AFTER_SOFT_DELETE);
    }

    public static function softDeleteAll($condition = [])
    {
        foreach (static::find()->where($condition)->all() as $model) {
            /** @var BaseActiveRecord $model */
            $model->softDelete();
        }
    }

    /*
     * Проверка связанной сущности
     */
    public function saveRelatedObject(string $attribute, string $relatedObjectAttribute)
    {
        if (!$this->$relatedObjectAttribute) {
            throw new UserException('Для создаваемой сущности не найдена связанная');
        } else if ($this->{$relatedObjectAttribute . 'Validated'}) {
            $this->$relatedObjectAttribute->save(false);
        } else {
            $this->$relatedObjectAttribute->saveOrError();
        }

        $this->$attribute = $this->$relatedObjectAttribute->id;
    }

    public function setRelatedObject(string $relatedObjectAttribute, BaseActiveRecord $relatedObject, bool $relatedObjectValidated)
    {
        $this->$relatedObjectAttribute = $relatedObject;
        $this->{$relatedObjectAttribute . 'Validated'} = $relatedObjectValidated;
    }

    public function getTheVeryFirstError()
    {
        $firstErrors = $this->getFirstErrors();
        return reset($firstErrors);
    }

    /**
     * Обработчик связанных данных
     * @param string $modelClass
     * @param array $data
     * @param $baseFieldName
     * @param bool $softDelete - true(default) - мягкое удаление включенно, false - работает жесткое удаление
     */
    public function handleRelationData(string $modelClass, array $data, $baseFieldName, $softDelete = true)
    {
        /** @var BaseActiveRecord $model */
        /** @var BaseActiveRecord $modelClass */

        if ($softDelete) {
            $modelClass::softDeleteAll([$modelClass::field($baseFieldName) => $this->id]);
        } else {
            $modelClass::deleteAll([$modelClass::field($baseFieldName) => $this->id]);
        }

        foreach ($data as $modelData) {
            /** @var BaseActiveRecord $model */
            $model = new $modelClass();
            $model->load($modelData, '');
            $model->$baseFieldName = $this->id;
            $model->saveOrError();

            // Создание связи идентификаторов модели backbone и yii
            if ($backboneModelId = ArrayHelper::getValue($modelData, '_id')) {
                $this->backboneToYiiRelation[$model->id] = $backboneModelId;
            }
        }
    }

    public function fields()
    {
        return [
            '_model_cid',
            'id' => function ($model) {
                return BaseService::getIntOrNull($model->id);
            }
        ];
    }

    /*
     *  Если данные пришли не в GET-параметрах, а в заголовке запроса
     */
    public function checkHeaderParams(array $params)
    {
        if ($headerParams = Yii::$app->request->headers->get('x-app-params')) {
            $headerParams = Json::decode($headerParams);
            return ArrayHelper::merge($params, $headerParams);
        }

        return $params;
    }
}
