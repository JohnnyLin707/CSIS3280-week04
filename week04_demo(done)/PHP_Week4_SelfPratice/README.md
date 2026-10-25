# PHP 练习室（原文编程说明书 + 编程填空题）

两部分内容：

1. **原文编程说明书**（`manual.php` / `chapter.php`）：把 `week04_demo(done)` 的 **13 个源文件**
   （01~06 全部代码 + `inc/` 三个函数库）按原文件顺序逐步拆开，保留**原文代码**，
   每步配「为什么要写这一步」「这一步的用意」，左侧固定 div 显示本章**变量与名称的含义**。
2. **编程填空题**（`index.php` / `exercise.php`）：基于 `week04_demo` 与 Assignment 2 的代码，
   整理的 **14 道 PHP 编程填空题**，挖掉关键处让你填写，提交后**服务端校对**并逐空讲解。

---

## 一、运行方式

```bash
cd "/Users/johnnylin/Library/CloudStorage/OneDrive-Personal/3280-Backend Web Development/PHP_FillBlank_Lab"
php -S localhost:8100
```

浏览器打开：<http://localhost:8100/manual.php>（说明书）或 <http://localhost:8100/index.php>（填空练习）

- 首页：题目列表 + 总进度条（用 Session 记录，刷新不丢）
- 点卡片进入题目 → 填代码 → 点「校对答案」
- 「显示答案」直接看标准答案（不计入进度）；「重新填写」清空重做
- 首页右上角「重置进度」清空全部记录

---

## 二、文件结构

```
PHP_Week4_SelfPratice/
├── manual.php             说明书首页：章节目录、环境准备、手打总进度
├── chapter.php            说明书章节页：左栏变量释义 + 原文逐步代码与讲解
├── index.php              填空练习首页：题目列表、总进度、重置
├── exercise.php           答题页：渲染题目 + 校对 + 讲解
├── inc/
│   ├── manual.php         说明书数据（13 章：原文分步代码 + 用意 + 术语表）
│   ├── exercises.php      题库（14 题，含答案/提示/讲解）
│   ├── checker.php        答案校对（规范化比较）
│   └── layout.php         页面头部尾部、代码块渲染
├── assets/style.css       代码块、输入框、左侧释义区样式
└── README.md
```

---

## 三、功能说明

### 1. 题目渲染
题库里代码用 `[[1]] [[2]]` 标记空位；`inc/layout.php` 的 `renderCodeBlock()` 用
`preg_split()` 把代码切开，把每个标记替换成一个**宽度自适应的输入框**，
同时把 `//` 注释行染成绿色。

### 2. 答案校对（核心）
`inc/checker.php` 的思路是**先规范化，再比较**：

```php
$s = preg_replace('/\s+/', ' ', $s);   // 多个空白折叠成一个空格
$s = str_replace(["'", '"'], '', $s);  // 单双引号等价
$s = rtrim($s, ';');                   // 结尾分号可写可不写
$s = strtolower($s);                   // 大小写不敏感
```

效果：
- `'id'` / `"id"` / `ID` / `id` 都算对
- `filter_input(INPUT_GET,'id')` 和 `filter_input(INPUT_GET, 'id')` 都算对
- 每道题可配置 `accepted` 数组，支持**多种等价写法**

注意：正则里的空格**不会**被忽略（只折叠、不删除），所以
`/^(Winter|Summer|Fall) 202[0-6]$/` 少写空格会判错 —— 这是有意的严格。

### 3. 反馈与进度
- 校对后每个输入框变**绿框（正确）/ 红框+波浪线（错误）**
- 下方「逐空讲解」显示：你的答案、正确答案、为什么
- `<details>` 折叠显示每个空的**提示**，方便先自己想
- 进度存 Session：`$_SESSION['progress'][题号] = ['correct'=>x,'total'=>y]`，
  只在成绩更好时覆盖，首页汇总成进度条与「已掌握 / x/y 正确 / 未练习」状态

---

## 四、原文编程说明书（照着原文手打一遍）

入口：`manual.php`（目录）→ 点章节进入 `chapter.php?c=xxx`。

### 1. 收录范围（13 章，教材原顺序）

| # | 原文文件 | 知识点 |
|---|---|---|
| 1 | `01_mixed_request.html` | 表单入口：GET + POST 混合请求 |
| 2 | `01_mixed_request_process.php` | `INPUT_GET` / `INPUT_POST` 分开取值 |
| 3 | `02_multiple_buttons.html` | 多个 submit 按钮 |
| 4 | `02_multiple_process.php` | `filter_has_var()` 判断点了哪个按钮 |
| 5 | `03_button_links.php` | 数组循环 + 链接传 id |
| 6 | `04_checkboxes_array.html` | `name="toppings[]"` |
| 7 | `04_checkboxes_process.php` | `FILTER_REQUIRE_ARRAY` + `implode()` |
| 8 | `05_multiple_selection.html` | `select multiple` |
| 9 | `06_validation_array_no_function.php` | 单文件版校验（postback + 粘性表单） |
| 10 | `06_validation_array_controller.php` | 控制器版（拆分 validate / displayForm） |
| 11 | `inc/zeroFunction.php` | `isAnEmptyNonZeroString()`：`empty('0')` 的坑 |
| 12 | `inc/validate.php` | `validate()`：集中校验规则 |
| 13 | `inc/form.php` | `displayForm()`：函数里输出 HTML |

