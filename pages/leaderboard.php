<?php 
  session_start();
  require_once("../config/db.php");
  require_once('../controller/ScoreboardController.php');

  if(!$_SESSION['logged_in']){
    header("Location: http://localhost/rolling-tetris/pages/login.html");
  }

  $controller = new ScoreboardController($conn);
  $history = $controller->getLeaderboard();
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Leaderboard</title>

    <!-- Reset CSS -->
    <link rel="stylesheet" href="./../assets/css/reset.css" />
    <!-- ************** -->

    <!-- Page specific css -->
    <link rel="stylesheet" href="./../assets/css/game.css" />
    <!-- ************** -->
  </head>
  <body class="gray-bg">
    <main>
      <header class="header">
        <ul class="h-center row v-center">
          <li class="col-3">
            <a href="./game.php">&lt; Back</a>
          </li>
          <li class="col-4 text-center">
            <p>Leaderboard</p>
          </li>
          <li class="col-3">
            <p></p>
          </li>
        </ul>
      </header>

      <div class="container flex">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Level</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
           <?php
            foreach ($history as $row) { ?>
              <tr>
                <td><?=$row['name']?></td> 
                <td><?=$row['score']?></td> 
                <td><?=$row['level']?></td> 
                <td><?=$row['time']?></td> 
              </tr>
            <?php  } ?>
          </tbody>
        </table>
      </div>
    </main>
  </body>
</html>
