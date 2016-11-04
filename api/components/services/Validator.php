<?php
namespace app\components\services;

use libphonenumber\NumberParseException;
use libphonenumber\PhoneNumberUtil;

class Validator extends BaseService
{

    public static function phone($phone)
    {
        $phone = (string)$phone;

        $phoneUtil = PhoneNumberUtil::getInstance();
        try {
            $numberProto = $phoneUtil->parse($phone, BaseService::getCountryCode());
        } catch (NumberParseException $e) {
            return false;
        }

        return $numberProto->getNationalNumber();
    }

    public static function ip($value)
    {
        return filter_var($value, FILTER_VALIDATE_IP) ? true : false;
    }
}