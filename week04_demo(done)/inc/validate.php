<?php
/**
 * 校验表单提交的数据。
 * 约定：返回一个错误信息数组；数组为空（empty）即代表校验通过。
 * 好处：控制器不需要知道具体校验细节，只关心"有没有错误"。
 */
function validate(){
    $errors = [];   // 收集错误信息，每发现一个问题就 $errors[] 追加一条
    
    // 从 POST 请求中读取字段（filter_input 比直接访问 $_POST 更安全）
    $productCode = filter_input(INPUT_POST, 'productCode');
    $price = filter_input(INPUT_POST, 'price');

    // 规则 1：产品编号不能为空
    // 规则 2：若不为空，长度还必须 >= 3 个字符
    // 用 elseif 保证同一字段一次最多报一条错误
    if (empty($productCode)) {
        $errors[] = 'missing product code';
    } elseif (strlen($productCode) < 3) {
        $errors[] = 'product code too few characters';
    }

    // 规则 3：价格不能为空。
    //   注意用 isAnEmptyNonZeroString() 而不是 empty()：
    //   因为 empty('0') === true，会把合法的 0 当成"没填"。
    // 规则 4：价格必须是数字（is_numeric 判断是否为数字或数字字符串）
    if (isAnEmptyNonZeroString($price)) {
        $errors[] = 'missing price';
    } elseif (!is_numeric($price)) {
        $errors[] = 'price was not a number';
    }
    
    // 把错误数组返回给调用者（控制器）
    return $errors;
}

?>