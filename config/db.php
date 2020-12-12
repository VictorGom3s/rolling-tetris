<?php
  try {
    $conn = new PDO('mysql:host=localhost;dbname=rolling_tetris_grupo8', 'root', 'root');
  } catch (PDOException $th) {
    print_r($th);
    die();
  }
?>