<?php 
/**
 * 输出（渲染）产品表单页面。
 * 把"显示"这一职责抽成函数，控制器只负责决定要不要调用它、传什么参数。
 *
 * @param bool   $isSubmitted 表单是否已提交（默认 false/空）
 * @param bool   $isValid     数据是否通过校验（默认 true）
 * @param array  $errors      错误信息数组，非空时显示在表单上方
 * @param string $productCode 回填到输入框的产品编号
 * @param string $price       回填到输入框的价格
 * 所有参数都给了默认值，因此调用时可以只传部分参数。
 */
function displayForm($isSubmitted='', $isValid=true, $errors=[], $productCode='' ,$price=''){
// 下面用 ?> 退出 PHP 模式，直接按原样输出 HTML（比一行行 echo 更直观）
?>
    <!doctype html>
    <html><head>
        <title>Two-field postback form</title>
        <style>.error { background-color: pink; padding: 1rem;}</style>
    </head>
    <body>
    <!-- 已提交且有错，才显示红色（粉色）错误提示区 -->
    <?php if ($isSubmitted && !$isValid): ?>
        <div class="error">
            <ul>
                <?php foreach ($errors as $error): ?>
                    <li><?= $error ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <h1>Product details</h1>
    <!-- 省略 action：表单提交回本页自身 -->
    <form method="POST">
        <!-- 回填用户之前输入的值，避免校验失败后要重填 -->
        Product code: <input name="productCode" value="<?= $productCode ?>">
        <p>Price: <input name="price" value="<?= $price ?>"></p>
        <p><input type="submit"></p>
    </form>
    </body></html>
<?php
// 重新进入 PHP 模式，结束函数定义
}
?>