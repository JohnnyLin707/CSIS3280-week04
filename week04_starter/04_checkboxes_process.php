<?php
$toppings = filter_input(INPUT_POST, 'toppings', options: FILTER_REQUIRE_ARRAY);

if(empty($toppings)){
    print 'Please select at least one topping'
}

