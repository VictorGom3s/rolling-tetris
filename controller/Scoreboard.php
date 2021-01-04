<?php
  class Scoreboard {
    private $level;
    private $time;
    private $score;
    private User $user;

    function __construct($level, $time, $score, $user){
      this->level = $level;
      this->time = $time;
      this->score = $score;
      this->user = $user;
    }

    function toArray(){
      return [this->level, this->time, this->score, this->user];
    }
  }
?>