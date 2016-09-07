<?php
namespace app\components\filters;

use yii\filters\AccessControl as BaseAccessControl;
use yii;
use yii\web\ForbiddenHttpException;

class AccessControl extends BaseAccessControl
{
    protected function denyAccess($user)
    {
        throw new ForbiddenHttpException('Вам не разрешено данное действие');
    }
}