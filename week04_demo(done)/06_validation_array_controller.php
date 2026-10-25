<?php

// require_once：引入外部文件，_once 保证即使多次调用也只引入一次（避免函数重复定义报错）
// inc/zeroFunction.php 提供辅助函数（如 isAnEmptyNonZeroString）
// inc/form.php 提供显示表单的函数 displayForm()
// inc/validate.php 提供校验函数 validate()
require_once 'inc/zeroFunction.php';
require_once 'inc/form.php';
require_once 'inc/validate.php';

// 初始化变量（给变量一个默认值，避免未定义警告）
// $_SERVER['REQUEST_METHOD'] 保存当前请求方式（GET / POST 等），
// 由于本页表单 method="POST"（即"回传 postback"到自己），
// 所以判断是否为 POST 就能区分"首次打开页面"和"用户提交了表单"。
$isSubmitted = ($_SERVER['REQUEST_METHOD'] === 'POST');
$productCode = '';
$price = '';
$errors = [];

// 只有提交了表单才需要校验；校验逻辑被封装在 validate() 里，
// 它返回一个错误信息的数组，没有错误时返回空数组。
if($isSubmitted){
    $errors = validate();
}

// 用一个布尔变量记录"数据是否有效"（可选写法，本质就是判断 $errors 是否为空）
$isValid = empty($errors);

// 提交且无错 => 说明数据合法，执行"成功"分支（这里只是简单提示）
if($isSubmitted && $isValid){
    print 'Your input data was error free';
}
else{
    // 其它情况（首次访问，或提交但有错）都重新显示表单；
    // 把 $errors 传进去，表单顶部就能把错误逐条列出来。
    displayForm($isSubmitted,$isValid,$errors,$productCode,$price);
}

