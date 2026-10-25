<?php
/**
 * 驗證函式：從 $_POST 取出 productCode 與 price 做檢查，回傳錯誤訊息陣列
 *
 * 用法：
 *   $errors = validate();
 *   if (empty($errors)) { ... 驗證通過 ... }
 *
 * 回傳 []（空陣列）代表沒有錯誤。
 * 注意：本函式依賴 inc/zeroFunction.php 中的 isAnEmptyNonZeroString()，
 * 所以載入本檔之前必須先載入 zeroFunction.php。
 */
function validate(){
    $errors = [];   // 用來收集所有錯誤訊息

    // filter_input()：從 $_POST 安全地取值，鍵不存在時回傳 null 而非噴警告
    $productCode = filter_input(INPUT_POST, 'productCode');
    $price = filter_input(INPUT_POST, 'price');

    // ---- 驗證 productCode：必填 且 至少 3 個字元 ----
    if (empty($productCode)) {
        $errors[] = 'missing product code';
    } elseif (strlen($productCode) < 3) {
        // elseif 確保「空白」只會報一次錯誤，不會同時報「長度不足」
        $errors[] = 'product code too few characters';
    }

    // ---- 驗證 price：必填 且 必須是數字 ----
    if (isAnEmptyNonZeroString($price)) {
        // 不用 empty()，否則價格填 0 會被誤判成「沒填」
        $errors[] = 'missing price';
    } elseif (!is_numeric($price)) {
        $errors[] = 'price was not a number';
    }

    return $errors;   // 回傳錯誤陣列（空陣列 = 驗證通過）
}

?>
