<?php
namespace app\components\controllers;

use yii;

class BaseRestController extends yii\rest\Controller
{
    const ACTION_INDEX = 'index';
    const ACTION_VIEW = 'view';
    const ACTION_UPDATE = 'update';
    const ACTION_UPDATE_ALL = 'update-all';
    const ACTION_CREATE = 'create';
    const ACTION_DELETE = 'delete';

    use BaseControllerTrait;
}