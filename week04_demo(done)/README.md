# Week 04 演示：PHP 表单处理

本目录用一组最小可运行的示例，演示**浏览器表单如何把数据传给 PHP，PHP 又如何读取、判断与校验**。
每个示例只讲一个知识点，建议按 01 → 06 的顺序阅读。

---

## 一、环境准备（一次性）

这些页面必须**通过 Web 服务器访问**，不能直接双击用 `file://` 打开（否则 PHP 不会执行）。

### 1. 启动内置服务器（需安装 PHP 7/8，推荐 PHP 8）

示例里表单的 `action` 写的是**绝对路径** `/week04/xxx.php`，所以Web 根目录下必须有一个名为 `week04` 的目录。
当前文件夹叫 `week04_demo(done)`，用软链接映射成 `week04` 最省事：

```bash
# 建一个空的站点根目录
mkdir -p ~/week04_site
cd ~/week04_site

# 把本目录链接成 week04（把路径换成你自己的实际路径）
ln -s "/Users/johnnylin/Library/CloudStorage/OneDrive-Personal/3280-Backend Web Development/week04_demo(done)" week04

# 启动 PHP 内置服务器
php -S localhost:8000
```

之后浏览器访问：**http://localhost:8000/week04/**

> 不想用软链接也可以：把文件夹复制/重命名为 `week04` 放在站点根目录下即可。
> 另一种改法是把各文件里的 `/week04/...` 改成相对路径（如 `01_mixed_request_process.php`），
> 这样就能用任意目录名，但要注意 `inc/` 的 `require_once` 是相对路径，工作目录必须正确。
>
> 停止服务器：在终端按 `Ctrl + C`。

### 2. 文件清单与访问地址

| 文件 | 类型 | 作用 |
|---|---|---|
| `01_mixed_request.html` | 入口表单 | 填写并提交 |
| `01_mixed_request_process.php` | 处理脚本 | 被表单调用，不直接访问 |
| `02_multiple_buttons.html` | 入口表单 | 填写并提交 |
| `02_multiple_process.php` | 处理脚本 | 被表单调用，不直接访问 |
| `03_button_links.php` | 独立页面 | 可直接访问 |
| `04_checkboxes_array.html` | 入口表单 | 勾选并提交 |
| `04_checkboxes_process.php` | 处理脚本 | 被表单调用，不直接访问 |
| `05_multiple_selection.html` | 入口表单 | 演示多选控件（处理脚本未提供） |
| `06_validation_array_no_function.php` | 独立页面 | 可直接访问（单文件版校验） |
| `06_validation_array_controller.php` | 独立页面 | 可直接访问（函数拆分版校验） |
| `inc/zeroFunction.php` | 函数库 | 辅助函数 |
| `inc/validate.php` | 函数库 | 校验逻辑 |
| `inc/form.php` | 函数库 | 表单视图 |

---

## 二、逐个示例：怎么跑、看到什么、学什么

### 01 混合请求（GET + POST 同时存在）
**运行**：访问 `01_mixed_request.html`，随便填 Title / Price，点提交。
**看到什么**：跳转到 `01_mixed_request_process.php`，页面显示三行：

```
id = 1022
title = 你填的标题
price = 你填的价格
```

**演示目的**
- 一次 HTTP 请求可以**同时**携带 GET 数据和 POST 数据：`id` 来自 URL 查询字符串（`?id=1022`），`title`/`price` 来自 POST 请求体。
- 因此 PHP 端要**分开取**：`filter_input(INPUT_GET, ...)` 取 URL 参数，`filter_input(INPUT_POST, ...)` 取表单字段。
- 用 `filter_input()` 而不是 `$_GET`/`$_POST`，可以对输入做过滤，更安全。
- 顺带看代码结构：先「取数据（逻辑）」，再「输出 HTML（模板）」。

---

### 02 多个提交按钮（区分用户点了哪个按钮）
**运行**：访问 `02_multiple_buttons.html`，填信用卡信息，分别点两个绿色按钮各试一次。
**看到什么**：
- 点 "Pay and start watching now" → 页面显示 `You selected WatchNow`
- 点 "Pay and watch later" → 页面显示 `You selected WatchLater`

**演示目的**
- 一个表单可以有**多个 submit 按钮**，关键是**只有被点击的那个按钮**才会把自己的 `name`/`value` 提交上去。
- 服务端用 `filter_has_var(INPUT_POST, 'watchNow')`（或 `isset($_POST['watchNow'])`）判断点击来源，从而走不同分支。
- 浏览器地址栏看不到这些字段，说明信用卡信息走的是 POST（相对 GET 更适合敏感数据）。

---

### 03 用链接当按钮（把数据放进 URL）
**运行**：直接访问 `03_button_links.php`。
**看到什么**：两行商品（Hammer 9.99 / A bucket of nails 19.99），每行右侧一个蓝色 `Details` 按钮。
把鼠标悬停在按钮上，可在浏览器左下角看到链接地址：`/show.php?id=123` 或 `/show.php?id=234`。

**演示目的**
- 不需要表单也能传数据：**超链接 + 查询字符串**就能把 `id` 发给服务器（GET 请求）。
- 页面内容由 **PHP 数组循环生成**（`foreach ... endforeach` 替代语法），这是"数据驱动页面"的最小雏形。
- `class="btn btn-primary"` 说明 Bootstrap 可以把 `<a>` 直接打扮成按钮外观。
- 提示：`/show.php` 只是示意，本目录未提供该文件，点击会 404（属于正常现象）。

---

