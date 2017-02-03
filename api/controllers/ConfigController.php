<?php

namespace app\controllers;

use app\components\controllers\BaseRestController;
use app\components\filters\AccessControl;
use app\components\services\BaseService;
use app\models\AuthItem;
use app\modules\user\models\User;
use Yii;
use yii\base\UserException;

class ConfigController extends BaseRestController
{
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'allow' => true,
                    ],
                ],
            ],
        ];

    }

    public function actionIndex()
    {
        /** @var User $authenticatedUser */
        User::setFieldsSet(User::FIELDS_USER_PERMISSIONS);
        $authenticatedUser = Yii::$app->user->getIdentity();

        return BaseService::getConfig($authenticatedUser);
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        switch ($action) {
            case self::ACTION_INDEX:
                $this->checkPermissions([AuthItem::PERMISSION_CONFIG_GET]);
                break;
            case self::ACTION_VIEW:
                $this->checkPermissions([AuthItem::PERMISSION_CONFIG_GET]);
                break;
            case self::ACTION_UPDATE:
                $this->checkPermissions([
                    AuthItem::PERMISSION_CONFIG_GET,
                    AuthItem::PERMISSION_CONFIG_UPDATE,
                ]);
                break;
            case self::ACTION_CREATE:
                $this->checkPermissions([
                    AuthItem::PERMISSION_CONFIG_GET,
                    AuthItem::PERMISSION_CONFIG_CREATE,
                ]);
                break;
            case self::ACTION_DELETE:
                $this->checkPermissions([
                    AuthItem::PERMISSION_CONFIG_GET,
                    AuthItem::PERMISSION_CONFIG_DELETE,
                ]);
                break;
            default:
                throw new UserException('Не найдено разрешение для действия:' . $action . ' в контроллере ' . get_class($this));
        }
    }
}
