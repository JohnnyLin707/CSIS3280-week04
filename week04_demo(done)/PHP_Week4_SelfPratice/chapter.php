<?php
/**
 * 说明书章节页：左边 div 显示「变量 / 名称含义」，右边按原文顺序逐步讲解代码。
 */
require_once __DIR__ . '/inc/manual.php';
require_once __DIR__ . '/inc/layout.php';

$chapters = getManualChapters();

// 章节 key：从 URL 读取，缺省显示第一章
$key     = filter_input(INPUT_GET, 'c');
$chapter = ($key === null || $key === false || $key === '') ? $chapters[0] : getManualChapter($key);
if ($chapter === null) {
    header('Location: manual.php');
    exit;
}

// 上 / 下一章
$index = 0;
foreach ($chapters as $i => $item) {
    if ($item['key'] === $chapter['key']) {
        $index = $i;
        break;
    }
}
$prev = $chapters[$index - 1] ?? null;
$next = $chapters[$index + 1] ?? null;
$stepCount = count($chapter['steps']);

pageTop($chapter['file'], $chapter['group']);
?>

<div class="d-flex justify-content-between align-items-center mb-3">
    <a class="btn btn-outline-secondary btn-sm" href="manual.php">← 说明书目录</a>
    <div class="btn-group">
        <?php if ($prev !== null): ?>
            <a class="btn btn-outline-secondary btn-sm" href="chapter.php?c=<?= $prev['key'] ?>">上一章</a>
        <?php endif; ?>
        <span class="btn btn-outline-dark btn-sm disabled"><?= $index + 1 ?> / <?= count($chapters) ?></span>
        <?php if ($next !== null): ?>
            <a class="btn btn-outline-primary btn-sm" href="chapter.php?c=<?= $next['key'] ?>">下一章 →</a>
        <?php endif; ?>
    </div>
</div>

<div class="row g-4">
    <!-- 左边：变量 / 名称含义显示区 -->
    <aside class="col-lg-4 col-xl-3">
        <div class="term-panel">
            <h2 class="term-title">变量与名称速查</h2>
            <p class="term-sub">本章出现的变量、函数、属性、关键字，逐个说明含义。</p>
            <ul class="list-unstyled mb-0">
                <?php foreach ($chapter['terms'] as $term): ?>
                    <li class="term-item">
                        <div class="term-name"><?= htmlspecialchars($term['name']) ?></div>
                        <span class="badge badge-kind"><?= htmlspecialchars($term['kind']) ?></span>
                        <div class="term-desc"><?= htmlspecialchars($term['desc']) ?></div>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>

        <div class="term-panel mt-3">
            <h2 class="term-title">全部章节</h2>
            <ol class="chapter-list mb-0">
                <?php foreach ($chapters as $i => $item): ?>
                    <li class="<?= $item['key'] === $chapter['key'] ? 'fw-bold' : '' ?>">
                        <a href="chapter.php?c=<?= $item['key'] ?>">
                            <?= $i + 1 ?>. <?= htmlspecialchars($item['file']) ?>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ol>
        </div>
    </aside>

    <!-- 右边：原文逐步教程 -->
    <div class="col-lg-8 col-xl-9">
        <div class="card shadow-sm mb-4">
            <div class="card-body">
                <h1 class="h4 fw-bold mb-1"><?= htmlspecialchars($chapter['title']) ?></h1>
                <p class="text-secondary small mb-3">
                    原文文件：<code><?= htmlspecialchars($chapter['file']) ?></code> ·
                    共 <?= $stepCount ?> 步
                </p>
                <p class="mb-2"><strong>要解决什么：</strong><?= htmlspecialchars($chapter['goal']) ?></p>
                <p class="mb-2"><strong>怎么运行：</strong><?= htmlspecialchars($chapter['run']) ?></p>
                <?php if (!empty($chapter['notice'])): ?>
                    <p class="mb-0 text-danger small"><strong>注意：</strong><?= htmlspecialchars($chapter['notice']) ?></p>
                <?php endif; ?>
            </div>
        </div>

        <!-- 手打工具条 -->
        <div class="card shadow-sm mb-4">
            <div class="card-body d-flex flex-wrap align-items-center gap-3">
                <div class="form-check form-switch mb-0">
                    <input class="form-check-input" type="checkbox" id="toggleComment">
                    <label class="form-check-label" for="toggleComment">隐藏注释（纯代码手打模式）</label>
                </div>
                <button class="btn btn-outline-secondary btn-sm" id="copyAll" type="button">复制本章全部代码</button>
                <div class="ms-auto d-flex align-items-center gap-2">
                    <div class="progress hand-progress">
                        <div class="progress-bar bg-success" id="handBar" style="width:0%"></div>
                    </div>
                    <span class="small text-secondary" id="handText">0 / <?= $stepCount ?> 步已手打</span>
                    <button class="btn btn-outline-danger btn-sm" id="resetHand" type="button">清除</button>
                </div>
            </div>
        </div>

        <?php foreach ($chapter['steps'] as $i => $step): ?>
            <div class="card shadow-sm mb-4 step-card" data-step="<?= $i ?>">
                <div class="card-header bg-white d-flex justify-content-between align-items-center">
                    <h2 class="h6 fw-bold mb-0">
                        <span class="badge bg-dark me-2"><?= $i + 1 ?></span><?= htmlspecialchars($step['title']) ?>
                    </h2>
                    <div class="form-check mb-0">
                        <input class="form-check-input hand-check" type="checkbox"
                               id="hand<?= $i ?>" data-step="<?= $i ?>">
                        <label class="form-check-label small" for="hand<?= $i ?>">已手打</label>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <div class="code-caption">原文代码（第 <?= $i + 1 ?> 步）</div>
                        <pre class="code-block manual-code"><?= highlightManualCode($step['code']) ?></pre>
                    </div>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="explain-box explain-why">
                                <div class="explain-label">为什么要写这一步</div>
                                <p class="mb-0"><?= htmlspecialchars($step['why']) ?></p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="explain-box explain-purpose">
                                <div class="explain-label">这一步的用意</div>
                                <p class="mb-0"><?= htmlspecialchars($step['purpose']) ?></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<script>
