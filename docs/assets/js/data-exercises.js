/* ============================================================
   Section 3 — fill-in-the-blank lab: 14 exercises / 19 blanks.

   `code` holds real code with [[1]] [[2]] … markers.
   Each blank: answer, optional accepted[], hint, explain.
   ============================================================ */

window.EXERCISES = [

    {
        id: 1,
        source: '01_mixed_request_process.php',
        level: 'basic',
        title: {
            en: 'Reading a query-string parameter from the URL',
            zh: '读取 URL 上的查询字符串参数'
        },
        prompt: {
            en: 'The form is submitted with POST, but the URL also carries ?id=1022. Complete the code that reads the GET parameter and the POST field.',
            zh: '表单用 POST 提交，但 URL 上还带着 ?id=1022。请把取 GET 参数和取 POST 字段的代码补完整。'
        },
        code: `$id = filter_input(INPUT_GET, [[1]]);
$title = filter_input([[2]], 'title');
$price = filter_input(INPUT_POST, 'price');
`,
        blanks: {
            1: {
                answer: `'id'`,
                hint: {
                    en: 'The name that appears as ?id=1022 in the URL.',
                    zh: '要取的是 URL 上 ?id=1022 里的那个名字。'
                },
                explain: {
                    en: 'The second argument of filter_input is the variable name, and it is a string — so it needs quotes: \'id\'.',
                    zh: 'filter_input 的第二个参数是「变量名」，字符串类型，所以要写引号：\'id\'。'
                }
            },
            2: {
                answer: `INPUT_POST`,
                hint: {
                    en: 'title is a form field, so it travels in the request body, not in the URL.',
                    zh: 'title 是表单字段，走请求体，不是 URL。'
                },
                explain: {
                    en: 'The first argument decides the source: INPUT_GET reads URL parameters, INPUT_POST reads the request body. One request can contain both.',
                    zh: '第一个参数决定数据来源：INPUT_GET 取 URL 参数，INPUT_POST 取表单请求体。同一个请求可以两种都有。'
                }
            }
        },
        note: {
            en: 'This is the “mixed request”: id comes from GET, title / price from POST — they must be read separately.',
            zh: '这就是「混合请求」：id 来自 GET，title/price 来自 POST，必须分开读取。'
        }
    },

    {
        id: 2,
        source: '06_validation_array_controller.php',
        level: 'basic',
        title: {
            en: 'Detecting whether the form was submitted',
            zh: '判断表单是否被提交'
        },
        prompt: {
            en: 'The form posts back to itself. Complete the condition that recognises “this is a submission”.',
            zh: '表单提交回本页自己（postback）。补出判断「这次是提交」的条件。'
        },
        code: `$isSubmitted = ($_SERVER[[1]] === [[2]]);
`,
        blanks: {
            1: {
                answer: `'REQUEST_METHOD'`,
                hint: {
                    en: 'The key inside $_SERVER that stores the request method — all upper case.',
                    zh: '$_SERVER 里保存请求方式的那个键名，全大写。'
                },
                explain: {
                    en: '$_SERVER is a superglobal array; [\'REQUEST_METHOD\'] holds the request method, such as GET or POST.',
                    zh: '$_SERVER 是超全局数组，[\'REQUEST_METHOD\'] 里存着 GET / POST 等请求方式。'
                }
            },
            2: {
                answer: `'POST'`,
                hint: {
                    en: 'What is its value when the form uses method="POST"?',
                    zh: '表单 method="POST" 时它的值是什么？'
                },
                explain: {
                    en: 'Matches the method="POST" of the form; when the page is opened with GET for the first time it holds \'GET\'.',
                    zh: '和表单的 method="POST" 对应；首次用 GET 打开页面时它是 \'GET\'。'
                }
            }
        },
        note: {
            en: 'Telling “page opened for the first time” from “submit pressed” is the first step of any postback form.',
            zh: '区分「第一次打开页面」和「点了提交按钮」，是回传表单的第一步。'
        }
    },

    {
        id: 3,
        source: '02_multiple_process.php',
        level: 'basic',
        title: {
            en: 'Several submit buttons: which one was pressed?',
            zh: '多个提交按钮：判断点了哪一个'
        },
        prompt: {
            en: 'The page has two submit buttons, watchNow and watchLater, and only the clicked one submits its own name.',
            zh: '页面上有 watchNow 和 watchLater 两个 submit 按钮，只有被点击的那个按钮会把自己的 name 提交上来。'
        },
        code: `if (filter_has_var(INPUT_POST, [[1]])) {
    print 'You selected WatchNow';
} else {
    print 'You selected WatchLater';
}
`,
        blanks: {
            1: {
                answer: `'watchNow'`,
                hint: {
                    en: 'The name attribute of the first button in the HTML.',
                    zh: 'HTML 里第一个按钮的 name 属性值是什么？'
                },
                explain: {
                    en: 'filter_has_var(INPUT_POST, \'watchNow\') asks whether that variable exists; if it does, that is the button the user pressed. Equivalent to isset($_POST[\'watchNow\']).',
                    zh: 'filter_has_var(INPUT_POST, \'watchNow\') 判断该变量是否存在；存在就说明用户点的是这个按钮。等价于 isset($_POST[\'watchNow\'])。'
                }
            }
        },
        note: {
            en: 'Several submit buttons share one form; “which name was submitted” reveals the user’s intention.',
            zh: '多个 submit 按钮共用一个表单，靠「哪个 name 被提交」来区分用户意图。'
        }
    },

    {
        id: 4,
        source: '04_checkboxes_array.html',
        level: 'advanced',
        title: {
            en: 'Checkboxes: making one field submit several values',
            zh: '复选框：让一个字段提交多个值'
        },
        prompt: {
            en: 'Three topping checkboxes share one name, and PHP must receive an array rather than a single value.',
            zh: '三个配料复选框共用同一个名字，PHP 端要收到数组而不是单个值。'
        },
        code: `<input type="checkbox" name="toppings[[1]]" value="olives"> Olives
<input type="checkbox" name="toppings[]" value="pepper"> Pepper
<input type="checkbox" name="toppings[]" value="garlic"> Garlic salt
`,
        blanks: {
            1: {
                answer: `[]`,
                hint: {
                    en: 'Two characters — square brackets.',
                    zh: '两个字符，方括号。'
                },
                explain: {
                    en: 'Adding [] to the name makes PHP collect the same-named values into an array; without it only the last value survives.',
                    zh: '名字后面加 []，PHP 才会把同名的值收集成数组；不加的话只会保留最后一个值。'
                }
            }
        },
        note: {
            en: 'This is the key trick that lets checkboxes and multi-selects deliver “several” values to the server.',
            zh: '这是复选框 / 多选列表能让服务端拿到「多个」的关键写法。'
        }
    },

    {
        id: 5,
        source: '04_checkboxes_process.php',
        level: 'advanced',
        title: {
            en: 'Reading an array field',
            zh: '读取数组型字段'
        },
        prompt: {
            en: 'Following the previous exercise: the server must read toppings as an array. Note that this constant is a flag, not a filter name.',
            zh: '接上题：服务端要把 toppings 读成数组。注意这个常量是「标志位」，不是过滤器的名字。'
        },
        code: `$toppings = filter_input(INPUT_GET, 'toppings', FILTER_DEFAULT, [[1]]);

if (empty($toppings)) {
    print 'Please select a topping';
}
`,
        blanks: {
            1: {
                answer: `FILTER_REQUIRE_ARRAY`,
                hint: {
                    en: 'Literally: “require an array”.',
                    zh: '直译就是「要求数组」。'
                },
                explain: {
                    en: 'FILTER_REQUIRE_ARRAY is a flag and belongs in the fourth argument of filter_input. Putting it in the third argument (a common mistake) means you never get the array.',
                    zh: 'FILTER_REQUIRE_ARRAY 是标志位，必须放在 filter_input 的第 4 个参数。写成第 3 个参数会读不到数组（常见错误）。'
                }
            }
        },
        note: {
            en: 'The third argument is a filter constant (such as FILTER_VALIDATE_EMAIL); only the fourth holds options and flags.',
            zh: '第 3 个参数是过滤常量（如 FILTER_VALIDATE_EMAIL），第 4 个参数才是选项 / 标志。'
        }
    },

    {
        id: 6,
        source: '04_checkboxes_process.php',
        level: 'basic',
        title: {
            en: 'Joining an array into a string',
            zh: '把数组拼成字符串'
        },
        prompt: {
            en: 'The selected toppings should be joined with a plus sign into one string for output.',
            zh: '选中的多个配料要用加号连接成一个字符串输出。'
        },
        code: `$toppingString = [[1]]('+', $toppings);
print "Your selected toppings are: $toppingString";
`,
        blanks: {
            1: {
                answer: `implode`,
                hint: {
                    en: 'The opposite of explode — “implode”.',
                    zh: 'explode 的反义词，中文叫「组合/内爆」。'
                },
                explain: {
                    en: 'implode(separator, array) joins the elements into one string: [\'olives\',\'garlic\'] becomes \'olives+garlic\'.',
                    zh: 'implode(连接符, 数组) 把数组元素用连接符拼成一个字符串，例如 [\'olives\',\'garlic\'] → \'olives+garlic\'。'
                }
            }
        },
        note: {
            en: 'Handy whenever you print several selected courses; a loop that prints one line per element works too.',
            zh: '作业里显示多门课程时也常用它；也可以用循环逐行输出。'
        }
    },

    {
        id: 7,
        source: 'inc/zeroFunction.php',
        level: 'advanced',
        title: {
            en: 'The empty(\'0\') trap',
            zh: 'empty(\'0\') 的坑'
        },
        prompt: {
            en: 'A price of 0 is legal, yet PHP’s empty(\'0\') is true. Complete the helper function that exempts zero.',
            zh: '价格填 0 是合法的，但 PHP 的 empty(\'0\') 竟然是 true。请把这个「排除 0」的辅助函数补完整。'
        },
        code: `function isAnEmptyNonZeroString($s): bool
{
    if ($s === [[1]]) return false;
    return [[2]]($s);
}
`,
        blanks: {
            1: {
                answer: `'0'`,
                hint: {
                    en: 'Zero as a string — mind the quotes.',
                    zh: '字符串形式的零，注意要带引号。'
                },
                explain: {
                    en: 'The string \'0\' is legitimate data, so catch it first with === and return false (it has a value).',
                    zh: '字符串 \'0\' 是合法数据，先用 === 把它拦下来返回 false（有值）。'
                }
            },
            2: {
                answer: `empty`,
                hint: {
                    en: 'The built-in PHP function that tests whether a variable is “empty”.',
                    zh: 'PHP 内置函数，判断变量是否「空」。'
                },
                explain: {
                    en: 'Everything else is left to empty(): \'\', null, false, 0 and [] all count as empty.',
                    zh: '其余情况交给 empty()：\'\'、null、false、0、[] 都算空。'
                }
            }
        },
        note: {
            en: 'A favourite exam question: empty(\'0\') === true, and empty(0) is true as well.',
            zh: '判断题里经常考：empty(\'0\') === true，而 empty(0) 也是 true。'
        }
    },

    {
        id: 8,
        source: 'inc/validate_JLi016.inc.php',
        level: 'challenge',
        title: {
            en: 'Student ID: ten digits (regular expression)',
            zh: '学号校验：十位数字（正则）'
        },
        prompt: {
            en: 'Use filter_input with FILTER_VALIDATE_REGEXP to require a student ID of exactly ten digits.',
            zh: '用 filter_input + FILTER_VALIDATE_REGEXP 校验学号必须是 10 位数字。'
        },
        code: `$pattern = [ "options" => [ "regexp" => [[1]] ]];
$sid = filter_input(INPUT_POST, 'studentID', [[2]], $pattern);
if (empty($sid)) {
    $errors['studentID'] = 'ID should be ten digit number';
}
`,
        blanks: {
            1: {
                answer: `"/^\\d{10}$/"`,
                accepted: [`"/^\\d{10}$/"`, `'/^\\d{10}$/'`],
                hint: {
                    en: '^ at the start, \\d{10} for ten digits, $ at the end.',
                    zh: '^ 开头，\\d{10} 十个数字，$ 结尾。'
                },
                explain: {
                    en: 'The pattern goes into the regexp key of options. ^ and $ guarantee “exactly ten digits for the whole string” — no more, no less.',
                    zh: '正则写在 options 的 regexp 键里。^ 和 $ 保证「整串正好十个数字」，不能多也不能少。'
                }
            },
            2: {
                answer: `FILTER_VALIDATE_REGEXP`,
                hint: {
                    en: 'The “regex” constant in the VALIDATE family.',
                    zh: 'VALIDATE 系列里的「正则」常量。'
                },
                explain: {
                    en: 'The third argument takes the filter constant FILTER_VALIDATE_REGEXP. It returns false when validation fails and null when the field is missing — empty() covers both.',
                    zh: '第 3 个参数用过滤常量 FILTER_VALIDATE_REGEXP；验证失败返回 false，字段不存在返回 null，empty() 都能覆盖。'
                }
            }
        },
        note: {
            en: 'This is requirement 6.b of the assignment.',
            zh: '作业第 6.b 条就是这个写法。'
        }
    },

    {
        id: 9,
        source: 'inc/validate_JLi016.inc.php',
        level: 'basic',
        title: {
            en: 'Email validation',
            zh: '邮箱校验'
        },
        prompt: {
            en: 'Validate the email with PHP’s built-in filter constant instead of writing your own regular expression.',
            zh: '邮箱用 PHP 自带的过滤常量校验，不用自己写正则。'
        },
        code: `$email = filter_input(INPUT_POST, 'email', [[1]]);
if (empty($email)) {
    $errors['email'] = 'Please enter the correct email address';
}
`,
        blanks: {
            1: {
                answer: `FILTER_VALIDATE_EMAIL`,
                hint: {
                    en: 'The “email” constant in the VALIDATE family.',
                    zh: 'VALIDATE 系列里的「邮箱」常量。'
                },
                explain: {
                    en: 'Prefer the validators that ship with the filter extension — more reliable than a hand-written regex, and it satisfies the assignment’s “use the PHP filter extension” requirement.',
                    zh: '尽量使用 filter 扩展自带的校验器，比手写正则更可靠，也符合作业「用 PHP filter 扩展」的要求。'
                }
            }
        },
        note: {
            en: 'Requirement 6.c of the assignment.',
            zh: '作业第 6.c 条。'
        }
    },

    {
        id: 10,
        source: 'inc/validate_JLi016.inc.php',
        level: 'challenge',
        title: {
            en: 'Term validation: season + year range',
            zh: '学期校验：季节 + 年份范围'
        },
        prompt: {
            en: 'The term must be Winter, Summer or Fall, followed by a space and a year from 2020 to 2026.',
            zh: '学期格式必须是 Winter / Summer / Fall 之一，加一个空格，再加 2020–2026 的年份。'
        },
        code: `$pattern = ["options" => ["regexp" => [[1]]]];
$term = filter_input(INPUT_POST, 'term', FILTER_VALIDATE_REGEXP, $pattern);
if (empty($term)) {
    $errors['term'] = 'Please enter the correct term between Winter 2020 until Fall 2026';
}
`,
        blanks: {
            1: {
                answer: `"/^(Winter|Summer|Fall) 202[0-6]$/"`,
                hint: {
                    en: 'Use | inside the parentheses for “or”, and write the year as 202[0-6].',
                    zh: '括号里用 | 表示「或」，年份写成 202[0-6]。'
                },
                explain: {
                    en: '(A|B|C) means one of the three; 202[0-6] means 2020 to 2026; ^ and $ force a full match. Note the ordinary space between the season and the year.',
                    zh: '(A|B|C) 表示三选一；202[0-6] 表示 2020 到 2026；^ $ 保证整串完全匹配。注意季节和年份之间是普通空格。'
                }
            }
        },
        note: {
            en: 'Requirement 6.d of the assignment. “Fall 2024” passes, “Winter 2027” does not.',
            zh: '作业第 6.d 条。Fall 2024 通过，Winter 2027 不通过。'
        }
    },

    {
        id: 11,
        source: '03_button_links.php',
        level: 'advanced',
        title: {
            en: 'Alternative foreach syntax (mixing HTML)',
            zh: 'foreach 的替代语法（混排 HTML）'
        },
        prompt: {
            en: 'When looping over a list inside HTML, the colon syntax reads better than braces. Add the closing statement.',
            zh: '在 HTML 里循环输出列表时，用冒号写法比大括号更好读。请补上结束语句。'
        },
        code: `<?php foreach ($items as $item): ?>
    <div><?= $item['desc'] ?></div>
<?php [[1]]; ?>
`,
        blanks: {
            1: {
                answer: `endforeach`,
                hint: {
                    en: 'Just foreach with “end” in front of it.',
                    zh: '就是 foreach 前面加 end。'
                },
                explain: {
                    en: 'The alternative syntax is foreach(...): … endforeach; and if(...): … endif;. The semicolon is mandatory.',
                    zh: '替代语法：foreach(...): ... endforeach;，if(...): ... endif;。分号不能少。'
                }
            }
        },
        note: {
            en: 'The drop-downs and checkboxes in inc/page_JLi016.inc.php use the same style.',
            zh: 'inc/page_JLi016.inc.php 里显示下拉框、复选框用的也是这套写法。'
        }
    },

    {
        id: 12,
        source: 'inc/form.php',
        level: 'basic',
        title: {
            en: 'Sticky form: restoring what the user typed',
            zh: '粘性表单：回填用户已填的值'
        },
        prompt: {
            en: 'When the form is redisplayed after a failed validation, put the user’s previous input back so nothing has to be retyped.',
            zh: '校验失败后重新显示表单时，要把用户刚才输入的内容回填，避免重新输入。'
        },
        code: `Product code: <input name="productCode" value="<?= [[1]] ?>">
<p>Price: <input name="price" value="<?= $price ?>"></p>
`,
        blanks: {
            1: {
                answer: `$productCode`,
                hint: {
                    en: 'The variable with the same colour as the one in the line above.',
                    zh: '和上面同色的那个变量名。'
                },
                explain: {
                    en: '<?= ?> is short for <?php echo ?>; putting the variable into the value attribute is what makes the form sticky.',
                    zh: '<?= ?> 是 <?php echo ?> 的简写；把变量放进 value 属性，表单就是「粘性」的。'
                }
            }
        },
        note: {
            en: 'The assignment asks for the same thing: selected / checked must also follow what was submitted.',
            zh: '作业同样要求：selected / checked 也要按提交结果保持选中状态。'
        }
    },

    {
        id: 13,
        source: 'assign2_JLi016.php',
        level: 'basic',
        title: {
            en: 'Including files (avoiding redefinition)',
            zh: '引入文件（避免重复定义）'
        },
        prompt: {
            en: 'The controller must load the function libraries from inc/ and make sure a repeated include never causes a “function already defined” error.',
            zh: '控制器要把 inc 目录里的函数库读进来，并且保证不会重复引入导致「函数已定义」错误。'
        },
        code: `[[1]] 'inc/utility_JLi016.inc.php';
[[2]] 'inc/validate_JLi016.inc.php';
`,
        blanks: {
            1: {
                answer: `require_once`,
                hint: {
                    en: 'require plus an underscore and once.',
                    zh: 'require 加上下划线 once。'
                },
                explain: {
                    en: 'require_once guarantees a file is included only once; unlike plain require, a repeated include causes no error.',
                    zh: 'require_once 保证同一文件只引入一次；与 require 的区别是重复引入不会报错。'
                }
            },
            2: {
                answer: `require_once`,
                hint: {
                    en: 'The same keyword as the line above.',
                    zh: '和上一行同一个关键字。'
                },
                explain: {
                    en: 'Same story for the second library — include it with require_once too.',
                    zh: '同理，第二个函数库也用 require_once 引入。'
                }
            }
        },
        note: {
            en: 'include only warns and carries on when it fails; require stops the script — function libraries normally use require.',
            zh: 'include 出错只警告并继续，require 出错会终止脚本 —— 函数库通常用 require。'
        }
    },

    {
        id: 14,
        source: 'inc/validate_JLi016.inc.php',
        level: 'advanced',
        title: {
            en: 'A safe include path',
            zh: '安全的引入路径'
        },
        prompt: {
            en: 'When one library includes another, a relative path breaks as soon as the current working directory changes. Replace it with the magic constant.',
            zh: '在函数库内部再引入另一个函数库时，用相对路径会因为「当前工作目录」变化而失效。请换成魔法常量。'
        },
        code: `require_once [[1]] . '/utility_JLi016.inc.php';
`,
        blanks: {
            1: {
                answer: `__DIR__`,
                hint: {
                    en: 'Two leading and two trailing underscores: “the directory of the current file”.',
                    zh: '两个下划线开头结尾，表示「当前文件所在目录」。'
                },
                explain: {
                    en: '__DIR__ always points at the directory of the current PHP file, whatever the working directory is — far more robust than a relative path such as \'../inc/\'.',
                    zh: '__DIR__ 永远指向当前 PHP 文件所在的目录，不受运行目录影响，比 \'../inc/\' 这类相对路径稳。'
                }
            }
        },
        note: {
            en: 'When debugging “Call to undefined function”, check the include path first.',
            zh: '排查「Call to undefined function」时，先确认 include 路径是否正确。'
        }
    }
];
