<?php
namespace app\components\controllers;

use yii\rest\ActiveController;

class BaseActiveController extends ActiveController
{
    const ACTION_INDEX = 'index';
    const ACTION_UPDATE = 'update';
    const ACTION_CREATE = 'create';
    const ACTION_DELETE = 'delete';

    use BaseControllerTrait;
}