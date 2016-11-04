<?php
namespace app\models;

use app\components\BaseActiveRecord;
use Yii;
use yii\helpers\ArrayHelper;

/**
 * This is the model class for table "type".
 *
 * @property string $id
 * @property string $title
 * @property string $name
 *
 * @property Standard[] $standards
 */
class Type extends BaseActiveRecord
{
    public static function tableName()
    {
        return 'type';
    }

    public function rules()
    {
        return [
            ['name', 'string', 'max' => 255],

            ['title', 'string', 'max' => 255],
        ];
    }

    public function fields()
    {
        return ArrayHelper::merge(parent::fields(), [
            'id' => function($model) {
                return static::getIntOrNull($model->id);
            },
            'name',
            'title',
        ]);
    }
}