### 2. 每一章页面长什么样

- **左侧 div（固定显示区）**：本章出现的变量 / 函数 / 属性 / 关键字速查表，
  格式为「名称 + 类别徽章 + 含义说明」，滚动时吸附在视口内；下方还有全部章节的跳转列表。
- **右侧正文**：
  1. 章节信息卡：要解决什么、怎么运行、易错提醒；
  2. 手打工具条：**隐藏注释**（纯代码模式）、**复制本章全部代码**、手打进度条；
  3. 逐步卡片：按原文顺序把文件切成若干步，每步给出「原文代码 + 为什么要写这一步 + 这一步的用意」。
  所有步骤的代码按顺序拼起来，就是该文件的完整原文。

### 3. 手打进度

每步右上角有「已手打」勾选框，进度写入浏览器 `localStorage`（键名 `manual_<章节key>`），
刷新不丢；`manual.php` 首页会汇总成总进度条与每章的「未开始 / 已手打 x/y 步 / ✓ 已完成」。

### 4. 想加新章节

编辑 `inc/manual.php`，在数组里追加一项即可（目录、进度、上下章导航会自动生效）：

```php
[
    'key'   => 'my-chapter',          // URL ?c= 用的唯一标识
    'file'  => 'xxx.php',             // 原文文件名
    'group' => '所属知识点',
    'title' => '章节标题',
    'goal'  => '这一章要解决什么',
    'run'   => '怎么运行 / 看到什么',
    'notice'=> '易错提醒（可选）',
    'terms' => [                      // 左侧 div 显示区
        ['name' => '$items', 'kind' => '变量', 'desc' => '含义说明'],
    ],
    'steps' => [
        [
            'title'   => '第 1 步：……',
            'code'    => <<<'CODE'
原文代码（用 nowdoc，原样保留）
CODE,
            'why'     => '为什么要写这一步',
            'purpose' => '这一步的用意',
        ],
    ],
]
```

---

## 五、题库清单（14 题，共 19 个空）

| # | 题目 | 考点 | 难度 |
|---|---|---|---|
| 1 | 读取 URL 查询字符串参数 | `INPUT_GET` / `INPUT_POST` 混合请求 | 基础 |
| 2 | 判断表单是否被提交 | `$_SERVER['REQUEST_METHOD']` | 基础 |
| 3 | 多个提交按钮判断 | `filter_has_var()` | 基础 |
| 4 | 复选框提交数组 | `name="toppings[]"` | 进阶 |
| 5 | 读取数组型字段 | `FILTER_REQUIRE_ARRAY`（第 4 参数） | 进阶 |
| 6 | 数组拼成字符串 | `implode()` | 基础 |
| 7 | `empty('0')` 的坑 | `=== '0'` + `empty()` | 进阶 |
| 8 | 学号十位数字校验 | `FILTER_VALIDATE_REGEXP` + `/^\d{10}$/` | 挑战 |
| 9 | 邮箱校验 | `FILTER_VALIDATE_EMAIL` | 基础 |
| 10 | 学期季节+年份 | `/(Winter\|Summer\|Fall) 202[0-6]/` | 挑战 |
| 11 | foreach 替代语法 | `endforeach;` | 进阶 |
| 12 | 粘性表单回填 | `<?= $productCode ?>` | 基础 |
| 13 | 引入文件 | `require_once` | 基础 |
| 14 | 安全引入路径 | `__DIR__` | 进阶 |

---

## 六、想加新题怎么办

编辑 `inc/exercises.php`，往数组里追加一项即可（首页、进度、校对会自动生效）：

```php
[
    'id' => 15,
    'title' => '题目名称',
    'source' => '出处文件名',
    'level' => '基础',            // 基础 / 进阶 / 挑战
    'prompt' => '题目要求说明',
    'code' => <<<'CODE'
$value = filter_input(INPUT_POST, [[1]]);
CODE,
    'blanks' => [
        1 => [
            'answer'   => "'name'",          // 标准答案（显示用）
            'accepted' => ['"name"'],        // 可选：额外等价写法
            'hint'     => '提示文字',
            'explain'  => '校对后显示的讲解',
        ],
    ],
    'note' => '题目要点总结',
]
```

写代码片段时注意：
1. 用 **nowdoc**（`<<<'CODE' ... CODE`）包住代码，避免 `$` 被 PHP 解析
2. 空位写成 `[[1]]`、`[[2]]`，编号要和 `blanks` 的键对应
3. 如果答案里含 `$`，nowdoc 里是安全的；但 `'answer' => '$x'` 要用单引号字符串
4. 字符串里不要出现半角双引号，用中文引号 `『』` 或转义
