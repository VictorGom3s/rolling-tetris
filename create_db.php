<?php
  /*
    Script to auto-create the application's database
    and its tables.
  
    USAGE: php create_db.php host=<your hostname> user=<your username> pass=<your password>

    EXAMPLE: php create_db.php host=localhost user=root pass=root
  */

  try {
    parse_str(implode('&', array_slice($argv, 1)), $_GET);

    $conn = new PDO('mysql:host='.$_GET['host'].';', $_GET['user'], $_GET['pass']);

    $conn->beginTransaction();
    
    $conn->exec('create database rolling_tetris_grupo8 collate utf8_general_ci');
    $conn->exec('use rolling_tetris_grupo8');
    $conn->exec('
      CREATE TABLE IF NOT EXISTS `user` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(55) NOT NULL,
        `birth_date` datetime DEFAULT NULL,
        `phone` varchar(14) DEFAULT NULL,
        `email` varchar(40) NOT NULL UNIQUE,
        `username` varchar(30) NOT NULL UNIQUE,
        `password` char(32) NOT NULL,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    ');

    $conn->exec('
      CREATE TABLE IF NOT EXISTS `scoreboard` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `id_usuario` int(11) NOT NULL,
        `score` varchar(10) NOT NULL,
        `level` varchar(10) NOT NULL,
        `time` varchar(10) NOT NULL,
        PRIMARY KEY (`id`),
        KEY `scoreboard_FK` (`id_usuario`),
        CONSTRAINT `scoreboard_FK` FOREIGN KEY (`id_usuario`) REFERENCES `user` (`id`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    ');

    $conn->commit();
  } catch (\Throwable $th) {
    echo $th;
    $conn->rollback();
    die();
  }

  $res = null;
  $conn = null;
?>