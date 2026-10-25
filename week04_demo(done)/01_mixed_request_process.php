<?php
// ---- (1) 逻辑处理（LOGIC）：先取数据，再交给下面的模板显示 -----

// filter_input(INPUT_GET, 'id')
//   从 URL 查询字符串（query string）里读取名为 id 的参数。
//   对应表单 action="/...process.php?id=1022" 中 ?id=1022 这部分。
//   filter_input 会对输入做过滤/净化，比直接 $_GET['id'] 更安全。
//   若参数不存在则返回 null（或 false，取决于版本）。
$id = filter_input(INPUT_GET,'id');

// 从 POST 请求体里读取 title（表单里 name="title" 的输入框）
$title = filter_input(INPUT_POST,'title');

// 从 POST 请求体里读取 price（表单里 name="price" 的输入框）
$price = filter_input(INPUT_POST,'price');

// 注意：同一个 HTTP 请求可以同时带 GET 和 POST 数据，
// 这就是本例"混合请求（mixed request）"的含义。

?>

<!-- (2) HTML 模板（VIEW）：只负责把上面取到的变量显示出来 -->
 <!doctype html>
 <html>
    <head>
        <title>PHP processor</title>
    </head>
    <body>
        <!-- 这里的 ?= 标签是 echo 的简写，用于把变量的值输出到页面 -->
        id = <?= $id ?> <br>
        title = <?= $title ?> <br>
        price = <?= $price ?> <br>

    </body>
 </html>
