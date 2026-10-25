<?php
function isAnEmptyNonZeroString($s): bool
{
    if ($s === '0') return false;
    return empty($s);
}