(function () {
    var chapterKey = <?= json_encode($chapter['key']) ?>;
    var total      = <?= $stepCount ?>;
    var storeKey   = 'manual_' + chapterKey;
    var done       = JSON.parse(localStorage.getItem(storeKey) || '[]');

    function refresh() {
        var count = done.length;
        var percent = total === 0 ? 0 : Math.round(count * 100 / total);
        document.getElementById('handBar').style.width = percent + '%';
        document.getElementById('handText').textContent = count + ' / ' + total + ' 步已手打';
        document.querySelectorAll('.hand-check').forEach(function (box) {
            box.checked = done.indexOf(box.dataset.step) !== -1;
        });
    }

    document.querySelectorAll('.hand-check').forEach(function (box) {
        box.addEventListener('change', function () {
            var step = box.dataset.step;
            var at   = done.indexOf(step);
            if (box.checked && at === -1) {
                done.push(step);
            } else if (!box.checked && at !== -1) {
                done.splice(at, 1);
            }
            localStorage.setItem(storeKey, JSON.stringify(done));
            refresh();
        });
    });

    document.getElementById('resetHand').addEventListener('click', function () {
        done = [];
        localStorage.removeItem(storeKey);
        refresh();
    });

    // 隐藏 / 显示注释：只看纯代码，方便照着打
    document.getElementById('toggleComment').addEventListener('change', function () {
        var hide = this.checked;
        document.querySelectorAll('.manual-code').forEach(function (pre) {
            pre.classList.toggle('hide-comments', hide);
        });
    });

    // 复制本章全部代码
    document.getElementById('copyAll').addEventListener('click', function () {
        var code = Array.prototype.map.call(
            document.querySelectorAll('.manual-code'),
            function (pre) { return pre.textContent; }
        ).join('\n');
        navigator.clipboard.writeText(code).then(function () {
            var btn = document.getElementById('copyAll');
            btn.textContent = '已复制 ✓';
            setTimeout(function () { btn.textContent = '复制本章全部代码'; }, 1500);
        });
    });

    refresh();
})();
</script>

<?php pageBottom(); ?>
