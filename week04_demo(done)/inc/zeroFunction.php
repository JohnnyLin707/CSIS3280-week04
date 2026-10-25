<?php
/**
 * 判断一个值是否为"空"，但把字符串 '0' 视作非空。
 *
 * 为什么要单独写这个函数？
 *   PHP 的 empty('0') 结果是 true，会把合法的 0（比如免费商品的价格 0）
 *   误判成"用户没填"。这里先把 '0' 排除掉，再做 empty 判断。
 *
 * @param mixed $s 待检查的值
 * @return bool true 表示"确实为空"，false 表示"有值（含 '0'）"
 */
function isAnEmptyNonZeroString($s): bool   // : bool 声明返回值类型为布尔值
{
    if ($s === '0') return false;   // '0' 是合法数据，不算空（=== 同时比较值和类型）
    return empty($s);               // 其余情况交给 empty()：''、null、false、0、[] 都算空
}
