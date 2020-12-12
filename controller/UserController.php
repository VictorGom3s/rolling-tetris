<?php
class UserController {
  private $db;
  
  function __construct($conn) {
    $this->db = $conn;
  }

  function getAllUsers(){}
  
  function getUserByUsername($username){
    $stmt = $this->db->prepare('SELECT * FROM user where username=?');
    $stmt->execute([$username]);
    $result = $stmt->fetch();

    return $result;
  }

  function updateUser($id, $user){}

  function login($username, $password) {
    try {
      $result = $this->getUserByUsername($username);

      if($result == null) {
        throw new Exception('Could not log in. Incorrect username!');
        return;
      }

      if($result['password'] == $password) {
        $_SESSION['logged_in'] = true;
        $_SESSION['name'] = $result['name'];
        $_SESSION['birth_date'] = $result['birth_date'];
        $_SESSION['email'] = $result['email'];
        $_SESSION['phone'] = $result['phone'];
        $_SESSION['username'] = $result['username'];
        return;
      }

      throw new Exception('Could not log in. Incorrect password!');
      return;

    } catch (\Throwable $th) {
      throw $th;
    }
  }

  function logout() {}

  function isLoggedIn() {
    if($_SESSION['logged_in']){
      return true;
    }

    return false;
  }

  function save($user) {
    try {
      $name = $user->getName();
      $birthdate = $user->getBirthdate();
      $phone = $user->getPhone();
      $email = $user->getEmail();
      $username = $user->getUsername();
      $password = $user->getPassword();

      $sql = "INSERT INTO user (name, birth_date, phone, email, username, password) VALUES (?,?,?,?,?,?)";

      $stmt = $this->db->prepare($sql);

      $res = $stmt->execute([$name, $birthdate, $phone, $email, $username, $password]);

      if($res == 0){
        throw new Exception("Could not save user.");
      }
    } catch (\Throwable $th) {
      throw $th;
    }
  } 
}

?>