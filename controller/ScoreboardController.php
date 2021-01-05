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

  function addUserScoreboard($scoreboard){
    try {
      $sql = "INSERT INTO scoreboard (id_usuario, score, level, time) VALUES (?, ?, ?, ?)";

      $stmt = $this->db->prepare($sql);

      $res = $stmt->execute([$scoreboard->id_usuario, $scoreboard->score, $scoreboard->level, $scoreboard->time]);

      if($res == 0){
        throw new Exception("Could not save scoreboard.");
      }
    } catch (\Throwable $th) {
      throw $th;
    }
  }

  function getLeaderboard(){
    try{
      $stmt = $this->db->prepare('SELECT name, score, level, time FROM scoreboard join user on user.id = scoreboard.id_usuario');
      $stmt->execute();
      $result = $stmt->fetch();

      if($result == 0){
        throw new Exception("Could not retrieve leaderboard.");
      }

      return $result;
    }
    catch (\Throwable $th) {
      throw $th;
    }
  }
}

?>