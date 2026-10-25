<?php
/**
 * 顯示表單的函式（把 HTML 包在函式裡，方便重複使用）
 *
 * @param bool   $isSubmitted 表單是否已送出（控制是否顯示錯誤區塊）
 * @param bool   $isValid     驗證是否通過（只有「已送出且失敗」才顯示錯誤）
 * @param array  $errors      錯誤訊息陣列
 * @param string $productCode 回填到輸入框的產品代碼
 * @param string $price       回填到輸入框的價格
 *
 * 所有參數都有預設值，所以呼叫時可以只傳需要的部分，例如：
 *   displayForm(true, false, $errors, $productCode, $price);
 */
function displayForm($isSubmitted='', $isValid=true, $errors=[], $productCode='' ,$price=''){
?>
<!doctype html>
<html>
<head>
    <title>Two-field postback form</title>
    <!-- 錯誤區塊的樣式：粉紅底色 + 內距 -->
    <style>.error { background-color: pink; padding: 1rem;}</style>
</head>
<body>
<!-- 只在「已送出」而且「驗證失敗」時才印出錯誤清單 -->
<?php if ($isSubmitted && !$isValid): ?>
    <div class="error">
        <ul>
            <!-- foreach 走訪 $errors 陣列，把每一則錯誤印成一個 <li> -->
            <?php foreach ($errors as $error): ?>
                <li><?= $error ?></li>   <!-- 這裡用的是短標籤寫法，等同 echo 的簡寫 -->
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<h1>Product details</h1>
<!-- 沒寫 action → 表單送回自己這一頁（postback 自我提交） -->
<form method="POST">
    <!-- value 回填使用者先前輸入的值，驗證失敗時不用重新輸入 -->
    Product code: <input name="productCode" value="<?= $productCode ?>">
    <p>Price: <input name="price" value="<?= $price ?>"></p>
    <p><input type="submit"></p>
</form>
</body>
</html>
<?php
}   // end displayForm()
?>
