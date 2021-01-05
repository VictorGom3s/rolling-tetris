<?php 
  session_start();
  if(!$_SESSION['logged_in']){
    header("Location: http://localhost/rolling-tetris/pages/login.html");
  }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rolling Tetris</title>

    <!-- Reset CSS -->
    <link rel="stylesheet" href="./../assets/css/reset.css" />
    <!-- ************** -->

    <!-- Page specific css -->
    <link rel="stylesheet" href="./../assets/css/profile.css" />
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
            <p>Edit Profile</p>
          </li>
          <li class="col-3">
            <p></p>
          </li>
        </ul>
      </header>

      <div class="container flex v-center col">
        <h1 class="title-profile"></h1>
        <div class="container flex h-center">
          <form class="flex col" method="post" action="../controller/updateProfile.php">
            <input
              type="text"
              placeholder="Full Name"
              class="input"
              value="<?=$_SESSION['name']?>"
              name="name"
              required
            />
            <input type="date" title="Birth Date" class="input" name="birth_date"
             value="<?=$_SESSION['birth_date']?>" required />
            <input
              type="text"
              placeholder="Phone Number"
              class="input"
              value="<?=$_SESSION['phone']?>"
              name="phone"
              required
            />
            <input type="email" placeholder="Email" name="email" class="input" value="<?=$_SESSION['email']?>" required />
            <input
              type="password"
              placeholder="Password"
              class="input"
              name="password"
            />
            <button class="btn btn-primary">Confirm</button>
          </form>
        </div>
      </div>
    </main>
  </body>
</html>
