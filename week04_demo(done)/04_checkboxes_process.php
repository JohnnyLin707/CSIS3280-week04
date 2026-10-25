<?php
// 读取 GET 参数 toppings。
// 第三个参数 options: FILTER_REQUIRE_ARRAY 很关键：
//   它告诉 PHP 这个值必须作为数组处理；如果传来的是单个标量（非数组），
//   filter_input 会返回 false，从而避免把字符串当成数组来用。
// 因为表单里是 name="toppings[]"，勾选多项时这里得到的是数组，
// 例如 ['olives', 'pepper']；一个都没勾则为 null 或 false。
$toppings = filter_input(INPUT_GET, 'toppings',options:FILTER_REQUIRE_ARRAY);

// empty() 对 null / false / [] 都返回 true，所以这里用来判断"没有勾选任何配料"
if(empty($toppings)){
    print 'Please select a topping';
}
else{
    // implode('+', $数组)：用指定的连接符把数组元素拼成一个字符串
    // 例：['olives','garlic'] => 'olives+garlic'
    $toppingString = implode('+',$toppings);
    // 双引号字符串里可以直接写 $变量，PHP 会自动插值
    print "Your selected toppings are: $toppingString";
}