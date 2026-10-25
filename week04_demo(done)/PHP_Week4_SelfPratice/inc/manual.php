<?php
/**
 * 说明书数据：week04_demo(done) 全部源文件的「原文逐步手打教程」。
 *
 * 一个章节 = 一个源文件，字段含义：
 *   key      章节唯一标识（URL ?c= 用）
 *   file     原始文件名（对应 week04_demo(done) 里的真实文件）
 *   group    所属知识点
 *   title    章节标题
 *   goal     这一章要解决的问题
 *   run      怎么运行 / 会看到什么
 *   notice   易错提醒（可选）
 *   terms    左栏显示区内容：本章出现的变量、函数、属性、关键字的含义
 *   steps    按原文顺序切分的步骤：
 *              title   步骤标题
 *              code    原文代码（nowdoc 原样保留，含原文件自带注释）
 *              why     为什么要写这一步（触发这一步的原因）
 *              purpose 这一步的用意 / 设计目的
 *
 * 所有 code 片段按步骤顺序拼接，就是该文件的完整原文，可以照着从头手打一遍。
 */

/**
 * 返回全部章节（按 01 → 06 → inc 的教材顺序）
 */
function getManualChapters(): array
{
    return [
        // ============================= 01 混合请求 =============================
        [
            'key'   => '01-mixed-html',
            'file'  => '01_mixed_request.html',
            'group' => '01 混合请求：GET + POST 同时存在',
            'title' => '编辑电影表单（HTML 入口页面）',
            'goal'  => '做一个能填 Title / Price 的表单，提交时把「页面写死的 id」和「用户填写的字段」一起送给 PHP。',
            'run'   => '访问 http://localhost:8000/week04/01_mixed_request.html，填完点提交，跳到 01_mixed_request_process.php。',
            'terms' => [
                ['name' => '<!doctype html>', 'kind' => '文档声明', 'desc' => '告诉浏览器按 HTML5 标准解析，缺了它浏览器可能进入怪异模式，样式会变形。'],
                ['name' => 'method="POST"', 'kind' => 'form 属性', 'desc' => '决定表单字段走「请求体（POST）」。数据不会出现在地址栏，适合隐私字段。'],
                ['name' => 'action="/week04/01_mixed_request_process.php?id=1022"', 'kind' => 'form 属性', 'desc' => '提交目标地址。前面的路径是处理脚本，后面的 ?id=1022 是查询字符串。'],
                ['name' => '?id=1022', 'kind' => '查询字符串（query string）', 'desc' => 'URL 里 ? 后面的部分，属于 GET 数据。即使表单是 POST，这部分依然会按 GET 传给服务端。'],
                ['name' => 'name="title" / name="price"', 'kind' => 'input 属性', 'desc' => '提交到服务端的「键名」。PHP 端靠这个名字取值；不写 name 的字段根本不会提交。'],
                ['name' => 'id="title"', 'kind' => 'input 属性', 'desc' => '页面内的唯一标识，供 <label for="..."> 关联使用，和提交数据无关。'],
                ['name' => 'for="title"', 'kind' => 'label 属性', 'desc' => '与 input 的 id 配对：点文字即可聚焦输入框，提升可访问性与点击区域。'],
                ['name' => '<input type="submit">', 'kind' => '控件', 'desc' => '提交按钮。不写 type 时默认就是 submit，点击后把整个表单发往 action。'],
                ['name' => '<br>', 'kind' => '标签', 'desc' => '换行。本例用它做最朴素的排版，后续示例改用 Bootstrap 的栅格类。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：页面骨架与标题',
                    'code'  => <<<'CODE'
<!doctype html><html><head><title>Movie Form 1</title></head><body>
    <h1>Edit movie</h1>
CODE,
                    'why'     => '浏览器只认识 HTML。要收集用户输入，第一步必须先有一个能被打开的页面，所以先写文档声明、html/head/body 骨架和标题。',
                    'purpose' => '确定页面身份（标题 Movie Form 1）与用途（Edit movie）。骨架写错（例如漏了 </body>）后面的表单行为就会变得不可预测。',
                ],
                [
                    'title' => '第 2 步：写 <form>，同时埋下 GET 数据',
                    'code'  => <<<'CODE'
    <!-- method="POST"：表单字段（title、price）通过 POST 请求体提交，不会出现在 URL 中
         action 里的 ?id=1022 属于 URL 查询字符串，会以 GET 方式传给处理脚本
         因此处理脚本可以同时用 INPUT_POST 和 INPUT_GET 读取数据（混合请求） -->
    <form method="POST" action="/week04/01_mixed_request_process.php?id=1022">
CODE,
                    'why'     => '需要指定「数据交给谁、怎么交」。method 选 POST 是因为 title/price 是用户输入，不该暴露在地址栏；而 id=1022 是页面自身就知道的信息（例如正在编辑哪一条记录），这类信息习惯上直接放在 URL 上。',
                    'purpose' => '制造本例的核心场景：同一个请求里既有 POST 数据又有 GET 数据。这样下一章才能演示「PHP 端必须分开取」。',
                ],
                [
                    'title' => '第 3 步：第一个输入项 Title',
                    'code'  => <<<'CODE'
        <!-- label 的 for 与 input 的 id 对应：点击文字即可聚焦到输入框（可访问性） -->
        <label for="title">Title: </label><input name="title" id="title">
        <br>
CODE,
                    'why'     => '需要一个让用户输入标题的控件。只有带 name 的 input 才会被提交，所以 name="title" 是本步的关键。',
                    'purpose' => '建立「页面字段名 → 服务端变量名」的对应关系：这里写 name="title"，PHP 端就要用 \'title\' 去取。label+id 的配对则让鼠标点击更友好。',
                ],
                [
                    'title' => '第 4 步：第二个输入项 Price',
                    'code'  => <<<'CODE'
        <label for="price">Price: </label><input name="price" id="price">
        <br>
CODE,
                    'why'     => '表单要收集两个字段，照同样套路再写一个输入框：同样的 label+id 配对，同样的 name 必填。',
                    'purpose' => '形成「一对 name/value」的重复结构。你会看到表单里有多少个带 name 的控件，服务端就能取到多少个值。',
                ],
                [
                    'title' => '第 5 步：提交按钮与收尾标签',
                    'code'  => <<<'CODE'
        <!-- 提交按钮：默认 type="submit"，点击后把表单发往 action 指定的地址 -->
        <input type="submit">
    </form>
    </body>
</html>
CODE,
                    'why'     => '表单必须有「触发者」，否则用户填完无从提交；</form> 决定哪些控件属于这个表单，漏写会导致提交行为异常。',
                    'purpose' => '把前面所有带 name 的字段打包成一个请求发出去，并正确闭合 HTML 文档，保证浏览器解析无误。',
                ],
            ],
        ],

        [
            'key'   => '01-mixed-process',
            'file'  => '01_mixed_request_process.php',
            'group' => '01 混合请求：GET + POST 同时存在',
            'title' => '混合请求处理脚本（逻辑 + 模板两段式）',
            'goal'  => '从同一个请求里分别取出 GET 的 id 和 POST 的 title / price，并把它们显示出来。',
            'run'   => '不要直接访问，由 01_mixed_request.html 提交后跳转过来，页面显示 id / title / price 三行。',
            'notice' => '这个文件是「处理脚本」，单独在地址栏打开也能跑，但 id、title、price 都取不到值（显示为空），因为没有数据传进来。',
            'terms' => [
                ['name' => '<?php ... ?>', 'kind' => 'PHP 标记', 'desc' => '进入 / 退出 PHP 模式。标记外的内容原样输出给浏览器。'],
                ['name' => 'filter_input()', 'kind' => 'PHP 函数', 'desc' => '从指定来源（GET/POST/COOKIE 等）读取变量并可选过滤。比直接 $_GET / $_POST 安全。'],
                ['name' => 'INPUT_GET', 'kind' => '常量', 'desc' => 'filter_input 的第一个参数之一，表示「从 URL 查询字符串里取」。'],
                ['name' => 'INPUT_POST', 'kind' => '常量', 'desc' => 'filter_input 的第一个参数之一，表示「从 POST 请求体里取」。'],
                ['name' => '$id', 'kind' => '变量', 'desc' => '保存 URL 上 ?id=1022 的值，属于 GET 数据。'],
                ['name' => '$title / $price', 'kind' => '变量', 'desc' => '保存表单里用户填写的字段，属于 POST 数据。'],
                ['name' => '<?= $id ?>', 'kind' => '短输出标记', 'desc' => '<?php echo $id; ?> 的简写，把变量的值输出到 HTML 里。'],
                ['name' => 'LOGIC / VIEW', 'kind' => '代码分层', 'desc' => '先取数据（逻辑）、再输出 HTML（模板）。两段分开，改样式时不会动到取数据的代码。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：进入 PHP 模式，划出「逻辑区」',
                    'code'  => <<<'CODE'
<?php
// ---- (1) 逻辑处理（LOGIC）：先取数据，再交给下面的模板显示 -----

CODE,
                    'why'     => '处理脚本要做的第一件事是「把数据取到手」，而不是急着输出 HTML。所以文件一开头就进入 PHP 模式，并用注释划出逻辑区。',
                    'purpose' => '建立「先逻辑、后模板」的书写顺序：取数据 → 存进变量 → 最后才输出。这是所有 PHP 页面最通用的骨架。',
                ],
                [
                    'title' => '第 2 步：用 INPUT_GET 取 URL 上的 id',
                    'code'  => <<<'CODE'
// filter_input(INPUT_GET, 'id')
//   从 URL 查询字符串（query string）里读取名为 id 的参数。
//   对应表单 action="/...process.php?id=1022" 中 ?id=1022 这部分。
//   filter_input 会对输入做过滤/净化，比直接 $_GET['id'] 更安全。
//   若参数不存在则返回 null（或 false，取决于版本）。
$id = filter_input(INPUT_GET,'id');
CODE,
                    'why'     => 'id 写在 action 的查询字符串里，它不属于表单字段，只存在于 URL，因此必须明确告诉 PHP「去 GET 里找」。',
                    'purpose' => '演示数据来源要「指名道姓」。用 filter_input 而不是 $_GET，是养成过滤输入的习惯，避免把未处理的用户数据直接往下传。',
                ],
                [
                    'title' => '第 3 步：用 INPUT_POST 取表单字段 title',
                    'code'  => <<<'CODE'

// 从 POST 请求体里读取 title（表单里 name="title" 的输入框）
$title = filter_input(INPUT_POST,'title');
CODE,
                    'why'     => 'title 是表单里 name="title" 的输入框，走的是 POST 请求体，在 URL 里找不到它。',
                    'purpose' => '与第 2 步形成对照：同一个请求里，取值的「来源参数」不同。第二个参数 \'title\' 必须和 HTML 里的 name 一模一样。',
                ],
                [
                    'title' => '第 4 步：用 INPUT_POST 取表单字段 price',
                    'code'  => <<<'CODE'

// 从 POST 请求体里读取 price（表单里 name="price" 的输入框）
$price = filter_input(INPUT_POST,'price');
CODE,
                    'why'     => 'price 同理走 POST，需要单独取一次。filter_input 一次只能取一个变量，所以每个字段都要写一行。',
                    'purpose' => '把需要的字段一个不漏地取出来。漏取就等于用户白填，后面的模板也就没东西可显示。',
                ],
                [
                    'title' => '第 5 步：说明「混合请求」，关闭 PHP 模式',
                    'code'  => <<<'CODE'

// 注意：同一个 HTTP 请求可以同时带 GET 和 POST 数据，
// 这就是本例"混合请求（mixed request）"的含义。

?>
CODE,
                    'why'     => '前面三行分别用了两个不同的来源，看起来矛盾，其实正是本例要讲的点，所以用注释点明。取完数据后退出 PHP 模式，接下来是纯 HTML。',
                    'purpose' => '把「逻辑区」和「模板区」明确断开。?> 之后的内容会被原样发给浏览器，不再当作 PHP 执行。',
                ],
                [
                    'title' => '第 6 步：HTML 模板，把变量显示出来',
                    'code'  => <<<'CODE'

<!-- (2) HTML 模板（VIEW）：只负责把上面取到的变量显示出来 -->
 <!doctype html>
 <html>
    <head>
        <title>PHP processor</title>
    </head>
    <body>
        <!-- 这里的 ?= 标签是 echo 的简写，用于把变量的值输出到页面 -->
        id = <?= $id ?> <br>
        title = <?= $title ?> <br>
        price = <?= $price ?> <br>

    </body>
 </html>
CODE,
                    'why'     => '数据取到了要有地方展示，否则无法验证取得对不对。模板里只做一件事：把变量插进 HTML。',
                    'purpose' => '演示 <?= ?> 短输出标记的写法，以及「模板不负责取数据」的分层思想 —— 模板里看不到任何 filter_input，只有变量。',
                ],
            ],
        ],

        // ============================= 02 多个提交按钮 =============================
        [
            'key'   => '02-buttons-html',
            'file'  => '02_multiple_buttons.html',
            'group' => '02 多个提交按钮：区分用户点了哪个',
            'title' => '租片付款表单（两个 submit 按钮）',
            'goal'  => '一个表单放两个提交按钮，让用户选择「立即观看」还是「稍后观看」。',
            'run'   => '访问 http://localhost:8000/week04/02_multiple_buttons.html，填信用卡信息，分别点两个绿色按钮各试一次。',
            'terms' => [
                ['name' => 'Bootstrap CDN', 'kind' => '<link> 引入', 'desc' => '从 CDN 加载现成 CSS，不必自己写样式，直接用 btn / container 等类名。'],
                ['name' => 'class="container"', 'kind' => 'Bootstrap 类', 'desc' => '给 body 一个居中的固定宽度容器，页面不会贴边。'],
                ['name' => 'name="number" / "date" / "ccv"', 'kind' => 'input 属性', 'desc' => '信用卡号、有效期、CCV 的提交键名。这些是敏感信息，所以整个表单用 POST。'],
                ['name' => 'name="watchNow"', 'kind' => 'submit 属性', 'desc' => '第一个提交按钮的名字。只有被点击的按钮才会提交自己的 name/value。'],
                ['name' => 'name="watchLater"', 'kind' => 'submit 属性', 'desc' => '第二个提交按钮的名字，与 watchNow 互斥地出现。'],
                ['name' => 'value="Pay and start watching now"', 'kind' => 'submit 属性', 'desc' => '既是按钮上显示的文字，也是提交时一并发送的值。'],
                ['name' => 'class="btn btn-success"', 'kind' => 'Bootstrap 类', 'desc' => 'btn 做成按钮外观，btn-success 是绿色（表示「确认/成功」语义）。'],
                ['name' => 'movieId=80441', 'kind' => '查询字符串', 'desc' => '又是 GET 数据：告诉服务端租的是哪部电影，与 01 的 ?id=1022 同一套路。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：引入 Bootstrap 样式',
                    'code'  => <<<'CODE'
<!doctype html><html><head><title>Movie Rent Form 1</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    >
</head>
CODE,
                    'why'     => '这一页要做出「两个像样的按钮」，自己写 CSS 太啰嗦，直接引入现成的 Bootstrap 样式表最省事。',
                    'purpose' => '让示例专注于 PHP 逻辑而不是排版。后面只要加 class="btn btn-success" 就能得到绿色按钮。',
                ],
                [
                    'title' => '第 2 步：容器、标题与表单首行',
                    'code'  => <<<'CODE'
<body class="container">
<h1>Rent movie</h1>
<!-- 表单以 POST 提交，movieId 通过 URL 查询字符串传递 -->
<form method="POST" action="/week04/02_multiple_process.php?movieId=80441">
CODE,
                    'why'     => '信用卡信息绝不能出现在地址栏（会被浏览器历史、书签记录），所以 method 必须是 POST；而电影 id 属于定位信息，继续放在 URL 上。',
                    'purpose' => '再次巩固「同一个请求可以同时有 GET 和 POST」，同时体现 POST 适合敏感数据这一取舍原则。',
                ],
                [
                    'title' => '第 3 步：三个信用卡输入项',
                    'code'  => <<<'CODE'
    <p><label for="number">Credit card number:</label>
        <input name="number" id="number"></p>
    <p><label for="date">
            Expiry date:</label>
        <input name="date" id="date"></p>
    <p><label for="ccv">
            CCV code:</label>
        <input name="ccv" id="ccv"></p>
CODE,
                    'why'     => '付款需要三项信息，每项都要能提交，所以每项都必须有 name；同时配上 label/for 便于点击。',
                    'purpose' => '展示表单字段的批量写法：结构完全重复，只是 name 不同。服务端将来就靠这三个 name 取值。',
                ],
                [
                    'title' => '第 4 步：两个提交按钮（本章核心）',
                    'code'  => <<<'CODE'
    <p>
        <!-- 多个提交按钮的关键：只有"被点击的那个"按钮的 name/value 会被提交，
             其它按钮不会提交。因此服务端只要判断哪个 name 存在，
             就知道用户点了哪个按钮。value 是按钮上显示的文字，也会一并提交。 -->
        <input type="submit" name="watchNow"
               value="Pay and start watching now" class="btn btn-success">
        <input type="submit" name="watchLater"
               value="Pay and watch later" class="btn btn-success">
        <!-- class="btn btn-success" 是 Bootstrap 的按钮样式（绿色） -->
    </p>
CODE,
                    'why'     => '用户有两个不同的意图，但表单只能提交一次。解决办法是：给每个按钮一个不同的 name，谁被点，谁的名字才会出现在请求里。',
                    'purpose' => '把「用户意图」编码进请求数据。服务端不需要猜，只要检查哪个 name 存在即可分分支 —— 这是多按钮表单的标准做法。',
                ],
                [
                    'title' => '第 5 步：闭合表单与页面',
                    'code'  => <<<'CODE'
</form>
</body>
</html>
CODE,
                    'why'     => '两个按钮都写在 <form> 内部，才会被这个表单收集；闭合标签保证结构合法。',
                    'purpose' => '强调「按钮必须在表单内」这个前提：放在 form 外的按钮不会带任何数据。',
                ],
            ],
        ],

        [
            'key'   => '02-buttons-process',
            'file'  => '02_multiple_process.php',
            'group' => '02 多个提交按钮：区分用户点了哪个',
            'title' => '判断点了哪个按钮（filter_has_var）',
            'goal'  => '根据请求里出现的按钮名字，走不同的分支并输出不同结果。',
            'run'   => '由 02_multiple_buttons.html 提交后调用：点第一个按钮显示 You selected WatchNow，点第二个显示 You selected WatchLater。',
            'terms' => [
                ['name' => 'filter_has_var()', 'kind' => 'PHP 函数', 'desc' => '判断某个来源（这里是 INPUT_POST）里是否存在指定名字的变量，返回 true / false。'],
                ['name' => "'watchNow'", 'kind' => '字符串参数', 'desc' => '要检查的变量名，必须和按钮的 name 完全一致，区分大小写。'],
                ['name' => 'print', 'kind' => 'PHP 语句', 'desc' => '输出字符串（echo 的近亲），这里直接把结果打印成页面正文。'],
                ['name' => 'if / else', 'kind' => '控制结构', 'desc' => '二选一分支：条件成立走 WatchNow，否则走 WatchLater。'],
                ['name' => 'isset($_POST[\'watchNow\'])', 'kind' => '等价写法', 'desc' => '判断按钮是否被点击的另一种常见写法，效果与 filter_has_var 相同。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：判断 watchNow 是否存在，成立则输出 WatchNow',
                    'code'  => <<<'CODE'
<?php
// filter_has_var(INPUT_POST, 'watchNow')
//   判断 POST 请求中是否存在名为 watchNow 的变量。
//   因为只有被点击的提交按钮才会把自己的 name 提交上来，
//   所以"存在 watchNow"就等价于"用户点了 WatchNow 按钮"。
if(filter_has_var(INPUT_POST, 'watchNow')){
    print 'You selected WatchNow';
}
CODE,
                    'why'     => '用户点了哪个按钮，只有请求数据能告诉我们。watchNow 出现 ⇒ 点击来源就是它，于是走「立即观看」分支。',
                    'purpose' => '用「变量是否存在」代替「判断 value 等于什么」，代码更短也更稳（value 可能因为翻译、改文案而变，name 不会随便变）。',
                ],
                [
                    'title' => '第 2 步：否则就是点了另一个按钮',
                    'code'  => <<<'CODE'
else{
    // 否则说明提交来自另一个按钮（watchLater）
    print 'You selected WatchLater';
}
CODE,
                    'why'     => '本例只有两个按钮，排除了 watchNow，剩下的就只可能是 watchLater，所以不需要再判断一次。',
                    'purpose' => '展示最小可用的二分支写法；注释也提醒你：按钮变多时这种「else 兜底」就不够严谨了。',
                ],
                [
                    'title' => '第 3 步：补充说明等价写法',
                    'code'  => <<<'CODE'

// 补充：也可以用 isset($_POST['watchNow']) 达到同样效果。
// 更严谨的写法是先检查 watchLater 是否真的存在，再判断两者都不存在的情况。
CODE,
                    'why'     => '课堂示例故意保持最简，但真实项目里可能两个按钮都不存在（例如用户直接访问本页），此时会误报 WatchLater。',
                    'purpose' => '留下改进方向：把 else 换成 elseif(filter_has_var(...,\'watchLater\'))，再加一个「都不存在」的默认分支，逻辑才真正完备。',
                ],
            ],
        ],

        // ============================= 03 用链接当按钮 =============================
        [
            'key'   => '03-button-links',
            'file'  => '03_button_links.php',
            'group' => '03 用链接当按钮：把数据放进 URL',
            'title' => '购物篮列表（数组循环 + 链接传 id）',
            'goal'  => '不用表单也能传数据：用 PHP 数组循环生成商品列表，每行用超链接把 id 拼进 URL。',
            'run'   => '直接访问 http://localhost:8000/week04/03_button_links.php。悬停 Details 按钮可在浏览器左下角看到 /show.php?id=123。',
            'notice' => '课堂演示里 /show.php 这个文件并未提供，点 Details 会 404，这是正常现象，重点看 URL 长什么样。',
            'terms' => [
                ['name' => '$items', 'kind' => '变量（二维数组）', 'desc' => '数据源。每个元素是一条关联数组，代表一件商品；真实项目里通常来自数据库查询结果。'],
                ['name' => "'id' / 'desc' / 'price'", 'kind' => '数组键名', 'desc' => '一条商品的字段：编号、描述、价格。用 $item[\'desc\'] 这样的写法取值。'],
                ['name' => 'foreach(...):', 'kind' => '循环（替代语法）', 'desc' => '冒号开头的循环写法，配合 endforeach 收尾；混排 HTML 时比大括号更好读。'],
                ['name' => '$item', 'kind' => '循环变量', 'desc' => '每一轮代表当前这一件商品（一条关联数组）。'],
                ['name' => 'endforeach;', 'kind' => '循环结束', 'desc' => '替代语法的收尾标记，别忘了分号，漏写会报语法错误。'],
                ['name' => '<a href="/show.php?id=...">', 'kind' => '超链接', 'desc' => '把 id 拼进查询字符串，点击即以 GET 方式请求详情页面。'],
                ['name' => 'class="btn btn-primary"', 'kind' => 'Bootstrap 类', 'desc' => '把 <a> 打扮成蓝色主按钮的外观，看起来像按钮但本质是链接。'],
                ['name' => 'col-lg-3 / text-end / py-2', 'kind' => 'Bootstrap 工具类', 'desc' => '栅格宽度、文字右对齐、上下内边距，纯排版用。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：准备数据源（二维数组）',
                    'code'  => <<<'CODE'
<?php
// 准备数据源：一个"二维数组"，每个元素是一条关联数组（表示一件商品）
// 真实项目中这些数据通常来自数据库查询结果
$items = [
    ['id'=>123, 'desc' => 'Hammer', 'price'=>9.99],
    ['id'=>234, 'desc' => 'A bucket of nails', 'price'=>19.99]
];
?>
CODE,
                    'why'     => '页面要显示多行商品，最省事的写法是先把数据放进数组，再交给模板去循环。写死数组是为了让示例不依赖数据库。',
                    'purpose' => '把「数据」和「显示」分开：将来把 $items 换成数据库查询结果，模板部分一行都不用改。这就是数据驱动页面的雏形。',
                ],
                [
                    'title' => '第 2 步：HTML 头部与 Bootstrap',
                    'code'  => <<<'CODE'

<!doctype html><html><head><title>Basket From Array</title>
    <!-- 引入 Bootstrap CDN 样式，让按钮等元素有现成外观 -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    >
</head>
CODE,
                    'why'     => '数据准备好后要渲染成页面，先写 HTML 头部并引入样式，让列表和按钮有现成外观。',
                    'purpose' => '延续「先 PHP 数据、后 HTML 模板」的顺序，同时保持视觉一致（沿用 Bootstrap）。',
                ],
                [
                    'title' => '第 3 步：页面标题与 foreach 循环开始',
                    'code'  => <<<'CODE'
<body class="container">
<h1>Your shopping basket</h1>
<!-- foreach 的替代语法（冒号 + endforeach）：在混排 HTML 时比大括号更易读
     循环 $items，每次把当前元素赋给 $item -->
<?php foreach($items as $item): ?>
CODE,
                    'why'     => '商品数量不固定，不能把每行 HTML 抄两遍，必须用循环生成。混排 HTML 时用冒号语法，可读性远好于花括号。',
                    'purpose' => '演示 foreach 的替代语法：<?php foreach(...): ?> ... <?php endforeach; ?>。循环体内的普通 HTML 会被重复输出。',
                ],
                [
                    'title' => '第 4 步：循环体内输出商品名与价格',
                    'code'  => <<<'CODE'
    <!-- col-lg-3 / text-end / py-2 都是 Bootstrap 的栅格与间距工具类 -->
    <div class="col-lg-3 text-end py-2">
        <?= $item['desc'] ?>
        <?= $item['price'] ?>
CODE,
                    'why'     => '每件商品都要显示描述和价格，值来自当前这一轮的 $item 关联数组，所以用 $item[\'desc\']、$item[\'price\'] 取值。',
                    'purpose' => '把「数组的键」映射到「页面上的内容」。外层 div 只负责排版，一行代码对应一个字段，清楚好改。',
                ],
                [
                    'title' => '第 5 步：用超链接把 id 拼进 URL（本章核心）',
                    'code'  => <<<'CODE'
        <!-- 用超链接充当"按钮"：把商品 id 拼进 URL 的查询字符串，
             点击后以 GET 方式请求 /show.php?id=xxx，服务端再按 id 查询详情 -->
        <a href="/show.php?id=<?= $item['id'] ?>" class="btn btn-primary">Details</a>
    </div>
CODE,
                    'why'     => '想从列表跳到详情页，就必须把「是哪一件商品」告诉下一个页面。超链接 + 查询字符串是最轻量的办法，连表单都不需要。',
                    'purpose' => '展示 GET 传参的典型场景：读详情用链接（GET），改数据才用表单（POST）。<?= $item[\'id\'] ?> 说明 PHP 可以嵌在 HTML 属性里输出。',
                ],
                [
                    'title' => '第 6 步：结束循环并闭合页面',
                    'code'  => <<<'CODE'
<?php endforeach; ?>
</body>
</html>
CODE,
                    'why'     => '有 foreach 就必须有 endforeach，否则语法错误；HTML 标签也要一一闭合。',
                    'purpose' => '收尾，保证两件商品各自输出一个 div。注意 endforeach 后面要带分号。',
                ],
            ],
        ],

        // ============================= 04 复选框数组 =============================
        [
            'key'   => '04-checkboxes-html',
            'file'  => '04_checkboxes_array.html',
            'group' => '04 复选框数组：一个字段提交多个值',
            'title' => '披萨配料多选表单（name 带方括号）',
            'goal'  => '让用户勾选任意多个配料，并且提交后服务端能一次收到「一组值」而不是最后一个。',
            'run'   => '访问 http://localhost:8000/week04/04_checkboxes_array.html，勾选后提交；也可以一个都不勾直接提交。',
            'terms' => [
                ['name' => 'method="GET"', 'kind' => 'form 属性', 'desc' => '本例故意用 GET，好让你在地址栏直接看到提交后的样子：?toppings[]=olives&toppings[]=pepper。'],
                ['name' => 'name="toppings[]"', 'kind' => 'input 属性（重点）', 'desc' => '方括号告诉浏览器「这个字段是数组」，PHP 端才会收到数组；不加 [] 同名只会保留最后一个值。'],
                ['name' => 'value="olives"', 'kind' => 'input 属性', 'desc' => '勾选后真正提交的值。显示给用户看的文字（Olives）与提交的值可以不同。'],
                ['name' => '<label> 包裹 <input>', 'kind' => '标签用法', 'desc' => '把 input 放进 label 里，点文字等于点选框，不需要 for/id 配对。'],
                ['name' => 'type="checkbox"', 'kind' => '控件类型', 'desc' => '复选框。未勾选的复选框根本不会出现在提交数据中（这点与文本框不同）。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：头部与 Bootstrap',
                    'code'  => <<<'CODE'
<!doctype html><html><head><title>Checkboxes array</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    >
</head>
CODE,
                    'why'     => '和前面几页一样，先写页面骨架并引入 Bootstrap，把注意力留给表单本身。',
                    'purpose' => '保持示例风格统一，也说明「页面结构」这部分是每页都一样的固定套路。',
                ],
                [
                    'title' => '第 2 步：表单首行（method 用 GET 便于观察）',
                    'code'  => <<<'CODE'
<body class="container">
<h1>Extra pizza toppings</h1>
<!-- method="GET"：提交后数据会显示在 URL 查询字符串中，例如
     .../04_checkboxes_process.php?toppings[]=olives&toppings[]=pepper -->
<form method="GET" action="/week04/04_checkboxes_process.php">
CODE,
                    'why'     => '这一章要讲清楚「多个值是怎么传的」，用 GET 提交后地址栏会原样显示数组参数，看得见才学得明白。',
                    'purpose' => '让提交结果可视化：你会看到 toppings[] 出现多次。真实项目里多选表单通常用 POST，但取值方式完全一样。',
                ],
                [
                    'title' => '第 3 步：三个共用同一名字的复选框（本章核心）',
                    'code'  => <<<'CODE'
    <p><label>
            <!-- 多个复选框共用同一个名字 toppings[]（方括号表示"这个字段是数组"）：
                 勾选了哪几个，PHP 端就会收到一个包含对应 value 的数组。
                 若不加 []，同名只会保留最后一个值。 -->
            <input type="checkbox" name="toppings[]" value="olives"> Olives
        </label></p>
    <p><label>
            <input type="checkbox" name="toppings[]" value="pepper"> Pepper
        </label></p>
    <p><label>
            <input type="checkbox" name="toppings[]" value="garlic"> Garlic salt
        </label></p>
CODE,
                    'why'     => '三个配料是「同一类数据」，必须让它们属于同一个字段，服务端才好当成一组来处理。名字相同还不够，必须加 [] 才会变成数组。',
                    'purpose' => '这是本章的关键技巧：name="toppings[]"。方括号是给 PHP 的暗号，表示「请把同名的值收集成数组」。label 包住 input 则省去 for/id 配对。',
                ],
                [
                    'title' => '第 4 步：提交按钮与收尾',
                    'code'  => <<<'CODE'
    <p><input type="submit" class="btn btn-primary"></p>
</form>
</body>
</html>
CODE,
                    'why'     => '需要触发提交，并把三个复选框都包在 <form> 内才会被一起发送。',
                    'purpose' => '闭合页面。注意：一个都不勾时，请求里根本没有 toppings 这个参数 —— 这正是下一章要处理的边界情况。',
                ],
            ],
        ],

        [
            'key'   => '04-checkboxes-process',
            'file'  => '04_checkboxes_process.php',
            'group' => '04 复选框数组：一个字段提交多个值',
            'title' => '读取数组型字段（FILTER_REQUIRE_ARRAY）',
            'goal'  => '把提交过来的一组配料读成 PHP 数组，判断有没有选，并拼成一句提示。',
            'run'   => '由 04_checkboxes_array.html 提交后调用：勾选显示 Your selected toppings are: olives+garlic，一个都不勾显示 Please select a topping。',
            'terms' => [
                ['name' => 'FILTER_REQUIRE_ARRAY', 'kind' => '过滤选项常量', 'desc' => '要求读取结果必须是数组；传来的是标量就返回 false，避免把字符串当数组用而报错。'],
                ['name' => 'options:', 'kind' => '命名参数（PHP 8）', 'desc' => 'filter_input 的第四个参数名，写成 options: 值，可以跳过前面的参数。'],
                ['name' => '$toppings', 'kind' => '变量（数组）', 'desc' => '保存勾选结果，例如 [\'olives\', \'garlic\']；一个都没勾时为 null 或 false。'],
                ['name' => 'empty()', 'kind' => 'PHP 函数', 'desc' => '判断是否为空。对 null、false、[] 都返回 true，正好用来判断「一个都没勾」。'],
                ['name' => 'implode()', 'kind' => 'PHP 函数', 'desc' => '把数组用指定分隔符拼成字符串：implode(\'+\', [\'olives\',\'garlic\']) 得到 olives+garlic。'],
                ['name' => '$toppingString', 'kind' => '变量', 'desc' => '拼好的字符串，用来直接插进输出语句。'],
                ['name' => '"... $toppingString"', 'kind' => '双引号字符串', 'desc' => '双引号里的 $变量 会被自动替换成值（变量插值），单引号则不会。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：用 FILTER_REQUIRE_ARRAY 读取 toppings',
                    'code'  => <<<'CODE'
<?php
// 读取 GET 参数 toppings。
// 第三个参数 options: FILTER_REQUIRE_ARRAY 很关键：
//   它告诉 PHP 这个值必须作为数组处理；如果传来的是单个标量（非数组），
//   filter_input 会返回 false，从而避免把字符串当成数组来用。
// 因为表单里是 name="toppings[]"，勾选多项时这里得到的是数组，
// 例如 ['olives', 'pepper']；一个都没勾则为 null 或 false。
$toppings = filter_input(INPUT_GET, 'toppings',options:FILTER_REQUIRE_ARRAY);
CODE,
                    'why'     => '表单用 name="toppings[]" 提交，服务端收到的可能是一组值。如果按普通标量读取，后面 foreach / implode 就会报「不是数组」的错误。',
                    'purpose' => '把「类型约定」写在读取这一步：强制要数组，拿不到就返回 false，让后面的判断有一条统一、安全的路径。',
                ],
                [
                    'title' => '第 2 步：判断是否一个都没勾',
                    'code'  => <<<'CODE'

// empty() 对 null / false / [] 都返回 true，所以这里用来判断"没有勾选任何配料"
if(empty($toppings)){
    print 'Please select a topping';
}
CODE,
                    'why'     => '未勾选的复选框不会出现在请求里，所以「一个都没勾」时 $toppings 是 null/false，而不是空数组。必须先把这种情况挡掉。',
                    'purpose' => '用 empty() 一个函数同时覆盖 null、false、[] 三种「空」的情况，避免漏掉某种边界导致后面的 implode 报错。',
                ],
                [
                    'title' => '第 3 步：有勾选则拼成字符串输出',
                    'code'  => <<<'CODE'
else{
    // implode('+', $数组)：用指定的连接符把数组元素拼成一个字符串
    // 例：['olives','garlic'] => 'olives+garlic'
    $toppingString = implode('+',$toppings);
    // 双引号字符串里可以直接写 $变量，PHP 会自动插值
    print "Your selected toppings are: $toppingString";
}
CODE,
                    'why'     => '数组不能直接当字符串打印（只会得到 Array），要先拼成人类可读的一句话。',
                    'purpose' => '演示 implode 的典型用途，以及双引号字符串的变量插值：一句 print 里直接写 $toppingString 即可，不用拼接符。',
                ],
            ],
        ],

        // ============================= 05 多选列表 =============================
        [
            'key'   => '05-multiple-selection',
            'file'  => '05_multiple_selection.html',
            'group' => '05 多选列表：select multiple',
            'title' => '花卉多选下拉框（select multiple）',
            'goal'  => '用下拉列表实现多选，让所选的多个 option 以数组形式提交。',
            'run'   => '访问 http://localhost:8000/week04/05_multiple_selection.html，按住 Ctrl（macOS 用 Command）点选多个花名后提交。',
            'notice' => '本例 action 指向 05_multiple_process.html，该文件未提供，提交后会 404；请把注意力放在跳转后地址栏的 ?flowers[]=poppy&flowers[]=tulip 上。',
            'terms' => [
                ['name' => '<select>', 'kind' => '控件', 'desc' => '下拉列表。加上 multiple 后可以一次选多项。'],
                ['name' => 'multiple', 'kind' => '布尔属性', 'desc' => '只要出现就生效，表示允许多选（需按住 Ctrl / Command 点选）。'],
                ['name' => 'size="3"', 'kind' => '属性', 'desc' => '一次显示 3 行，而不是只显示一行的小箭头框。'],
                ['name' => 'name="flowers[]"', 'kind' => '属性（重点）', 'desc' => '和复选框同理：方括号让所选的多个 value 以数组形式提交。'],
                ['name' => '<option value="poppy">', 'kind' => '选项', 'desc' => 'value 是提交的值，Poppy 是显示给用户看的文字，两者可以不同。'],
                ['name' => 'class="row" / col-lg-3', 'kind' => 'Bootstrap 类', 'desc' => '把按钮和下拉框排在同一行的栅格里。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：头部与 Bootstrap',
                    'code'  => <<<'CODE'
<!doctype html><html><head><title>Single Selection list</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    >
</head>
CODE,
                    'why'     => '和前面页面一致：骨架 + 样式，保证示例可读。',
                    'purpose' => '保持模板一致，让差异只出现在表单控件本身。',
                ],
                [
                    'title' => '第 2 步：表单首行与栅格行',
                    'code'  => <<<'CODE'
<body class="container">
<h1>Flower selection</h1>
<!-- 注意：action 指向的是 .html 文件，静态 HTML 无法处理表单数据，
     通常应指向 .php 处理脚本（本例仅作演示） -->
<form method="GET" action="05_multiple_process.html">
    <div class="row">
CODE,
                    'why'     => '这一页只演示控件怎么提交数据，没有对应的处理脚本，所以随便指向一个 .html 占位。row 用来把按钮和下拉框放同一行。',
                    'purpose' => '顺带提醒一个常见错误：action 指向 .html 是没用的 —— 静态文件不会执行 PHP，真实项目必须指向 .php。',
                ],
                [
                    'title' => '第 3 步：提交按钮（放在下拉框左侧）',
                    'code'  => <<<'CODE'
        <div class="col-lg-3 text-end py-2">
            <input type="submit" value="Select a flower" class="btn btn-primary">
        </div>
CODE,
                    'why'     => '多选控件本身不会触发提交，仍然需要一个 submit 按钮；value 让它显示成「Select a flower」。',
                    'purpose' => '说明提交按钮的位置不影响功能，只要在 <form> 内即可，排版交给 Bootstrap 栅格。',
                ],
                [
                    'title' => '第 4 步：select multiple（本章核心）',
                    'code'  => <<<'CODE'
        <div class="col-lg-3 text-end py-2">
            <!-- size="3"：下拉框一次显示 3 行；multiple：允许多选
                 name="flowers[]" 的方括号表示提交的是数组，
                 这样用户选中的多个 option 的 value 会一起传到服务端。
                 （多选时通常需要按住 Ctrl / Cmd 键点选） -->
            <select name="flowers[]"
                    class="custom-select"
                    size="3"
                    multiple>
                <option value="poppy">Poppy</option>
                <option value="daisy">Daisy</option>
                <option value="tulip">Tulip</option>
            </select>
        </div>
CODE,
                    'why'     => '选项超过三个、又想节省页面空间时，下拉列表比一排复选框更合适；但它默认只能选一个，所以要加 multiple，并且名字照样要带 []。',
                    'purpose' => '证明「数组字段」与控件类型无关：无论是 checkbox 还是 select，只要 name 带 []，服务端处理方式完全一样（FILTER_REQUIRE_ARRAY + implode）。',
                ],
                [
                    'title' => '第 5 步：闭合标签',
                    'code'  => <<<'CODE'
    </div>
</form>
</body>
</html>
CODE,
                    'why'     => '关闭 row、form、body、html，让页面结构合法。',
                    'purpose' => '养成成对闭合的习惯；结构不合法时浏览器会自行「修补」，导致布局莫名其妙。',
                ],
            ],
        ],

        // ============================= 06 表单校验（单文件版） =============================
        [
            'key'   => '06-no-function',
            'file'  => '06_validation_array_no_function.php',
            'group' => '06 表单校验：同一功能的两种写法',
            'title' => '两字段回传表单（全部逻辑写在一个文件里）',
            'goal'  => '表单提交回自己（postback），校验 Product code 与 Price，出错就在页面上方列出错误，并保持用户已填的值。',
            'run'   => '直接访问 http://localhost:8000/week04/06_validation_array_no_function.php：留空提交 → 粉色错误框；price 填 0 → 通过；都合法 → 只显示 input data was error free。',
            'notice' => '本文件用 require_once \'inc/zeroFunction.php\'，是相对路径，所以必须在 06 这个文件所在的目录下启动服务器，不能单独打开 inc/ 里的文件。',
            'terms' => [
                ['name' => 'require_once', 'kind' => 'PHP 语句', 'desc' => '引入外部文件；_once 保证只引入一次，避免「函数重复定义」致命错误。'],
                ['name' => '$_SERVER[\'REQUEST_METHOD\']', 'kind' => '超全局变量', 'desc' => '当前请求方式，值是 GET 或 POST。用来区分「首次打开」和「提交后」。'],
                ['name' => '$isSubmitted', 'kind' => '变量（布尔）', 'desc' => '表单是否已提交。等于 (请求方式 === \'POST\')。'],
                ['name' => '$productCode / $price', 'kind' => '变量（字符串）', 'desc' => '用户填写的两个字段。默认空字符串，提交后覆盖为用户输入。'],
                ['name' => '$errors', 'kind' => '变量（数组）', 'desc' => '错误收集器。每发现一个问题就 $errors[] 追加一条；空数组代表通过。'],
                ['name' => '$errors[] =', 'kind' => '数组追加写法', 'desc' => '不写下标直接追加到数组末尾，用来一条条累积错误信息。'],
                ['name' => 'isAnEmptyNonZeroString()', 'kind' => '自定义函数', 'desc' => 'inc/zeroFunction.php 提供：判断为空，但把字符串 \'0\' 视作有效值。'],
                ['name' => 'is_numeric()', 'kind' => 'PHP 函数', 'desc' => '判断是否为数字或数字字符串，\'12.5\' 也算数字。'],
                ['name' => 'strlen()', 'kind' => 'PHP 函数', 'desc' => '字符串长度，本例用来要求产品编号至少 3 个字符。'],
                ['name' => '$isValid', 'kind' => '变量（布尔）', 'desc' => '数据是否通过校验，本质就是 empty($errors)。'],
                ['name' => 'die()', 'kind' => 'PHP 语句', 'desc' => '立即终止脚本，后面的 HTML 表单不会再输出。'],
                ['name' => 'postback（回传）', 'kind' => '模式', 'desc' => 'form 不写 action，提交回本页自己；同一个 PHP 文件既显示表单又处理数据。'],
                ['name' => 'sticky form（粘性表单）', 'kind' => '模式', 'desc' => '出错时把用户已填的值回填进 value，避免重填。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：引入辅助函数库',
                    'code'  => <<<'CODE'
<?php

require_once 'inc/zeroFunction.php'; // 引入自定义辅助函数文件
CODE,
                    'why'     => '判断价格是否为空时要用到 isAnEmptyNonZeroString()，它定义在 inc/zeroFunction.php 里，不引入就会报「未定义函数」。',
                    'purpose' => '把可复用的小工具放到 inc/ 目录，主文件只管引入。用 _once 是为了防止重复引入导致函数重定义。',
                ],
                [
                    'title' => '第 2 步：判断表单是否被提交',
                    'code'  => <<<'CODE'

// 判断本次请求是否为 POST（即表单是否被提交）
$isSubmitted = ($_SERVER['REQUEST_METHOD'] === 'POST');
CODE,
                    'why'     => '同一个文件既要「首次显示空表单」又要「处理提交」，必须先知道现在是哪种情况，否则一打开页面就会报「请填写」。',
                    'purpose' => '用请求方式做开关。GET（首次打开）→ 只显示表单；POST（提交）→ 取数据并校验。=== 同时比较值和类型，比 == 严谨。',
                ],
                [
                    'title' => '第 3 步：给所有变量一个默认值',
                    'code'  => <<<'CODE'
$productCode = '';   // 产品编号，默认空字符串
$price = '';         // 价格，默认空字符串
$errors = [];        // 错误信息数组：每发现一个问题就往里追加一条
CODE,
                    'why'     => '首次打开时还没有用户输入，但模板里要输出这两个值；不初始化就会出现「未定义变量」警告，页面顶上出现一堆 Notice。',
                    'purpose' => '保证变量「永远存在」：首次访问是默认值，提交后被覆盖。这也是粘性表单能回填的前提。',
                ],
                [
                    'title' => '第 4 步：提交后才读取用户填写的字段',
                    'code'  => <<<'CODE'

// 与 06_validation_array_controller.php 的区别：
// 本文件把所有逻辑都写在同一个页面里（不使用 validate() / displayForm() 等函数），
// 属于"函数化之前"的写法，便于对比理解。
if ($isSubmitted) {
    // 从 POST 中读取用户填写的字段
    $productCode = filter_input(INPUT_POST, 'productCode');
    $price = filter_input(INPUT_POST, 'price');
CODE,
                    'why'     => '只有提交了才有数据可读。把读取动作放进 if ($isSubmitted) 里，首次访问时就不会去读不存在的 POST 字段。',
                    'purpose' => '体现「逻辑写在一个文件里」的版本：读数据、校验、显示全在这一个页面中，直观但耦合 —— 后面控制器版会把它拆开。',
                ],
                [
                    'title' => '第 5 步：校验产品编号（空？长度够吗？）',
                    'code'  => <<<'CODE'

    // 校验产品编号：先查是否为空，再查长度是否不少于 3 个字符
    if (empty($productCode)) {
        $errors[] = 'missing product code';
    } elseif (strlen($productCode) < 3) {
        $errors[] = 'product code too few characters';
    }
CODE,
                    'why'     => '产品编号是必填项，而且至少要有 3 个字符才像编号。用 elseif 是因为「没填」和「填太短」是互斥的，不该同时报两条。',
                    'purpose' => '展示「一条规则一次追加一条错误」的写法，以及 elseif 控制「同一字段最多报一个错」，避免错误列表刷屏。',
                ],
                [
                    'title' => '第 6 步：校验价格（避开 empty(\'0\') 的坑）',
                    'code'  => <<<'CODE'

    // 校验价格：
    // 这里不用 empty($price)，因为 empty('0') 为 true，
    // 会把合法的价格 0 误判成"没填"，所以改用自定义函数 isAnEmptyNonZeroString()
    if (isAnEmptyNonZeroString($price)) {
        $errors[] = 'missing price';
    } elseif (!is_numeric($price)) {   // is_numeric：判断是否为数字或数字字符串
        $errors[] = 'price was not a number';
    }
}
CODE,
                    'why'     => '价格 0（免费商品）是合法业务数据，但 PHP 的 empty(\'0\') 偏偏返回 true，直接用 empty 会把 0 当成「没填」而误报。',
                    'purpose' => '这是本章最有价值的坑：把「没填」和「填了 0」区分开，靠的就是 isAnEmptyNonZeroString()。第二个 elseif 再挡掉非数字输入。',
                ],
                [
                    'title' => '第 7 步：用错误数组是否为空判定「通过」',
                    'code'  => <<<'CODE'

// 没有错误即视为有效数据
$isValid = empty($errors);
CODE,
                    'why'     => '校验规则散落在前面几行，需要一个统一的结论供后面分支使用。约定：错误数组为空即通过。',
                    'purpose' => '把「多条规则的结果」收敛成一个布尔值，让后续逻辑只关心「通过 / 不通过」，不关心到底哪条规则。',
                ],
                [
                    'title' => '第 8 步：通过就输出结果并终止脚本',
                    'code'  => <<<'CODE'
if ($isSubmitted && $isValid) {
    print 'input data was error free';
    die(); // 终止脚本：后面的 HTML 表单不会再输出
}
?>
CODE,
                    'why'     => '数据合法时不需要再显示表单，只要给一句成功提示。若不加 die()，下面的表单 HTML 会被一起输出，页面就乱了。',
                    'purpose' => '用 die() 明确「到此为止」。?> 之后进入模板区，只有「没提交」或「有错」这两种情况才会执行到那里。',
                ],
                [
                    'title' => '第 9 步：模板开头与错误提示样式',
                    'code'  => <<<'CODE'

<!doctype html>
<html><head>
    <title>Two-field postback form</title>
    <style>.error { background-color: pink; padding: 1rem;}</style>
</head>
<body>
CODE,
                    'why'     => '错误提示需要一个醒目的外观，这里用一行内联 CSS 定义粉色底 + 内边距的 .error 区块，不必额外引样式文件。',
                    'purpose' => '先准备好「错误展示区」的样式，下一步再决定要不要显示它。',
                ],
                [
                    'title' => '第 10 步：仅在「已提交且有错」时显示错误列表',
                    'code'  => <<<'CODE'
<!-- 只有"已提交但数据不合法"时才显示错误区块 -->
<?php if ($isSubmitted && !$isValid): ?>
    <div class="error">
        <ul>
            <!-- 遍历 $errors 数组，把每条错误信息显示为列表项 -->
            <?php foreach ($errors as $error): ?>
                <li><?= $error ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
<?php endif; ?>
CODE,
                    'why'     => '首次打开页面时 $errors 是空的，不该出现一个空框；只有「提交过且确实有错」才值得展示。',
                    'purpose' => '条件 $isSubmitted && !$isValid 是错误区显示的开关。foreach 把数组里的每条消息渲染成 <li>，新增规则时不用改模板。',
                ],
                [
                    'title' => '第 11 步：粘性表单（回填用户已填的值）',
                    'code'  => <<<'CODE'

<h1>Product details</h1>
<!-- 不写 action 表示提交回当前页面自己（postback） -->
<form method="POST">
    <!-- 把已填的值回填到 value 属性中（即"粘性表单"sticky form），
         这样用户提交失败后不用重新输入一遍 -->
    Product code: <input name="productCode" value="<?= $productCode ?>">
    <p>Price: <input name="price" value="<?= $price ?>"></p>
    <p><input type="submit"></p>
</form>
</body></html>
CODE,
                    'why'     => '校验失败后如果表单是空的，用户就得从头再填一遍，体验很差。省略 action 则让表单提交回本页，继续走同一套逻辑。',
                    'purpose' => '把「不写 action = 提交给自己」和「value=\'<?= $x ?>\' 回填」两个技巧合在一起，这就是粘性表单的完整实现。',
                ],
            ],
        ],

        [
            'key'   => '06-controller',
            'file'  => '06_validation_array_controller.php',
            'group' => '06 表单校验：同一功能的两种写法',
            'title' => '控制器版（校验与显示都拆成函数）',
            'goal'  => '功能和上一个文件完全一样，但把「校验」和「显示」搬进 inc/ 里的函数，主文件只做调度。',
            'run'   => '直接访问 http://localhost:8000/week04/06_validation_array_controller.php，表现与单文件版一致，成功时显示 Your input data was error free。',
            'notice' => '三个 require_once 用的都是相对路径，入口必须是本文件所在目录，否则会「找不到文件」。',
            'terms' => [
                ['name' => 'controller（控制器）', 'kind' => '角色', 'desc' => '只负责调度：判断状态 → 调用校验 → 决定显示什么，不含具体细节。'],
                ['name' => 'validate()', 'kind' => '函数（inc/validate.php）', 'desc' => '封装全部校验规则，返回错误数组；空数组代表通过。'],
                ['name' => 'displayForm()', 'kind' => '函数（inc/form.php）', 'desc' => '封装表单的 HTML，参数决定显示哪些错误、回填哪些值。'],
                ['name' => 'isAnEmptyNonZeroString()', 'kind' => '函数（inc/zeroFunction.php）', 'desc' => '处理 empty(\'0\') 陷阱的辅助函数。'],
                ['name' => '$errors = validate()', 'kind' => '赋值', 'desc' => '控制器把校验的活儿外包出去，只接收结果（错误数组）。'],
                ['name' => 'displayForm($isSubmitted,$isValid,$errors,$productCode,$price)', 'kind' => '函数调用', 'desc' => '把状态与数据一次性传给视图函数，由它决定显示成什么样。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：引入三个函数库',
                    'code'  => <<<'CODE'
<?php

// require_once：引入外部文件，_once 保证即使多次调用也只引入一次（避免函数重复定义报错）
// inc/zeroFunction.php 提供辅助函数（如 isAnEmptyNonZeroString）
// inc/form.php 提供显示表单的函数 displayForm()
// inc/validate.php 提供校验函数 validate()
require_once 'inc/zeroFunction.php';
require_once 'inc/form.php';
require_once 'inc/validate.php';
CODE,
                    'why'     => '这一版把逻辑拆出去了：辅助函数、视图、校验分别在三个文件里，控制器必须先把它们都引入才能调用。',
                    'purpose' => '体现「按职责拆文件」：工具 / 视图 / 校验各管一块，改样式不会碰到校验规则，改规则也不会碰到 HTML。',
                ],
                [
                    'title' => '第 2 步：初始化状态与数据变量',
                    'code'  => <<<'CODE'

// 初始化变量（给变量一个默认值，避免未定义警告）
// $_SERVER['REQUEST_METHOD'] 保存当前请求方式（GET / POST 等），
// 由于本页表单 method="POST"（即"回传 postback"到自己），
// 所以判断是否为 POST 就能区分"首次打开页面"和"用户提交了表单"。
$isSubmitted = ($_SERVER['REQUEST_METHOD'] === 'POST');
$productCode = '';
$price = '';
$errors = [];
CODE,
                    'why'     => '和单文件版一样，控制器要先把「状态」和「数据」准备好，再交给函数去处理。',
                    'purpose' => '变量先声明再使用，函数之间才能靠参数传递这些值，而不用互相依赖全局变量。',
                ],
                [
                    'title' => '第 3 步：提交就调用 validate() 校验',
                    'code'  => <<<'CODE'

// 只有提交了表单才需要校验；校验逻辑被封装在 validate() 里，
// 它返回一个错误信息的数组，没有错误时返回空数组。
if($isSubmitted){
    $errors = validate();
}
CODE,
                    'why'     => '控制器不应该知道「编号至少 3 个字符」这种细节，那是 validate() 的事；它只需要问一句：有没有错？',
                    'purpose' => '这是拆分的核心收益：规则写在 inc/validate.php 里，可以被其它页面复用；这里只剩一行调用。',
                ],
                [
                    'title' => '第 4 步：把「是否有错」收敛成一个布尔值',
                    'code'  => <<<'CODE'

// 用一个布尔变量记录"数据是否有效"（可选写法，本质就是判断 $errors 是否为空）
$isValid = empty($errors);
CODE,
                    'why'     => '函数之间传参用布尔值更直观，displayForm() 需要的正是「这次是否有效」这个结论。',
                    'purpose' => '保持与单文件版完全相同的语义：错误数组为空 ⇔ 数据有效。两种写法的差别只在组织方式，不在逻辑。',
                ],
                [
                    'title' => '第 5 步：通过 → 输出成功提示',
                    'code'  => <<<'CODE'

// 提交且无错 => 说明数据合法，执行"成功"分支（这里只是简单提示）
if($isSubmitted && $isValid){
    print 'Your input data was error free';
}
CODE,
                    'why'     => '数据没问题就没必要再画表单，直接给结论。这里也预留了真实项目的落点：写入数据库、跳转页面等。',
                    'purpose' => '成功分支保持极简，让人一眼看出「通过之后做什么」是可以自由替换的部分。',
                ],
                [
                    'title' => '第 6 步：其它情况 → 调用 displayForm() 显示表单',
                    'code'  => <<<'CODE'
else{
    // 其它情况（首次访问，或提交但有错）都重新显示表单；
    // 把 $errors 传进去，表单顶部就能把错误逐条列出来。
    displayForm($isSubmitted,$isValid,$errors,$productCode,$price);
}
CODE,
                    'why'     => '首次访问要给用户一个空表单，提交有错要给用户带错误提示的表单 —— 这两种情况其实都是「显示表单」。',
                    'purpose' => '用一个 else 覆盖两种剩余情况，把显示工作整体外包给 displayForm()。控制器到此结束，页面 HTML 一行都不用写。',
                ],
            ],
        ],

        // ============================= inc 函数库 =============================
        [
            'key'   => 'inc-zero-function',
            'file'  => 'inc/zeroFunction.php',
            'group' => 'inc 函数库：被 06 两个版本共用',
            'title' => 'isAnEmptyNonZeroString()：把 \'0\' 当成有效值',
            'goal'  => '解决 PHP 的 empty(\'0\') === true 带来的误判，让价格 0 能正常通过「必填」检查。',
            'run'   => '不能直接访问，被 06_validation_array_no_function.php 与 inc/validate.php 引入后调用。',
            'terms' => [
                ['name' => 'isAnEmptyNonZeroString', 'kind' => '函数名', 'desc' => '直译「是否是一个空的、非零的字符串」：为空返回 true，但 \'0\' 例外。'],
                ['name' => '$s', 'kind' => '参数', 'desc' => '待检查的值（mixed，任意类型）。'],
                ['name' => ': bool', 'kind' => '返回类型声明', 'desc' => '强制返回值必须是布尔，写错类型 PHP 会报错，起到自我约束作用。'],
                ['name' => '===', 'kind' => '比较运算符', 'desc' => '全等：值和类型都相同。$s === \'0\' 只有在确实是字符串 0 时才成立。'],
                ['name' => 'empty()', 'kind' => 'PHP 函数', 'desc' => '\'\'、null、false、0、\'0\'、[] 都算空 —— 最后这条正是本函数要绕过的坑。'],
                ['name' => 'return false', 'kind' => '提前返回', 'desc' => '命中 \'0\' 立刻结束函数，不再往下走，代码更直白。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：文档注释（说明为什么要有这个函数）',
                    'code'  => <<<'CODE'
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
CODE,
                    'why'     => '这个函数是为一个不直观的坑而生的，如果不写清楚原因，后来的人很可能把它「优化」掉。',
                    'purpose' => '用文档注释固定函数的契约：什么算空、什么不算空、参数和返回值各是什么。',
                ],
                [
                    'title' => '第 2 步：函数签名与「\'0\' 不算空」这条特例',
                    'code'  => <<<'CODE'
function isAnEmptyNonZeroString($s): bool   // : bool 声明返回值类型为布尔值
{
    if ($s === '0') return false;   // '0' 是合法数据，不算空（=== 同时比较值和类型）
CODE,
                    'why'     => '价格填 0 是合法业务数据，必须先被放走。用 === 而不是 ==，是为了只放行「字符串 0」，不误伤其它假值。',
                    'purpose' => '把唯一的特例放在函数最前面，命中就提前返回，读者一眼就能看到这个函数的存在意义。',
                ],
                [
                    'title' => '第 3 步：其余情况交给 empty() 判断',
                    'code'  => <<<'CODE'
    return empty($s);               // 其余情况交给 empty()：''、null、false、0、[] 都算空
}
CODE,
                    'why'     => '除了 \'0\' 之外，空字符串、null、false、空数组都应该算「没填」，empty() 一次就能全部覆盖。',
                    'purpose' => '保持函数极简：一条特例 + 一条通用规则。返回布尔值供调用方直接放进 if 条件里。',
                ],
            ],
        ],

        [
            'key'   => 'inc-validate',
            'file'  => 'inc/validate.php',
            'group' => 'inc 函数库：被 06 两个版本共用',
            'title' => 'validate()：集中管理校验规则',
            'goal'  => '把产品编号与价格的全部校验规则收在一个函数里，返回一个错误数组（空数组 = 通过）。',
            'run'   => '不能直接访问，由 06_validation_array_controller.php 在提交时调用：$errors = validate();',
            'terms' => [
                ['name' => 'validate', 'kind' => '函数名', 'desc' => '「校验」。无参数，直接自己从 POST 里取数据；返回值是错误数组。'],
                ['name' => '$errors', 'kind' => '局部变量', 'desc' => '函数内部新建的错误收集器，最后 return 给调用方。'],
                ['name' => 'productCode', 'kind' => '表单字段名', 'desc' => '对应表单里 name="productCode" 的输入框。'],
                ['name' => 'price', 'kind' => '表单字段名', 'desc' => '对应表单里 name="price" 的输入框。'],
                ['name' => 'elseif', 'kind' => '控制结构', 'desc' => '前一个条件不成立才检查下一个，保证同一字段一次最多报一条错。'],
                ['name' => '!is_numeric($price)', 'kind' => '取反判断', 'desc' => '! 表示「不是数字就报错」。'],
                ['name' => 'return $errors', 'kind' => '返回值', 'desc' => '把全部错误交回控制器；约定「空数组 = 校验通过」。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：约定返回值 + 建立空错误数组',
                    'code'  => <<<'CODE'
<?php
/**
 * 校验表单提交的数据。
 * 约定：返回一个错误信息数组；数组为空（empty）即代表校验通过。
 * 好处：控制器不需要知道具体校验细节，只关心"有没有错误"。
 */
function validate(){
    $errors = [];   // 收集错误信息，每发现一个问题就 $errors[] 追加一条
CODE,
                    'why'     => '调用方只需要一个能判断「通过与否」的结果。用数组当返回值，既能判断有没有错，又能把所有错误带出去显示。',
                    'purpose' => '先立下契约（空数组 = 通过），再开工。这个约定让控制器代码可以写得非常短。',
                ],
                [
                    'title' => '第 2 步：从 POST 读取两个待校验字段',
                    'code'  => <<<'CODE'
    
    // 从 POST 请求中读取字段（filter_input 比直接访问 $_POST 更安全）
    $productCode = filter_input(INPUT_POST, 'productCode');
    $price = filter_input(INPUT_POST, 'price');
CODE,
                    'why'     => '校验的前提是拿到数据。这里由函数自己读取 POST，调用方连参数都不用传。',
                    'purpose' => '把「取数据」也一并封装进来，控制器只需 $errors = validate();。注意字段名要和表单的 name 完全一致。',
                ],
                [
                    'title' => '第 3 步：产品编号规则（必填 + 至少 3 字符）',
                    'code'  => <<<'CODE'

    // 规则 1：产品编号不能为空
    // 规则 2：若不为空，长度还必须 >= 3 个字符
    // 用 elseif 保证同一字段一次最多报一条错误
    if (empty($productCode)) {
        $errors[] = 'missing product code';
    } elseif (strlen($productCode) < 3) {
        $errors[] = 'product code too few characters';
    }
CODE,
                    'why'     => '编号既不能空，也不能太短。若两个 if 分开写，输入 \'ab\' 时会同时触发「太短」，而没填时又会多报一条无意义的「太短」。',
                    'purpose' => '展示校验规则的典型写法：逐条检查、逐条追加；用 elseif 控制错误数量，提示才准确。',
                ],
                [
                    'title' => '第 4 步：价格规则（必填但允许 0 + 必须是数字）',
                    'code'  => <<<'CODE'

    // 规则 3：价格不能为空。
    //   注意用 isAnEmptyNonZeroString() 而不是 empty()：
    //   因为 empty('0') === true，会把合法的 0 当成"没填"。
    // 规则 4：价格必须是数字（is_numeric 判断是否为数字或数字字符串）
    if (isAnEmptyNonZeroString($price)) {
        $errors[] = 'missing price';
    } elseif (!is_numeric($price)) {
        $errors[] = 'price was not a number';
    }
CODE,
                    'why'     => '价格既要必填、又必须能当数字用，同时还不能把 0 误判成空 —— 这正是 inc/zeroFunction.php 存在的理由。',
                    'purpose' => '把两个规则串成一条链：先确认「填了」，再确认「填的是数字」。顺序不能颠倒，否则 0 会被误杀。',
                ],
                [
                    'title' => '第 5 步：把错误数组返回给控制器',
                    'code'  => <<<'CODE'
    
    // 把错误数组返回给调用者（控制器）
    return $errors;
}

?>
CODE,
                    'why'     => '校验结果必须交出去，控制器才能决定是显示成功提示还是重新显示表单。',
                    'purpose' => '完成契约：无论有没有错，返回的都是数组。控制器用 empty($errors) 一句话就能判断结果。',
                ],
            ],
        ],

        [
            'key'   => 'inc-form',
            'file'  => 'inc/form.php',
            'group' => 'inc 函数库：被 06 两个版本共用',
            'title' => 'displayForm()：把表单 HTML 封装成函数',
            'goal'  => '用一个函数输出完整的表单页面（含错误提示区与粘性回填），参数决定它显示成什么样。',
            'run'   => '不能直接访问，由 06_validation_array_controller.php 调用：displayForm($isSubmitted,$isValid,$errors,$productCode,$price);',
            'notice' => '这个文件在函数中用 ?> 退出 PHP 模式直接写 HTML —— 那是刻意的写法：大段 HTML 用 echo 一行行输出会非常难维护。',
            'terms' => [
                ['name' => 'displayForm', 'kind' => '函数名', 'desc' => '「显示表单」。只负责输出 HTML，不做任何判断以外的逻辑。'],
                ['name' => '$isSubmitted = \'\'', 'kind' => '参数（默认空）', 'desc' => '是否已提交；空字符串等价于 false，用来决定是否显示错误区。'],
                ['name' => '$isValid = true', 'kind' => '参数（默认真）', 'desc' => '数据是否有效；默认 true，所以首次访问不会显示错误。'],
                ['name' => '$errors = []', 'kind' => '参数（默认空数组）', 'desc' => '要显示的错误列表。给了默认值，调用时可以只传前几个参数。'],
                ['name' => '$productCode / $price', 'kind' => '参数（默认空）', 'desc' => '要回填到输入框的值（粘性表单）。'],
                ['name' => '?> ... <?php', 'kind' => 'PHP 模式切换', 'desc' => '在函数中途退出 PHP 模式原样输出 HTML，写完再切回来继续函数定义。'],
                ['name' => 'class="error"', 'kind' => 'CSS 类', 'desc' => '粉色底的提示框，样式就写在函数输出的 <style> 里。'],
                ['name' => '$isSubmitted && !$isValid', 'kind' => '显示条件', 'desc' => '「提交过」且「没通过」才显示错误区，首次访问自然不显示。'],
            ],
            'steps' => [
                [
                    'title' => '第 1 步：文档注释与函数签名（全部参数给默认值）',
                    'code'  => <<<'CODE'
<?php 
/**
 * 输出（渲染）产品表单页面。
 * 把"显示"这一职责抽成函数，控制器只负责决定要不要调用它、传什么参数。
 *
 * @param bool   $isSubmitted 表单是否已提交（默认 false/空）
 * @param bool   $isValid     数据是否通过校验（默认 true）
 * @param array  $errors      错误信息数组，非空时显示在表单上方
 * @param string $productCode 回填到输入框的产品编号
 * @param string $price       回填到输入框的价格
 * 所有参数都给了默认值，因此调用时可以只传部分参数。
 */
function displayForm($isSubmitted='', $isValid=true, $errors=[], $productCode='' ,$price=''){
CODE,
                    'why'     => '显示表单需要知道「有没有提交、有没有错、错在哪、用户之前填了什么」，这些都得靠参数传进来。',
                    'purpose' => '给每个参数都设默认值，调用方就不必凑齐全部参数；也让函数可以在「首次访问」这种最简场景下被调用。',
                ],
                [
                    'title' => '第 2 步：退出 PHP 模式，从 HTML 头部开始原样输出',
                    'code'  => <<<'CODE'
// 下面用 ?> 退出 PHP 模式，直接按原样输出 HTML（比一行行 echo 更直观）
?>
    <!doctype html>
    <html><head>
        <title>Two-field postback form</title>
        <style>.error { background-color: pink; padding: 1rem;}</style>
    </head>
    <body>
CODE,
                    'why'     => '表单有十几行 HTML，用 echo 拼字符串会满屏引号和转义。退出 PHP 模式可以让编辑器继续高亮 HTML。',
                    'purpose' => '演示「视图函数」的标准写法：函数体内 ? > 输出 HTML，写完再切回 PHP 模式闭合函数。',
                ],
                [
                    'title' => '第 3 步：提交过且有错 → 输出错误列表',
                    'code'  => <<<'CODE'
    <!-- 已提交且有错，才显示红色（粉色）错误提示区 -->
    <?php if ($isSubmitted && !$isValid): ?>
        <div class="error">
            <ul>
                <?php foreach ($errors as $error): ?>
                    <li><?= $error ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>
CODE,
                    'why'     => '用户提交失败需要看到具体原因，但首次访问不该出现空框，所以条件必须同时满足「已提交」和「未通过」。',
                    'purpose' => '视图只做「按条件渲染」：数据由参数传入，循环与判断都用替代语法写在 HTML 里，读起来像模板而不是代码。',
                ],
                [
                    'title' => '第 4 步：表单本体 + 粘性回填',
                    'code'  => <<<'CODE'

    <h1>Product details</h1>
    <!-- 省略 action：表单提交回本页自身 -->
    <form method="POST">
        <!-- 回填用户之前输入的值，避免校验失败后要重填 -->
        Product code: <input name="productCode" value="<?= $productCode ?>">
        <p>Price: <input name="price" value="<?= $price ?>"></p>
CODE,
                    'why'     => '不写 action 才能提交回控制器自己，形成 postback 闭环；value 里输出变量才能保留用户已填内容。',
                    'purpose' => '把「回传」和「粘性表单」两个模式合在两行里实现。注意 name 必须与 validate() 读取的名字一致。',
                ],
                [
                    'title' => '第 5 步：提交按钮、收尾，切回 PHP 模式闭合函数',
                    'code'  => <<<'CODE'
        <p><input type="submit"></p>
    </form>
    </body></html>
<?php
// 重新进入 PHP 模式，结束函数定义
}
?>
CODE,
                    'why'     => 'HTML 写完了，但函数的大括号还没闭合，必须重新进入 PHP 模式补上 }，否则整个文件语法错误。',
                    'purpose' => '完整演示「函数内嵌 HTML」的收尾方式：?> 开始输出 → <?php 回来闭合函数。这是 MVC 视图层最原始的形态。',
                ],
            ],
        ],
    ];
}

/**
 * 按 key 取单个章节，找不到返回 null
 */
function getManualChapter(string $key): ?array
{
    foreach (getManualChapters() as $chapter) {
        if ($chapter['key'] === $key) {
            return $chapter;
        }
    }
    return null;
}
