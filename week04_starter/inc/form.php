<?php 
function displayForm($isSubmitted='', $isValid=true, $errors=[], $productCode='' ,$price=''){
?>
    <!doctype html>
    <html><head>
        <title>Two-field postback form</title>
        <style>.error { background-color: pink; padding: 1rem;}</style>
    </head>
    <body>
    <?php if ($isSubmitted && !$isValid): ?>
        <div class="error">
            <ul>
                <?php foreach ($errors as $error): ?>
                    <li><?= $error ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <h1>Product details</h1>
    <form method="POST">
        Product code: <input name="productCode" value="<?= $productCode ?>">
        <p>Price: <input name="price" value="<?= $price ?>"></p>
        <p><input type="submit"></p>
    </form>
    </body></html>
<?php
}
?>