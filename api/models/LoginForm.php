<?php

namespace app\models;

use app\components\BaseModel;

/**
 * LoginForm is the model behind the login form.
 *
 * @property User|null $user This property is read-only.
 *
 */
class LoginForm extends BaseModel
{
    public $email;
    public $password;
    public $configData;
    public $rememberMe = true;

    private $_user = false;


    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            ['email', 'required'],
            ['email', 'email', 'message' => 'Некорректный адрес электронной почты'],

            ['password', 'required'],
            ['password', 'validatePassword'],

            ['rememberMe', 'boolean'],

        ];
    }

    public function attributeLabels()
    {
        return [
            'email' => 'Адрес электронной почты',
            'password' => 'Пароль',
        ];
    }

    public function fields()
    {
        return [
            'email',
            'rememberMe',
            'configData',
        ];
    }

    /**
     * Validates the password.
     * This method serves as the inline validation for password.
     *
     * @param string $attribute the attribute currently being validated
     */
    public function validatePassword($attribute)
    {
        if (!$this->hasErrors()) {
            $user = $this->getUser();

            if (!$user || !$user->validatePassword($this->password)) {
                $this->addError($attribute, 'Неверные данные');
            }
        }
    }

    /**
     * Logs in a user using the provided username and password.
     * @return boolean whether the user is logged in successfully
     */
    public function login()
    {
        if ($this->validate()) {
            return \Yii::$app->user->login($this->getUser(), $this->rememberMe ? 3600*24*30 : 0);
        }
        return false;
    }

    /**
     * Finds user by [[email]]
     *
     * @return User|null
     */
    public function getUser()
    {
        if (!$this->_user) {
            $this->_user = User::findByEmail($this->email);
        }

        return $this->_user;
    }
}
