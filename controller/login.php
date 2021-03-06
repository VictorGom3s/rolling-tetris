<?php
  session_start();

  require_once("../config/db.php");
  require_once('../controller/User.php');
  require_once('../controller/UserController.php');
  
  try {
    $userController = new UserController($conn);
    $userController->login($_POST['username'], md5($_POST['password']));

    $isLoggedIn = $userController->isLoggedIn();

    if($isLoggedIn){
      header("Location: http://localhost/rolling-tetris/pages/game.php");
      exit();
    }

  } catch (Exception $e) {
    echo "Incorrect credentials. Try again! <a href='../pages/login.html'>Voltar</a>";
  } 
?>
