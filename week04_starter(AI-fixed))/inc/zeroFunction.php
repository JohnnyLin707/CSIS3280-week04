<?php
/**
 * 判斷字串是否為「空的、但不算零」的字串
 *
 * 為什麼需要這個函式？
 * PHP 的 empty() 對 '0' 會回傳 true（因為字串 '0' 會被轉成數字 0），
 * 但價格「0」其實是一個合法的值，不該被當成「沒填」。
 * 所以這裡先把 '0' 排除，再交給 empty() 判斷。
 *
 * @param string|null $s 要檢查的值
 * @return bool true = 視為空白（未填寫）；false = 有值（包含 '0'）
 */
function isAnEmptyNonZeroString($s): bool
{
    if ($s === '0') return false;   // '0' 是合法輸入，不算空白（注意用全等 === 比對型別）
    return empty($s);               // null、''、'0'、0、false、[] 都會是 true
}
