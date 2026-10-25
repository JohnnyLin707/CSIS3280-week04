<?php
/*
 * 這支檔案副檔名是 .php，但目前還沒有寫任何 PHP 程式碼，
 * 代表它「準備好」讓你加入伺服器端邏輯（例如從陣列輸出購物籃內容）。
 * 只要檔案內沒有 <?php ... ?>，PHP 引擎就會把內容原封不動送給瀏覽器，
 * 行為和純 .html 檔完全一樣。
 */
?>
<!doctype html>
<html>
<head>
    <title>Basket From Array</title>
    <!-- Bootstrap CDN：提供下面用到的 container / col-lg-3 / text-end 等排版 class -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
</head>
<body class="container">
<h1>Your shopping basket</h1>

<!--
    這裡是一個「版位（placeholder）」：目前是空的，
    練習時會在這個 div 裡用 PHP 迴圈把購物籃陣列的內容印出來，
    例如每一列顯示商品名稱 + 「移除」按鈕 / 連結。

    class 說明（Bootstrap 網格系統）：
      col-lg-3 → 在大型螢幕(lg)以上佔 3 欄（總共 12 欄）
      text-end → 內容靠右對齊
      py-2     → 上下內距(padding y) 2 個單位
-->
<div class="col-lg-3 text-end py-2">

</div>

</body>
</html>
