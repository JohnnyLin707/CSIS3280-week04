<?php
/**
 * 说明书首页：全部章节目录 + 环境准备 + 手打总进度
 */
require_once __DIR__ . '/inc/manual.php';
require_once __DIR__ . '/inc/layout.php';

$chapters   = getManualChapters();
$totalSteps = 0;
foreach ($chapters as $chapter) {
    $totalSteps += count($chapter['steps']);
}

// 按知识点分组
$groups = [];
foreach ($chapters as $chapter) {
    $groups[$chapter['group']][] = $chapter;
}

pageTop('编程说明书', 'week04_demo(done) 全部源文件的「原文 + 逐步讲解」教程，照着顺序手打一遍即可复现整套代码。');
?>

<div class="card shadow-sm mb-4">
    <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-2">
            <h2 class="h5 mb-0">手打总进度</h2>
            <span class="text-secondary small" id="totalText">
                共 <?= count($chapters) ?> 个文件 · <?= $totalSteps ?> 个步骤
            </span>
        </div>
        <div class="progress" style="height: 1.2rem;">
            <div class="progress-bar bg-success" id="totalBar" style="width: 0%">0%</div>
        </div>
        <p class="small text-secondary mb-0 mt-2">
            进度保存在浏览器本地（localStorage），刷新不丢；换浏览器或清缓存会重置。
        </p>
    </div>
</div>

<div class="card shadow-sm mb-4">
    <div class="card-body">
        <h2 class="h5">环境准备（一次性）</h2>
        <p class="mb-2">
            页面必须通过 Web 服务器访问，直接双击用 <code>file://</code> 打开时 PHP 不会执行。
            教材里表单的 <code>action</code> 写的是绝对路径 <code>/week04/xxx.php</code>，
            所以站点根目录下要有一个名为 <code>week04</code> 的目录，用软链接映射最省事：
        </p>
        <pre class="code-block mb-3">mkdir -p ~/week04_site
cd ~/week04_site
ln -s "/Users/johnnylin/Library/CloudStorage/OneDrive-Personal/3280-Backend Web Development/Week04/week04_demo(done)" week04
php -S localhost:8000</pre>
        <p class="mb-0">
            之后访问 <code>http://localhost:8000/week04/</code>。停止服务器：终端里按 <code>Ctrl + C</code>。
        </p>
    </div>
</div>

<?php foreach ($groups as $groupName => $items): ?>
    <h2 class="h6 text-secondary mt-4 mb-3"><?= htmlspecialchars($groupName) ?></h2>
    <div class="row g-3">
        <?php foreach ($items as $i => $chapter): ?>
            <?php
            $order = 0;
            foreach ($chapters as $n => $item) {
                if ($item['key'] === $chapter['key']) {
                    $order = $n + 1;
                    break;
                }
            }
            ?>
            <div class="col-md-6 col-lg-4">
                <a class="text-decoration-none text-reset" href="chapter.php?c=<?= $chapter['key'] ?>">
                    <div class="exercise-card h-100 p-3">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <span class="text-secondary small">第 <?= $order ?> 章</span>
                            <span class="badge bg-dark"><?= count($chapter['steps']) ?> 步</span>
                        </div>
                        <h3 class="h6 fw-bold mb-2"><code><?= htmlspecialchars($chapter['file']) ?></code></h3>
                        <p class="small text-secondary mb-2"><?= htmlspecialchars($chapter['title']) ?></p>
                        <div class="hand-badge small text-secondary"
                             data-key="<?= htmlspecialchars($chapter['key']) ?>"
                             data-steps="<?= count($chapter['steps']) ?>">未开始</div>
                    </div>
                </a>
            </div>
        <?php endforeach; ?>
    </div>
<?php endforeach; ?>

<script>
(function () {
    var totalSteps = <?= $totalSteps ?>;
    var badges = document.querySelectorAll('.hand-badge');
    var doneTotal = 0;

    badges.forEach(function (badge) {
        var done = JSON.parse(localStorage.getItem('manual_' + badge.dataset.key) || '[]');
        var steps = parseInt(badge.dataset.steps, 10);
        doneTotal += done.length;
        if (done.length === 0) {
            badge.textContent = '未开始';
        } else if (done.length === steps) {
            badge.textContent = '✓ 已手打完 ' + steps + ' 步';
            badge.className = 'hand-badge small text-success fw-bold';
        } else {
            badge.textContent = '已手打 ' + done.length + ' / ' + steps + ' 步';
            badge.className = 'hand-badge small text-warning fw-bold';
        }
    });

    var percent = totalSteps === 0 ? 0 : Math.round(doneTotal * 100 / totalSteps);
    document.getElementById('totalBar').style.width = percent + '%';
    document.getElementById('totalBar').textContent = percent + '%';
    document.getElementById('totalText').textContent =
        '共 <?= count($chapters) ?> 个文件 · 已手打 ' + doneTotal + ' / ' + totalSteps + ' 步';
})();
</script>

<?php pageBottom(); ?>
