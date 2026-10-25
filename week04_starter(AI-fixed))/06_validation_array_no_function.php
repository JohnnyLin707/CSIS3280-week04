<?php

// require_once：載入一次自訂函式檔；若已載入過就不會重複，避免「函式重複宣告」錯誤
// 這裡載入的是 isAnEmptyNonZeroString()
require_once 'inc/zeroFunction.php'; // Read in our function

// 判斷是否為「表單已送出」：用請求方法來區分第一次瀏覽(GET)與送出表單(POST)
// 這是所謂的 postback（自我提交）寫法：同一支檔案同時負責顯示表單與處理表單
$isSubmitted = ($_SERVER['REQUEST_METHOD'] === 'POST');

// 預設值：第一次進來時表單是空的（避免後面 echo 時出現「未定義變數」警告）
$productCode = '';
$price = '';
$errors = [];        // 用陣列收集所有錯誤訊息，可同時顯示多筆錯誤

if ($isSubmitted) {
    // filter_input(INPUT_POST, 'productCode')：從 $_POST 取值
    // 比直接寫 $_POST['productCode'] 安全：鍵不存在時回傳 null，不會噴警告
    $productCode = filter_input(INPUT_POST, 'productCode');
    $price = filter_input(INPUT_POST, 'price');

    // ---- 驗證 productCode ----
    if (empty($productCode)) {
        // empty()：''、null、0、'0'、false、[] 都算「空」
        $errors[] = 'missing product code';
    } elseif (strlen($productCode) < 3) {
        // elseif：只在「不是空值」的前提下才檢查長度，避免重複報錯
        $errors[] = 'product code too few characters';
    }

    // ---- 驗證 price ----
    if (isAnEmptyNonZeroString($price)) {
        // 用自訂函式而非 empty()，這樣價格填 0 會被接受
        $errors[] = 'missing price';
    } elseif (!is_numeric($price)) {
        // is_numeric()：字串內容是否為數字（'12.5' 也算）
        $errors[] = 'price was not a number';
    }
}

// 沒有任何錯誤 = 驗證通過（empty([]) 為 true）
$isValid = empty($errors);

if ($isSubmitted && $isValid) {
    print 'input data was error free';
    die(); // 直接結束程式：驗證成功就不再往下輸出表單
}
?>

<!doctype html>
<html>
<head>
    <title>Two-field postback form</title>
    <style>.error { background-color: pink; padding: 1rem;}</style>
</head>
<body>
<!-- 只有在「已送出」且「驗證失敗」時才顯示錯誤區塊 -->
<?php if ($isSubmitted && !$isValid): ?>
    <div class="error">
        <ul>
            <!-- 逐筆印出 $errors 陣列中的每一個錯誤訊息 -->
            <?php foreach ($errors as $error): ?>
                <li><?= $error ?></li>   <!-- 這裡用的是短標籤寫法，等同 echo 的簡寫 -->
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>

<h1>Product details</h1>
<!-- 沒有寫 action → 預設送回自己這一支檔案（postback） -->
<form method="POST">
    <!-- value="<?= $productCode ?>"：把使用者剛才輸入的值回填，送出失敗時不用重打 -->
    Product code: <input name="productCode" value="<?= $productCode ?>">
    <p>Price: <input name="price" value="<?= $price ?>"></p>
    <p><input type="submit"></p>
</form>
</body>
</html>
