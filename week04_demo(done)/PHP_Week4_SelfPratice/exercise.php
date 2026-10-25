<?php
/**
 * 答题页：显示题目 → 提交 → 校对答案 → 显示讲解
 */
session_start();

require_once __DIR__ . '/inc/exercises.php';
require_once __DIR__ . '/inc/checker.php';
require_once __DIR__ . '/inc/layout.php';

// 题号：从 URL 读取，非法则跳回首页
$id        = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
$exercise  = ($id === false || $id === null) ? null : getExercise($id);
if ($exercise === null) {
    header('Location: index.php');
    exit;
}

$exercises = getExercises();
$total     = count($exercise['blanks']);
$results   = null;   // 校对结果
$reveal    = false;  // 是否显示答案
$checked   = false;  // 是否已校对

// 处理按钮动作（三个 submit：校对 / 看答案 / 重做）
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $answers = filter_input(INPUT_POST, 'answer', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY) ?? [];
    $action  = filter_input(INPUT_POST, 'action');

    if ($action === 'check') {
        $results = checkExercise($exercise, $answers);
        $checked = true;
        $correct = countCorrect($results);

        // 记录进度：只在成绩更好时覆盖，避免手滑变差
        $previous = $_SESSION['progress'][$id]['correct'] ?? -1;
        if ($correct > $previous) {
            $_SESSION['progress'][$id] = ['correct' => $correct, 'total' => $total];
        }
    } elseif ($action === 'reveal') {
        $reveal = true;   // 直接显示标准答案（不计入进度）
    }
    // action === 'retry' 时什么都不做，输入框保持空白
}

$correctCount = $results === null ? 0 : countCorrect($results);
$allCorrect   = $checked && $correctCount === $total;

pageTop('第 ' . $exercise['id'] . ' 题', '');
?>

<div class="d-flex justify-content-between align-items-center mb-3">
    <a class="btn btn-outline-secondary btn-sm" href="index.php">← 返回列表</a>
    <div class="btn-group">
        <?php if ($exercise['id'] > 1): ?>
            <a class="btn btn-outline-secondary btn-sm"
               href="exercise.php?id=<?= $exercise['id'] - 1 ?>">上一题</a>
        <?php endif; ?>
        <?php if ($exercise['id'] < count($exercises)): ?>
            <a class="btn btn-outline-primary btn-sm"
               href="exercise.php?id=<?= $exercise['id'] + 1 ?>">下一题 →</a>
        <?php endif; ?>
    </div>
</div>

<div class="card shadow-sm mb-4">
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-3">
            <h2 class="h4 fw-bold mb-0">
                第 <?= $exercise['id'] ?> 题：<?= htmlspecialchars($exercise['title']) ?>
            </h2>
            <span class="badge badge-level-<?= $exercise['level'] ?>"><?= $exercise['level'] ?></span>
        </div>

        <p class="mb-2"><?= htmlspecialchars($exercise['prompt']) ?></p>
        <p class="text-secondary small">出处：<?= htmlspecialchars($exercise['source']) ?></p>

        <form method="POST">
            <?php renderCodeBlock($exercise['code'], $exercise['blanks'], $results, $reveal); ?>

            <div class="d-flex flex-wrap gap-2 mt-3">
                <button type="submit" name="action" value="check" class="btn btn-success">
                    校对答案
                </button>
                <button type="submit" name="action" value="reveal" class="btn btn-outline-warning">
                    显示答案
                </button>
                <button type="submit" name="action" value="retry" class="btn btn-outline-secondary">
                    重新填写
                </button>
            </div>
        </form>
    </div>
</div>

<?php if ($checked): ?>
    <!-- 校对结果 -->
    <div class="alert <?= $allCorrect ? 'alert-success' : 'alert-danger' ?>">
        <h3 class="h5 mb-1">
            <?php if ($allCorrect): ?>
                全部正确！<?= $correctCount ?> / <?= $total ?>
            <?php else: ?>
                答对 <?= $correctCount ?> / <?= $total ?> 个空，再看讲解改一改
            <?php endif; ?>
        </h3>
    </div>

    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <h3 class="h6 fw-bold mb-3">逐空讲解</h3>
            <?php foreach ($exercise['blanks'] as $index => $blank): ?>
                <?php $result = $results[$index]; ?>
                <div class="border-start border-3 <?= $result['correct'] ? 'border-success' : 'border-danger' ?> ps-3 mb-3">
                    <div class="fw-bold">
                        第 <?= $index ?> 空：
                        <?php if ($result['correct']): ?>
                            <span class="text-success">正确</span>
                        <?php else: ?>
                            <span class="text-danger">不正确</span>
                        <?php endif; ?>
                    </div>
                    <div class="small mt-1">
                        <div>你的答案：<code><?= htmlspecialchars($result['user'] === '' ? '（空）' : $result['user']) ?></code></div>
                        <?php if (!$result['correct']): ?>
                            <div>正确答案：<code class="text-success"><?= htmlspecialchars($result['expected']) ?></code></div>
                        <?php endif; ?>
                        <div class="mt-1 text-secondary"><?= htmlspecialchars($blank['explain']) ?></div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
<?php elseif ($reveal): ?>
    <div class="alert alert-warning">
        已显示标准答案，本次不计入进度。建议先自己做一遍再来对照。
    </div>
<?php endif; ?>

<!-- 提示（折叠） -->
<div class="card shadow-sm mb-4">
    <div class="card-body">
        <h3 class="h6 fw-bold mb-2">提示</h3>
        <?php foreach ($exercise['blanks'] as $index => $blank): ?>
            <details class="mb-1">
                <summary class="small">第 <?= $index ?> 空的提示</summary>
                <span class="small text-secondary"><?= htmlspecialchars($blank['hint']) ?></span>
            </details>
        <?php endforeach; ?>
    </div>
</div>

<div class="alert alert-primary">
    <strong>要点：</strong><?= htmlspecialchars($exercise['note']) ?>
</div>

<?php pageBottom(); ?>
