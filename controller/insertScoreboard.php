<?php
session_start();

require_once("../config/db.php");
require_once('../controller/Scoreboard.php');
require_once('../controller/ScoreboardController.php');

try {  
  $id_usuario = $_POST['id'];
  $score = $_POST['score'];
  $level = $_POST['level'];
  $time = $_POST['time'];

  $scoreboard = new Scoreboard($level, $time, $score, $id_usuario);
  $controller = new ScoreboardController($conn);

  $controller->addUserScoreboard($scoreboard);
  $result = $controller->getUserScoreboard($id_usuario);

  return $result;
} catch (Exception $e) {
  echo $e;
}

?>