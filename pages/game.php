<?php 
  session_start();
  if(!$_SESSION['logged_in']){
    header("Location: http://localhost/rolling-tetris/pages/login.html");
  }
?>

<!DOCTYPE html>
<html lang="en">
  <script><?php

  ?></script>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rolling Tetris</title>

    <!-- Reset CSS -->
    <link rel="stylesheet" href="./../assets/css/reset.css" />
    <!-- ************** -->

    <!-- Page specific css -->
    <link rel="stylesheet" href="./../assets/css/game.css" />
    <!-- ************** -->
  </head>
  <body class="gray-bg">
    <header class="header">
      <ul class="h-center">
        <li>
          <a href="../controller/logout.php">&lt; Logout</a>
        </li>
        <span class="flex">
          <li class="menu-item">
            <a class="small" href="./leaderboard.php">Leaderboard </a>
          </li>
          <li class="menu-item">
            <a class="small" href="./profile.php">Profile</a>
          </li>
        </span>
      </ul>
    </header>

    <main>
      <div class="board-container v-center">
        <div class="flex">
          <div class="flex col-3 left-column">
            <span class="flex v-center h-center font-48" id="timer">
              00:00
            </span>
            <span class="flex v-center h-center font-36 font-pressStart">
              Score:
              <span id="pontos"> 0</span>
            </span>
            <span class="flex v-center h-center font-24">
              Lines:
              <span id="lines"> 0</span>
            </span>
          </div>

          <canvas id="board" class="board col-4"></canvas>

          <div class="right-column flex col-3">
            <div class="right-wrapper">
              <span class="flex v-center h-center font-48">
                Level:
                <span id="level"> 0</span>
              </span>

              <canvas id="next" class="next"></canvas>
            </div>
            <button class="btn btn-secondary" id="btnPlay">Play</button>
          </div>
        </div>
      </div>
    </main>

    <section class="history-section">
      <div class="container">
        <h1 class="text-center">My History</h1>
        <div class="flex">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Level</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </section>

    <div id="modal" class="modal flex col hide">
      <div class="modal-header">
        <h1 class="text-center font-36">Select board size</h1>
        <a href="#" class="btn-close">X</a>
      </div>

      <div class="modal-body flex h-center">
        <span class="text-center">
          <a href="#" id="btnDefault">Default</a>
        </span>
        <span class="text-center">
          <a href="#" id="btnBig">Big</a>
        </span>
        <span>
          <div class="text-center">Custom</div>
          <div class="board-custom-size-inputs">
            <input
              type="number"
              placeholder="Lines"
              class="input-altura"
              id="altura"
            />
            <div>X</div>
            <input
              type="number"
              placeholder="Columns"
              class="input-largura"
              id="largura"
            />
          </div>
        </span>
      </div>
      <div class="modal-footer flex">
        <button class="btn btn-primary">Confirm</button>
      </div>
    </div>
  </body>
  <script>
    function loadLocalStorage(id, name){
      localStorage.setItem('id_usuario', id);
      localStorage.setItem('nome', name);
    }
  </script>

  <?php
    $id_usuario = $_SESSION['id'];
    $name = $_SESSION['name'];
    if($_SESSION['logged_in']){   
      echo "<script>loadLocalStorage($id_usuario, '$name');</script>";
    }
  ?>
  <script type="module" src="./../src/script.js"></script>
</html>
