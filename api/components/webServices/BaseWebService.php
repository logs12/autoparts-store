<?php

namespace app\components\webServices;

use yii\base\ErrorException;

class BaseWebService
{

    const STATUS_REFUSE = 1;
    const STATUS_DONE = 2;
    const STATUS_CANCELED = 3;
    const STATUS_ON_SKLAD = 4;
    const STATUS_DONE_PARTIAL = 5;
    const STATUS_ON_SKLAD_PARTIAL = 6;

    /**
     *
     * @var type
     */
    protected $_error;

    protected $_statusMap;

    /**
     *
     * @var array
     */
    protected $_data = [];

    protected $_columnAssoc = [];
    protected $_additionalFields = [];

    public function __construct($login, $pass = '')
    {}

    /**
     *
     * @return array
     */
    public function getCompleteData()
    {
        return $this->_data;
    }

    /**
     *
     * @return array
     */
    public function getColumnAssoc()
    {
        return array_values($this->_columnAssoc);
    }

    /**
     *
     * @return array
     */
    public function getCompleteColumn()
    {
        $ret = [];
        foreach ($this->_columnAssoc as $key => $column) {

            $ret[] = [
                'label' => $column['label'],
                'attribute' => $key
            ];
        }

        return $ret;
    }

    public function setError($error)
    {
        $this->_error = $error;
    }

    public function getError()
    {
        return $this->_error;
    }

    public function getAdditionalFields()
    {
        return $this->_additionalFields;
    }
}
