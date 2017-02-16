<?php
namespace app\components\queries;

use app\components\BaseActiveRecord;
use app\models\Status;
use yii\base\UserException;
use yii\db\ActiveQuery;
use yii\helpers\ArrayHelper;

class BaseQuery extends ActiveQuery
{
    const TABLE_ALIAS_DELETED = ':__TABLE_ALIAS_DELETED__';
    const TABLE_ALIAS = '__ALIAS__';
    const CONDITION_AND = 'and';
    const CONDITION_OR = 'or';

    protected $tableAlias;
    protected $tableFromAlias = false;
    protected $notDeletedParamAlias;
    protected $allStatuses = false;

    public function init()
    {
        // Проверка есть ли у модели поле status_id и если есть - добавление фильтра notDeleted
        if (!$this->allStatuses &&
            $this->isTableJoined(Status::tableName()) === false &&
            in_array('status_id', $this->getTableSchema()->getColumnNames())
        ) {
            $this->notDeleted();
        }

        parent::init();
    }

    public static function generateTableAlias()
    {
        return static::TABLE_ALIAS . uniqid();
    }

    public function getTableAlias()
    {
        if (!$this->tableAlias || ($this->from && !$this->tableFromAlias)) {
            /** @var BaseActiveRecord $modelClass */
            $modelClass = $this->modelClass;
            $tableAlias = $modelClass::tableName();

            if ($this->from &&
                ($tableAlias_ = array_search($tableAlias, $this->from)) &&
                is_string($tableAlias_)
            ) {
                $this->replaceAliasInStatusJoin($tableAlias_);

                $tableAlias = $tableAlias_;
                $this->tableFromAlias = true;
            }

            $this->tableAlias = $tableAlias;
        }

        return $this->tableAlias;
    }

    public function replaceAliasInStatusJoin($tableAlias)
    {
        $this->executeIfTableJoined(
            Status::tableName(),
            function ($index) use ($tableAlias) {
                $join = $this->join[$index];
                $onClause = str_replace($this->tableAlias, $tableAlias, $join[2]);
                $this->join[$index][2] = $onClause;
            });

        return $this;
    }

    public function active($active = true)
    {
        if ($active) {
            $this->status(BaseActiveRecord::STATUS_ACTIVE);
        } else {
            $this->status(BaseActiveRecord::STATUS_INACTIVE);
        }

        return $this;
    }

    public function applied($applied = true)
    {
        if ($applied) {
            $this->status(BaseActiveRecord::STATUS_APPLIED);
        } else {
            $this->status(BaseActiveRecord::STATUS_NOT_APPLIED);
        }

        return $this;
    }

    public function allStatuses()
    {
        $this->removeStatusJoin();
        return $this;
    }

    /*
     * Проверять результат этого метода ТОЛЬКО строгим методом === false!!!
     * Метод может вернуть 0 и это будет значить положительный результат
     */
    private function isTableJoined($tableName)
    {
        // Проверка есть ли уже в join'ах указанная таблица
        // Проверять результат этого метода ТОЛЬКО на строгим методом === false!!!
        // Метод может вернуть 0 и это будет значить положительный результат
        if ($this->join) {
            foreach ($this->join as $index => $join) {
                $joinedTable = is_array($join[1]) ? array_shift($join[1]) : $join[1];
                if ($joinedTable === $tableName) {
                    return $index;
                }
            }
        }

        return false;
    }

    private function executeIfTableJoined($tableName, \Closure $callback)
    {
        // Проверка есть ли уже в join'ах указанная таблица
        // и если есть - выполнение указанной функции
        if (false !== ($index = $this->isTableJoined($tableName))) {
            $callback($index);
        }
    }

    private function notDeleted()
    {
        // Добавление рандомного суффикса к алиасу таблицы и к параметру
        // чтобы не было одинаковых алиасов в запросе
        $tableAlias = static::generateTableAlias();
        $this->notDeletedParamAlias = ':' . $tableAlias;

        $this->innerJoin(
            [$tableAlias => Status::tableName()],
            $this->getTableAlias() . '.[[status_id]] = ' . $tableAlias . '.[[id]] AND ' . $tableAlias . '.[[name]] <> ' . $this->notDeletedParamAlias,
            [$this->notDeletedParamAlias => BaseActiveRecord::STATUS_DELETED]
        );

        return $this;
    }

    private function removeStatusJoin()
    {
        // Проверка есть ли уже в запросе join'ы с таблицей статусов
        // и если есть - удаляем этот join
        $this->executeIfTableJoined(
            Status::tableName(),
            function ($index) {
                // Удаление таблицы из join'ов
                unset($this->join[$index]);

                // Удаление параметра(ов) для join'а
                if (isset($this->params[$this->notDeletedParamAlias])) {
                    unset($this->params[$this->notDeletedParamAlias]);
                }
            });
    }

    public function excludeStatus($statusAliases)
    {
        $this->removeStatusJoin();
        $tableAlias = static::generateTableAlias();
        $queryStrings = '';
        $queryParams = [];

        if (!is_array($statusAliases)) {
            $statusAliases = [$statusAliases];
        }

        foreach ($statusAliases as $statusAlias) {
            $queryStrings .= ' AND ' . $tableAlias . '.[[name]] <> :' . $statusAlias;
            $queryParams[':' . $statusAlias] = $statusAlias;
        }
        $this->innerJoin(
            [$tableAlias => Status::tableName()],
            $this->getTableAlias() . '.[[status_id]] = ' . $tableAlias . '.[[id]]' . $queryStrings,
            $queryParams
        );

        return $this;
    }

    public function status($statusAlias)
    {
        $this->removeStatusJoin();

        // Добавление рандомного суффикса к алиасу таблицы и к параметру
        // чтобы не было одинаковых алиасов в запросе
        $tableAlias = static::generateTableAlias();
        $paramName = ':' . $tableAlias;

        $this->innerJoin(
            [$tableAlias => Status::tableName()],
            $this->getTableAlias() . '.[[status_id]] = ' . $tableAlias . '.[[id]] AND ' . $tableAlias . '.[[name]] = ' . $paramName,
            [$paramName => $statusAlias]
        );

        return $this;
    }

    private function getTableSchema()
    {
        /** @var BaseActiveRecord $modelClass */
        $modelClass = $this->modelClass;
        return $modelClass::getTableSchema();
    }

    public function handleParam(array $params, string $fieldName, string $method)
    {
        /** @var BaseActiveRecord $modelClass */
        $modelClass = $this->modelClass;

        if (!in_array($method, [static::CONDITION_AND, static::CONDITION_OR])) {
            throw new UserException('Метод должен быть ' . static::CONDITION_AND . ' или ' . static::CONDITION_OR);
        }

        if ($param = ArrayHelper::getValue($params, 'condition.' . $fieldName)) {
            if (is_array($param)) {
                $method = $method === static::CONDITION_AND ? 'andWhere' : 'orWhere';
                $param[1] = $param[1] === '' ? null : $param[1];
                $this->$method([$param[0], $modelClass::field($fieldName), $param[1]]);
            } else {
                $method = $method === static::CONDITION_AND ? 'andFilterWhere' : 'orFilterWhere';
                $this->$method([$modelClass::field($fieldName) => $param]);
            }
        }
    }
}
