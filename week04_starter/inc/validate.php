<?php
function validate(){
    $errors = [];
    
    $productCode = filter_input(INPUT_POST, 'productCode');
    $price = filter_input(INPUT_POST, 'price');

    if (empty($productCode)) {
        $errors[] = 'missing product code';
    } elseif (strlen($productCode) < 3) {
        $errors[] = 'product code too few characters';
    }

    if (isAnEmptyNonZeroString($price)) {
        $errors[] = 'missing price';
    } elseif (!is_numeric($price)) {
        $errors[] = 'price was not a number';
    }
    
    return $errors;
}

?>