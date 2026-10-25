<?php
//setup the data array
$items = [
    ['id'=>123, 'desc'=>'Hammer', 'price'=>19.99]
];

?>

<!doctype html><html><head><title>Basket From Array</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    >
</head>
<body class="container">
<h1>Your shopping basket</h1>
<?php foreach ($items as $item): ?>
    <div class="row">
        <div class="col-lg-3">
            <?= $item['desc'] ?>
        </div>
        <div class="col-lg-3">
            <?= $item['price'] ?>
        </div>
        <div class="col-lg-3 text-end py-2">
            <a href="03_button_links.php?id=<?= $item['id'] ?>">Remove</a>
        </div>
    </div>
<?php endforeach; ?>
    <div class="col-lg-3 text-end py-2">
        
    </div>

</body>
</html>
