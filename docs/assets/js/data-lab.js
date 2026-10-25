/* ============================================================
   Code Completion Lab — the tasks a student really has to solve.

   Source of truth:
     * the incomplete file  -> week04_starter/
     * the finished file    -> week04_demo(done)/  (shown as reference,
                               loaded from MANUAL so it is byte-exact)

   `ref`  = file name in week04_demo(done) (reference answer is taken
            from the manual data)
   `refCode` = used when the finished file does not exist (model answer)
   ============================================================ */

window.LAB = [

    {
        id: 1,
        file: '01_mixed_request.html',
        level: 'basic',
        title: {
            en: 'Point the form at the right folder',
            zh: '让表单指向正确的目录'
        },
        scenario: {
            en: 'The starter form already collects Title and Price — but submitting it gives a 404.',
            zh: 'starter 里的表单已经能填 Title 和 Price —— 但一点提交就 404。'
        },
        goal: {
            en: 'The demos live in a folder named week04. Change the action so the handler is really found.',
            zh: '示例都放在 week04 目录下。请把 action 改成能真正找到处理脚本的地址。'
        },
        given: `<form method="POST" action="/01_mixed_request_process.php?id=1022">
`,
        code: `<form method="POST" action="[[1]]/01_mixed_request_process.php?id=1022">
`,
        blanks: {
            1: {
                answer: `/week04`,
                hint: {
                    en: 'The name of the folder you created inside the site root.',
                    zh: '站点根目录下你建的那个目录名。'
                },
                explain: {
                    en: 'The courseware keeps the demos in a week04 folder, so an absolute action must contain the folder name — otherwise the server answers 404.',
                    zh: '教材把示例放在 week04 目录下，action 写绝对路径时必须带上目录名，否则服务器返回 404。'
                }
            }
        },
        note: {
            en: 'An absolute path starts at the site root, not at the current file. A missing folder name is the classic “404 right after submit” bug.',
            zh: '绝对路径从站点根目录算起，不是从当前文件算起。漏掉目录名就是经典的「一提交就 404」。'
        },
        ref: '01_mixed_request.html'
    },

    {
        id: 2,
        file: '01_mixed_request_process.php',
        level: 'basic',
        title: {
            en: 'Write the mixed-request handler',
            zh: '写出混合请求处理脚本'
        },
        scenario: {
            en: 'The starter file is empty except for two commented-out hints.',
            zh: 'starter 里这个文件基本是空的，只剩两行注释提示。'
        },
        goal: {
            en: 'Read id from the URL, title and price from the POST body, then print all three.',
            zh: '从 URL 取 id、从 POST 请求体取 title 和 price，然后把三行都打印出来。'
        },
        given: `<?php//
//
//@id = filter_input(INPUT_GET, 'id');
//$title = filter_input();
`,
        code: `<?php
// ---- (1) 逻辑（LOGIC）：先取数据，再交给下面的模板 -----
$id = filter_input(INPUT_GET, [[1]]);
$title = filter_input([[2]], 'title');
$price = filter_input(INPUT_POST, [[3]]);
?>

<!-- ---- (2) 模板（VIEW）：只负责把取到的变量显示出来 ---- -->
id = <?= [[4]] ?> <br>
title = <?= $title ?> <br>
price = <?= $price ?> <br>
`,
        blanks: {
            1: {
                answer: `'id'`,
                hint: {
                    en: 'The name that appears as ?id=1022 in the URL.',
                    zh: 'URL 上 ?id=1022 里的那个名字。'
                },
                explain: {
                    en: 'The second argument is the variable name and it is a string, so it needs quotes.',
                    zh: '第二个参数是「变量名」，字符串类型，所以要写引号。'
                }
            },
            2: {
                answer: `INPUT_POST`,
                hint: {
                    en: 'title comes from the form body, not from the URL.',
                    zh: 'title 来自表单请求体，不是 URL。'
                },
                explain: {
                    en: 'The first argument names the source: INPUT_GET reads the query string, INPUT_POST reads the request body — and this request carries both.',
                    zh: '第一个参数决定来源：INPUT_GET 取查询字符串，INPUT_POST 取请求体 —— 本例两种都有。'
                }
            },
            3: {
                answer: `'price'`,
                hint: {
                    en: 'Same source as title, different field name.',
                    zh: '和 title 同一个来源，只是字段名不同。'
                },
                explain: {
                    en: 'filter_input reads one variable per call, so every field needs its own line.',
                    zh: 'filter_input 一次只取一个变量，所以每个字段都要写一行。'
                }
            },
            4: {
                answer: `$id`,
                hint: {
                    en: 'Which variable holds the id you just read?',
                    zh: '哪个变量保存着你刚取到的 id？'
                },
                explain: {
                    en: '<?= ?> is short for <?php echo ?> — this line is where the logic hands its data over to the template.',
                    zh: '<?= ?> 是 <?php echo ?> 的简写 —— 这一行正是逻辑把数据交给模板的地方。'
                }
            }
        },
        note: {
            en: 'One single request carries GET and POST together: id rides in the URL, title and price in the body.',
            zh: '一次请求同时带 GET 和 POST：id 在 URL 上，title 和 price 在请求体里。'
        },
        ref: '01_mixed_request_process.php'
    },

    {
        id: 3,
        file: '02_multiple_process.php',
        level: 'basic',
        title: {
            en: 'Create the handler that tells the buttons apart',
            zh: '新建处理脚本，判断点了哪个按钮'
        },
        scenario: {
            en: 'This file does not exist in the starter folder at all — you have to create it.',
            zh: 'starter 目录里根本没有这个文件，需要你新建。'
        },
        goal: {
            en: 'Work out which of the two submit buttons was pressed and print the matching message.',
            zh: '判断用户点的是两个提交按钮中的哪一个，并输出对应信息。'
        },
        code: `<?php
if (filter_has_var([[1]], [[2]])) {
    print 'You selected WatchNow';
} else {
    print 'You selected WatchLater';
}
`,
        blanks: {
            1: {
                answer: `INPUT_POST`,
                hint: {
                    en: 'The form in 02_multiple_buttons.html uses method="POST".',
                    zh: '02_multiple_buttons.html 里的表单用的是 method="POST"。'
                },
                explain: {
                    en: 'The button names travel in the POST body, so that is the source you must inspect.',
                    zh: '按钮的 name 走的是 POST 请求体，所以要检查这个来源。'
                }
            },
            2: {
                answer: `'watchNow'`,
                hint: {
                    en: 'The name attribute of the first submit button.',
                    zh: '第一个提交按钮的 name 属性值。'
                },
                explain: {
                    en: 'Only the clicked button submits its own name, so “does this name exist?” is the whole test. isset($_POST[\'watchNow\']) does the same job.',
                    zh: '只有被点击的按钮才会提交自己的 name，所以「这个名字在不在」就是全部判断。isset($_POST[\'watchNow\']) 效果相同。'
                }
            }
        },
        note: {
            en: 'Two buttons, one form: the request itself tells you which one was pressed.',
            zh: '两个按钮、一个表单：请求数据本身就会告诉你点的是哪个。'
        },
        ref: '02_multiple_process.php'
    },

    {
        id: 4,
        file: '03_button_links.php',
        level: 'advanced',
        title: {
            en: 'Add the second product and make the link a real Details button',
            zh: '补上第二件商品，并把链接改成真正的 Details 按钮'
        },
        scenario: {
            en: 'The starter basket shows one product and a “Remove” link that points back at itself.',
            zh: 'starter 里的购物篮只有一件商品，还有一个指回自己的 Remove 链接。'
        },
        goal: {
            en: 'Put the second product into the array, and make every row link to the detail page with its own id.',
            zh: '把第二件商品加进数组，并让每行的链接带上该商品自己的 id 指向详情页。'
        },
        given: `$items = [
    ['id'=>123, 'desc'=>'Hammer', 'price'=>19.99]
];
...
<a href="03_button_links.php?id=<?= $item['id'] ?>">Remove</a>
`,
        code: `$items = [
    ['id'=>123, 'desc' => 'Hammer', 'price'=>9.99],
    ['id'=>[[1]], 'desc' => 'A bucket of nails', 'price'=>[[2]]]
];
...
<a href="/show.php?id=<?= [[3]] ?>" class="btn btn-primary">Details</a>
`,
        blanks: {
            1: {
                answer: `234`,
                hint: {
                    en: 'The id of the second product — one more row, same three keys: id, desc, price.',
                    zh: '第二件商品的 id —— 再加一行，同样是三个键：id、desc、price。'
                },
                explain: {
                    en: 'Adding a second row to the array is all it takes: the foreach in the template prints it automatically. Data first, display second.',
                    zh: '只要往数组里再加一条数据即可 —— 模板里的 foreach 会自动把它输出出来。数据先行，显示其次。'
                }
            },
            2: {
                answer: `19.99`,
                hint: {
                    en: 'The price of a bucket of nails.',
                    zh: '一桶钉子的价格。'
                },
                explain: {
                    en: 'Numbers are written without quotes in PHP — otherwise they would be strings, not numbers.',
                    zh: 'PHP 里数字不加引号 —— 加了就变成字符串而不是数字了。'
                }
            },
            3: {
                answer: `$item['id']`,
                hint: {
                    en: 'The key that holds this product’s id.',
                    zh: '保存当前商品 id 的那个键。'
                },
                explain: {
                    en: 'PHP can output right inside an HTML attribute; that is how every row gets its own id into the URL.',
                    zh: 'PHP 可以嵌在 HTML 属性里输出，这样每一行都会把自己的 id 拼进 URL。'
                }
            }
        },
        note: {
            en: 'Reading a detail page is a GET (a link); changing data is a POST (a form).',
            zh: '读详情页用 GET（链接），改数据才用 POST（表单）。'
        },
        ref: '03_button_links.php'
    },

    {
        id: 5,
        file: '04_checkboxes_process.php',
        level: 'advanced',
        title: {
            en: 'Fix the topping handler',
            zh: '修正配料处理脚本'
        },
        scenario: {
            en: 'The starter handler never prints the toppings — it also reads from the wrong source and misses a semicolon.',
            zh: 'starter 里的处理脚本永远不会输出选中的配料 —— 而且读取来源错了，还漏了一个分号。'
        },
        goal: {
            en: 'Three fixes: read from GET (the form uses GET), add the branch for “something was ticked”, and join the array into a string.',
            zh: '三处要改：改成从 GET 读（表单用的是 GET）、补上「勾选了」的分支、把数组拼成字符串。'
        },
        given: `<?php
$toppings = filter_input(INPUT_POST, 'toppings', options: FILTER_REQUIRE_ARRAY);

if(empty($toppings)){
    print 'Please select at least one topping'
}
`,
        code: `<?php
$toppings = filter_input([[1]], 'toppings', options: FILTER_REQUIRE_ARRAY);

if (empty($toppings)) {
    print 'Please select a topping';
} [[2]] {
    $toppingString = [[3]]('+', $toppings);
    print "Your selected toppings are: $toppingString";
}
`,
        blanks: {
            1: {
                answer: `INPUT_GET`,
                hint: {
                    en: 'Look at the method of 04_checkboxes_array.html.',
                    zh: '看一下 04_checkboxes_array.html 的 method。'
                },
                explain: {
                    en: 'The form submits with GET, so reading INPUT_POST always returns null and every submission looks like “nothing selected”.',
                    zh: '表单用 GET 提交，读 INPUT_POST 永远拿不到值，每次提交都会被当成「一个都没选」。'
                }
            },
            2: {
                answer: `else`,
                hint: {
                    en: 'The other half of the if.',
                    zh: 'if 的另一半。'
                },
                explain: {
                    en: 'Without else the page prints nothing at all when something actually is ticked.',
                    zh: '没有 else，勾选了反而什么都不会输出。'
                }
            },
            3: {
                answer: `implode`,
                hint: {
                    en: 'Join the array elements into one string.',
                    zh: '把数组元素拼成一个字符串。'
                },
                explain: {
                    en: 'Printing an array only yields “Array”; implode turns it into olives+garlic.',
                    zh: '数组直接打印只会得到 Array；implode 才能变成 olives+garlic 这样可读的文字。'
                }
            }
        },
        note: {
            en: 'Also mind the semicolon after print — a missing one is a parse error, not a logic error.',
            zh: '另外别忘了 print 后面的分号 —— 漏掉是语法错误，不是逻辑错误。'
        },
        ref: '04_checkboxes_process.php'
    },

    {
        id: 6,
        file: '05_multiple_process.php',
        level: 'advanced',
        title: {
            en: 'Create the handler for the flower multi-select',
            zh: '新建花卉多选处理脚本'
        },
        scenario: {
            en: 'The starter form points at 05_multiple_process.html, which cannot exist — the real handler has to be written.',
            zh: 'starter 里的表单指向 05_multiple_process.html（静态页根本处理不了数据），真正的处理脚本要你自己写。'
        },
        goal: {
            en: 'Read the flowers[] array, handle “nothing selected”, and print the selection.',
            zh: '读取 flowers[] 数组，处理「一个都没选」的情况，并输出所选内容。'
        },
        code: `<?php
$flowers = filter_input(INPUT_GET, 'flowers', options: [[1]]);

if (empty($flowers)) {
    print 'Please select a flower';
} else {
    print 'You selected: ' . [[2]](', ', $flowers);
}
`,
        blanks: {
            1: {
                answer: `FILTER_REQUIRE_ARRAY`,
                hint: {
                    en: 'The flag that demands an array.',
                    zh: '要求结果必须是数组的那个标志位。'
                },
                explain: {
                    en: 'The name ends in [], so the values arrive as an array; this flag guarantees it and returns false when they do not.',
                    zh: 'name 带 []，提交过来就是数组；这个标志位保证拿到数组，传来的不是数组就返回 false。'
                }
            },
            2: {
                answer: `implode`,
                hint: {
                    en: 'Join the array elements into a single string.',
                    zh: '把数组元素拼成一个字符串。'
                },
                explain: {
                    en: 'implode(separator, array) is the standard way to turn a set of selected values into one line of text.',
                    zh: 'implode(连接符, 数组) 是把一组勾选值变成一句话的标准做法。'
                }
            }
        },
        note: {
            en: 'Exactly the same server-side pattern as the checkboxes — the control differs, the code does not.',
            zh: '和复选框完全同一套服务端写法 —— 控件不同，代码一样。'
        },
        refCode: `<?php
// 05_multiple_process.php — 参考实现（教材未提供该文件）
$flowers = filter_input(INPUT_GET, 'flowers', options: FILTER_REQUIRE_ARRAY);

if (empty($flowers)) {
    print 'Please select a flower';
} else {
    print 'You selected: ' . implode(', ', $flowers);
}
`
    },

    {
        id: 7,
        file: '06_validation_array_controller.php',
        level: 'challenge',
        title: {
            en: 'Write the controller (and fix its includes)',
            zh: '写出控制器主体（并修正引入）'
        },
        scenario: {
            en: 'The starter file holds three includes only — one names a file that does not exist and there is a stray bracket.',
            zh: 'starter 里只有三行引入 —— 其中一个文件名并不存在，还多了一个右括号。'
        },
        goal: {
            en: 'Fix the includes, then make the controller do its job: detect the submission, validate, and decide what to show.',
            zh: '先修正引入，再让控制器真正干活：判断提交、调用校验、决定显示什么。'
        },
        given: `<?php

require_once 'inc/zeroFunction.php';
require_once 'inc/zeroController.php';
require_once 'inc/validate.php';)
`,
        code: `<?php
require_once 'inc/zeroFunction.php';
require_once 'inc/[[1]].php';
require_once 'inc/validate.php';

$isSubmitted = ($_SERVER[[2]] === 'POST');
$errors = [];

if ($isSubmitted) {
    $errors = [[3]]();
}

$isValid = empty($errors);

if ($isSubmitted && $isValid) {
    print 'Your input data was error free';
} else {
    displayForm($isSubmitted, $isValid, $errors, $productCode, $price);
}
`,
        blanks: {
            1: {
                answer: `form`,
                accepted: [`form`, `form.php`],
                hint: {
                    en: 'Which file defines displayForm()?',
                    zh: '哪个文件里定义了 displayForm()？'
                },
                explain: {
                    en: 'inc/form.php holds the view function; zeroController.php does not exist, so that include would stop the script.',
                    zh: 'inc/form.php 才是视图函数所在的文件；zeroController.php 并不存在，引入它会直接终止脚本。'
                }
            },
            2: {
                answer: `['REQUEST_METHOD']`,
                hint: {
                    en: 'The $_SERVER key that stores the request method.',
                    zh: '$_SERVER 里保存请求方式的那个键名。'
                },
                explain: {
                    en: 'Comparing it with \'POST\' is how one single file tells “opened for the first time” from “submitted”.',
                    zh: '把它和 \'POST\' 比较，就是同一个文件区分「首次打开」和「已提交」的方式。'
                }
            },
            3: {
                answer: `validate`,
                hint: {
                    en: 'The function in inc/validate.php that returns the error array.',
                    zh: 'inc/validate.php 里返回错误数组的那个函数。'
                },
                explain: {
                    en: 'The controller outsources the rules: it calls validate() and only looks at the array that comes back.',
                    zh: '控制器把规则外包出去：只调用 validate()，再看返回的数组。'
                }
            }
        },
        note: {
            en: 'This file writes no HTML at all — that is exactly what “controller” means.',
            zh: '这个文件一行 HTML 都不写 —— 这正是「控制器」的含义。'
        },
        ref: '06_validation_array_controller.php'
    }
];
