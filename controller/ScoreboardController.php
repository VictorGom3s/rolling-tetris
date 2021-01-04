<?php

class ScoreboardController{
  private $db;

  function __construct($conn) {
    $this->db = $conn;
  }

  function getUserScoreboard($id){
    try{
      $stmt = $this->db->prepare('SELECT score, level, time FROM scoreboard where id_usuario=?');
      $stmt->execute([$id]);
      $result = $stmt->fetch();

      if($result == 0){
        throw new Exception("Could not retrieve scoreboard.");
      }

      return $result;
    }
    catch (\Throwable $th) {
      throw $th;
    }
  }

  function addUserScoreboard($user){
    try{

    }
    catch (\Throwable $th) {
      throw $th;
    }
  }

  function getLeaderboard(){
    try{

    }
    catch (\Throwable $th) {
      throw $th;
    }
  }
}

?>