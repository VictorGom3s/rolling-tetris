<?php
  session_start();

  require_once("../config/db.php");
  require_once('../controller/User.php');
  require_once('../controller/UserController.php');
  
  try {
    $userController = new UserController($conn);
    $userController->updateUser($_SESSION['username'], $_POST);

    echo "Profile info updated succesfully. <a href='../pages/profile.php'>Voltar</a>";
  } catch (Exception $e) {
    echo $e;
    echo "Failed to update profile info. <a href='../pages/game.php'>Voltar</a>";
  } 
?>
