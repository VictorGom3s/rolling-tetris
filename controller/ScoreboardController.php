<?php

class ScoreboardController{
  private $db;

  function __construct($conn) {
    $this->db = $conn;
  }

  function getUserScoreboard($user){
    try{
      $stmt = $this->db->prepare('SELECT score, level, time FROM scoreboard where username=?');
      $stmt->execute([$user]);
      $result = $stmt->fetch();

      if($result == 0){
        throw new Exception("Could not retrieve scoreboard.");
      }
    }
    catch (\Throwable $th) {
      throw $th;
    }
    return $result;
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