<?php

namespace app\controllers;

use app\components\controllers\BaseActiveController;
use app\components\exceptions\UserException;
use app\models\AuthItem;
use app\models\search\UserSearch;

class UserController extends BaseActiveController
{
    public $modelClass = 'app\models\User';

    const ACTION_IS_HAVE_ROLES = 'is-have-roles';

    public function getQuery()
    {

        $modelSearch = new UserSearch;

        /** @var BaseQuery $query */
        $query = $modelSearch->search(\Yii::$app->request->get());

        $query->with(['file', 'status']);

        return $query;
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        switch ($action) {
            case self::ACTION_INDEX:
                $this->checkPermissions([AuthItem::PERMISSION_USER_GET]);
                break;
            case self::ACTION_VIEW:
                $this->checkPermissions([AuthItem::PERMISSION_USER_GET]);
                break;
            case self::ACTION_UPDATE:
                $this->checkPermissions([
                    AuthItem::PERMISSION_USER_GET,
                    AuthItem::PERMISSION_USER_UPDATE,
                ]);
                break;
            case self::ACTION_CREATE:
                $this->checkPermissions([
                    AuthItem::PERMISSION_USER_GET,
                    AuthItem::PERMISSION_USER_CREATE,
                ]);
                break;
            case self::ACTION_DELETE:
                $this->checkPermissions([
                    AuthItem::PERMISSION_USER_GET,
                    AuthItem::PERMISSION_USER_DELETE,
                ]);
                break;
            case self::ACTION_IS_HAVE_ROLES:
                $this->checkPermissions([
                    AuthItem::PERMISSION_USER_GET,
                ]);
                break;
            default:
                throw new UserException('Не найдено разрешение для действия:' . $action . ' в контроллере ' . get_class($this));
        }
    }
}
