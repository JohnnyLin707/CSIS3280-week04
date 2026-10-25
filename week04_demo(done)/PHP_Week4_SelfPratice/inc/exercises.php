<?php
/**
 * 题库数据：每道题是一段来自教材的真实代码，用 [[1]] [[2]] ... 标记需要填写的空。
 * 每个空可以配置：
 *   answer    - 标准答案（用于显示"正确答案"）
 *   accepted  - 额外可接受的等价写法（可选）
 *   hint      - 提示（折叠显示）
 *   explain   - 讲解（校对后显示）
 */

/**
 * 返回全部练习题
 * @return array
 */
function getExercises(): array
{
    return [
        [
            'id' => 1,
            'title' => '读取 URL 上的查询字符串参数',
            'source' => '01_mixed_request_process.php',
            'level' => '基础',
            'prompt' => '表单用 POST 提交，但 URL 上还带着 ?id=1022。请把取 GET 参数和取 POST 字段的代码补完整。',
            'code' => <<<'CODE'
$id = filter_input(INPUT_GET, [[1]]);
$title = filter_input([[2]], 'title');
$price = filter_input(INPUT_POST, 'price');
CODE,
            'blanks' => [
                1 => [
                    'answer' => "'id'",
                    'hint' => '要取的是 URL 上 ?id=1022 里的那个名字。',
                    'explain' => 'filter_input 的第二个参数是"变量名"，字符串类型，所以要写引号：\'id\'。',
                ],
                2 => [
                    'answer' => 'INPUT_POST',
                    'hint' => 'title 是表单字段，走请求体，不是 URL。',
                    'explain' => '第一个参数决定数据来源：INPUT_GET 取 URL 参数，INPUT_POST 取表单请求体。同一个请求可以两种都有。',
                ],
            ],
            'note' => '这就是"混合请求"：id 来自 GET，title/price 来自 POST，必须分开读取。',
        ],

        [
            'id' => 2,
            'title' => '判断表单是否被提交',
            'source' => '06_validation_array_controller.php',
            'level' => '基础',
            'prompt' => '表单提交回本页自己（postback）。补出判断"这次是提交"的条件。',
            'code' => <<<'CODE'
$isSubmitted = ($_SERVER[[1]] === [[2]]);
CODE,
            'blanks' => [
                1 => [
                    'answer' => "'REQUEST_METHOD'",
                    'hint' => '$_SERVER 里保存请求方式的那个键名，全大写。',
                    'explain' => '$_SERVER 是超全局数组，[\'REQUEST_METHOD\'] 里存着 GET / POST 等请求方式。',
                ],
                2 => [
                    'answer' => "'POST'",
                    'hint' => '表单 method="POST" 时它的值是什么？',
                    'explain' => "和表单的 method=\"POST\" 对应；首次用 GET 打开页面时它是 'GET'。",
                ],
            ],
            'note' => '区分"第一次打开页面"和"点了提交按钮"，是回传表单的第一步。',
        ],

        [
            'id' => 3,
            'title' => '多个提交按钮：判断点了哪一个',
            'source' => '02_multiple_process.php',
            'level' => '基础',
            'prompt' => '页面上有 watchNow 和 watchLater 两个 submit 按钮，只有被点击的那个按钮会把自己的 name 提交上来。',
            'code' => <<<'CODE'
if (filter_has_var(INPUT_POST, [[1]])) {
    print 'You selected WatchNow';
} else {
    print 'You selected WatchLater';
}
CODE,
            'blanks' => [
                1 => [
                    'answer' => "'watchNow'",
                    'hint' => 'HTML 里第一个按钮的 name 属性值是什么？',
                    'explain' => 'filter_has_var(INPUT_POST, \'watchNow\') 判断该变量是否存在；存在就说明用户点的是这个按钮。等价于 isset($_POST[\'watchNow\'])。',
                ],
            ],
            'note' => '多个 submit 按钮共用一个表单，靠"哪个 name 被提交"来区分用户意图。',
        ],

        [
            'id' => 4,
            'title' => '复选框：让一个字段提交多个值',
            'source' => '04_checkboxes_array.html',
            'level' => '进阶',
            'prompt' => '三个配料复选框共用同一个名字，PHP 端要收到数组而不是单个值。',
            'code' => <<<'CODE'
<input type="checkbox" name="toppings[[1]]" value="olives"> Olives
<input type="checkbox" name="toppings[]" value="pepper"> Pepper
<input type="checkbox" name="toppings[]" value="garlic"> Garlic salt
CODE,
            'blanks' => [
                1 => [
                    'answer' => '[]',
                    'hint' => '两个字符，方括号。',
                    'explain' => '名字后面加 []，PHP 才会把同名的值收集成数组；不加的话只会保留最后一个值。',
                ],
            ],
            'note' => '这是复选框 / 多选列表能让服务端拿到"多个"的关键写法。',
        ],

        [
            'id' => 5,
            'title' => '读取数组型字段',
            'source' => '04_checkboxes_process.php',
            'level' => '进阶',
            'prompt' => '接上题：服务端要把 toppings 读成数组。注意这个常量是"标志位"，不是过滤器的名字。',
            'code' => <<<'CODE'
$toppings = filter_input(INPUT_GET, 'toppings', FILTER_DEFAULT, [[1]]);

if (empty($toppings)) {
    print 'Please select a topping';
}
CODE,
            'blanks' => [
                1 => [
                    'answer' => 'FILTER_REQUIRE_ARRAY',
                    'hint' => '直译就是"要求数组"。',
                    'explain' => 'FILTER_REQUIRE_ARRAY 是标志位，必须放在 filter_input 的第 4 个参数。写成第 3 个参数会读不到数组（常见错误）。',
                ],
            ],
            'note' => '第 3 个参数是过滤常量（如 FILTER_VALIDATE_EMAIL），第 4 个参数才是选项 / 标志。',
        ],

        [
            'id' => 6,
            'title' => '把数组拼成字符串',
            'source' => '04_checkboxes_process.php',
            'level' => '基础',
            'prompt' => '选中的多个配料要用加号连接成一个字符串输出。',
            'code' => <<<'CODE'
$toppingString = [[1]]('+', $toppings);
print "Your selected toppings are: $toppingString";
CODE,
            'blanks' => [
                1 => [
                    'answer' => 'implode',
                    'hint' => 'explode 的反义词，中文叫"组合/内爆"。',
                    'explain' => 'implode(连接符, 数组) 把数组元素用连接符拼成一个字符串，例如 [\'olives\',\'garlic\'] → \'olives+garlic\'。',
                ],
            ],
            'note' => '作业里显示多门课程时也常用它；也可以用循环逐行输出。',
        ],

        [
            'id' => 7,
            'title' => "empty('0') 的坑",
            'source' => 'inc/zeroFunction.php',
            'level' => '进阶',
            'prompt' => "价格填 0 是合法的，但 PHP 的 empty('0') 竟然是 true。请把这个『排除 0』的辅助函数补完整。",
            'code' => <<<'CODE'
function isAnEmptyNonZeroString($s): bool
{
    if ($s === [[1]]) return false;
    return [[2]]($s);
}
CODE,
            'blanks' => [
                1 => [
                    'answer' => "'0'",
                    'hint' => '字符串形式的零，注意要带引号。',
                    'explain' => "字符串 '0' 是合法数据，先用 === 把它拦下来返回 false（有值）。",
                ],
                2 => [
                    'answer' => 'empty',
                    'hint' => 'PHP 内置函数，判断变量是否"空"。',
                    'explain' => "其余情况交给 empty()：''、null、false、0、[] 都算空。",
                ],
            ],
            'note' => "判断题里经常考：empty('0') === true，而 empty(0) 也是 true。",
        ],

        [
            'id' => 8,
            'title' => '学号校验：十位数字（正则）',
            'source' => 'inc/validate_JLi016.inc.php',
            'level' => '挑战',
            'prompt' => '用 filter_input + FILTER_VALIDATE_REGEXP 校验学号必须是 10 位数字。',
            'code' => <<<'CODE'
$pattern = [ "options" => [ "regexp" => [[1]] ]];
$sid = filter_input(INPUT_POST, 'studentID', [[2]], $pattern);
if (empty($sid)) {
    $errors['studentID'] = 'ID should be ten digit number';
}
CODE,
            'blanks' => [
                1 => [
                    'answer' => '"/^\d{10}$/"',
                    'accepted' => ['"/^\d{10}$/"', "'/^\\d{10}$/'"],
                    'hint' => '^ 开头，\d{10} 十个数字，$ 结尾。',
                    'explain' => '正则写在 options 的 regexp 键里。^ 和 $ 保证"整串正好十个数字"，不能多也不能少。',
                ],
                2 => [
                    'answer' => 'FILTER_VALIDATE_REGEXP',
                    'hint' => 'VALIDATE 系列里的"正则"常量。',
                    'explain' => '第 3 个参数用过滤常量 FILTER_VALIDATE_REGEXP；验证失败返回 false，字段不存在返回 null，empty() 都能覆盖。',
                ],
            ],
            'note' => '作业第 6.b 条就是这个写法。',
        ],

        [
            'id' => 9,
            'title' => '邮箱校验',
            'source' => 'inc/validate_JLi016.inc.php',
            'level' => '基础',
            'prompt' => '邮箱用 PHP 自带的过滤常量校验，不用自己写正则。',
            'code' => <<<'CODE'
$email = filter_input(INPUT_POST, 'email', [[1]]);
if (empty($email)) {
    $errors['email'] = 'Please enter the correct email address';
}
CODE,
            'blanks' => [
                1 => [
                    'answer' => 'FILTER_VALIDATE_EMAIL',
                    'hint' => 'VALIDATE 系列里的"邮箱"常量。',
                    'explain' => '尽量使用 filter 扩展自带的校验器，比手写正则更可靠，也符合作业"用 PHP filter 扩展"的要求。',
                ],
            ],
            'note' => '作业第 6.c 条。',
        ],

        [
            'id' => 10,
            'title' => '学期校验：季节 + 年份范围',
            'source' => 'inc/validate_JLi016.inc.php',
            'level' => '挑战',
            'prompt' => '学期格式必须是 Winter / Summer / Fall 之一，加一个空格，再加 2020–2026 的年份。',
            'code' => <<<'CODE'
$pattern = ["options" => ["regexp" => [[1]]]];
$term = filter_input(INPUT_POST, 'term', FILTER_VALIDATE_REGEXP, $pattern);
if (empty($term)) {
    $errors['term'] = 'Please enter the correct term between Winter 2020 until Fall 2026';
}
CODE,
            'blanks' => [
                1 => [
                    'answer' => '"/^(Winter|Summer|Fall) 202[0-6]$/"',
                    'hint' => '括号里用 | 表示"或"，年份写成 202[0-6]。',
                    'explain' => '(A|B|C) 表示三选一；202[0-6] 表示 2020 到 2026；^ $ 保证整串完全匹配。注意季节和年份之间是普通空格。',
                ],
            ],
            'note' => '作业第 6.d 条。Fall 2024 通过，Winter 2027 不通过。',
        ],

        [
            'id' => 11,
            'title' => 'foreach 的替代语法（混排 HTML）',
            'source' => '03_button_links.php',
            'level' => '进阶',
            'prompt' => '在 HTML 里循环输出列表时，用冒号写法比大括号更好读。请补上结束语句。',
            'code' => <<<'CODE'
<?php foreach ($items as $item): ?>
    <div><?= $item['desc'] ?></div>
<?php [[1]]; ?>
CODE,
            'blanks' => [
                1 => [
                    'answer' => 'endforeach',
                    'hint' => '就是 foreach 前面加 end。',
                    'explain' => '替代语法：foreach(...): ... endforeach;，if(...): ... endif;。分号不能少。',
                ],
            ],
            'note' => 'inc/page_JLi016.inc.php 里显示下拉框、复选框用的也是这套写法。',
        ],

        [
            'id' => 12,
            'title' => '粘性表单：回填用户已填的值',
            'source' => 'inc/form.php',
            'level' => '基础',
            'prompt' => '校验失败后重新显示表单时，要把用户刚才输入的内容回填，避免重新输入。',
            'code' => <<<'CODE'
Product code: <input name="productCode" value="<?= [[1]] ?>">
<p>Price: <input name="price" value="<?= $price ?>"></p>
CODE,
            'blanks' => [
                1 => [
                    'answer' => '$productCode',
                    'hint' => '和上面同色的那个变量名。',
                    'explain' => "<?= ?> 是 <?php echo ?> 的简写；把变量放进 value 属性，表单就是\"粘性\"的。",
                ],
            ],
            'note' => '作业同样要求：selected / checked 也要按提交结果保持选中状态。',
        ],

        [
            'id' => 13,
            'title' => '引入文件（避免重复定义）',
            'source' => 'assign2_JLi016.php',
            'level' => '基础',
            'prompt' => '控制器要把 inc 目录里的函数库读进来，并且保证不会重复引入导致"函数已定义"错误。',
            'code' => <<<'CODE'
[[1]] 'inc/utility_JLi016.inc.php';
[[2]] 'inc/validate_JLi016.inc.php';
CODE,
            'blanks' => [
                1 => [
                    'answer' => 'require_once',
                    'hint' => 'require 加上下划线 once。',
                    'explain' => 'require_once 保证同一文件只引入一次；与 require 的区别是重复引入不会报错。',
                ],
                2 => [
                    'answer' => 'require_once',
                    'hint' => '和上一行同一个关键字。',
                    'explain' => '同理，第二个函数库也用 require_once 引入。',
                ],
            ],
            'note' => 'include 出错只警告并继续，require 出错会终止脚本——函数库通常用 require。',
        ],

        [
            'id' => 14,
            'title' => '安全的引入路径',
            'source' => 'inc/validate_JLi016.inc.php',
            'level' => '进阶',
            'prompt' => '在函数库内部再引入另一个函数库时，用相对路径会因为"当前工作目录"变化而失效。请换成魔法常量。',
            'code' => <<<'CODE'
require_once [[1]] . '/utility_JLi016.inc.php';
CODE,
            'blanks' => [
                1 => [
                    'answer' => '__DIR__',
                    'hint' => '两个下划线开头结尾，表示"当前文件所在目录"。',
                    'explain' => '__DIR__ 永远指向当前 PHP 文件所在的目录，不受运行目录影响，比 \'../inc/\' 这类相对路径稳。',
                ],
            ],
            'note' => '排查"Call to undefined function"时，先确认 include 路径是否正确。',
        ],
    ];
}

/**
 * 按编号取一道题，找不到返回 null
 */
function getExercise(int $id): ?array
{
    foreach (getExercises() as $exercise) {
        if ($exercise['id'] === $id) {
            return $exercise;
        }
    }
    return null;
}

/**
 * 题目总数
 */
function countExercises(): int
{
    return count(getExercises());
}
