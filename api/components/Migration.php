<?php
/**
 * Created by PhpStorm.
 * User: vasil
 * Date: 07.09.2016
 * Time: 20:05
 */

namespace app\components;

use yii;
use yii\db\Migration as BaseMigration;
use yii\helpers\Console;

class Migration
{
    public $operations = [];

    public function up()
    {
        foreach ($this->operations as $index => $operation) {
            $transaction = null;
            $time = microtime(true);

            if (!empty($operation['transactional'])) {
                $transaction = Yii::$app->getDb()->beginTransaction();
                echo "    > execute transactional queries ...";
            }

            try {
                $operationFunction = $operation['up'];
                $operationFunction($this);

                if (!empty($operation['transactional'])) {
                    echo ' done (time: ' . sprintf('%.3f', microtime(true) - $time) . "s)\n";
                    $transaction->commit();
                }
            } catch (\Exception $exception) {
                if (!empty($operation['transactional'])) {
                    $transaction->rollBack();
                }

                $indexFrom = !empty($operation['transactional']) ? $index : $index - 1;

                echo Console::ansiFormat("\n\n=========================\n==== ROLL BACK BEGIN ====\n=========================\n", [Console::FG_RED]);
                for ($i = $indexFrom; $i >= 0; $i--) {
                    if (!empty($this->operations[$i]['down'])) {
                        $function = $this->operations[$i]['down'];
                        $function($this);
                    }
                }
                echo Console::ansiFormat("\n=======================\n==== ROLL BACK END ====\n=======================\n", [Console::FG_RED]);
                echo Console::ansiFormat(
                    "\n\n\n================================================\n\n" .
                    "  !!! DATABASE RESTORED | NO CHANGES APPLIED !!!  \n\n" .
                    "================================================\n\n\n"
                    , [Console::FG_CYAN, Console::BOLD]);
                throw $exception;
            }
        }
    }

    public function down()
    {
        for ($i = count($this->operations) - 1; $i >= 0; $i--) {
            if (!empty($this->operations[$i]['down'])) {
                $this->operations[$i]['down']($this);
            }
        }
    }

    protected function getTableOptions($tableComment = null)
    {
        $tableOptions = '';
        /*
         * http://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci
         */
        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }

        if ($tableComment) {
            $tableOptions .= ' COMMENT "' . $tableOptions . '"';
        }

        return $tableOptions;
    }
}