### 04 复选框数组（一个字段提交多个值）
**运行**：访问 `04_checkboxes_array.html`，勾选任意几个配料后提交；也可以一个都不勾直接提交。
**看到什么**：
- 勾选 Olives + Garlic salt → `Your selected toppings are: olives+garlic`
- 一个都不勾 → `Please select a topping`
- 提交后注意地址栏：`.../04_checkboxes_process.php?toppings%5B%5D=olives&toppings%5B%5D=garlic`（说明用的是 GET）

**演示目的**
- 多个复选框用**同一个名字 + 方括号** `name="toppings[]"`，PHP 才会收到**数组**；不加 `[]` 只会保留最后一个值。
- 读取时第三个参数 `FILTER_REQUIRE_ARRAY` 强制要求结果必须是数组，传来的不是数组就返回 `false`，避免类型错误。
- `implode('+', $toppings)` 把数组拼成字符串；`empty()` 用来判断"一个都没选"。

---

### 05 多选列表（select multiple）
**运行**：访问 `05_multiple_selection.html`，按住 `Ctrl`（macOS 用 `Command`）点选多个花名，再点提交。
**看到什么**：浏览器会跳转到 `05_multiple_process.html`（该文件未提供，因此会报 404）。
可在跳转后的地址栏看到类似：`...?flowers%5B%5D=poppy&flowers%5B%5D=tulip`

**演示目的**
- `size="3"` 让下拉框一次显示 3 行、`multiple` 允许多选、`name="flowers[]"` 让所选的多个值以**数组**形式提交。
- 与 04 的复选框是同一套"数组字段"思路，只是控件不同，服务端处理方式完全一样（`FILTER_REQUIRE_ARRAY` + `implode`）。
- 注意：`action` 指向 `.html` 只是课堂演示的占位；静态 HTML 无法处理数据，实际项目应指向 `.php`。

---

### 06 表单校验（同一个功能的两种写法，重点）
两个文件功能完全一样，请**对照着看**。访问后是一个「Product details」表单，有两个字段：Product code、Price。

**运行与效果**（两者表现一致）：

| 操作 | 显示效果 |
|---|---|
| 首次打开页面 | 只显示空表单，无错误提示 |
| 两个字段都留空直接提交 | 表单上方出现粉色错误框，列出 `missing product code`、`missing price` |
| Product code 填 `ab`（少于 3 个字符） | 提示 `product code too few characters` |
| Price 填 `abc` | 提示 `price was not a number` |
| Price 填 `0` | **校验通过**（这是本例的关键，见下） |
| Product code 填 `abc`、Price 填 `12.5` | 显示 `Your input data was error free`，不再显示表单 |

**演示目的**
1. **回传（postback）模式**：`<form method="POST">` 不写 `action`，表单提交回自己；用 `$_SERVER['REQUEST_METHOD'] === 'POST'` 区分"首次打开"和"提交后"。
2. **错误用数组收集**：`$errors[] = '...'` 逐条追加，最后用 `empty($errors)` 判断有没有错，页面再把错误循环显示出来。
3. **`empty('0')` 的坑**：价格填 `0` 是合法的，但 `empty('0')` 返回 `true`，会被误判成"没填"。所以自定义了 `isAnEmptyNonZeroString()`（在 `inc/zeroFunction.php`）先把字符串 `'0'` 排除，再做 `empty()` 判断。
4. **粘性表单（sticky form）**：出错时把用户已填的值回填到 `value="<?= $productCode ?>"`，用户不用重新输入。

**两种写法的区别（本例真正的教学点）**

| | `06_validation_array_no_function.php` | `06_validation_array_controller.php` |
|---|---|---|
| 代码组织 | 全部逻辑写在一个文件里 | 拆成 控制器 + 函数库 |
| 校验 | 写在主流程里 | `inc/validate.php` 的 `validate()` |
| 显示表单 | 写在主流程里 | `inc/form.php` 的 `displayForm()` |
| 辅助函数 | `inc/zeroFunction.php` | 同左 |
| 优点 | 直观、好读 | 职责分离、可复用、易维护 |

**运行 06 的控制器版要注意**：`require_once 'inc/...'` 是**相对路径**，所以入口必须是 `06_validation_array_controller.php` 所在的目录（按上面的方式启动服务器即可，不要单独打开 `inc/` 里的文件）。

---

## 三、速查：本目录涉及的核心 PHP 函数

| 函数 / 写法 | 含义 |
|---|---|
| `filter_input(INPUT_GET\|INPUT_POST, 'name')` | 从 GET / POST 中读取并过滤单个值 |
| `filter_input(..., options: FILTER_REQUIRE_ARRAY)` | 要求读取结果必须是数组（复选框 / 多选） |
| `filter_has_var(INPUT_POST, 'name')` | 判断某变量是否存在（判断点了哪个按钮） |
| `empty($x)` | 判断是否为空（`''`、`null`、`0`、`'0'`、`[]` 均为 true） |
| `implode('+', $arr)` | 把数组用指定分隔符拼成字符串 |
| `is_numeric($x)` | 判断是否为数字或数字字符串 |
| `strlen($s)` | 字符串长度 |
| `$_SERVER['REQUEST_METHOD']` | 当前请求方式（GET / POST） |
| `<?= $x ?>` | `<?php echo $x ?>` 的简写，用于输出变量 |
| `foreach(...): ... endforeach;` | 循环控制结构的替代语法，混排 HTML 时更好读 |
| `require_once 'inc/x.php'` | 引入文件，`_once` 保证只引入一次 |
| `die()` | 立即终止脚本，后续 HTML 不再输出 |
