<?php
  class Scoreboard {
    public $level;
    public $time;
    public $score;
    public $id_usuario;

    function __construct($level, $time, $score, $id_usuario){
      $this->level = $level;
      $this->time = $time;
      $this->score = $score;
      $this->id_usuario = $id_usuario;
    }

    function toArray(){
      return [$this->level, $this->time, $this->score, $this->id_usuario];
    }
  }
?>