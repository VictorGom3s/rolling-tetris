<?php
  session_start();

  require_once("../config/db.php");
  require_once('../controller/User.php');
  require_once('../controller/UserController.php');
  
  try {
    $user = new User(
      $_POST['fullname'],
      $_POST['birth_date'],
      $_POST['phone'],
      $_POST['email'],
      $_POST['username'],
      $_POST['password']
    );

    $userController = new UserController($conn);

    $userController->save($user);
    $userController->login($user->getUsername(), $user->getPassword());

    $isLoggedIn = $userController->isLoggedIn();

    if($isLoggedIn){
      header("Location: http://localhost/rolling-tetris/pages/game.php");
      exit();
    }

  } catch (Exception $e) {
    echo "Failed to sign up. <a href='../pages/signup.html'>Voltar</a>";
  }

 
?>
