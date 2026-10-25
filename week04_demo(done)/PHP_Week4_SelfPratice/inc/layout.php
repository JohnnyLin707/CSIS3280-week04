<?php
/**
 * 页面布局与代码块渲染
 */

/**
 * 输出页面头部（Bootstrap + 导航条）
 */
function pageTop(string $title, string $subtitle = ''): void
{
?>
<!doctype html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($title) ?> - PHP 填空练习室</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/style.css">
</head>
<body class="bg-body-tertiary">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <a class="navbar-brand fw-bold" href="index.php">&lt;?php 填空练习室 ?&gt;</a>
        <div class="navbar-nav flex-row ms-auto gap-3">
            <a class="nav-link" href="manual.php">编程说明书</a>
            <a class="nav-link" href="index.php">填空练习</a>
            <a class="nav-link" href="index.php?reset=1"
               onclick="return confirm('确定清空所有练习进度？');">重置进度</a>
        </div>
    </div>
</nav>
<main class="container py-4">
<?php if ($subtitle !== ''): ?>
    <p class="text-secondary mb-4"><?= htmlspecialchars($subtitle) ?></p>
<?php endif; ?>
<?php
}

/**
 * 输出页面尾部
 */
function pageBottom(): void
{
?>
</main>
<footer class="text-center text-secondary py-4 small">
    CSIS 3280 · PHP 表单与校验 · 编程填空练习
</footer>
</body>
</html>
<?php
}

/**
 * 把带 [[1]] [[2]] 占位符的代码渲染成"代码块 + 输入框"。
 *
 * @param string      $code    含占位符的代码
 * @param array       $blanks  每个空的配置
 * @param array|null  $results 校对结果（有值时给输入框加绿/红边框并显示正确答案）
 * @param bool        $reveal  是否直接显示答案
 */
function renderCodeBlock(string $code, array $blanks, ?array $results = null, bool $reveal = false): void
{
    // 用 PREG_SPLIT_DELIM_CAPTURE 保留占位符里的数字
    $parts = preg_split('/\[\[(\d+)\]\]/', $code, -1, PREG_SPLIT_DELIM_CAPTURE);

    echo '<pre class="code-block">';
    foreach ($parts as $i => $part) {
        if ($i % 2 === 0) {
            // 普通代码：转义后高亮注释行
            echo highlightComments(htmlspecialchars($part));
        } else {
            $index  = (int) $part;
            $blank  = $blanks[$index] ?? ['answer' => ''];
            $result = $results[$index] ?? null;

            if ($reveal) {
                $value = $blank['answer'];
            } else {
                $value = $result['user'] ?? '';
            }

            $state = '';
            if (!empty($result) && !$reveal) {
                $state = $result['correct'] ? ' is-correct' : ' is-wrong';
            }

            // 输入框宽度按答案长度自适应
            $width = max(8, mb_strlen($blank['answer']) + 2);
            echo '<input type="text"'
                . ' class="code-input' . $state . '"'
                . ' name="answer[' . $index . ']"'
                . ' value="' . htmlspecialchars($value) . '"'
                . ' size="' . $width . '"'
                . ' style="width:' . $width . 'ch"'
                . ' autocomplete="off" spellcheck="false">';
        }
    }
    echo '</pre>';
}

/**
 * 把 // 或 # 开头的整行注释染成绿色
 */
function highlightComments(string $escapedCode): string
{
    $escapedCode = preg_replace('/^([ \t]*\/\/.*)$/m', '<span class="code-comment">$1</span>', $escapedCode);
    $escapedCode = preg_replace('/^([ \t]*#.*)$/m', '<span class="code-comment">$1</span>', $escapedCode);
    return $escapedCode;
}

/**
 * 说明书用的代码渲染：转义后把三类注释都包进 .code-comment
 * （HTML 注释 <!-- -->、块注释 /* *\/、行注释 // 与 #），
 * 这样页面上可以一键「隐藏注释」进入纯代码手打模式。
 */
function highlightManualCode(string $code): string
{
    $escaped = htmlspecialchars($code, ENT_QUOTES, 'UTF-8');
    $escaped = preg_replace('#(&lt;!--.*?--&gt;)#s', '<span class="code-comment">$1</span>', $escaped);
    $escaped = preg_replace('#(/\*.*?\*/)#s', '<span class="code-comment">$1</span>', $escaped);
    $escaped = preg_replace('#^([ \t]*(\/\/|\#).*)$#m', '<span class="code-comment">$1</span>', $escaped);
    return $escaped;
}
