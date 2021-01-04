<?php
class UserController {
  private $db;
  
  function __construct($conn) {
    $this->db = $conn;
  }

  function getAllUsers(){
    try{
      $stmt = $this->db->prepare('SELECT name FROM user');
      $stmt->execute();
      $result = $stmt->fetch();

      if($result == 0){
        throw new Exception("Could not retrieve user list.");
      }
    }
    catch (\Throwable $th) {
      throw $th;
    }
  }
  
  function getUserByUsername($username){
    try{
      $stmt = $this->db->prepare('SELECT * FROM user where username=?');
      $stmt->execute([$username]);
      $result = $stmt->fetch();

      if($result == 0){
        throw new Exception("Could not retrieve user list.");
      }
    }
    catch (\Throwable $th) {
      throw $th;
    }
    return $result;
  }

  function updateUser($username, $updatedInfo){
    try {

      if(array_key_exists('password', $updatedInfo)){
        $stmt = $this->db->prepare('UPDATE user SET name=?,birth_date=?,phone=?,email=?,password=? WHERE username=?');
        $stmt->execute([$updatedInfo['name'], $updatedInfo['birth_date'], $updatedInfo['phone'], $updatedInfo['email'], md5($updatedInfo['password']), $username]);
      }else{
        $stmt = $this->db->prepare('UPDATE user SET name=?,birth_date=?,phone=?,email=? WHERE username=?');
        $stmt->execute([$updatedInfo['name'], $updatedInfo['birth_date'], $updatedInfo['phone'], $updatedInfo['email'], $username]);
      }

      $result = $stmt->fetch();

      $this->updateSessionInfo($updatedInfo);
      return;

    } catch (\Throwable $th) {
      throw $th;
    }
  }

  function login($username, $password) {
    try {
      $result = $this->getUserByUsername($username);

      if($result == null) {
        throw new Exception('Could not log in. Incorrect username!');
        return;
      }

      if($result['password'] == $password) {
        $this->updateSessionInfo($result);
        return;
      }

      throw new Exception('Could not log in. Incorrect password!');
      return;

    } catch (\Throwable $th) {
      throw $th;
    }
  }

  function updateSessionInfo($user){
    $_SESSION['logged_in'] = true;
    $_SESSION['name'] = $user['name'];
    $_SESSION['birth_date'] = $user['birth_date'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['phone'] = $user['phone'];
    array_key_exists('username', $user) ? $_SESSION['username'] = $user['username'] : "";
  }

  function logout() {
    session_destroy();
    header("Location: http://localhost/rolling-tetris/");
  }

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