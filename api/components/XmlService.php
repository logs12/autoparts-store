<?php

namespace app\components;

class XmlService
{
    public static function xmlToArray($xml)
    {
        $xmlObject = is_string($xml) ? simplexml_load_string($xml) : $xml;
        $array = is_array($xmlObject) ? $xmlObject : (array) $xmlObject;
        if (!empty($array)) {
            foreach ($array as &$element) {
                if (is_object($element) || is_array($element)) {
                    $element = self::xmlToArray($element);
                }
            }
        } else {
            $array = '';
        }

        return $array;
    }
}