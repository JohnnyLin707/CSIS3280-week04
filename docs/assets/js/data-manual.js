/* ============================================================
   Section 2 — source-code manual: all 13 source files of
   week04_demo(done), split into steps.

   Concatenating the `code` of every step in a chapter gives the
   complete, unmodified original file.

   Bilingual fields: { en: '...', zh: '...' }
   ============================================================ */

window.MANUAL = [

    /* ===================== 01 mixed request ===================== */
    {
        key: '01-mixed-html',
        file: '01_mixed_request.html',
        group: {
            en: '01 Mixed request: GET + POST in the same request',
            zh: '01 混合请求：GET + POST 同时存在'
        },
        title: {
            en: 'Edit-movie form (HTML entry page)',
            zh: '编辑电影表单（HTML 入口页面）'
        },
        goal: {
            en: 'Build a form with Title / Price that sends both a hard-coded id and the values the user typed to PHP.',
            zh: '做一个能填 Title / Price 的表单，提交时把「页面写死的 id」和「用户填写的字段」一起送给 PHP。'
        },
        run: {
            en: 'Open http://localhost:8000/week04/01_mixed_request.html, fill it in and submit — you are taken to 01_mixed_request_process.php.',
            zh: '访问 http://localhost:8000/week04/01_mixed_request.html，填完点提交，跳到 01_mixed_request_process.php。'
        },
        terms: [
            {
                name: '<!doctype html>',
                kind: { en: 'Document declaration', zh: '文档声明' },
                desc: {
                    en: 'Tells the browser to parse the page as HTML5. Without it the browser may fall into quirks mode and the layout breaks.',
                    zh: '告诉浏览器按 HTML5 标准解析，缺了它浏览器可能进入怪异模式，样式会变形。'
                }
            },
            {
                name: 'method="POST"',
                kind: { en: 'form attribute', zh: 'form 属性' },
                desc: {
                    en: 'Sends the form fields in the request body (POST). The data never appears in the address bar, which suits private values.',
                    zh: '决定表单字段走「请求体（POST）」。数据不会出现在地址栏，适合隐私字段。'
                }
            },
            {
                name: 'action="/week04/01_mixed_request_process.php?id=1022"',
                kind: { en: 'form attribute', zh: 'form 属性' },
                desc: {
                    en: 'Where the data is sent. The path is the handler script; ?id=1022 after it is the query string.',
                    zh: '提交目标地址。前面的路径是处理脚本，后面的 ?id=1022 是查询字符串。'
                }
            },
            {
                name: '?id=1022',
                kind: { en: 'Query string', zh: '查询字符串（query string）' },
                desc: {
                    en: 'Everything after ? in the URL — GET data. Even when the form uses POST, this part still travels as GET.',
                    zh: 'URL 里 ? 后面的部分，属于 GET 数据。即使表单是 POST，这部分依然会按 GET 传给服务端。'
                }
            },
            {
                name: 'name="title" / name="price"',
                kind: { en: 'input attribute', zh: 'input 属性' },
                desc: {
                    en: 'The key name submitted to the server. PHP reads the value by this name; a field without a name is never submitted.',
                    zh: '提交到服务端的「键名」。PHP 端靠这个名字取值；不写 name 的字段根本不会提交。'
                }
            },
            {
                name: 'id="title"',
                kind: { en: 'input attribute', zh: 'input 属性' },
                desc: {
                    en: 'A unique identifier inside the page, used by <label for="...">. It has nothing to do with submitting data.',
                    zh: '页面内的唯一标识，供 <label for="..."> 关联使用，和提交数据无关。'
                }
            },
            {
                name: 'for="title"',
                kind: { en: 'label attribute', zh: 'label 属性' },
                desc: {
                    en: 'Pairs with the input id: clicking the text focuses the input. Better accessibility and a bigger click target.',
                    zh: '与 input 的 id 配对：点文字即可聚焦输入框，提升可访问性与点击区域。'
                }
            },
            {
                name: '<input type="submit">',
                kind: { en: 'Control', zh: '控件' },
                desc: {
                    en: 'The submit button. submit is the default type, so clicking sends the whole form to action.',
                    zh: '提交按钮。不写 type 时默认就是 submit，点击后把整个表单发往 action。'
                }
            },
            {
                name: '<br>',
                kind: { en: 'Tag', zh: '标签' },
                desc: {
                    en: 'A line break — the simplest possible layout here. Later demos use Bootstrap grid classes instead.',
                    zh: '换行。本例用它做最朴素的排版，后续示例改用 Bootstrap 的栅格类。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: page skeleton and title',
                    zh: '第 1 步：页面骨架与标题'
                },
                code: `<!doctype html><html><head><title>Movie Form 1</title></head><body>
    <h1>Edit movie</h1>
`,
                why: {
                    en: 'Browsers only understand HTML. Before you can collect input there must be a page that opens, so start with the doctype, the html/head/body skeleton and a title.',
                    zh: '浏览器只认识 HTML。要收集用户输入，第一步必须先有一个能被打开的页面，所以先写文档声明、html/head/body 骨架和标题。'
                },
                purpose: {
                    en: 'Fixes the page identity (title “Movie Form 1”) and its purpose (Edit movie). A broken skeleton — a missing </body>, say — makes the form behave unpredictably later.',
                    zh: '确定页面身份（标题 Movie Form 1）与用途（Edit movie）。骨架写错（例如漏了 </body>）后面的表单行为就会变得不可预测。'
                }
            },
            {
                title: {
                    en: 'Step 2: the <form> tag, which also plants GET data',
                    zh: '第 2 步：写 <form>，同时埋下 GET 数据'
                },
                code: `    <!-- method="POST"：表单字段（title、price）通过 POST 请求体提交，不会出现在 URL 中
         action 里的 ?id=1022 属于 URL 查询字符串，会以 GET 方式传给处理脚本
         因此处理脚本可以同时用 INPUT_POST 和 INPUT_GET 读取数据（混合请求） -->
    <form method="POST" action="/week04/01_mixed_request_process.php?id=1022">
`,
                why: {
                    en: 'You must say who receives the data and how. POST is chosen because title / price are user input and should not sit in the address bar; id=1022 is information the page already knows (which record is being edited), and that kind of information conventionally lives in the URL.',
                    zh: '需要指定「数据交给谁、怎么交」。method 选 POST 是因为 title/price 是用户输入，不该暴露在地址栏；而 id=1022 是页面自身就知道的信息（例如正在编辑哪一条记录），这类信息习惯上直接放在 URL 上。'
                },
                purpose: {
                    en: 'Creates the core scenario of this demo: one request that contains both POST data and GET data, so the next chapter can show that PHP must read them separately.',
                    zh: '制造本例的核心场景：同一个请求里既有 POST 数据又有 GET 数据。这样下一章才能演示「PHP 端必须分开取」。'
                }
            },
            {
                title: {
                    en: 'Step 3: the first input — Title',
                    zh: '第 3 步：第一个输入项 Title'
                },
                code: `        <!-- label 的 for 与 input 的 id 对应：点击文字即可聚焦到输入框（可访问性） -->
        <label for="title">Title: </label><input name="title" id="title">
        <br>
`,
                why: {
                    en: 'We need a control for the title. Only an input with a name is submitted, so name="title" is the crucial part of this step.',
                    zh: '需要一个让用户输入标题的控件。只有带 name 的 input 才会被提交，所以 name="title" 是本步的关键。'
                },
                purpose: {
                    en: 'Establishes the mapping “page field name → server variable name”: writing name="title" here means PHP later reads \'title\'. The label + id pair makes clicking friendlier.',
                    zh: '建立「页面字段名 → 服务端变量名」的对应关系：这里写 name="title"，PHP 端就要用 \'title\' 去取。label+id 的配对则让鼠标点击更友好。'
                }
            },
            {
                title: {
                    en: 'Step 4: the second input — Price',
                    zh: '第 4 步：第二个输入项 Price'
                },
                code: `        <label for="price">Price: </label><input name="price" id="price">
        <br>
`,
                why: {
                    en: 'The form collects two fields, so repeat the same pattern: the same label + id pairing and the same mandatory name.',
                    zh: '表单要收集两个字段，照同样套路再写一个输入框：同样的 label+id 配对，同样的 name 必填。'
                },
                purpose: {
                    en: 'Builds a repeated “one name / one value” structure: as many named controls as the form has, so many values the server can read.',
                    zh: '形成「一对 name/value」的重复结构。你会看到表单里有多少个带 name 的控件，服务端就能取到多少个值。'
                }
            },
            {
                title: {
                    en: 'Step 5: the submit button and closing tags',
                    zh: '第 5 步：提交按钮与收尾标签'
                },
                code: `        <!-- 提交按钮：默认 type="submit"，点击后把表单发往 action 指定的地址 -->
        <input type="submit">
    </form>
    </body>
</html>
`,
                why: {
                    en: 'A form needs a trigger, otherwise the user has no way to submit it. </form> decides which controls belong to the form; leaving it out breaks submission.',
                    zh: '表单必须有「触发者」，否则用户填完无从提交；</form> 决定哪些控件属于这个表单，漏写会导致提交行为异常。'
                },
                purpose: {
                    en: 'Packages every named field into one request and closes the HTML document properly so the browser parses it without surprises.',
                    zh: '把前面所有带 name 的字段打包成一个请求发出去，并正确闭合 HTML 文档，保证浏览器解析无误。'
                }
            }
        ]
    },

    {
        key: '01-mixed-process',
        file: '01_mixed_request_process.php',
        group: {
            en: '01 Mixed request: GET + POST in the same request',
            zh: '01 混合请求：GET + POST 同时存在'
        },
        title: {
            en: 'Mixed-request handler (logic + template, two stages)',
            zh: '混合请求处理脚本（逻辑 + 模板两段式）'
        },
        goal: {
            en: 'Read the GET id and the POST title / price out of the same request and display them.',
            zh: '从同一个请求里分别取出 GET 的 id 和 POST 的 title / price，并把它们显示出来。'
        },
        run: {
            en: 'Not opened directly — 01_mixed_request.html submits to it. The page prints three lines: id / title / price.',
            zh: '不要直接访问，由 01_mixed_request.html 提交后跳转过来，页面显示 id / title / price 三行。'
        },
        notice: {
            en: 'This is a handler script. Opening it straight from the address bar still runs, but id, title and price will all be empty because nothing was sent to it.',
            zh: '这个文件是「处理脚本」，单独在地址栏打开也能跑，但 id、title、price 都取不到值（显示为空），因为没有数据传进来。'
        },
        terms: [
            {
                name: '<?php ... ?>',
                kind: { en: 'PHP tag', zh: 'PHP 标记' },
                desc: {
                    en: 'Enters / leaves PHP mode. Anything outside the tags is sent to the browser unchanged.',
                    zh: '进入 / 退出 PHP 模式。标记外的内容原样输出给浏览器。'
                }
            },
            {
                name: 'filter_input()',
                kind: { en: 'PHP function', zh: 'PHP 函数' },
                desc: {
                    en: 'Reads a variable from a given source (GET / POST / COOKIE …) with optional filtering. Safer than using $_GET / $_POST directly.',
                    zh: '从指定来源（GET/POST/COOKIE 等）读取变量并可选过滤。比直接 $_GET / $_POST 安全。'
                }
            },
            {
                name: 'INPUT_GET',
                kind: { en: 'Constant', zh: '常量' },
                desc: {
                    en: 'First argument of filter_input: “read from the URL query string”.',
                    zh: 'filter_input 的第一个参数之一，表示「从 URL 查询字符串里取」。'
                }
            },
            {
                name: 'INPUT_POST',
                kind: { en: 'Constant', zh: '常量' },
                desc: {
                    en: 'First argument of filter_input: “read from the POST request body”.',
                    zh: 'filter_input 的第一个参数之一，表示「从 POST 请求体里取」。'
                }
            },
            {
                name: '$id',
                kind: { en: 'Variable', zh: '变量' },
                desc: {
                    en: 'Holds the value of ?id=1022 from the URL — GET data.',
                    zh: '保存 URL 上 ?id=1022 的值，属于 GET 数据。'
                }
            },
            {
                name: '$title / $price',
                kind: { en: 'Variable', zh: '变量' },
                desc: {
                    en: 'Hold the values the user typed into the form — POST data.',
                    zh: '保存表单里用户填写的字段，属于 POST 数据。'
                }
            },
            {
                name: '<?= $id ?>',
                kind: { en: 'Short echo tag', zh: '短输出标记' },
                desc: {
                    en: 'Short form of <?php echo $id; ?> — prints the value of a variable into the HTML.',
                    zh: '<?php echo $id; ?> 的简写，把变量的值输出到 HTML 里。'
                }
            },
            {
                name: 'LOGIC / VIEW',
                kind: { en: 'Layering', zh: '代码分层' },
                desc: {
                    en: 'Fetch the data first, then output HTML. Keeping the two apart means restyling never touches the data-fetching code.',
                    zh: '先取数据（逻辑）、再输出 HTML（模板）。两段分开，改样式时不会动到取数据的代码。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: enter PHP mode and mark the “logic” area',
                    zh: '第 1 步：进入 PHP 模式，划出「逻辑区」'
                },
                code: `<?php
// ---- (1) 逻辑处理（LOGIC）：先取数据，再交给下面的模板显示 -----

`,
                why: {
                    en: 'The first job of a handler is to get hold of the data, not to print HTML. So the file opens in PHP mode and a comment marks the logic area.',
                    zh: '处理脚本要做的第一件事是「把数据取到手」，而不是急着输出 HTML。所以文件一开头就进入 PHP 模式，并用注释划出逻辑区。'
                },
                purpose: {
                    en: 'Sets the writing order used by every PHP page: fetch data → store in variables → output last.',
                    zh: '建立「先逻辑、后模板」的书写顺序：取数据 → 存进变量 → 最后才输出。这是所有 PHP 页面最通用的骨架。'
                }
            },
            {
                title: {
                    en: 'Step 2: read id from the URL with INPUT_GET',
                    zh: '第 2 步：用 INPUT_GET 取 URL 上的 id'
                },
                code: `// filter_input(INPUT_GET, 'id')
//   从 URL 查询字符串（query string）里读取名为 id 的参数。
//   对应表单 action="/...process.php?id=1022" 中 ?id=1022 这部分。
//   filter_input 会对输入做过滤/净化，比直接 $_GET['id'] 更安全。
//   若参数不存在则返回 null（或 false，取决于版本）。
$id = filter_input(INPUT_GET,'id');
`,
                why: {
                    en: 'id lives in the query string of action, not in the form fields, so PHP has to be told explicitly to look in GET.',
                    zh: 'id 写在 action 的查询字符串里，它不属于表单字段，只存在于 URL，因此必须明确告诉 PHP「去 GET 里找」。'
                },
                purpose: {
                    en: 'Shows that the source must be named explicitly. Using filter_input rather than $_GET builds the habit of filtering input instead of passing raw user data on.',
                    zh: '演示数据来源要「指名道姓」。用 filter_input 而不是 $_GET，是养成过滤输入的习惯，避免把未处理的用户数据直接往下传。'
                }
            },
            {
                title: {
                    en: 'Step 3: read the form field title with INPUT_POST',
                    zh: '第 3 步：用 INPUT_POST 取表单字段 title'
                },
                code: `
// 从 POST 请求体里读取 title（表单里 name="title" 的输入框）
$title = filter_input(INPUT_POST,'title');
`,
                why: {
                    en: 'title is the input named "title" in the form; it travels in the POST body and cannot be found in the URL.',
                    zh: 'title 是表单里 name="title" 的输入框，走的是 POST 请求体，在 URL 里找不到它。'
                },
                purpose: {
                    en: 'Contrasts with step 2: same request, different source argument. The second argument \'title\' must match the HTML name exactly.',
                    zh: '与第 2 步形成对照：同一个请求里，取值的「来源参数」不同。第二个参数 \'title\' 必须和 HTML 里的 name 一模一样。'
                }
            },
            {
                title: {
                    en: 'Step 4: read the form field price with INPUT_POST',
                    zh: '第 4 步：用 INPUT_POST 取表单字段 price'
                },
                code: `
// 从 POST 请求体里读取 price（表单里 name="price" 的输入框）
$price = filter_input(INPUT_POST,'price');
`,
                why: {
                    en: 'price travels by POST as well and needs its own line — filter_input reads one variable per call.',
                    zh: 'price 同理走 POST，需要单独取一次。filter_input 一次只能取一个变量，所以每个字段都要写一行。'
                },
                purpose: {
                    en: 'Fetches every field the template needs. Miss one and the user typed it for nothing.',
                    zh: '把需要的字段一个不漏地取出来。漏取就等于用户白填，后面的模板也就没东西可显示。'
                }
            },
            {
                title: {
                    en: 'Step 5: point out the “mixed request”, then leave PHP mode',
                    zh: '第 5 步：说明「混合请求」，关闭 PHP 模式'
                },
                code: `
// 注意：同一个 HTTP 请求可以同时带 GET 和 POST 数据，
// 这就是本例"混合请求（mixed request）"的含义。

?>
`,
                why: {
                    en: 'The three lines above used two different sources, which looks contradictory but is exactly the point of the demo — so a comment says so. Once the data is in hand we leave PHP mode; from here it is plain HTML.',
                    zh: '前面三行分别用了两个不同的来源，看起来矛盾，其实正是本例要讲的点，所以用注释点明。取完数据后退出 PHP 模式，接下来是纯 HTML。'
                },
                purpose: {
                    en: 'Separates the logic area from the template area. Everything after ?> is sent to the browser as-is and is no longer executed as PHP.',
                    zh: '把「逻辑区」和「模板区」明确断开。?> 之后的内容会被原样发给浏览器，不再当作 PHP 执行。'
                }
            },
            {
                title: {
                    en: 'Step 6: the HTML template prints the variables',
                    zh: '第 6 步：HTML 模板，把变量显示出来'
                },
                code: `
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
`,
                why: {
                    en: 'Data has to be shown somewhere, otherwise you cannot check that it was read correctly. The template does one thing only: drop variables into HTML.',
                    zh: '数据取到了要有地方展示，否则无法验证取得对不对。模板里只做一件事：把变量插进 HTML。'
                },
                purpose: {
                    en: 'Demonstrates the <?= ?> short tag and the layering idea “the template never fetches data” — there is no filter_input anywhere in it, only variables.',
                    zh: '演示 <?= ?> 短输出标记的写法，以及「模板不负责取数据」的分层思想 —— 模板里看不到任何 filter_input，只有变量。'
                }
            }
        ]
    },

    /* ===================== 02 multiple buttons ===================== */
    {
        key: '02-buttons-html',
        file: '02_multiple_buttons.html',
        group: {
            en: '02 Several submit buttons: which one was clicked?',
            zh: '02 多个提交按钮：区分用户点了哪个'
        },
        title: {
            en: 'Movie rental payment form (two submit buttons)',
            zh: '租片付款表单（两个 submit 按钮）'
        },
        goal: {
            en: 'Put two submit buttons in one form so the user can choose “watch now” or “watch later”.',
            zh: '一个表单放两个提交按钮，让用户选择「立即观看」还是「稍后观看」。'
        },
        run: {
            en: 'Open http://localhost:8000/week04/02_multiple_buttons.html, fill in the credit-card details and try each of the two green buttons once.',
            zh: '访问 http://localhost:8000/week04/02_multiple_buttons.html，填信用卡信息，分别点两个绿色按钮各试一次。'
        },
        terms: [
            {
                name: 'Bootstrap CDN',
                kind: { en: '<link> include', zh: '<link> 引入' },
                desc: {
                    en: 'Loads ready-made CSS from a CDN — no styles to write, just use classes such as btn / container.',
                    zh: '从 CDN 加载现成 CSS，不必自己写样式，直接用 btn / container 等类名。'
                }
            },
            {
                name: 'class="container"',
                kind: { en: 'Bootstrap class', zh: 'Bootstrap 类' },
                desc: {
                    en: 'Gives the body a centred, fixed-width container so the page does not hug the edges.',
                    zh: '给 body 一个居中的固定宽度容器，页面不会贴边。'
                }
            },
            {
                name: 'name="number" / "date" / "ccv"',
                kind: { en: 'input attribute', zh: 'input 属性' },
                desc: {
                    en: 'Submit keys for card number, expiry date and CCV. Sensitive information — which is why the whole form uses POST.',
                    zh: '信用卡号、有效期、CCV 的提交键名。这些是敏感信息，所以整个表单用 POST。'
                }
            },
            {
                name: 'name="watchNow"',
                kind: { en: 'submit attribute', zh: 'submit 属性' },
                desc: {
                    en: 'Name of the first submit button. Only the clicked button submits its own name / value.',
                    zh: '第一个提交按钮的名字。只有被点击的按钮才会提交自己的 name/value。'
                }
            },
            {
                name: 'name="watchLater"',
                kind: { en: 'submit attribute', zh: 'submit 属性' },
                desc: {
                    en: 'Name of the second submit button; appears mutually exclusively with watchNow.',
                    zh: '第二个提交按钮的名字，与 watchNow 互斥地出现。'
                }
            },
            {
                name: 'value="Pay and start watching now"',
                kind: { en: 'submit attribute', zh: 'submit 属性' },
                desc: {
                    en: 'Both the text shown on the button and the value sent along with the request.',
                    zh: '既是按钮上显示的文字，也是提交时一并发送的值。'
                }
            },
            {
                name: 'class="btn btn-success"',
                kind: { en: 'Bootstrap class', zh: 'Bootstrap 类' },
                desc: {
                    en: 'btn makes it look like a button; btn-success is the green “confirm / success” colour.',
                    zh: 'btn 做成按钮外观，btn-success 是绿色（表示「确认/成功」语义）。'
                }
            },
            {
                name: 'movieId=80441',
                kind: { en: 'Query string', zh: '查询字符串' },
                desc: {
                    en: 'More GET data: tells the server which film is being rented — the same trick as ?id=1022 in demo 01.',
                    zh: '又是 GET 数据：告诉服务端租的是哪部电影，与 01 的 ?id=1022 同一套路。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: pull in Bootstrap styles',
                    zh: '第 1 步：引入 Bootstrap 样式'
                },
                code: `<!doctype html><html><head><title>Movie Rent Form 1</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    >
</head>
`,
                why: {
                    en: 'This page needs two decent-looking buttons. Writing the CSS by hand is noise, so load an existing stylesheet instead.',
                    zh: '这一页要做出「两个像样的按钮」，自己写 CSS 太啰嗦，直接引入现成的 Bootstrap 样式表最省事。'
                },
                purpose: {
                    en: 'Keeps the demo focused on PHP logic instead of layout. From here, class="btn btn-success" is enough to get a green button.',
                    zh: '让示例专注于 PHP 逻辑而不是排版。后面只要加 class="btn btn-success" 就能得到绿色按钮。'
                }
            },
            {
                title: {
                    en: 'Step 2: container, heading and the form opening tag',
                    zh: '第 2 步：容器、标题与表单首行'
                },
                code: `<body class="container">
<h1>Rent movie</h1>
<!-- 表单以 POST 提交，movieId 通过 URL 查询字符串传递 -->
<form method="POST" action="/week04/02_multiple_process.php?movieId=80441">
`,
                why: {
                    en: 'Credit-card details must never appear in the address bar (browser history and bookmarks would keep them), so method has to be POST; the movie id is locating information and stays in the URL.',
                    zh: '信用卡信息绝不能出现在地址栏（会被浏览器历史、书签记录），所以 method 必须是 POST；而电影 id 属于定位信息，继续放在 URL 上。'
                },
                purpose: {
                    en: 'Reinforces “one request can carry GET and POST at once”, and shows the rule of thumb that POST suits sensitive data.',
                    zh: '再次巩固「同一个请求可以同时有 GET 和 POST」，同时体现 POST 适合敏感数据这一取舍原则。'
                }
            },
            {
                title: {
                    en: 'Step 3: the three credit-card inputs',
                    zh: '第 3 步：三个信用卡输入项'
                },
                code: `    <p><label for="number">Credit card number:</label>
        <input name="number" id="number"></p>
    <p><label for="date">
            Expiry date:</label>
        <input name="date" id="date"></p>
    <p><label for="ccv">
            CCV code:</label>
        <input name="ccv" id="ccv"></p>
`,
                why: {
                    en: 'Payment needs three pieces of information and each must be submitted, so each needs a name; label / for makes them easy to click.',
                    zh: '付款需要三项信息，每项都要能提交，所以每项都必须有 name；同时配上 label/for 便于点击。'
                },
                purpose: {
                    en: 'Shows the bulk pattern for form fields: identical structure, only the name differs. The server will read these three names.',
                    zh: '展示表单字段的批量写法：结构完全重复，只是 name 不同。服务端将来就靠这三个 name 取值。'
                }
            },
            {
                title: {
                    en: 'Step 4: two submit buttons (the core of this chapter)',
                    zh: '第 4 步：两个提交按钮（本章核心）'
                },
                code: `    <p>
        <!-- 多个提交按钮的关键：只有"被点击的那个"按钮的 name/value 会被提交，
             其它按钮不会提交。因此服务端只要判断哪个 name 存在，
             就知道用户点了哪个按钮。value 是按钮上显示的文字，也会一并提交。 -->
        <input type="submit" name="watchNow"
               value="Pay and start watching now" class="btn btn-success">
        <input type="submit" name="watchLater"
               value="Pay and watch later" class="btn btn-success">
        <!-- class="btn btn-success" 是 Bootstrap 的按钮样式（绿色） -->
    </p>
`,
                why: {
                    en: 'The user has two different intentions but the form can only be submitted once. The fix: give each button a different name — whichever is clicked is the one whose name appears in the request.',
                    zh: '用户有两个不同的意图，但表单只能提交一次。解决办法是：给每个按钮一个不同的 name，谁被点，谁的名字才会出现在请求里。'
                },
                purpose: {
                    en: 'Encodes the user’s intention into the request data. The server never guesses — it only checks which name exists. This is the standard way to handle multi-button forms.',
                    zh: '把「用户意图」编码进请求数据。服务端不需要猜，只要检查哪个 name 存在即可分分支 —— 这是多按钮表单的标准做法。'
                }
            },
            {
                title: {
                    en: 'Step 5: close the form and the page',
                    zh: '第 5 步：闭合表单与页面'
                },
                code: `</form>
</body>
</html>
`,
                why: {
                    en: 'Both buttons sit inside <form> so that this form collects them; the closing tags keep the structure valid.',
                    zh: '两个按钮都写在 <form> 内部，才会被这个表单收集；闭合标签保证结构合法。'
                },
                purpose: {
                    en: 'Stresses the precondition “the button must be inside the form” — a button placed outside carries no data at all.',
                    zh: '强调「按钮必须在表单内」这个前提：放在 form 外的按钮不会带任何数据。'
                }
            }
        ]
    },

    {
        key: '02-buttons-process',
        file: '02_multiple_process.php',
        group: {
            en: '02 Several submit buttons: which one was clicked?',
            zh: '02 多个提交按钮：区分用户点了哪个'
        },
        title: {
            en: 'Detecting which button was clicked (filter_has_var)',
            zh: '判断点了哪个按钮（filter_has_var）'
        },
        goal: {
            en: 'Branch on the button name that appears in the request and print a different result for each.',
            zh: '根据请求里出现的按钮名字，走不同的分支并输出不同结果。'
        },
        run: {
            en: 'Called by 02_multiple_buttons.html: the first button prints “You selected WatchNow”, the second prints “You selected WatchLater”.',
            zh: '由 02_multiple_buttons.html 提交后调用：点第一个按钮显示 You selected WatchNow，点第二个显示 You selected WatchLater。'
        },
        terms: [
            {
                name: 'filter_has_var()',
                kind: { en: 'PHP function', zh: 'PHP 函数' },
                desc: {
                    en: 'Tests whether a variable of the given name exists in a source (INPUT_POST here). Returns true / false.',
                    zh: '判断某个来源（这里是 INPUT_POST）里是否存在指定名字的变量，返回 true / false。'
                }
            },
            {
                name: "'watchNow'",
                kind: { en: 'String argument', zh: '字符串参数' },
                desc: {
                    en: 'The variable name to check. It must match the button name exactly and is case-sensitive.',
                    zh: '要检查的变量名，必须和按钮的 name 完全一致，区分大小写。'
                }
            },
            {
                name: 'print',
                kind: { en: 'PHP statement', zh: 'PHP 语句' },
                desc: {
                    en: 'Outputs a string (a close relative of echo); here it simply prints the result as the page body.',
                    zh: '输出字符串（echo 的近亲），这里直接把结果打印成页面正文。'
                }
            },
            {
                name: 'if / else',
                kind: { en: 'Control structure', zh: '控制结构' },
                desc: {
                    en: 'A two-way branch: WatchNow when the condition holds, otherwise WatchLater.',
                    zh: '二选一分支：条件成立走 WatchNow，否则走 WatchLater。'
                }
            },
            {
                name: "isset($_POST['watchNow'])",
                kind: { en: 'Equivalent', zh: '等价写法' },
                desc: {
                    en: 'Another common way to test whether a button was clicked; behaves the same as filter_has_var.',
                    zh: '判断按钮是否被点击的另一种常见写法，效果与 filter_has_var 相同。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: does watchNow exist? If so, print WatchNow',
                    zh: '第 1 步：判断 watchNow 是否存在，成立则输出 WatchNow'
                },
                code: `<?php
// filter_has_var(INPUT_POST, 'watchNow')
//   判断 POST 请求中是否存在名为 watchNow 的变量。
//   因为只有被点击的提交按钮才会把自己的 name 提交上来，
//   所以"存在 watchNow"就等价于"用户点了 WatchNow 按钮"。
if(filter_has_var(INPUT_POST, 'watchNow')){
    print 'You selected WatchNow';
}
`,
                why: {
                    en: 'Only the request data can tell us which button was clicked. If watchNow is present, that is where the click came from, so take the “watch now” branch.',
                    zh: '用户点了哪个按钮，只有请求数据能告诉我们。watchNow 出现 ⇒ 点击来源就是它，于是走「立即观看」分支。'
                },
                purpose: {
                    en: 'Asks “does the variable exist?” instead of “is the value equal to X?” — shorter and sturdier, because the value may change with copy or translation while the name usually does not.',
                    zh: '用「变量是否存在」代替「判断 value 等于什么」，代码更短也更稳（value 可能因为翻译、改文案而变，name 不会随便变）。'
                }
            },
            {
                title: {
                    en: 'Step 2: otherwise the other button was clicked',
                    zh: '第 2 步：否则就是点了另一个按钮'
                },
                code: `else{
    // 否则说明提交来自另一个按钮（watchLater）
    print 'You selected WatchLater';
}
`,
                why: {
                    en: 'There are only two buttons here, so once watchNow is ruled out what remains must be watchLater — no second test needed.',
                    zh: '本例只有两个按钮，排除了 watchNow，剩下的就只可能是 watchLater，所以不需要再判断一次。'
                },
                purpose: {
                    en: 'Shows the smallest usable two-branch form, while the comment warns that this “else catch-all” stops being safe once there are more buttons.',
                    zh: '展示最小可用的二分支写法；注释也提醒你：按钮变多时这种「else 兜底」就不够严谨了。'
                }
            },
            {
                title: {
                    en: 'Step 3: a note about the equivalent form',
                    zh: '第 3 步：补充说明等价写法'
                },
                code: `
// 补充：也可以用 isset($_POST['watchNow']) 达到同样效果。
// 更严谨的写法是先检查 watchLater 是否真的存在，再判断两者都不存在的情况。
`,
                why: {
                    en: 'The classroom example is deliberately minimal, but in a real project neither button may exist (for example if the user opens this page directly) and the code would wrongly report WatchLater.',
                    zh: '课堂示例故意保持最简，但真实项目里可能两个按钮都不存在（例如用户直接访问本页），此时会误报 WatchLater。'
                },
                purpose: {
                    en: 'Leaves the improvement open: replace else with elseif(filter_has_var(..., \'watchLater\')) and add a default branch for “neither exists” — then the logic is genuinely complete.',
                    zh: '留下改进方向：把 else 换成 elseif(filter_has_var(...,\'watchLater\'))，再加一个「都不存在」的默认分支，逻辑才真正完备。'
                }
            }
        ]
    },

    /* ===================== 03 links as buttons ===================== */
    {
        key: '03-button-links',
        file: '03_button_links.php',
        group: {
            en: '03 Links as buttons: putting data in the URL',
            zh: '03 用链接当按钮：把数据放进 URL'
        },
        title: {
            en: 'Shopping basket (array loop + id in the link)',
            zh: '购物篮列表（数组循环 + 链接传 id）'
        },
        goal: {
            en: 'Send data without a form: loop over a PHP array to build a product list, and put the id into the URL of each hyperlink.',
            zh: '不用表单也能传数据：用 PHP 数组循环生成商品列表，每行用超链接把 id 拼进 URL。'
        },
        run: {
            en: 'Open http://localhost:8000/week04/03_button_links.php directly. Hover Details and the browser shows /show.php?id=123.',
            zh: '直接访问 http://localhost:8000/week04/03_button_links.php。悬停 Details 按钮可在浏览器左下角看到 /show.php?id=123。'
        },
        notice: {
            en: '/show.php is not shipped with the demo, so clicking Details gives a 404 — that is expected. What matters is the shape of the URL.',
            zh: '课堂演示里 /show.php 这个文件并未提供，点 Details 会 404，这是正常现象，重点看 URL 长什么样。'
        },
        terms: [
            {
                name: '$items',
                kind: { en: 'Variable (2-D array)', zh: '变量（二维数组）' },
                desc: {
                    en: 'The data source. Each element is an associative array representing one product; in a real project it usually comes from a database query.',
                    zh: '数据源。每个元素是一条关联数组，代表一件商品；真实项目里通常来自数据库查询结果。'
                }
            },
            {
                name: "'id' / 'desc' / 'price'",
                kind: { en: 'Array keys', zh: '数组键名' },
                desc: {
                    en: 'Fields of one product: id, description, price. Read them with $item[\'desc\'] and friends.',
                    zh: '一条商品的字段：编号、描述、价格。用 $item[\'desc\'] 这样的写法取值。'
                }
            },
            {
                name: 'foreach(...):',
                kind: { en: 'Loop (alternative syntax)', zh: '循环（替代语法）' },
                desc: {
                    en: 'The colon form of the loop, closed by endforeach; easier to read than braces when mixed with HTML.',
                    zh: '冒号开头的循环写法，配合 endforeach 收尾；混排 HTML 时比大括号更好读。'
                }
            },
            {
                name: '$item',
                kind: { en: 'Loop variable', zh: '循环变量' },
                desc: {
                    en: 'In each pass it holds the current product (one associative array).',
                    zh: '每一轮代表当前这一件商品（一条关联数组）。'
                }
            },
            {
                name: 'endforeach;',
                kind: { en: 'End of loop', zh: '循环结束' },
                desc: {
                    en: 'Closing marker of the alternative syntax. Do not forget the semicolon — omitting it is a syntax error.',
                    zh: '替代语法的收尾标记，别忘了分号，漏写会报语法错误。'
                }
            },
            {
                name: '<a href="/show.php?id=...">',
                kind: { en: 'Hyperlink', zh: '超链接' },
                desc: {
                    en: 'Puts the id into the query string; clicking requests the detail page with GET.',
                    zh: '把 id 拼进查询字符串，点击即以 GET 方式请求详情页面。'
                }
            },
            {
                name: 'class="btn btn-primary"',
                kind: { en: 'Bootstrap class', zh: 'Bootstrap 类' },
                desc: {
                    en: 'Dresses an <a> as the blue primary button — it looks like a button but is still a link.',
                    zh: '把 <a> 打扮成蓝色主按钮的外观，看起来像按钮但本质是链接。'
                }
            },
            {
                name: 'col-lg-3 / text-end / py-2',
                kind: { en: 'Bootstrap utilities', zh: 'Bootstrap 工具类' },
                desc: {
                    en: 'Grid width, right-aligned text, vertical padding — pure layout.',
                    zh: '栅格宽度、文字右对齐、上下内边距，纯排版用。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: prepare the data source (a 2-D array)',
                    zh: '第 1 步：准备数据源（二维数组）'
                },
                code: `<?php
// 准备数据源：一个"二维数组"，每个元素是一条关联数组（表示一件商品）
// 真实项目中这些数据通常来自数据库查询结果
$items = [
    ['id'=>123, 'desc' => 'Hammer', 'price'=>9.99],
    ['id'=>234, 'desc' => 'A bucket of nails', 'price'=>19.99]
];
?>
`,
                why: {
                    en: 'The page shows several rows, so the easiest approach is to put the data in an array first and let the template loop over it. Hard-coding the array keeps the demo free of database dependencies.',
                    zh: '页面要显示多行商品，最省事的写法是先把数据放进数组，再交给模板去循环。写死数组是为了让示例不依赖数据库。'
                },
                purpose: {
                    en: 'Separates data from display: swap $items for a database result later and not one line of the template changes. This is the seed of a data-driven page.',
                    zh: '把「数据」和「显示」分开：将来把 $items 换成数据库查询结果，模板部分一行都不用改。这就是数据驱动页面的雏形。'
                }
            },
            {
                title: {
                    en: 'Step 2: HTML head and Bootstrap',
                    zh: '第 2 步：HTML 头部与 Bootstrap'
                },
                code: `
<!doctype html><html><head><title>Basket From Array</title>
    <!-- 引入 Bootstrap CDN 样式，让按钮等元素有现成外观 -->
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    >
</head>
`,
                why: {
                    en: 'Once the data is ready it has to be rendered, so write the HTML head and load the stylesheet that gives the list and buttons a finished look.',
                    zh: '数据准备好后要渲染成页面，先写 HTML 头部并引入样式，让列表和按钮有现成外观。'
                },
                purpose: {
                    en: 'Continues the “PHP data first, HTML template second” order and keeps the visual style consistent (still Bootstrap).',
                    zh: '延续「先 PHP 数据、后 HTML 模板」的顺序，同时保持视觉一致（沿用 Bootstrap）。'
                }
            },
            {
                title: {
                    en: 'Step 3: page heading and the start of the foreach loop',
                    zh: '第 3 步：页面标题与 foreach 循环开始'
                },
                code: `<body class="container">
<h1>Your shopping basket</h1>
<!-- foreach 的替代语法（冒号 + endforeach）：在混排 HTML 时比大括号更易读
     循环 $items，每次把当前元素赋给 $item -->
<?php foreach($items as $item): ?>
`,
                why: {
                    en: 'The number of products is not fixed, so you cannot copy the row HTML twice — it has to be generated by a loop. When mixing with HTML, the colon syntax reads far better than braces.',
                    zh: '商品数量不固定，不能把每行 HTML 抄两遍，必须用循环生成。混排 HTML 时用冒号语法，可读性远好于花括号。'
                },
                purpose: {
                    en: 'Demonstrates the alternative foreach syntax: <?php foreach(...): ?> ... <?php endforeach; ?>. Plain HTML inside the loop body is output once per pass.',
                    zh: '演示 foreach 的替代语法：<?php foreach(...): ?> ... <?php endforeach; ?>。循环体内的普通 HTML 会被重复输出。'
                }
            },
            {
                title: {
                    en: 'Step 4: inside the loop, print description and price',
                    zh: '第 4 步：循环体内输出商品名与价格'
                },
                code: `    <!-- col-lg-3 / text-end / py-2 都是 Bootstrap 的栅格与间距工具类 -->
    <div class="col-lg-3 text-end py-2">
        <?= $item['desc'] ?>
        <?= $item['price'] ?>
`,
                why: {
                    en: 'Every product needs its description and price, and those values come from the current $item associative array, so read them with $item[\'desc\'] and $item[\'price\'].',
                    zh: '每件商品都要显示描述和价格，值来自当前这一轮的 $item 关联数组，所以用 $item[\'desc\']、$item[\'price\'] 取值。'
                },
                purpose: {
                    en: 'Maps “array keys” onto “page content”. The outer div only handles layout — one line of code per field, clear and easy to change.',
                    zh: '把「数组的键」映射到「页面上的内容」。外层 div 只负责排版，一行代码对应一个字段，清楚好改。'
                }
            },
            {
                title: {
                    en: 'Step 5: put the id into the URL with a hyperlink (core of this chapter)',
                    zh: '第 5 步：用超链接把 id 拼进 URL（本章核心）'
                },
                code: `        <!-- 用超链接充当"按钮"：把商品 id 拼进 URL 的查询字符串，
             点击后以 GET 方式请求 /show.php?id=xxx，服务端再按 id 查询详情 -->
        <a href="/show.php?id=<?= $item['id'] ?>" class="btn btn-primary">Details</a>
    </div>
`,
                why: {
                    en: 'To jump from the list to a detail page, the next page has to be told which product it is. A hyperlink plus a query string is the lightest way — no form required at all.',
                    zh: '想从列表跳到详情页，就必须把「是哪一件商品」告诉下一个页面。超链接 + 查询字符串是最轻量的办法，连表单都不需要。'
                },
                purpose: {
                    en: 'Shows the classic GET use case: links (GET) to read details, forms (POST) to change data. <?= $item[\'id\'] ?> also shows that PHP can output inside an HTML attribute.',
                    zh: '展示 GET 传参的典型场景：读详情用链接（GET），改数据才用表单（POST）。<?= $item[\'id\'] ?> 说明 PHP 可以嵌在 HTML 属性里输出。'
                }
            },
            {
                title: {
                    en: 'Step 6: end the loop and close the page',
                    zh: '第 6 步：结束循环并闭合页面'
                },
                code: `<?php endforeach; ?>
</body>
</html>
`,
                why: {
                    en: 'Every foreach needs its endforeach or you get a syntax error; the HTML tags must be closed as well.',
                    zh: '有 foreach 就必须有 endforeach，否则语法错误；HTML 标签也要一一闭合。'
                },
                purpose: {
                    en: 'Wraps up so that each of the two products produces its own div. Remember the semicolon after endforeach.',
                    zh: '收尾，保证两件商品各自输出一个 div。注意 endforeach 后面要带分号。'
                }
            }
        ]
    },

    /* ===================== 04 checkbox array ===================== */
    {
        key: '04-checkboxes-html',
        file: '04_checkboxes_array.html',
        group: {
            en: '04 Checkbox array: one field, several values',
            zh: '04 复选框数组：一个字段提交多个值'
        },
        title: {
            en: 'Pizza toppings form (name with square brackets)',
            zh: '披萨配料多选表单（name 带方括号）'
        },
        goal: {
            en: 'Let the user tick any number of toppings and make the server receive a whole set of values instead of only the last one.',
            zh: '让用户勾选任意多个配料，并且提交后服务端能一次收到「一组值」而不是最后一个。'
        },
        run: {
            en: 'Open http://localhost:8000/week04/04_checkboxes_array.html, tick some boxes and submit — or submit without ticking anything at all.',
            zh: '访问 http://localhost:8000/week04/04_checkboxes_array.html，勾选后提交；也可以一个都不勾直接提交。'
        },
        terms: [
            {
                name: 'method="GET"',
                kind: { en: 'form attribute', zh: 'form 属性' },
                desc: {
                    en: 'GET is deliberate here so you can see the result in the address bar: ?toppings[]=olives&toppings[]=pepper.',
                    zh: '本例故意用 GET，好让你在地址栏直接看到提交后的样子：?toppings[]=olives&toppings[]=pepper。'
                }
            },
            {
                name: 'name="toppings[]"',
                kind: { en: 'input attribute (key point)', zh: 'input 属性（重点）' },
                desc: {
                    en: 'The brackets tell the browser “this field is an array”, so PHP receives an array. Without [] a repeated name keeps only the last value.',
                    zh: '方括号告诉浏览器「这个字段是数组」，PHP 端才会收到数组；不加 [] 同名只会保留最后一个值。'
                }
            },
            {
                name: 'value="olives"',
                kind: { en: 'input attribute', zh: 'input 属性' },
                desc: {
                    en: 'The value actually submitted when the box is ticked. The text shown to the user (Olives) and the value may differ.',
                    zh: '勾选后真正提交的值。显示给用户看的文字（Olives）与提交的值可以不同。'
                }
            },
            {
                name: '<label> wrapping <input>',
                kind: { en: 'Tag usage', zh: '标签用法' },
                desc: {
                    en: 'Putting the input inside the label means clicking the text ticks the box — no for / id pairing needed.',
                    zh: '把 input 放进 label 里，点文字等于点选框，不需要 for/id 配对。'
                }
            },
            {
                name: 'type="checkbox"',
                kind: { en: 'Control type', zh: '控件类型' },
                desc: {
                    en: 'A checkbox. An unticked checkbox does not appear in the submitted data at all — unlike a text box.',
                    zh: '复选框。未勾选的复选框根本不会出现在提交数据中（这点与文本框不同）。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: head and Bootstrap',
                    zh: '第 1 步：头部与 Bootstrap'
                },
                code: `<!doctype html><html><head><title>Checkboxes array</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    >
</head>
`,
                why: {
                    en: 'As on the previous pages: skeleton plus stylesheet first, so attention stays on the form itself.',
                    zh: '和前面几页一样，先写页面骨架并引入 Bootstrap，把注意力留给表单本身。'
                },
                purpose: {
                    en: 'Keeps the examples consistent and shows that this “page scaffolding” part is the same routine every time.',
                    zh: '保持示例风格统一，也说明「页面结构」这部分是每页都一样的固定套路。'
                }
            },
            {
                title: {
                    en: 'Step 2: form opening tag (GET, so you can watch it)',
                    zh: '第 2 步：表单首行（method 用 GET 便于观察）'
                },
                code: `<body class="container">
<h1>Extra pizza toppings</h1>
<!-- method="GET"：提交后数据会显示在 URL 查询字符串中，例如
     .../04_checkboxes_process.php?toppings[]=olives&toppings[]=pepper -->
<form method="GET" action="/week04/04_checkboxes_process.php">
`,
                why: {
                    en: 'This chapter is about how several values travel, and GET puts the array parameters right there in the address bar — visible means learnable.',
                    zh: '这一章要讲清楚「多个值是怎么传的」，用 GET 提交后地址栏会原样显示数组参数，看得见才学得明白。'
                },
                purpose: {
                    en: 'Makes the submission visible: you will see toppings[] appear several times. Real projects usually POST multi-select forms, but reading the values works exactly the same.',
                    zh: '让提交结果可视化：你会看到 toppings[] 出现多次。真实项目里多选表单通常用 POST，但取值方式完全一样。'
                }
            },
            {
                title: {
                    en: 'Step 3: three checkboxes sharing one name (core of this chapter)',
                    zh: '第 3 步：三个共用同一名字的复选框（本章核心）'
                },
                code: `    <p><label>
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
`,
                why: {
                    en: 'The three toppings are “the same kind of data”, so they must belong to one field for the server to treat them as a group. Sharing the name is not enough — the [] is what makes it an array.',
                    zh: '三个配料是「同一类数据」，必须让它们属于同一个字段，服务端才好当成一组来处理。名字相同还不够，必须加 [] 才会变成数组。'
                },
                purpose: {
                    en: 'This is the trick of the chapter: name="toppings[]". The brackets are a signal to PHP meaning “collect the same-named values into an array”. Wrapping the input in the label saves the for / id pairing.',
                    zh: '这是本章的关键技巧：name="toppings[]"。方括号是给 PHP 的暗号，表示「请把同名的值收集成数组」。label 包住 input 则省去 for/id 配对。'
                }
            },
            {
                title: {
                    en: 'Step 4: submit button and closing tags',
                    zh: '第 4 步：提交按钮与收尾'
                },
                code: `    <p><input type="submit" class="btn btn-primary"></p>
</form>
</body>
</html>
`,
                why: {
                    en: 'Something has to trigger the submission, and all three checkboxes must sit inside <form> to be sent together.',
                    zh: '需要触发提交，并把三个复选框都包在 <form> 内才会被一起发送。'
                },
                purpose: {
                    en: 'Closes the page. Note that when nothing is ticked, the request has no toppings parameter at all — exactly the edge case the next chapter handles.',
                    zh: '闭合页面。注意：一个都不勾时，请求里根本没有 toppings 这个参数 —— 这正是下一章要处理的边界情况。'
                }
            }
        ]
    },

    {
        key: '04-checkboxes-process',
        file: '04_checkboxes_process.php',
        group: {
            en: '04 Checkbox array: one field, several values',
            zh: '04 复选框数组：一个字段提交多个值'
        },
        title: {
            en: 'Reading an array field (FILTER_REQUIRE_ARRAY)',
            zh: '读取数组型字段（FILTER_REQUIRE_ARRAY）'
        },
        goal: {
            en: 'Read the submitted toppings as a PHP array, find out whether anything was ticked, and join them into one sentence.',
            zh: '把提交过来的一组配料读成 PHP 数组，判断有没有选，并拼成一句提示。'
        },
        run: {
            en: 'Called by 04_checkboxes_array.html: ticked boxes print “Your selected toppings are: olives+garlic”; nothing ticked prints “Please select a topping”.',
            zh: '由 04_checkboxes_array.html 提交后调用：勾选显示 Your selected toppings are: olives+garlic，一个都不勾显示 Please select a topping。'
        },
        terms: [
            {
                name: 'FILTER_REQUIRE_ARRAY',
                kind: { en: 'Filter option constant', zh: '过滤选项常量' },
                desc: {
                    en: 'Requires the result to be an array; a scalar input returns false, which prevents “not an array” errors later.',
                    zh: '要求读取结果必须是数组；传来的是标量就返回 false，避免把字符串当数组用而报错。'
                }
            },
            {
                name: 'options:',
                kind: { en: 'Named argument (PHP 8)', zh: '命名参数（PHP 8）' },
                desc: {
                    en: 'The name of the fourth argument of filter_input. Writing options: value lets you skip the arguments before it.',
                    zh: 'filter_input 的第四个参数名，写成 options: 值，可以跳过前面的参数。'
                }
            },
            {
                name: '$toppings',
                kind: { en: 'Variable (array)', zh: '变量（数组）' },
                desc: {
                    en: 'Holds the result, e.g. [\'olives\', \'garlic\']; null or false when nothing was ticked.',
                    zh: '保存勾选结果，例如 [\'olives\', \'garlic\']；一个都没勾时为 null 或 false。'
                }
            },
            {
                name: 'empty()',
                kind: { en: 'PHP function', zh: 'PHP 函数' },
                desc: {
                    en: 'Is it empty? true for null, false and [], which is exactly the test for “nothing was ticked”.',
                    zh: '判断是否为空。对 null、false、[] 都返回 true，正好用来判断「一个都没勾」。'
                }
            },
            {
                name: 'implode()',
                kind: { en: 'PHP function', zh: 'PHP 函数' },
                desc: {
                    en: 'Joins array elements with a separator: implode(\'+\', [\'olives\',\'garlic\']) gives olives+garlic.',
                    zh: '把数组用指定分隔符拼成字符串：implode(\'+\', [\'olives\',\'garlic\']) 得到 olives+garlic。'
                }
            },
            {
                name: '$toppingString',
                kind: { en: 'Variable', zh: '变量' },
                desc: {
                    en: 'The joined string, ready to drop straight into the output statement.',
                    zh: '拼好的字符串，用来直接插进输出语句。'
                }
            },
            {
                name: '"... $toppingString"',
                kind: { en: 'Double-quoted string', zh: '双引号字符串' },
                desc: {
                    en: 'Inside double quotes a $variable is replaced by its value (interpolation); single quotes would not interpolate.',
                    zh: '双引号里的 $变量 会被自动替换成值（变量插值），单引号则不会。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: read toppings with FILTER_REQUIRE_ARRAY',
                    zh: '第 1 步：用 FILTER_REQUIRE_ARRAY 读取 toppings'
                },
                code: `<?php
// 读取 GET 参数 toppings。
// 第三个参数 options: FILTER_REQUIRE_ARRAY 很关键：
//   它告诉 PHP 这个值必须作为数组处理；如果传来的是单个标量（非数组），
//   filter_input 会返回 false，从而避免把字符串当成数组来用。
// 因为表单里是 name="toppings[]"，勾选多项时这里得到的是数组，
// 例如 ['olives', 'pepper']；一个都没勾则为 null 或 false。
$toppings = filter_input(INPUT_GET, 'toppings',options:FILTER_REQUIRE_ARRAY);
`,
                why: {
                    en: 'The form submits name="toppings[]", so the server may receive a set of values. Reading it as a plain scalar would make the later foreach / implode fail with “not an array”.',
                    zh: '表单用 name="toppings[]" 提交，服务端收到的可能是一组值。如果按普通标量读取，后面 foreach / implode 就会报「不是数组」的错误。'
                },
                purpose: {
                    en: 'Puts the type contract at the point of reading: demand an array, get false if you cannot — so every later check has one safe, uniform path.',
                    zh: '把「类型约定」写在读取这一步：强制要数组，拿不到就返回 false，让后面的判断有一条统一、安全的路径。'
                }
            },
            {
                title: {
                    en: 'Step 2: was nothing ticked at all?',
                    zh: '第 2 步：判断是否一个都没勾'
                },
                code: `
// empty() 对 null / false / [] 都返回 true，所以这里用来判断"没有勾选任何配料"
if(empty($toppings)){
    print 'Please select a topping';
}
`,
                why: {
                    en: 'An unticked checkbox never appears in the request, so “nothing ticked” leaves $toppings as null / false rather than an empty array. That case has to be caught first.',
                    zh: '未勾选的复选框不会出现在请求里，所以「一个都没勾」时 $toppings 是 null/false，而不是空数组。必须先把这种情况挡掉。'
                },
                purpose: {
                    en: 'Uses one function, empty(), to cover all three “empty” cases (null, false, []), so no edge case slips through and breaks implode later.',
                    zh: '用 empty() 一个函数同时覆盖 null、false、[] 三种「空」的情况，避免漏掉某种边界导致后面的 implode 报错。'
                }
            },
            {
                title: {
                    en: 'Step 3: if something was ticked, join it into a sentence',
                    zh: '第 3 步：有勾选则拼成字符串输出'
                },
                code: `else{
    // implode('+', $数组)：用指定的连接符把数组元素拼成一个字符串
    // 例：['olives','garlic'] => 'olives+garlic'
    $toppingString = implode('+',$toppings);
    // 双引号字符串里可以直接写 $变量，PHP 会自动插值
    print "Your selected toppings are: $toppingString";
}
`,
                why: {
                    en: 'An array cannot be printed as a string (you would only get “Array”), so join it into something readable first.',
                    zh: '数组不能直接当字符串打印（只会得到 Array），要先拼成人类可读的一句话。'
                },
                purpose: {
                    en: 'Shows the classic use of implode plus variable interpolation in double-quoted strings: write $toppingString right inside the print, no concatenation needed.',
                    zh: '演示 implode 的典型用途，以及双引号字符串的变量插值：一句 print 里直接写 $toppingString 即可，不用拼接符。'
                }
            }
        ]
    },

    /* ===================== 05 multi-select ===================== */
    {
        key: '05-multiple-selection',
        file: '05_multiple_selection.html',
        group: {
            en: '05 Multi-select list: select multiple',
            zh: '05 多选列表：select multiple'
        },
        title: {
            en: 'Flower multi-select drop-down (select multiple)',
            zh: '花卉多选下拉框（select multiple）'
        },
        goal: {
            en: 'Offer a drop-down list that allows several selections and submit the chosen option values as an array.',
            zh: '用下拉列表实现多选，让所选的多个 option 以数组形式提交。'
        },
        run: {
            en: 'Open http://localhost:8000/week04/05_multiple_selection.html, hold Ctrl (Command on macOS) and click several flowers, then submit.',
            zh: '访问 http://localhost:8000/week04/05_multiple_selection.html，按住 Ctrl（macOS 用 Command）点选多个花名后提交。'
        },
        notice: {
            en: 'This form points at 05_multiple_process.html, which is not provided, so submitting gives a 404. Watch the address bar instead: ?flowers[]=poppy&flowers[]=tulip.',
            zh: '本例 action 指向 05_multiple_process.html，该文件未提供，提交后会 404；请把注意力放在跳转后地址栏的 ?flowers[]=poppy&flowers[]=tulip 上。'
        },
        terms: [
            {
                name: '<select>',
                kind: { en: 'Control', zh: '控件' },
                desc: {
                    en: 'A drop-down list. Add multiple and several items can be chosen at once.',
                    zh: '下拉列表。加上 multiple 后可以一次选多项。'
                }
            },
            {
                name: 'multiple',
                kind: { en: 'Boolean attribute', zh: '布尔属性' },
                desc: {
                    en: 'Its mere presence enables multi-selection (hold Ctrl / Command while clicking).',
                    zh: '只要出现就生效，表示允许多选（需按住 Ctrl / Command 点选）。'
                }
            },
            {
                name: 'size="3"',
                kind: { en: 'Attribute', zh: '属性' },
                desc: {
                    en: 'Shows three rows at once instead of a single-line box with a small arrow.',
                    zh: '一次显示 3 行，而不是只显示一行的小箭头框。'
                }
            },
            {
                name: 'name="flowers[]"',
                kind: { en: 'Attribute (key point)', zh: '属性（重点）' },
                desc: {
                    en: 'Same idea as the checkboxes: the brackets make the selected values arrive as an array.',
                    zh: '和复选框同理：方括号让所选的多个 value 以数组形式提交。'
                }
            },
            {
                name: '<option value="poppy">',
                kind: { en: 'Option', zh: '选项' },
                desc: {
                    en: 'value is what gets submitted, Poppy is what the user sees — the two may differ.',
                    zh: 'value 是提交的值，Poppy 是显示给用户看的文字，两者可以不同。'
                }
            },
            {
                name: 'class="row" / col-lg-3',
                kind: { en: 'Bootstrap class', zh: 'Bootstrap 类' },
                desc: {
                    en: 'Puts the button and the drop-down into the same grid row.',
                    zh: '把按钮和下拉框排在同一行的栅格里。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: head and Bootstrap',
                    zh: '第 1 步：头部与 Bootstrap'
                },
                code: `<!doctype html><html><head><title>Single Selection list</title>
    <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    >
</head>
`,
                why: {
                    en: 'Same as the earlier pages: skeleton plus styles, so the example stays readable.',
                    zh: '和前面页面一致：骨架 + 样式，保证示例可读。'
                },
                purpose: {
                    en: 'Keeps the template identical so the only difference is the form control itself.',
                    zh: '保持模板一致，让差异只出现在表单控件本身。'
                }
            },
            {
                title: {
                    en: 'Step 2: form opening tag and the grid row',
                    zh: '第 2 步：表单首行与栅格行'
                },
                code: `<body class="container">
<h1>Flower selection</h1>
<!-- 注意：action 指向的是 .html 文件，静态 HTML 无法处理表单数据，
     通常应指向 .php 处理脚本（本例仅作演示） -->
<form method="GET" action="05_multiple_process.html">
    <div class="row">
`,
                why: {
                    en: 'This page only demonstrates how the control submits data; there is no handler, so it points at a placeholder .html file. row puts the button and the list on one line.',
                    zh: '这一页只演示控件怎么提交数据，没有对应的处理脚本，所以随便指向一个 .html 占位。row 用来把按钮和下拉框放同一行。'
                },
                purpose: {
                    en: 'Also flags a common mistake: pointing action at a .html file is useless — static files never run PHP, so real projects must point at a .php file.',
                    zh: '顺带提醒一个常见错误：action 指向 .html 是没用的 —— 静态文件不会执行 PHP，真实项目必须指向 .php。'
                }
            },
            {
                title: {
                    en: 'Step 3: the submit button (left of the drop-down)',
                    zh: '第 3 步：提交按钮（放在下拉框左侧）'
                },
                code: `        <div class="col-lg-3 text-end py-2">
            <input type="submit" value="Select a flower" class="btn btn-primary">
        </div>
`,
                why: {
                    en: 'A multi-select control never submits by itself, so a submit button is still needed; value makes it read “Select a flower”.',
                    zh: '多选控件本身不会触发提交，仍然需要一个 submit 按钮；value 让它显示成「Select a flower」。'
                },
                purpose: {
                    en: 'Shows that the button’s position does not matter — only that it is inside <form>. Layout is Bootstrap’s job.',
                    zh: '说明提交按钮的位置不影响功能，只要在 <form> 内即可，排版交给 Bootstrap 栅格。'
                }
            },
            {
                title: {
                    en: 'Step 4: select multiple (core of this chapter)',
                    zh: '第 4 步：select multiple（本章核心）'
                },
                code: `        <div class="col-lg-3 text-end py-2">
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
`,
                why: {
                    en: 'When there are many options and little space, a drop-down beats a column of checkboxes — but it selects only one by default, so you add multiple and keep the brackets in the name.',
                    zh: '选项超过三个、又想节省页面空间时，下拉列表比一排复选框更合适；但它默认只能选一个，所以要加 multiple，并且名字照样要带 []。'
                },
                purpose: {
                    en: 'Proves that the “array field” idea is independent of the control: checkbox or select, as long as the name ends in [] the server-side code is identical (FILTER_REQUIRE_ARRAY + implode).',
                    zh: '证明「数组字段」与控件类型无关：无论是 checkbox 还是 select，只要 name 带 []，服务端处理方式完全一样（FILTER_REQUIRE_ARRAY + implode）。'
                }
            },
            {
                title: {
                    en: 'Step 5: closing tags',
                    zh: '第 5 步：闭合标签'
                },
                code: `    </div>
</form>
</body>
</html>
`,
                why: {
                    en: 'Close row, form, body and html so the page structure is valid.',
                    zh: '关闭 row、form、body、html，让页面结构合法。'
                },
                purpose: {
                    en: 'Builds the habit of closing tags in pairs; invalid structure makes the browser “repair” the markup and the layout turns strange.',
                    zh: '养成成对闭合的习惯；结构不合法时浏览器会自行「修补」，导致布局莫名其妙。'
                }
            }
        ]
    },

    /* ===================== 06 validation: single file ===================== */
    {
        key: '06-no-function',
        file: '06_validation_array_no_function.php',
        group: {
            en: '06 Form validation: the same feature, two ways of writing it',
            zh: '06 表单校验：同一功能的两种写法'
        },
        title: {
            en: 'Two-field postback form (all logic in one file)',
            zh: '两字段回传表单（全部逻辑写在一个文件里）'
        },
        goal: {
            en: 'The form posts back to itself, validates Product code and Price, lists errors above the form and keeps whatever the user typed.',
            zh: '表单提交回自己（postback），校验 Product code 与 Price，出错就在页面上方列出错误，并保持用户已填的值。'
        },
        run: {
            en: 'Open http://localhost:8000/week04/06_validation_array_no_function.php: submit empty → pink error box; price 0 → passes; everything valid → only “input data was error free”.',
            zh: '直接访问 http://localhost:8000/week04/06_validation_array_no_function.php：留空提交 → 粉色错误框；price 填 0 → 通过；都合法 → 只显示 input data was error free。'
        },
        notice: {
            en: 'This file uses require_once \'inc/zeroFunction.php\', a relative path, so the server must be started in the directory that holds this file — do not open the files inside inc/ on their own.',
            zh: '本文件用 require_once \'inc/zeroFunction.php\'，是相对路径，所以必须在 06 这个文件所在的目录下启动服务器，不能单独打开 inc/ 里的文件。'
        },
        terms: [
            {
                name: 'require_once',
                kind: { en: 'PHP statement', zh: 'PHP 语句' },
                desc: {
                    en: 'Includes an external file; _once guarantees a single inclusion and avoids the fatal “function already defined” error.',
                    zh: '引入外部文件；_once 保证只引入一次，避免「函数重复定义」致命错误。'
                }
            },
            {
                name: "$_SERVER['REQUEST_METHOD']",
                kind: { en: 'Superglobal', zh: '超全局变量' },
                desc: {
                    en: 'The current request method, either GET or POST. Used to tell “first visit” from “after submit”.',
                    zh: '当前请求方式，值是 GET 或 POST。用来区分「首次打开」和「提交后」。'
                }
            },
            {
                name: '$isSubmitted',
                kind: { en: 'Variable (bool)', zh: '变量（布尔）' },
                desc: {
                    en: 'Whether the form was submitted, i.e. (request method === \'POST\').',
                    zh: '表单是否已提交。等于 (请求方式 === \'POST\')。'
                }
            },
            {
                name: '$productCode / $price',
                kind: { en: 'Variable (string)', zh: '变量（字符串）' },
                desc: {
                    en: 'The two fields the user typed. Empty by default, overwritten with the input after submission.',
                    zh: '用户填写的两个字段。默认空字符串，提交后覆盖为用户输入。'
                }
            },
            {
                name: '$errors',
                kind: { en: 'Variable (array)', zh: '变量（数组）' },
                desc: {
                    en: 'The error collector. Append one message per problem with $errors[]; an empty array means “passed”.',
                    zh: '错误收集器。每发现一个问题就 $errors[] 追加一条；空数组代表通过。'
                }
            },
            {
                name: '$errors[] =',
                kind: { en: 'Array append', zh: '数组追加写法' },
                desc: {
                    en: 'Appending without an index pushes onto the end of the array — used to accumulate messages one by one.',
                    zh: '不写下标直接追加到数组末尾，用来一条条累积错误信息。'
                }
            },
            {
                name: 'isAnEmptyNonZeroString()',
                kind: { en: 'Custom function', zh: '自定义函数' },
                desc: {
                    en: 'From inc/zeroFunction.php: tests for emptiness but treats the string \'0\' as a valid value.',
                    zh: 'inc/zeroFunction.php 提供：判断为空，但把字符串 \'0\' 视作有效值。'
                }
            },
            {
                name: 'is_numeric()',
                kind: { en: 'PHP function', zh: 'PHP 函数' },
                desc: {
                    en: 'Is it a number or a numeric string? \'12.5\' counts as numeric.',
                    zh: '判断是否为数字或数字字符串，\'12.5\' 也算数字。'
                }
            },
            {
                name: 'strlen()',
                kind: { en: 'PHP function', zh: 'PHP 函数' },
                desc: {
                    en: 'Length of a string — here it enforces at least 3 characters for the product code.',
                    zh: '字符串长度，本例用来要求产品编号至少 3 个字符。'
                }
            },
            {
                name: '$isValid',
                kind: { en: 'Variable (bool)', zh: '变量（布尔）' },
                desc: {
                    en: 'Whether the data passed validation — essentially just empty($errors).',
                    zh: '数据是否通过校验，本质就是 empty($errors)。'
                }
            },
            {
                name: 'die()',
                kind: { en: 'PHP statement', zh: 'PHP 语句' },
                desc: {
                    en: 'Ends the script at once; the HTML form below is never printed.',
                    zh: '立即终止脚本，后面的 HTML 表单不会再输出。'
                }
            },
            {
                name: 'postback',
                kind: { en: 'Pattern', zh: '模式' },
                desc: {
                    en: 'A form with no action submits back to itself; one PHP file both shows the form and processes the data.',
                    zh: 'form 不写 action，提交回本页自己；同一个 PHP 文件既显示表单又处理数据。'
                }
            },
            {
                name: 'sticky form',
                kind: { en: 'Pattern', zh: '模式' },
                desc: {
                    en: 'On error, put the values the user already typed back into value so nothing has to be retyped.',
                    zh: '出错时把用户已填的值回填进 value，避免重填。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: include the helper library',
                    zh: '第 1 步：引入辅助函数库'
                },
                code: `<?php

require_once 'inc/zeroFunction.php'; // 引入自定义辅助函数文件
`,
                why: {
                    en: 'Testing whether the price is empty needs isAnEmptyNonZeroString(), which lives in inc/zeroFunction.php. Without the include you get “undefined function”.',
                    zh: '判断价格是否为空时要用到 isAnEmptyNonZeroString()，它定义在 inc/zeroFunction.php 里，不引入就会报「未定义函数」。'
                },
                purpose: {
                    en: 'Small reusable helpers go into inc/, and the main file only includes them. _once prevents repeated inclusion and therefore redefinition errors.',
                    zh: '把可复用的小工具放到 inc/ 目录，主文件只管引入。用 _once 是为了防止重复引入导致函数重定义。'
                }
            },
            {
                title: {
                    en: 'Step 2: was the form submitted?',
                    zh: '第 2 步：判断表单是否被提交'
                },
                code: `
// 判断本次请求是否为 POST（即表单是否被提交）
$isSubmitted = ($_SERVER['REQUEST_METHOD'] === 'POST');
`,
                why: {
                    en: 'One file has to both show an empty form and process a submission, so it must know which situation it is in — otherwise the page complains “please fill in” the moment you open it.',
                    zh: '同一个文件既要「首次显示空表单」又要「处理提交」，必须先知道现在是哪种情况，否则一打开页面就会报「请填写」。'
                },
                purpose: {
                    en: 'Uses the request method as a switch: GET (first visit) → show the form only; POST (submitted) → read and validate. === compares value and type, stricter than ==.',
                    zh: '用请求方式做开关。GET（首次打开）→ 只显示表单；POST（提交）→ 取数据并校验。=== 同时比较值和类型，比 == 严谨。'
                }
            },
            {
                title: {
                    en: 'Step 3: give every variable a default value',
                    zh: '第 3 步：给所有变量一个默认值'
                },
                code: `$productCode = '';   // 产品编号，默认空字符串
$price = '';         // 价格，默认空字符串
$errors = [];        // 错误信息数组：每发现一个问题就往里追加一条
`,
                why: {
                    en: 'On a first visit there is no user input, yet the template prints these values; without initialisation you get “undefined variable” notices all over the page.',
                    zh: '首次打开时还没有用户输入，但模板里要输出这两个值；不初始化就会出现「未定义变量」警告，页面顶上出现一堆 Notice。'
                },
                purpose: {
                    en: 'Guarantees the variables always exist: defaults on the first visit, overwritten after submission. This is also the precondition for a sticky form.',
                    zh: '保证变量「永远存在」：首次访问是默认值，提交后被覆盖。这也是粘性表单能回填的前提。'
                }
            },
            {
                title: {
                    en: 'Step 4: read the user’s input — only after submission',
                    zh: '第 4 步：提交后才读取用户填写的字段'
                },
                code: `
// 与 06_validation_array_controller.php 的区别：
// 本文件把所有逻辑都写在同一个页面里（不使用 validate() / displayForm() 等函数），
// 属于"函数化之前"的写法，便于对比理解。
if ($isSubmitted) {
    // 从 POST 中读取用户填写的字段
    $productCode = filter_input(INPUT_POST, 'productCode');
    $price = filter_input(INPUT_POST, 'price');
`,
                why: {
                    en: 'There is only data to read once the form has been submitted. Putting the reads inside if ($isSubmitted) means a first visit never tries to read POST fields that do not exist.',
                    zh: '只有提交了才有数据可读。把读取动作放进 if ($isSubmitted) 里，首次访问时就不会去读不存在的 POST 字段。'
                },
                purpose: {
                    en: 'Shows the “everything in one file” version: reading, validating and displaying all live in this page — direct but tightly coupled, which the controller version will separate.',
                    zh: '体现「逻辑写在一个文件里」的版本：读数据、校验、显示全在这一个页面中，直观但耦合 —— 后面控制器版会把它拆开。'
                }
            },
            {
                title: {
                    en: 'Step 5: validate the product code (empty? long enough?)',
                    zh: '第 5 步：校验产品编号（空？长度够吗？）'
                },
                code: `
    // 校验产品编号：先查是否为空，再查长度是否不少于 3 个字符
    if (empty($productCode)) {
        $errors[] = 'missing product code';
    } elseif (strlen($productCode) < 3) {
        $errors[] = 'product code too few characters';
    }
`,
                why: {
                    en: 'The product code is required and should look like a code, so at least 3 characters. elseif is used because “not filled in” and “too short” are mutually exclusive and should not both be reported.',
                    zh: '产品编号是必填项，而且至少要有 3 个字符才像编号。用 elseif 是因为「没填」和「填太短」是互斥的，不该同时报两条。'
                },
                purpose: {
                    en: 'Shows the pattern “one rule, at most one appended error”, and how elseif keeps a single field from flooding the error list.',
                    zh: '展示「一条规则一次追加一条错误」的写法，以及 elseif 控制「同一字段最多报一个错」，避免错误列表刷屏。'
                }
            },
            {
                title: {
                    en: 'Step 6: validate the price (avoiding the empty(\'0\') trap)',
                    zh: '第 6 步：校验价格（避开 empty(\'0\') 的坑）'
                },
                code: `
    // 校验价格：
    // 这里不用 empty($price)，因为 empty('0') 为 true，
    // 会把合法的价格 0 误判成"没填"，所以改用自定义函数 isAnEmptyNonZeroString()
    if (isAnEmptyNonZeroString($price)) {
        $errors[] = 'missing price';
    } elseif (!is_numeric($price)) {   // is_numeric：判断是否为数字或数字字符串
        $errors[] = 'price was not a number';
    }
}
`,
                why: {
                    en: 'A price of 0 (a free product) is legitimate business data, but PHP’s empty(\'0\') is true, so using empty would report 0 as “not filled in”.',
                    zh: '价格 0（免费商品）是合法业务数据，但 PHP 的 empty(\'0\') 偏偏返回 true，直接用 empty 会把 0 当成「没填」而误报。'
                },
                purpose: {
                    en: 'The most valuable trap of this chapter: telling “not filled in” apart from “filled in with 0” is exactly what isAnEmptyNonZeroString() is for. The second elseif then rejects non-numeric input.',
                    zh: '这是本章最有价值的坑：把「没填」和「填了 0」区分开，靠的就是 isAnEmptyNonZeroString()。第二个 elseif 再挡掉非数字输入。'
                }
            },
            {
                title: {
                    en: 'Step 7: “passes” means the error array is empty',
                    zh: '第 7 步：用错误数组是否为空判定「通过」'
                },
                code: `
// 没有错误即视为有效数据
$isValid = empty($errors);
`,
                why: {
                    en: 'The validation rules are scattered over the lines above, so a single conclusion is needed for the branches that follow. The convention: an empty error array means it passed.',
                    zh: '校验规则散落在前面几行，需要一个统一的结论供后面分支使用。约定：错误数组为空即通过。'
                },
                purpose: {
                    en: 'Collapses the result of several rules into one boolean, so later logic only asks “passed or not” and never which rule fired.',
                    zh: '把「多条规则的结果」收敛成一个布尔值，让后续逻辑只关心「通过 / 不通过」，不关心到底哪条规则。'
                }
            },
            {
                title: {
                    en: 'Step 8: on success, print the result and stop',
                    zh: '第 8 步：通过就输出结果并终止脚本'
                },
                code: `if ($isSubmitted && $isValid) {
    print 'input data was error free';
    die(); // 终止脚本：后面的 HTML 表单不会再输出
}
?>
`,
                why: {
                    en: 'When the data is valid there is no need to draw the form again — just a success message. Without die() the form HTML below would be printed as well and the page would look broken.',
                    zh: '数据合法时不需要再显示表单，只要给一句成功提示。若不加 die()，下面的表单 HTML 会被一起输出，页面就乱了。'
                },
                purpose: {
                    en: 'Makes “stop here” explicit with die(). After ?> comes the template, which is reached only in the two cases “not submitted” and “has errors”.',
                    zh: '用 die() 明确「到此为止」。?> 之后进入模板区，只有「没提交」或「有错」这两种情况才会执行到那里。'
                }
            },
            {
                title: {
                    en: 'Step 9: template head and the error-box style',
                    zh: '第 9 步：模板开头与错误提示样式'
                },
                code: `
<!doctype html>
<html><head>
    <title>Two-field postback form</title>
    <style>.error { background-color: pink; padding: 1rem;}</style>
</head>
<body>
`,
                why: {
                    en: 'Error messages need to stand out, so one line of inline CSS defines a pink box with padding — no extra stylesheet required.',
                    zh: '错误提示需要一个醒目的外观，这里用一行内联 CSS 定义粉色底 + 内边距的 .error 区块，不必额外引样式文件。'
                },
                purpose: {
                    en: 'Prepares the look of the error area; the next step decides whether to show it.',
                    zh: '先准备好「错误展示区」的样式，下一步再决定要不要显示它。'
                }
            },
            {
                title: {
                    en: 'Step 10: show the error list only when submitted and invalid',
                    zh: '第 10 步：仅在「已提交且有错」时显示错误列表'
                },
                code: `<!-- 只有"已提交但数据不合法"时才显示错误区块 -->
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
`,
                why: {
                    en: 'On a first visit $errors is empty and an empty box would be silly; only “submitted and actually wrong” deserves to be displayed.',
                    zh: '首次打开页面时 $errors 是空的，不该出现一个空框；只有「提交过且确实有错」才值得展示。'
                },
                purpose: {
                    en: 'The condition $isSubmitted && !$isValid is the switch for the error area. foreach renders each message as an <li>, so adding a rule never means touching the template.',
                    zh: '条件 $isSubmitted && !$isValid 是错误区显示的开关。foreach 把数组里的每条消息渲染成 <li>，新增规则时不用改模板。'
                }
            },
            {
                title: {
                    en: 'Step 11: sticky form — put the user’s values back',
                    zh: '第 11 步：粘性表单（回填用户已填的值）'
                },
                code: `
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
`,
                why: {
                    en: 'If the form came back empty after a failed validation the user would have to retype everything — a poor experience. Omitting action makes the form submit back to this page and run the same logic again.',
                    zh: '校验失败后如果表单是空的，用户就得从头再填一遍，体验很差。省略 action 则让表单提交回本页，继续走同一套逻辑。'
                },
                purpose: {
                    en: 'Combines the two tricks “no action = post to self” and “value=\'<?= $x ?>\' restores the input” — together they are the complete sticky form.',
                    zh: '把「不写 action = 提交给自己」和「value=\'<?= $x ?>\' 回填」两个技巧合在一起，这就是粘性表单的完整实现。'
                }
            }
        ]
    },

    /* ===================== 06 validation: controller ===================== */
    {
        key: '06-controller',
        file: '06_validation_array_controller.php',
        group: {
            en: '06 Form validation: the same feature, two ways of writing it',
            zh: '06 表单校验：同一功能的两种写法'
        },
        title: {
            en: 'Controller version (validation and display moved into functions)',
            zh: '控制器版（校验与显示都拆成函数）'
        },
        goal: {
            en: 'Exactly the same behaviour as the previous file, but validation and display live in functions inside inc/ and the main file only coordinates.',
            zh: '功能和上一个文件完全一样，但把「校验」和「显示」搬进 inc/ 里的函数，主文件只做调度。'
        },
        run: {
            en: 'Open http://localhost:8000/week04/06_validation_array_controller.php — behaves like the single-file version and prints “Your input data was error free” on success.',
            zh: '直接访问 http://localhost:8000/week04/06_validation_array_controller.php，表现与单文件版一致，成功时显示 Your input data was error free。'
        },
        notice: {
            en: 'All three require_once calls use relative paths, so the entry point must be the directory that holds this file, otherwise the files are “not found”.',
            zh: '三个 require_once 用的都是相对路径，入口必须是本文件所在目录，否则会「找不到文件」。'
        },
        terms: [
            {
                name: 'controller',
                kind: { en: 'Role', zh: '角色' },
                desc: {
                    en: 'Coordinates only: work out the state → call the validator → decide what to show. No details inside.',
                    zh: '只负责调度：判断状态 → 调用校验 → 决定显示什么，不含具体细节。'
                }
            },
            {
                name: 'validate()',
                kind: { en: 'Function (inc/validate.php)', zh: '函数（inc/validate.php）' },
                desc: {
                    en: 'Wraps every validation rule and returns the error array; an empty array means it passed.',
                    zh: '封装全部校验规则，返回错误数组；空数组代表通过。'
                }
            },
            {
                name: 'displayForm()',
                kind: { en: 'Function (inc/form.php)', zh: '函数（inc/form.php）' },
                desc: {
                    en: 'Wraps the form HTML; its arguments decide which errors to show and which values to restore.',
                    zh: '封装表单的 HTML，参数决定显示哪些错误、回填哪些值。'
                }
            },
            {
                name: 'isAnEmptyNonZeroString()',
                kind: { en: 'Function (inc/zeroFunction.php)', zh: '函数（inc/zeroFunction.php）' },
                desc: {
                    en: 'The helper that handles the empty(\'0\') trap.',
                    zh: '处理 empty(\'0\') 陷阱的辅助函数。'
                }
            },
            {
                name: '$errors = validate()',
                kind: { en: 'Assignment', zh: '赋值' },
                desc: {
                    en: 'The controller outsources the validating and only takes back the result (the error array).',
                    zh: '控制器把校验的活儿外包出去，只接收结果（错误数组）。'
                }
            },
            {
                name: 'displayForm($isSubmitted,$isValid,$errors,$productCode,$price)',
                kind: { en: 'Function call', zh: '函数调用' },
                desc: {
                    en: 'Passes state and data to the view function in one go; it decides how that looks.',
                    zh: '把状态与数据一次性传给视图函数，由它决定显示成什么样。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: include three function libraries',
                    zh: '第 1 步：引入三个函数库'
                },
                code: `<?php

// require_once：引入外部文件，_once 保证即使多次调用也只引入一次（避免函数重复定义报错）
// inc/zeroFunction.php 提供辅助函数（如 isAnEmptyNonZeroString）
// inc/form.php 提供显示表单的函数 displayForm()
// inc/validate.php 提供校验函数 validate()
require_once 'inc/zeroFunction.php';
require_once 'inc/form.php';
require_once 'inc/validate.php';
`,
                why: {
                    en: 'This version moves the logic out: helpers, view and validation each live in their own file, so the controller must include all three before it can call anything.',
                    zh: '这一版把逻辑拆出去了：辅助函数、视图、校验分别在三个文件里，控制器必须先把它们都引入才能调用。'
                },
                purpose: {
                    en: 'Shows “split files by responsibility”: tools / view / rules each own one area, so restyling never touches the rules and changing a rule never touches the HTML.',
                    zh: '体现「按职责拆文件」：工具 / 视图 / 校验各管一块，改样式不会碰到校验规则，改规则也不会碰到 HTML。'
                }
            },
            {
                title: {
                    en: 'Step 2: initialise state and data variables',
                    zh: '第 2 步：初始化状态与数据变量'
                },
                code: `
// 初始化变量（给变量一个默认值，避免未定义警告）
// $_SERVER['REQUEST_METHOD'] 保存当前请求方式（GET / POST 等），
// 由于本页表单 method="POST"（即"回传 postback"到自己），
// 所以判断是否为 POST 就能区分"首次打开页面"和"用户提交了表单"。
$isSubmitted = ($_SERVER['REQUEST_METHOD'] === 'POST');
$productCode = '';
$price = '';
$errors = [];
`,
                why: {
                    en: 'As in the single-file version, the controller prepares state and data first and then hands them to the functions.',
                    zh: '和单文件版一样，控制器要先把「状态」和「数据」准备好，再交给函数去处理。'
                },
                purpose: {
                    en: 'Declare variables before use so functions can receive them as arguments instead of depending on globals.',
                    zh: '变量先声明再使用，函数之间才能靠参数传递这些值，而不用互相依赖全局变量。'
                }
            },
            {
                title: {
                    en: 'Step 3: on submission, call validate()',
                    zh: '第 3 步：提交就调用 validate() 校验'
                },
                code: `
// 只有提交了表单才需要校验；校验逻辑被封装在 validate() 里，
// 它返回一个错误信息的数组，没有错误时返回空数组。
if($isSubmitted){
    $errors = validate();
}
`,
                why: {
                    en: 'The controller should not know details like “the code needs at least 3 characters” — that is validate()’s job. It only asks: any errors?',
                    zh: '控制器不应该知道「编号至少 3 个字符」这种细节，那是 validate() 的事；它只需要问一句：有没有错？'
                },
                purpose: {
                    en: 'This is the main payoff of splitting: the rules live in inc/validate.php where other pages can reuse them, and the controller keeps a single line.',
                    zh: '这是拆分的核心收益：规则写在 inc/validate.php 里，可以被其它页面复用；这里只剩一行调用。'
                }
            },
            {
                title: {
                    en: 'Step 4: collapse “are there errors?” into a boolean',
                    zh: '第 4 步：把「是否有错」收敛成一个布尔值'
                },
                code: `
// 用一个布尔变量记录"数据是否有效"（可选写法，本质就是判断 $errors 是否为空）
$isValid = empty($errors);
`,
                why: {
                    en: 'Passing a boolean between functions is clearer, and “is this valid?” is exactly what displayForm() needs.',
                    zh: '函数之间传参用布尔值更直观，displayForm() 需要的正是「这次是否有效」这个结论。'
                },
                purpose: {
                    en: 'Keeps exactly the same semantics as the single-file version: empty error array ⇔ valid data. The two versions differ in organisation only, never in logic.',
                    zh: '保持与单文件版完全相同的语义：错误数组为空 ⇔ 数据有效。两种写法的差别只在组织方式，不在逻辑。'
                }
            },
            {
                title: {
                    en: 'Step 5: on success, print the confirmation',
                    zh: '第 5 步：通过 → 输出成功提示'
                },
                code: `
// 提交且无错 => 说明数据合法，执行"成功"分支（这里只是简单提示）
if($isSubmitted && $isValid){
    print 'Your input data was error free';
}
`,
                why: {
                    en: 'When the data is fine there is no reason to draw the form — just state the result. This is also where a real project would write to a database or redirect.',
                    zh: '数据没问题就没必要再画表单，直接给结论。这里也预留了真实项目的落点：写入数据库、跳转页面等。'
                },
                purpose: {
                    en: 'Keeps the success branch minimal so it is obvious that “what happens after passing” is the part you are free to replace.',
                    zh: '成功分支保持极简，让人一眼看出「通过之后做什么」是可以自由替换的部分。'
                }
            },
            {
                title: {
                    en: 'Step 6: otherwise call displayForm()',
                    zh: '第 6 步：其它情况 → 调用 displayForm() 显示表单'
                },
                code: `else{
    // 其它情况（首次访问，或提交但有错）都重新显示表单；
    // 把 $errors 传进去，表单顶部就能把错误逐条列出来。
    displayForm($isSubmitted,$isValid,$errors,$productCode,$price);
}
`,
                why: {
                    en: 'A first visit needs an empty form; a failed submission needs a form with error messages — but both are really “show the form”.',
                    zh: '首次访问要给用户一个空表单，提交有错要给用户带错误提示的表单 —— 这两种情况其实都是「显示表单」。'
                },
                purpose: {
                    en: 'One else covers both remaining cases and outsources all displaying to displayForm(). The controller ends here — not one line of page HTML.',
                    zh: '用一个 else 覆盖两种剩余情况，把显示工作整体外包给 displayForm()。控制器到此结束，页面 HTML 一行都不用写。'
                }
            }
        ]
    },

    /* ===================== inc libraries ===================== */
    {
        key: 'inc-zero-function',
        file: 'inc/zeroFunction.php',
        group: {
            en: 'inc libraries: shared by both versions of 06',
            zh: 'inc 函数库：被 06 两个版本共用'
        },
        title: {
            en: 'isAnEmptyNonZeroString(): treating \'0\' as a real value',
            zh: 'isAnEmptyNonZeroString()：把 \'0\' 当成有效值'
        },
        goal: {
            en: 'Fix the misjudgement caused by PHP’s empty(\'0\') === true so that a price of 0 passes the “required” check.',
            zh: '解决 PHP 的 empty(\'0\') === true 带来的误判，让价格 0 能正常通过「必填」检查。'
        },
        run: {
            en: 'Not opened directly — included by 06_validation_array_no_function.php and inc/validate.php, which then call it.',
            zh: '不能直接访问，被 06_validation_array_no_function.php 与 inc/validate.php 引入后调用。'
        },
        terms: [
            {
                name: 'isAnEmptyNonZeroString',
                kind: { en: 'Function name', zh: '函数名' },
                desc: {
                    en: 'Literally “is it an empty, non-zero string?”: true when empty, except for \'0\'.',
                    zh: '直译「是否是一个空的、非零的字符串」：为空返回 true，但 \'0\' 例外。'
                }
            },
            {
                name: '$s',
                kind: { en: 'Parameter', zh: '参数' },
                desc: {
                    en: 'The value to check (mixed — any type).',
                    zh: '待检查的值（mixed，任意类型）。'
                }
            },
            {
                name: ': bool',
                kind: { en: 'Return type declaration', zh: '返回类型声明' },
                desc: {
                    en: 'Forces a boolean return; the wrong type makes PHP complain, which acts as self-discipline.',
                    zh: '强制返回值必须是布尔，写错类型 PHP 会报错，起到自我约束作用。'
                }
            },
            {
                name: '===',
                kind: { en: 'Comparison operator', zh: '比较运算符' },
                desc: {
                    en: 'Identical: same value and same type. $s === \'0\' holds only for the genuine string zero.',
                    zh: '全等：值和类型都相同。$s === \'0\' 只有在确实是字符串 0 时才成立。'
                }
            },
            {
                name: 'empty()',
                kind: { en: 'PHP function', zh: 'PHP 函数' },
                desc: {
                    en: '\'\', null, false, 0, \'0\' and [] all count as empty — the last one is exactly the trap this function exists to sidestep.',
                    zh: '\'\'、null、false、0、\'0\'、[] 都算空 —— 最后这条正是本函数要绕过的坑。'
                }
            },
            {
                name: 'return false',
                kind: { en: 'Early return', zh: '提前返回' },
                desc: {
                    en: 'When \'0\' is hit the function ends immediately and never reaches the line below — clearer to read.',
                    zh: '命中 \'0\' 立刻结束函数，不再往下走，代码更直白。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: the doc-block (why this function exists at all)',
                    zh: '第 1 步：文档注释（说明为什么要有这个函数）'
                },
                code: `<?php
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
`,
                why: {
                    en: 'This function exists because of one unintuitive trap. Without the reason written down, the next person will very likely “optimise” it away.',
                    zh: '这个函数是为一个不直观的坑而生的，如果不写清楚原因，后来的人很可能把它「优化」掉。'
                },
                purpose: {
                    en: 'Fixes the contract in a doc-block: what counts as empty, what does not, and what the parameter and return value are.',
                    zh: '用文档注释固定函数的契约：什么算空、什么不算空、参数和返回值各是什么。'
                }
            },
            {
                title: {
                    en: 'Step 2: the signature and the “\'0\' is not empty” exception',
                    zh: '第 2 步：函数签名与「\'0\' 不算空」这条特例'
                },
                code: `function isAnEmptyNonZeroString($s): bool   // : bool 声明返回值类型为布尔值
{
    if ($s === '0') return false;   // '0' 是合法数据，不算空（=== 同时比较值和类型）
`,
                why: {
                    en: 'A price of 0 is legitimate business data and must be let through first. === rather than == releases only the string zero and does not accidentally free other falsy values.',
                    zh: '价格填 0 是合法业务数据，必须先被放走。用 === 而不是 ==，是为了只放行「字符串 0」，不误伤其它假值。'
                },
                purpose: {
                    en: 'Puts the single exception at the very top and returns early when it matches, so the reader sees the whole point of the function at a glance.',
                    zh: '把唯一的特例放在函数最前面，命中就提前返回，读者一眼就能看到这个函数的存在意义。'
                }
            },
            {
                title: {
                    en: 'Step 3: everything else is left to empty()',
                    zh: '第 3 步：其余情况交给 empty() 判断'
                },
                code: `    return empty($s);               // 其余情况交给 empty()：''、null、false、0、[] 都算空
}
`,
                why: {
                    en: 'Apart from \'0\', an empty string, null, false and an empty array should all count as “not filled in”, and empty() covers them in one call.',
                    zh: '除了 \'0\' 之外，空字符串、null、false、空数组都应该算「没填」，empty() 一次就能全部覆盖。'
                },
                purpose: {
                    en: 'Keeps the function minimal — one exception plus one general rule — and returns a boolean the caller can drop straight into an if condition.',
                    zh: '保持函数极简：一条特例 + 一条通用规则。返回布尔值供调用方直接放进 if 条件里。'
                }
            }
        ]
    },

    {
        key: 'inc-validate',
        file: 'inc/validate.php',
        group: {
            en: 'inc libraries: shared by both versions of 06',
            zh: 'inc 函数库：被 06 两个版本共用'
        },
        title: {
            en: 'validate(): all validation rules in one place',
            zh: 'validate()：集中管理校验规则'
        },
        goal: {
            en: 'Collect every rule for the product code and the price in a single function that returns an error array (empty = passed).',
            zh: '把产品编号与价格的全部校验规则收在一个函数里，返回一个错误数组（空数组 = 通过）。'
        },
        run: {
            en: 'Not opened directly — 06_validation_array_controller.php calls it on submission: $errors = validate();',
            zh: '不能直接访问，由 06_validation_array_controller.php 在提交时调用：$errors = validate();'
        },
        terms: [
            {
                name: 'validate',
                kind: { en: 'Function name', zh: '函数名' },
                desc: {
                    en: '“Validate”. Takes no arguments — it reads POST itself — and returns the error array.',
                    zh: '「校验」。无参数，直接自己从 POST 里取数据；返回值是错误数组。'
                }
            },
            {
                name: '$errors',
                kind: { en: 'Local variable', zh: '局部变量' },
                desc: {
                    en: 'An error collector created inside the function and returned to the caller at the end.',
                    zh: '函数内部新建的错误收集器，最后 return 给调用方。'
                }
            },
            {
                name: 'productCode',
                kind: { en: 'Form field name', zh: '表单字段名' },
                desc: {
                    en: 'Matches the input named "productCode" in the form.',
                    zh: '对应表单里 name="productCode" 的输入框。'
                }
            },
            {
                name: 'price',
                kind: { en: 'Form field name', zh: '表单字段名' },
                desc: {
                    en: 'Matches the input named "price" in the form.',
                    zh: '对应表单里 name="price" 的输入框。'
                }
            },
            {
                name: 'elseif',
                kind: { en: 'Control structure', zh: '控制结构' },
                desc: {
                    en: 'Only checks the next condition when the previous one failed, so one field reports at most one error per pass.',
                    zh: '前一个条件不成立才检查下一个，保证同一字段一次最多报一条错。'
                }
            },
            {
                name: '!is_numeric($price)',
                kind: { en: 'Negated test', zh: '取反判断' },
                desc: {
                    en: '! means “report an error when it is not a number”.',
                    zh: '! 表示「不是数字就报错」。'
                }
            },
            {
                name: 'return $errors',
                kind: { en: 'Return value', zh: '返回值' },
                desc: {
                    en: 'Hands every error back to the controller; the convention is “empty array = validation passed”.',
                    zh: '把全部错误交回控制器；约定「空数组 = 校验通过」。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: fix the return contract and create the empty error array',
                    zh: '第 1 步：约定返回值 + 建立空错误数组'
                },
                code: `<?php
/**
 * 校验表单提交的数据。
 * 约定：返回一个错误信息数组；数组为空（empty）即代表校验通过。
 * 好处：控制器不需要知道具体校验细节，只关心"有没有错误"。
 */
function validate(){
    $errors = [];   // 收集错误信息，每发现一个问题就 $errors[] 追加一条
`,
                why: {
                    en: 'The caller only needs a result it can test for pass / fail. Returning an array both answers “any errors?” and carries them all out for display.',
                    zh: '调用方只需要一个能判断「通过与否」的结果。用数组当返回值，既能判断有没有错，又能把所有错误带出去显示。'
                },
                purpose: {
                    en: 'Sets the contract first (empty array = passed), then starts work. That contract is what lets the controller stay so short.',
                    zh: '先立下契约（空数组 = 通过），再开工。这个约定让控制器代码可以写得非常短。'
                }
            },
            {
                title: {
                    en: 'Step 2: read the two fields to validate from POST',
                    zh: '第 2 步：从 POST 读取两个待校验字段'
                },
                code: `    
    // 从 POST 请求中读取字段（filter_input 比直接访问 $_POST 更安全）
    $productCode = filter_input(INPUT_POST, 'productCode');
    $price = filter_input(INPUT_POST, 'price');
`,
                why: {
                    en: 'Validation needs the data first. The function reads POST itself, so the caller does not even pass arguments.',
                    zh: '校验的前提是拿到数据。这里由函数自己读取 POST，调用方连参数都不用传。'
                },
                purpose: {
                    en: 'Wraps the data reading in too, so the controller needs only $errors = validate();. The field names must match the form exactly.',
                    zh: '把「取数据」也一并封装进来，控制器只需 $errors = validate();。注意字段名要和表单的 name 完全一致。'
                }
            },
            {
                title: {
                    en: 'Step 3: product-code rules (required + at least 3 characters)',
                    zh: '第 3 步：产品编号规则（必填 + 至少 3 字符）'
                },
                code: `
    // 规则 1：产品编号不能为空
    // 规则 2：若不为空，长度还必须 >= 3 个字符
    // 用 elseif 保证同一字段一次最多报一条错误
    if (empty($productCode)) {
        $errors[] = 'missing product code';
    } elseif (strlen($productCode) < 3) {
        $errors[] = 'product code too few characters';
    }
`,
                why: {
                    en: 'The code must not be empty and must not be too short. Written as two separate ifs, the input \'ab\' would also trigger “too short”, and an empty input would add a meaningless “too short”.',
                    zh: '编号既不能空，也不能太短。若两个 if 分开写，输入 \'ab\' 时会同时触发「太短」，而没填时又会多报一条无意义的「太短」。'
                },
                purpose: {
                    en: 'Shows the typical way to write validation rules: check one by one, append one by one, and use elseif to keep the number of messages — and their accuracy — under control.',
                    zh: '展示校验规则的典型写法：逐条检查、逐条追加；用 elseif 控制错误数量，提示才准确。'
                }
            },
            {
                title: {
                    en: 'Step 4: price rules (required but 0 is allowed + must be numeric)',
                    zh: '第 4 步：价格规则（必填但允许 0 + 必须是数字）'
                },
                code: `
    // 规则 3：价格不能为空。
    //   注意用 isAnEmptyNonZeroString() 而不是 empty()：
    //   因为 empty('0') === true，会把合法的 0 当成"没填"。
    // 规则 4：价格必须是数字（is_numeric 判断是否为数字或数字字符串）
    if (isAnEmptyNonZeroString($price)) {
        $errors[] = 'missing price';
    } elseif (!is_numeric($price)) {
        $errors[] = 'price was not a number';
    }
`,
                why: {
                    en: 'The price must be filled in, must work as a number, and must not treat 0 as empty — which is precisely why inc/zeroFunction.php exists.',
                    zh: '价格既要必填、又必须能当数字用，同时还不能把 0 误判成空 —— 这正是 inc/zeroFunction.php 存在的理由。'
                },
                purpose: {
                    en: 'Chains two rules: confirm “something was typed”, then confirm “it is a number”. The order cannot be swapped, or 0 would be killed by mistake.',
                    zh: '把两个规则串成一条链：先确认「填了」，再确认「填的是数字」。顺序不能颠倒，否则 0 会被误杀。'
                }
            },
            {
                title: {
                    en: 'Step 5: return the error array to the controller',
                    zh: '第 5 步：把错误数组返回给控制器'
                },
                code: `    
    // 把错误数组返回给调用者（控制器）
    return $errors;
}

?>
`,
                why: {
                    en: 'The result has to be handed back so the controller can decide between a success message and redisplaying the form.',
                    zh: '校验结果必须交出去，控制器才能决定是显示成功提示还是重新显示表单。'
                },
                purpose: {
                    en: 'Completes the contract: an array comes back whether or not there are errors, so the controller can judge the outcome with a single empty($errors).',
                    zh: '完成契约：无论有没有错，返回的都是数组。控制器用 empty($errors) 一句话就能判断结果。'
                }
            }
        ]
    },

    {
        key: 'inc-form',
        file: 'inc/form.php',
        group: {
            en: 'inc libraries: shared by both versions of 06',
            zh: 'inc 函数库：被 06 两个版本共用'
        },
        title: {
            en: 'displayForm(): the form HTML wrapped in a function',
            zh: 'displayForm()：把表单 HTML 封装成函数'
        },
        goal: {
            en: 'Output the complete form page (error area plus sticky values) from one function; the arguments decide how it looks.',
            zh: '用一个函数输出完整的表单页面（含错误提示区与粘性回填），参数决定它显示成什么样。'
        },
        run: {
            en: 'Not opened directly — called by 06_validation_array_controller.php: displayForm($isSubmitted,$isValid,$errors,$productCode,$price);',
            zh: '不能直接访问，由 06_validation_array_controller.php 调用：displayForm($isSubmitted,$isValid,$errors,$productCode,$price);'
        },
        notice: {
            en: 'This file leaves PHP mode inside the function to write plain HTML — deliberately: echoing a dozen lines of HTML one by one would be unmaintainable.',
            zh: '这个文件在函数中用 ?> 退出 PHP 模式直接写 HTML —— 那是刻意的写法：大段 HTML 用 echo 一行行输出会非常难维护。'
        },
        terms: [
            {
                name: 'displayForm',
                kind: { en: 'Function name', zh: '函数名' },
                desc: {
                    en: '“Show the form”. Outputs HTML only; no logic beyond the conditions needed to render it.',
                    zh: '「显示表单」。只负责输出 HTML，不做任何判断以外的逻辑。'
                }
            },
            {
                name: "$isSubmitted = ''",
                kind: { en: 'Parameter (default empty)', zh: '参数（默认空）' },
                desc: {
                    en: 'Whether the form was submitted; an empty string behaves like false and decides whether the error area appears.',
                    zh: '是否已提交；空字符串等价于 false，用来决定是否显示错误区。'
                }
            },
            {
                name: '$isValid = true',
                kind: { en: 'Parameter (default true)', zh: '参数（默认真）' },
                desc: {
                    en: 'Whether the data is valid; true by default, so a first visit shows no errors.',
                    zh: '数据是否有效；默认 true，所以首次访问不会显示错误。'
                }
            },
            {
                name: '$errors = []',
                kind: { en: 'Parameter (default empty array)', zh: '参数（默认空数组）' },
                desc: {
                    en: 'The list of errors to display. Having a default means the caller may pass only the first few arguments.',
                    zh: '要显示的错误列表。给了默认值，调用时可以只传前几个参数。'
                }
            },
            {
                name: '$productCode / $price',
                kind: { en: 'Parameters (default empty)', zh: '参数（默认空）' },
                desc: {
                    en: 'The values put back into the inputs (sticky form).',
                    zh: '要回填到输入框的值（粘性表单）。'
                }
            },
            {
                name: '?> ... <?php',
                kind: { en: 'PHP mode switch', zh: 'PHP 模式切换' },
                desc: {
                    en: 'Leave PHP mode mid-function to emit HTML as-is, then switch back and carry on with the function definition.',
                    zh: '在函数中途退出 PHP 模式原样输出 HTML，写完再切回来继续函数定义。'
                }
            },
            {
                name: 'class="error"',
                kind: { en: 'CSS class', zh: 'CSS 类' },
                desc: {
                    en: 'The pink message box; its style is written in the <style> block the function outputs.',
                    zh: '粉色底的提示框，样式就写在函数输出的 <style> 里。'
                }
            },
            {
                name: '$isSubmitted && !$isValid',
                kind: { en: 'Display condition', zh: '显示条件' },
                desc: {
                    en: 'Show the error area only when “submitted” and “failed” — so a first visit naturally shows nothing.',
                    zh: '「提交过」且「没通过」才显示错误区，首次访问自然不显示。'
                }
            }
        ],
        steps: [
            {
                title: {
                    en: 'Step 1: doc-block and signature (every parameter has a default)',
                    zh: '第 1 步：文档注释与函数签名（全部参数给默认值）'
                },
                code: `<?php 
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
`,
                why: {
                    en: 'Drawing the form needs to know whether it was submitted, whether it failed, what the errors are and what the user typed — all of which arrive as arguments.',
                    zh: '显示表单需要知道「有没有提交、有没有错、错在哪、用户之前填了什么」，这些都得靠参数传进来。'
                },
                purpose: {
                    en: 'Defaults on every parameter free the caller from supplying all of them, and let the function work in the simplest scenario — a first visit.',
                    zh: '给每个参数都设默认值，调用方就不必凑齐全部参数；也让函数可以在「首次访问」这种最简场景下被调用。'
                }
            },
            {
                title: {
                    en: 'Step 2: leave PHP mode and emit the HTML head verbatim',
                    zh: '第 2 步：退出 PHP 模式，从 HTML 头部开始原样输出'
                },
                code: `// 下面用 ?> 退出 PHP 模式，直接按原样输出 HTML（比一行行 echo 更直观）
?>
    <!doctype html>
    <html><head>
        <title>Two-field postback form</title>
        <style>.error { background-color: pink; padding: 1rem;}</style>
    </head>
    <body>
`,
                why: {
                    en: 'The form is a dozen lines of HTML; building it with echo would fill the screen with quotes and escapes. Leaving PHP mode also keeps HTML highlighting in the editor.',
                    zh: '表单有十几行 HTML，用 echo 拼字符串会满屏引号和转义。退出 PHP 模式可以让编辑器继续高亮 HTML。'
                },
                purpose: {
                    en: 'Demonstrates the standard way to write a view function: inside the body, ?> emits the HTML, then you switch back to PHP to close the function.',
                    zh: '演示「视图函数」的标准写法：函数体内 ?> 输出 HTML，写完再切回 PHP 模式闭合函数。'
                }
            },
            {
                title: {
                    en: 'Step 3: submitted and invalid → print the error list',
                    zh: '第 3 步：提交过且有错 → 输出错误列表'
                },
                code: `    <!-- 已提交且有错，才显示红色（粉色）错误提示区 -->
    <?php if ($isSubmitted && !$isValid): ?>
        <div class="error">
            <ul>
                <?php foreach ($errors as $error): ?>
                    <li><?= $error ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>
`,
                why: {
                    en: 'A failed submission must show the reasons, but a first visit must not show an empty box — so both “submitted” and “failed” have to hold.',
                    zh: '用户提交失败需要看到具体原因，但首次访问不该出现空框，所以条件必须同时满足「已提交」和「未通过」。'
                },
                purpose: {
                    en: 'The view only renders according to conditions: data arrives through parameters, loops and tests use the alternative syntax, so it reads like a template rather than code.',
                    zh: '视图只做「按条件渲染」：数据由参数传入，循环与判断都用替代语法写在 HTML 里，读起来像模板而不是代码。'
                }
            },
            {
                title: {
                    en: 'Step 4: the form itself plus sticky values',
                    zh: '第 4 步：表单本体 + 粘性回填'
                },
                code: `
    <h1>Product details</h1>
    <!-- 省略 action：表单提交回本页自身 -->
    <form method="POST">
        <!-- 回填用户之前输入的值，避免校验失败后要重填 -->
        Product code: <input name="productCode" value="<?= $productCode ?>">
        <p>Price: <input name="price" value="<?= $price ?>"></p>
`,
                why: {
                    en: 'Omitting action is what makes the form post back to the controller itself, closing the postback loop; printing the variables into value is what preserves the user’s input.',
                    zh: '不写 action 才能提交回控制器自己，形成 postback 闭环；value 里输出变量才能保留用户已填内容。'
                },
                purpose: {
                    en: 'Implements both patterns — postback and sticky form — in two lines. The names must match what validate() reads.',
                    zh: '把「回传」和「粘性表单」两个模式合在两行里实现。注意 name 必须与 validate() 读取的名字一致。'
                }
            },
            {
                title: {
                    en: 'Step 5: submit button, closing tags, then back to PHP to close the function',
                    zh: '第 5 步：提交按钮、收尾，切回 PHP 模式闭合函数'
                },
                code: `        <p><input type="submit"></p>
    </form>
    </body></html>
<?php
// 重新进入 PHP 模式，结束函数定义
}
?>
`,
                why: {
                    en: 'The HTML is finished but the function brace is still open, so PHP mode has to be re-entered to add } — otherwise the whole file is a syntax error.',
                    zh: 'HTML 写完了，但函数的大括号还没闭合，必须重新进入 PHP 模式补上 }，否则整个文件语法错误。'
                },
                purpose: {
                    en: 'Completes the “HTML inside a function” technique: ?> starts the output, <?php returns and closes the function. This is the earliest form of an MVC view layer.',
                    zh: '完整演示「函数内嵌 HTML」的收尾方式：?> 开始输出 → <?php 回来闭合函数。这是 MVC 视图层最原始的形态。'
                }
            }
        ]
    }
];
