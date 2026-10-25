/* ============================================================
   Section 1 (demo guide), home inventory + section 4 (cheatsheet)
   Bilingual content: { en: '...', zh: '...' }
   ============================================================ */

window.GUIDE = {

    setup: {
        cmd: [
            '# create an empty site root',
            'mkdir -p ~/week04_site',
            'cd ~/week04_site',
            '',
            '# link this folder as week04 (replace the path with your own)',
            'ln -s "/Users/johnnylin/Library/CloudStorage/OneDrive-Personal/3280-Backend Web Development/Week04/week04_demo(done)" week04',
            '',
            '# start the PHP built-in server',
            'php -S localhost:8000'
        ].join('\n'),
        url: 'http://localhost:8000/week04/'
    },

    files: [
        {
            file: '01_mixed_request.html',
            type: { en: 'Entry form', zh: '入口表单' },
            desc: { en: 'Fill in and submit', zh: '填写并提交' }
        },
        {
            file: '01_mixed_request_process.php',
            type: { en: 'Handler script', zh: '处理脚本' },
            desc: { en: 'Called by the form, not opened directly', zh: '被表单调用，不直接访问' }
        },
        {
            file: '02_multiple_buttons.html',
            type: { en: 'Entry form', zh: '入口表单' },
            desc: { en: 'Fill in and submit', zh: '填写并提交' }
        },
        {
            file: '02_multiple_process.php',
            type: { en: 'Handler script', zh: '处理脚本' },
            desc: { en: 'Called by the form, not opened directly', zh: '被表单调用，不直接访问' }
        },
        {
            file: '03_button_links.php',
            type: { en: 'Standalone page', zh: '独立页面' },
            desc: { en: 'Can be opened directly', zh: '可直接访问' }
        },
        {
            file: '04_checkboxes_array.html',
            type: { en: 'Entry form', zh: '入口表单' },
            desc: { en: 'Tick boxes and submit', zh: '勾选并提交' }
        },
        {
            file: '04_checkboxes_process.php',
            type: { en: 'Handler script', zh: '处理脚本' },
            desc: { en: 'Called by the form, not opened directly', zh: '被表单调用，不直接访问' }
        },
        {
            file: '05_multiple_selection.html',
            type: { en: 'Entry form', zh: '入口表单' },
            desc: { en: 'Multi-select control (no handler provided)', zh: '演示多选控件（处理脚本未提供）' }
        },
        {
            file: '06_validation_array_no_function.php',
            type: { en: 'Standalone page', zh: '独立页面' },
            desc: { en: 'Can be opened directly (single-file validation)', zh: '可直接访问（单文件版校验）' }
        },
        {
            file: '06_validation_array_controller.php',
            type: { en: 'Standalone page', zh: '独立页面' },
            desc: { en: 'Can be opened directly (controller + functions)', zh: '可直接访问（函数拆分版校验）' }
        },
        {
            file: 'inc/zeroFunction.php',
            type: { en: 'Function library', zh: '函数库' },
            desc: { en: 'Helper functions', zh: '辅助函数' }
        },
        {
            file: 'inc/validate.php',
            type: { en: 'Function library', zh: '函数库' },
            desc: { en: 'Validation logic', zh: '校验逻辑' }
        },
        {
            file: 'inc/form.php',
            type: { en: 'Function library', zh: '函数库' },
            desc: { en: 'Form view', zh: '表单视图' }
        }
    ],

    demos: [
        {
            key: '01',
            files: ['01_mixed_request.html', '01_mixed_request_process.php'],
            title: {
                en: '01 · Mixed request (GET and POST in one request)',
                zh: '01 · 混合请求（GET + POST 同时存在）'
            },
            run: {
                en: 'Open 01_mixed_request.html, type anything into Title / Price and submit.',
                zh: '访问 01_mixed_request.html，随便填 Title / Price，点提交。'
            },
            see: {
                en: 'You land on 01_mixed_request_process.php, which prints three lines: id = 1022, title = the title you typed, price = the price you typed.',
                zh: '跳转到 01_mixed_request_process.php，页面显示三行：id = 1022、title = 你填的标题、price = 你填的价格。'
            },
            points: [
                {
                    en: 'One HTTP request can carry GET data and POST data at the same time: id comes from the URL query string (?id=1022), title / price come from the POST body.',
                    zh: '一次 HTTP 请求可以同时携带 GET 数据和 POST 数据：id 来自 URL 查询字符串（?id=1022），title / price 来自 POST 请求体。'
                },
                {
                    en: 'So PHP has to read them separately: filter_input(INPUT_GET, ...) for URL parameters, filter_input(INPUT_POST, ...) for form fields.',
                    zh: '因此 PHP 端要分开取：filter_input(INPUT_GET, ...) 取 URL 参数，filter_input(INPUT_POST, ...) 取表单字段。'
                },
                {
                    en: 'Prefer filter_input() over $_GET / $_POST — it filters the input, which is safer.',
                    zh: '用 filter_input() 而不是 $_GET / $_POST，可以对输入做过滤，更安全。'
                },
                {
                    en: 'Notice the code structure: fetch data (logic) first, then output HTML (template).',
                    zh: '顺带看代码结构：先「取数据（逻辑）」，再「输出 HTML（模板）」。'
                }
            ]
        },

        {
            key: '02',
            files: ['02_multiple_buttons.html', '02_multiple_process.php'],
            title: {
                en: '02 · Several submit buttons (which one was clicked?)',
                zh: '02 · 多个提交按钮（区分用户点了哪个按钮）'
            },
            run: {
                en: 'Open 02_multiple_buttons.html, fill in the credit-card fields and try each of the two green buttons once.',
                zh: '访问 02_multiple_buttons.html，填信用卡信息，分别点两个绿色按钮各试一次。'
            },
            see: {
                en: 'Clicking “Pay and start watching now” prints “You selected WatchNow”; clicking “Pay and watch later” prints “You selected WatchLater”.',
                zh: '点 “Pay and start watching now” → 显示 You selected WatchNow；点 “Pay and watch later” → 显示 You selected WatchLater。'
            },
            points: [
                {
                    en: 'A form may contain several submit buttons. The key fact: only the button that was clicked submits its own name / value.',
                    zh: '一个表单可以有多个 submit 按钮，关键是只有被点击的那个按钮才会把自己的 name / value 提交上去。'
                },
                {
                    en: 'The server asks which name exists — filter_has_var(INPUT_POST, \'watchNow\') or isset($_POST[\'watchNow\']) — and branches on the answer.',
                    zh: '服务端用 filter_has_var(INPUT_POST, \'watchNow\')（或 isset($_POST[\'watchNow\'])）判断点击来源，从而走不同分支。'
                },
                {
                    en: 'Nothing shows in the address bar: credit-card data travels in the POST body, which is why POST suits sensitive data better than GET.',
                    zh: '浏览器地址栏看不到这些字段，说明信用卡信息走的是 POST（相对 GET 更适合敏感数据）。'
                }
            ]
        },

        {
            key: '03',
            files: ['03_button_links.php'],
            title: {
                en: '03 · Links as buttons (put data in the URL)',
                zh: '03 · 用链接当按钮（把数据放进 URL）'
            },
            run: {
                en: 'Open 03_button_links.php directly.',
                zh: '直接访问 03_button_links.php。'
            },
            see: {
                en: 'Two product rows (Hammer 9.99 / A bucket of nails 19.99), each with a blue Details button on the right. Hover it and the browser shows /show.php?id=123 or /show.php?id=234.',
                zh: '两行商品（Hammer 9.99 / A bucket of nails 19.99），每行右侧一个蓝色 Details 按钮。把鼠标悬停在按钮上，可在浏览器左下角看到链接地址：/show.php?id=123 或 /show.php?id=234。'
            },
            notice: {
                en: '/show.php is only an illustration and is not shipped with this folder, so clicking Details gives a 404 — that is expected.',
                zh: '/show.php 只是示意，本目录未提供该文件，点击会 404（属于正常现象）。'
            },
            points: [
                {
                    en: 'You do not need a form to send data: a hyperlink plus a query string is enough to send id to the server (a GET request).',
                    zh: '不需要表单也能传数据：超链接 + 查询字符串就能把 id 发给服务器（GET 请求）。'
                },
                {
                    en: 'The page is generated by looping over a PHP array (foreach ... endforeach alternative syntax) — the smallest possible “data-driven page”.',
                    zh: '页面内容由 PHP 数组循环生成（foreach ... endforeach 替代语法），这是「数据驱动页面」的最小雏形。'
                },
                {
                    en: 'class="btn btn-primary" shows that Bootstrap can dress an <a> up to look exactly like a button.',
                    zh: 'class="btn btn-primary" 说明 Bootstrap 可以把 <a> 直接打扮成按钮外观。'
                }
            ]
        },

        {
            key: '04',
            files: ['04_checkboxes_array.html', '04_checkboxes_process.php'],
            title: {
                en: '04 · Checkbox array (one field, many values)',
                zh: '04 · 复选框数组（一个字段提交多个值）'
            },
            run: {
                en: 'Open 04_checkboxes_array.html, tick any toppings and submit — or submit without ticking anything.',
                zh: '访问 04_checkboxes_array.html，勾选任意几个配料后提交；也可以一个都不勾直接提交。'
            },
            see: {
                en: 'Olives + Garlic salt gives “Your selected toppings are: olives+garlic”. Nothing ticked gives “Please select a topping”. Watch the address bar: .../04_checkboxes_process.php?toppings%5B%5D=olives&toppings%5B%5D=garlic (so it used GET).',
                zh: '勾选 Olives + Garlic salt → Your selected toppings are: olives+garlic；一个都不勾 → Please select a topping。提交后注意地址栏：.../04_checkboxes_process.php?toppings%5B%5D=olives&toppings%5B%5D=garlic（说明用的是 GET）。'
            },
            points: [
                {
                    en: 'Several checkboxes share one name plus square brackets — name="toppings[]" — so PHP receives an array. Without [] only the last value survives.',
                    zh: '多个复选框用同一个名字 + 方括号 name="toppings[]"，PHP 才会收到数组；不加 [] 只会保留最后一个值。'
                },
                {
                    en: 'The option FILTER_REQUIRE_ARRAY forces the result to be an array: a non-array input returns false instead of causing a type error.',
                    zh: '读取时第三个参数 FILTER_REQUIRE_ARRAY 强制要求结果必须是数组，传来的不是数组就返回 false，避免类型错误。'
                },
                {
                    en: 'implode(\'+\', $toppings) joins the array into a string; empty() detects “nothing selected at all”.',
                    zh: 'implode(\'+\', $toppings) 把数组拼成字符串；empty() 用来判断「一个都没选」。'
                }
            ]
        },

        {
            key: '05',
            files: ['05_multiple_selection.html'],
            title: {
                en: '05 · Multi-select list (select multiple)',
                zh: '05 · 多选列表（select multiple）'
            },
            run: {
                en: 'Open 05_multiple_selection.html, hold Ctrl (Command on macOS) and click several flowers, then submit.',
                zh: '访问 05_multiple_selection.html，按住 Ctrl（macOS 用 Command）点选多个花名，再点提交。'
            },
            see: {
                en: 'The browser jumps to 05_multiple_process.html, which is not provided, so you get a 404. The address bar shows something like ...?flowers%5B%5D=poppy&flowers%5B%5D=tulip.',
                zh: '浏览器会跳转到 05_multiple_process.html（该文件未提供，因此会报 404）。可在跳转后的地址栏看到类似：...?flowers%5B%5D=poppy&flowers%5B%5D=tulip。'
            },
            points: [
                {
                    en: 'size="3" shows three rows at once, multiple allows several selections, and name="flowers[]" submits the chosen values as an array.',
                    zh: 'size="3" 让下拉框一次显示 3 行、multiple 允许多选、name="flowers[]" 让所选的多个值以数组形式提交。'
                },
                {
                    en: 'It is the same “array field” idea as the checkboxes in 04, only a different control — the server-side code is identical (FILTER_REQUIRE_ARRAY + implode).',
                    zh: '与 04 的复选框是同一套「数组字段」思路，只是控件不同，服务端处理方式完全一样（FILTER_REQUIRE_ARRAY + implode）。'
                },
                {
                    en: 'Careful: action pointing at a .html file is only a classroom placeholder. Static HTML cannot process data — real projects must point at a .php file.',
                    zh: '注意：action 指向 .html 只是课堂演示的占位；静态 HTML 无法处理数据，实际项目应指向 .php。'
                }
            ]
        },

        {
            key: '06',
            files: ['06_validation_array_no_function.php', '06_validation_array_controller.php', 'inc/zeroFunction.php', 'inc/validate.php', 'inc/form.php'],
            title: {
                en: '06 · Form validation (the same feature written two ways — the important one)',
                zh: '06 · 表单校验（同一个功能的两种写法，重点）'
            },
            run: {
                en: 'Both files are identical in behaviour. Opening either one shows a “Product details” form with Product code and Price.',
                zh: '两个文件功能完全一样。访问后是一个「Product details」表单，有两个字段：Product code、Price。'
            },
            see: {
                en: 'See the behaviour table below — empty fields, too-short codes, non-numeric prices and the legal price 0.',
                zh: '见下方效果表 —— 留空、编号太短、价格非数字，以及合法的价格 0。'
            },
            notice: {
                en: 'For the controller version, require_once \'inc/...\' is a relative path, so the entry point must be the directory that holds 06_validation_array_controller.php. Do not open the files inside inc/ on their own.',
                zh: '运行 06 的控制器版要注意：require_once \'inc/...\' 是相对路径，所以入口必须是 06_validation_array_controller.php 所在的目录（不要单独打开 inc/ 里的文件）。'
            },
            table: {
                rows: [
                    {
                        op: { en: 'Open the page for the first time', zh: '首次打开页面' },
                        res: { en: 'An empty form, no error messages', zh: '只显示空表单，无错误提示' }
                    },
                    {
                        op: { en: 'Submit both fields empty', zh: '两个字段都留空直接提交' },
                        res: { en: 'A pink error box above the form listing missing product code and missing price', zh: '表单上方出现粉色错误框，列出 missing product code、missing price' }
                    },
                    {
                        op: { en: 'Product code = ab (fewer than 3 characters)', zh: 'Product code 填 ab（少于 3 个字符）' },
                        res: { en: 'product code too few characters', zh: '提示 product code too few characters' }
                    },
                    {
                        op: { en: 'Price = abc', zh: 'Price 填 abc' },
                        res: { en: 'price was not a number', zh: '提示 price was not a number' }
                    },
                    {
                        op: { en: 'Price = 0', zh: 'Price 填 0' },
                        res: { en: 'Validation passes — this is the key point of the demo', zh: '校验通过（这是本例的关键）' }
                    },
                    {
                        op: { en: 'Product code = abc and Price = 12.5', zh: 'Product code 填 abc、Price 填 12.5' },
                        res: { en: 'Your input data was error free, and the form is no longer shown', zh: '显示 Your input data was error free，不再显示表单' }
                    }
                ]
            },
            points: [
                {
                    en: 'Postback pattern: <form method="POST"> with no action submits back to itself; $_SERVER[\'REQUEST_METHOD\'] === \'POST\' tells “first visit” from “after submit”.',
                    zh: '回传（postback）模式：<form method="POST"> 不写 action，表单提交回自己；用 $_SERVER[\'REQUEST_METHOD\'] === \'POST\' 区分「首次打开」和「提交后」。'
                },
                {
                    en: 'Errors are collected in an array: $errors[] = \'...\' appends one message at a time, empty($errors) decides whether anything went wrong, and the page loops over them.',
                    zh: '错误用数组收集：$errors[] = \'...\' 逐条追加，最后用 empty($errors) 判断有没有错，页面再把错误循环显示出来。'
                },
                {
                    en: 'The empty(\'0\') trap: a price of 0 is legal, but empty(\'0\') is true and would be read as “not filled in”. That is why isAnEmptyNonZeroString() (in inc/zeroFunction.php) excludes the string \'0\' before calling empty().',
                    zh: 'empty(\'0\') 的坑：价格填 0 是合法的，但 empty(\'0\') 返回 true，会被误判成「没填」。所以自定义了 isAnEmptyNonZeroString()（在 inc/zeroFunction.php）先把字符串 \'0\' 排除，再做 empty() 判断。'
                },
                {
                    en: 'Sticky form: when validation fails, the values the user typed are put back into value="<?= $productCode ?>", so nothing has to be retyped.',
                    zh: '粘性表单（sticky form）：出错时把用户已填的值回填到 value="<?= $productCode ?>"，用户不用重新输入。'
                }
            ]
        }
    ],

    comparison: {
        rows: [
            {
                aspect: { en: 'Code organisation', zh: '代码组织' },
                a: { en: 'Everything in one file', zh: '全部逻辑写在一个文件里' },
                b: { en: 'Split into controller + function libraries', zh: '拆成控制器 + 函数库' }
            },
            {
                aspect: { en: 'Validation', zh: '校验' },
                a: { en: 'Written inline in the main flow', zh: '写在主流程里' },
                b: { en: 'validate() in inc/validate.php', zh: 'inc/validate.php 的 validate()' }
            },
            {
                aspect: { en: 'Displaying the form', zh: '显示表单' },
                a: { en: 'Written inline in the main flow', zh: '写在主流程里' },
                b: { en: 'displayForm() in inc/form.php', zh: 'inc/form.php 的 displayForm()' }
            },
            {
                aspect: { en: 'Helper function', zh: '辅助函数' },
                a: { en: 'inc/zeroFunction.php', zh: 'inc/zeroFunction.php' },
                b: { en: 'Same as the left column', zh: '同左' }
            },
            {
                aspect: { en: 'Advantage', zh: '优点' },
                a: { en: 'Direct and easy to read', zh: '直观、好读' },
                b: { en: 'Separation of concerns, reusable, easier to maintain', zh: '职责分离、可复用、易维护' }
            }
        ]
    },

    cheatsheet: [
        {
            name: 'filter_input(INPUT_GET|INPUT_POST, \'name\')',
            meaning: {
                en: 'Reads (and optionally filters) a single value from GET / POST.',
                zh: '从 GET / POST 中读取并过滤单个值。'
            }
        },
        {
            name: 'filter_input(..., options: FILTER_REQUIRE_ARRAY)',
            meaning: {
                en: 'Requires the result to be an array (checkboxes / multi-selects).',
                zh: '要求读取结果必须是数组（复选框 / 多选）。'
            }
        },
        {
            name: 'filter_has_var(INPUT_POST, \'name\')',
            meaning: {
                en: 'Tests whether a variable exists — used to tell which button was clicked.',
                zh: '判断某变量是否存在（判断点了哪个按钮）。'
            }
        },
        {
            name: 'empty($x)',
            meaning: {
                en: 'Is it empty? \'\', null, 0, \'0\' and [] are all true.',
                zh: '判断是否为空（\'\'、null、0、\'0\'、[] 均为 true）。'
            }
        },
        {
            name: 'implode(\'+\', $arr)',
            meaning: {
                en: 'Joins array elements into a string using the given separator.',
                zh: '把数组用指定分隔符拼成字符串。'
            }
        },
        {
            name: 'is_numeric($x)',
            meaning: {
                en: 'Is it a number or a numeric string?',
                zh: '判断是否为数字或数字字符串。'
            }
        },
        {
            name: 'strlen($s)',
            meaning: {
                en: 'Length of a string.',
                zh: '字符串长度。'
            }
        },
        {
            name: '$_SERVER[\'REQUEST_METHOD\']',
            meaning: {
                en: 'The current request method (GET / POST).',
                zh: '当前请求方式（GET / POST）。'
            }
        },
        {
            name: '<?= $x ?>',
            meaning: {
                en: 'Short form of <?php echo $x ?>, used to print a variable.',
                zh: '<?php echo $x ?> 的简写，用于输出变量。'
            }
        },
        {
            name: 'foreach(...): ... endforeach;',
            meaning: {
                en: 'Alternative loop syntax — easier to read when mixed with HTML.',
                zh: '循环控制结构的替代语法，混排 HTML 时更好读。'
            }
        },
        {
            name: 'require_once \'inc/x.php\'',
            meaning: {
                en: 'Includes a file; _once guarantees it is included only once.',
                zh: '引入文件，_once 保证只引入一次。'
            }
        },
        {
            name: 'die()',
            meaning: {
                en: 'Ends the script immediately — no further HTML is printed.',
                zh: '立即终止脚本，后续 HTML 不再输出。'
            }
        }
    ]
};
