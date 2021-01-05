<?php
  session_start();

  require_once('../controller/User.php');
  require_once('../controller/UserController.php');

  try {
    $userController = new UserController($conn);
    $userController->logout();
    header("Location: http://localhost/rolling-tetris/index.html");

  } catch (Exception $e) {
    echo $e;
  } 
?>