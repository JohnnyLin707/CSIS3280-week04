<?php
/**
 * 首页：题目列表 + 总进度
 */
session_start();

require_once __DIR__ . '/inc/exercises.php';
require_once __DIR__ . '/inc/checker.php';
require_once __DIR__ . '/inc/layout.php';

// 重置进度
if (isset($_GET['reset'])) {
    unset($_SESSION['progress']);
    header('Location: index.php');
    exit;
}

$exercises = getExercises();
$progress  = $_SESSION['progress'] ?? [];

// 统计总进度
$totalBlanks   = 0;
$correctBlanks = 0;
$doneCount     = 0;
foreach ($exercises as $exercise) {
    $totalBlanks += count($exercise['blanks']);
    if (isset($progress[$exercise['id']])) {
        $correctBlanks += $progress[$exercise['id']]['correct'];
        $doneCount++;
    }
}
$percent = $totalBlanks > 0 ? round($correctBlanks * 100 / $totalBlanks) : 0;

pageTop('题目列表', '从 week04 表单处理与 Assignment 2 校验中提取的编程填空题，填完即可校对答案。');
?>

<div class="card shadow-sm mb-4">
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
            <h2 class="h5 mb-0">总进度</h2>
            <span class="text-secondary small">
                已练习 <?= $doneCount ?> / <?= count($exercises) ?> 题 ·
                答对 <?= $correctBlanks ?> / <?= $totalBlanks ?> 个空
            </span>
        </div>
        <div class="progress" style="height: 1.2rem;">
            <div class="progress-bar bg-success" style="width: <?= $percent ?>%">
                <?= $percent ?>%
            </div>
        </div>
    </div>
</div>

<div class="row g-3">
    <?php foreach ($exercises as $exercise): ?>
        <?php
        $id       = $exercise['id'];
        $total    = count($exercise['blanks']);
        $record   = $progress[$id] ?? null;
        if ($record !== null && $record['correct'] === $total) {
            $status = '<span class="badge bg-success">已掌握</span>';
        } elseif ($record !== null) {
            $status = '<span class="badge bg-warning text-dark">'
                . $record['correct'] . ' / ' . $total . ' 正确</span>';
        } else {
            $status = '<span class="badge bg-secondary">未练习</span>';
        }
        ?>
        <div class="col-md-6 col-lg-4">
            <a class="text-decoration-none text-reset" href="exercise.php?id=<?= $id ?>">
                <div class="exercise-card h-100 p-3">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="text-secondary small">第 <?= $id ?> 题</span>
                        <span class="badge badge-level-<?= $exercise['level'] ?>"><?= $exercise['level'] ?></span>
                    </div>
                    <h3 class="h6 fw-bold mb-2"><?= htmlspecialchars($exercise['title']) ?></h3>
                    <p class="small text-secondary mb-3">
                        出处：<?= htmlspecialchars($exercise['source']) ?> ·
                        共 <?= $total ?> 个空
                    </p>
                    <div><?= $status ?></div>
                </div>
            </a>
        </div>
    <?php endforeach; ?>
</div>

<?php pageBottom(); ?>
