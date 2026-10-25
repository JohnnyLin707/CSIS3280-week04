<?php
// 准备数据源：一个"二维数组"，每个元素是一条关联数组（表示一件商品）
// 真实项目中这些数据通常来自数据库查询结果
$items = [
    ['id'=>123, 'desc' => 'Hammer', 'price'=>9.99],
    ['id'=>234, 'desc' => 'A bucket of nails', 'price'=>19.99]
];
?>

<!doctype html><html><head><title>Basket From Array</title>
    <!-- 引入 Bootstrap CDN 样式，让按钮等元素有现成外观 -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    >
</head>
<body class="container">
<h1>Your shopping basket</h1>
<!-- foreach 的替代语法（冒号 + endforeach）：在混排 HTML 时比大括号更易读
     循环 $items，每次把当前元素赋给 $item -->
<?php foreach($items as $item): ?>
    <!-- col-lg-3 / text-end / py-2 都是 Bootstrap 的栅格与间距工具类 -->
    <div class="col-lg-3 text-end py-2">
        <?= $item['desc'] ?>
        <?= $item['price'] ?>
        <!-- 用超链接充当"按钮"：把商品 id 拼进 URL 的查询字符串，
             点击后以 GET 方式请求 /show.php?id=xxx，服务端再按 id 查询详情 -->
        <a href="/show.php?id=<?= $item['id'] ?>" class="btn btn-primary">Details</a>
    </div>
<?php endforeach; ?>
</body>
</html>
