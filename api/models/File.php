<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "file".
 *
 * @property integer $id
 * @property string $name
 * @property string $filename
 * @property string $extension
 * @property integer $created
 * @property integer $updated
 * @property integer $deleted
 */
class File extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'file';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'filename', 'extension'], 'required'],
            [['created', 'updated', 'deleted'], 'integer'],
            [['name', 'filename'], 'string', 'max' => 255],
            [['extension'], 'string', 'max' => 10],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'filename' => 'Filename',
            'extension' => 'Extension',
            'created' => 'Created',
            'updated' => 'Updated',
            'deleted' => 'Deleted',
        ];
    }
}
