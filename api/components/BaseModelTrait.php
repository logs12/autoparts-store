<?php
namespace app\components;

trait BaseModelTrait
{
    /*
     * Форматирование даты в mysql-вид
     */
    public function formatDate($attribute)
    {
        $dateTime = new \DateTime($this->$attribute);
        $this->$attribute = $dateTime->format('Y-m-d H:i:s');
    }
}