<?php

namespace app\components\webServices;

class WebServices
{
    /**
     * @var - нициализированный объект с вебсервисом
     */
    private $_service;

    public function __construct($classPath, $articul, $login = null, $password = null)
    {
        if ($login && $password) {
            $this->_service = new $classPath($login, $password);
        } else return false;
        
        $this->_service->connect();
        
        if ($articul) {
            $this->_service->getItems(trim($articul));
        }
    }
    
    public function getService()
    {
        return $this->_service;
    }
    
    public function __get($name) 
    {
        if (method_exists($this->_service, $name)) {
            return $this->_service->{$name}();
        } else {
            return [];
        }
    }
}