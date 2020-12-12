<?php
class User {
  private $full_name;
  private $birth_date;
  private $phone;
  private $email;
  private $username;
  private $password;

  function __construct($full_name, $birth_date, $phone, $email, $username, $password){
    $this->full_name = $full_name;
    $this->birth_date = $birth_date;
    $this->phone = $phone;
    $this->email = $email;
    $this->username = $username;
    $this->password = md5($password);
  }

  function toArray() {
    return [$this->full_name, $this->birth_date, $this->phone, $this->email, $this->username, $this->password];
  }

  function toAssociativeArray() {
    return ['name' => $this->full_name,'birth_date'=> $this->birth_date, 'phone'=>$this->phone,'email'=> $this->email,
    'username'=> $this->username, 'password'=>$this->password];
  }    

  function getName(){
    return $this->full_name;
  }

  function getBirthDate(){
    return $this->birth_date;
  }

  function getPhone(){
    return $this->phone;
  }

  function getEmail(){
    return $this->email;
  }

  function getUsername(){
    return $this->username;
  }

  function getPassword(){
    return $this->password;
  }
}

?>