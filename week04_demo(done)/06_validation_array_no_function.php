<?php

require_once 'inc/zeroFunction.php'; // 引入自定义辅助函数文件

// 判断本次请求是否为 POST（即表单是否被提交）
$isSubmitted = ($_SERVER['REQUEST_METHOD'] === 'POST');
$productCode = '';   // 产品编号，默认空字符串
$price = '';         // 价格，默认空字符串
$errors = [];        // 错误信息数组：每发现一个问题就往里追加一条

// 与 06_validation_array_controller.php 的区别：
// 本文件把所有逻辑都写在同一个页面里（不使用 validate() / displayForm() 等函数），
// 属于"函数化之前"的写法，便于对比理解。
if ($isSubmitted) {
    // 从 POST 中读取用户填写的字段
    $productCode = filter_input(INPUT_POST, 'productCode');
    $price = filter_input(INPUT_POST, 'price');

    // 校验产品编号：先查是否为空，再查长度是否不少于 3 个字符
    if (empty($productCode)) {
        $errors[] = 'missing product code';
    } elseif (strlen($productCode) < 3) {
        $errors[] = 'product code too few characters';
    }

    // 校验价格：
    // 这里不用 empty($price)，因为 empty('0') 为 true，
    // 会把合法的价格 0 误判成"没填"，所以改用自定义函数 isAnEmptyNonZeroString()
    if (isAnEmptyNonZeroString($price)) {
        $errors[] = 'missing price';
    } elseif (!is_numeric($price)) {   // is_numeric：判断是否为数字或数字字符串
        $errors[] = 'price was not a number';
    }
}

// 没有错误即视为有效数据
$isValid = empty($errors);
if ($isSubmitted && $isValid) {
    print 'input data was error free';
    die(); // 终止脚本：后面的 HTML 表单不会再输出
}
?>

<!doctype html>
<html><head>
    <title>Two-field postback form</title>
    <style>.error { background-color: pink; padding: 1rem;}</style>
</head>
<body>
<!-- 只有"已提交但数据不合法"时才显示错误区块 -->
<?php if ($isSubmitted && !$isValid): ?>
    <div class="error">
        <ul>
            <!-- 遍历 $errors 数组，把每条错误信息显示为列表项 -->
            <?php foreach ($errors as $error): ?>
                <li><?= $error ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<h1>Product details</h1>
<!-- 不写 action 表示提交回当前页面自己（postback） -->
<form method="POST">
    <!-- 把已填的值回填到 value 属性中（即"粘性表单"sticky form），
         这样用户提交失败后不用重新输入一遍 -->
    Product code: <input name="productCode" value="<?= $productCode ?>">
    <p>Price: <input name="price" value="<?= $price ?>"></p>
    <p><input type="submit"></p>
</form>
</body></html>
