/* ============================================================
   Week 04 courseware — router + rendering
   ============================================================ */

(function () {
    'use strict';

    var view = document.getElementById('view');
    var nav  = document.getElementById('nav');

    /* ---------------- language ---------------- */

    function detectLang() {
        var m = /[?&]lang=(en|zh)/.exec(location.search);
        if (m) { return m[1]; }
        var saved = null;
        try { saved = localStorage.getItem('w04_lang'); } catch (e) {}
        if (saved === 'en' || saved === 'zh') { return saved; }
        return (navigator.language || '').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
    }

    var LANG = detectLang();
    try { localStorage.setItem('w04_lang', LANG); } catch (e) {}

    function t(v) {
        if (v === null || v === undefined) { return ''; }
        if (typeof v === 'string') { return v; }
        if (typeof v === 'object') {
            if (v[LANG] !== undefined && v[LANG] !== null) { return v[LANG]; }
            if (v.en !== undefined && v.en !== null) { return v.en; }
        }
        return '';
    }

    function esc(s) {
        return String(s === null || s === undefined ? '' : s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function fmt(template, n) {
        return String(template).replace('{n}', n);
    }

    function colon() { return LANG === 'zh' ? '：' : ': '; }

    /* ---------------- code highlighting ---------------- */

    function highlightCode(code) {
        var s = esc(code);
        s = s.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="code-comment">$1</span>');
        s = s.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="code-comment">$1</span>');
        s = s.replace(/^([ \t]*(\/\/|#).*)$/gm, '<span class="code-comment">$1</span>');
        return s;
    }

    /* ---------------- progress helpers ---------------- */

    function loadProgress() {
        try { return JSON.parse(localStorage.getItem('w04_ex_progress') || '{}'); }
        catch (e) { return {}; }
    }
    function saveProgress(p) {
        try { localStorage.setItem('w04_ex_progress', JSON.stringify(p)); } catch (e) {}
    }
    function loadTyped(key) {
        try { return JSON.parse(localStorage.getItem('manual_' + key) || '[]'); }
        catch (e) { return []; }
    }
    function saveTyped(key, arr) {
        try { localStorage.setItem('manual_' + key, JSON.stringify(arr)); } catch (e) {}
    }

    /* ---------------- answer checker ---------------- */

    function normalize(a) {
        var s = String(a === null || a === undefined ? '' : a).trim();
        s = s.replace(/\s+/g, ' ');
        s = s.replace(/['"]/g, '');
        s = s.replace(/;+$/, '');
        s = s.trim();
        return s.toLowerCase();
    }

    function isBlankCorrect(userAnswer, blank) {
        var u = normalize(userAnswer);
        if (u === '') { return false; }
        var accepted = blank.accepted && blank.accepted.length ? blank.accepted : [blank.answer];
        for (var i = 0; i < accepted.length; i++) {
            if (u === normalize(accepted[i])) { return true; }
        }
        return false;
    }

    /* ---------------- small render helpers ---------------- */

    function codeBlock(code, extraClass) {
        return '<pre class="code-block ' + (extraClass || '') + '">' + highlightCode(code) + '</pre>';
    }

    function levelBadge(level) {
        var cls = level === 'advanced' ? 'badge-advanced'
                : level === 'challenge' ? 'badge-challenge'
                : 'badge-basic';
        var label = level === 'advanced' ? t(I18N[LANG].ex.levelAdvanced)
                  : level === 'challenge' ? t(I18N[LANG].ex.levelChallenge)
                  : t(I18N[LANG].ex.levelBasic);
        return '<span class="badge ' + cls + '">' + esc(label) + '</span>';
    }

    /* ============================================================
       Home
       ============================================================ */

    function renderHome() {
        var s = I18N[LANG].home;
        var links = ['#/guide', '#/manual', '#/exercises', '#/cheatsheet'];

        var html = ''
            + '<div class="hero">'
            +   '<h1>' + esc(s.heroTitle) + '</h1>'
            +   '<p>' + esc(s.heroSub) + '</p>'
            +   '<div class="hero-meta">';
        s.pills.forEach(function (p) {
            html += '<span class="hero-pill">' + esc(p) + '</span>';
        });
        html += '</div></div>';

        html += '<h2 class="section-title">' + esc(s.sectionsTitle) + '</h2>'
              + '<p class="section-sub">' + esc(s.sectionsSub) + '</p>'
              + '<div class="grid">';
        s.tiles.forEach(function (tile, i) {
            html += '<a class="tile" href="' + links[i] + '">'
                  +   '<div class="tile-kicker">' + esc(tile.kicker) + '</div>'
                  +   '<h3>' + esc(tile.title) + '</h3>'
                  +   '<p>' + esc(tile.desc) + '</p>'
                  +   '<div class="tile-foot">' + esc(tile.foot) + '</div>'
                  + '</a>';
        });
        html += '</div>';

        html += '<div class="card" style="margin-top:22px">'
              +   '<h2 class="section-title">' + esc(s.setupTitle) + '</h2>'
              +   '<p>' + s.setupIntro + '</p>'
              +   codeBlock(GUIDE.setup.cmd)
              +   '<p class="small muted" style="margin-top:12px">' + s.setupAfter + '</p>'
              +   '<div class="callout" style="margin-top:12px">' + s.setupAlt + '</div>'
              + '</div>';

        html += '<div class="card">'
              +   '<h2 class="section-title">' + esc(s.filesTitle) + '</h2>'
              +   '<p class="section-sub">' + esc(s.filesSub) + '</p>'
              +   '<div class="table-wrap"><table class="data"><thead><tr>'
              +     '<th>' + esc(s.colFile) + '</th>'
              +     '<th>' + esc(s.colType) + '</th>'
              +     '<th>' + esc(s.colDesc) + '</th>'
              +   '</tr></thead><tbody>';
        GUIDE.files.forEach(function (f) {
            html += '<tr><td><code>' + esc(f.file) + '</code></td>'
                  + '<td>' + esc(t(f.type)) + '</td>'
                  + '<td>' + esc(t(f.desc)) + '</td></tr>';
        });
        html += '</tbody></table></div></div>';

        return html;
    }

    /* ============================================================
       Demo guide
       ============================================================ */

    function renderGuide() {
        var s = I18N[LANG].guide;

        var html = '<h2 class="section-title">' + esc(s.title) + '</h2>'
                 + '<p class="section-sub">' + esc(s.sub) + '</p>';

        GUIDE.demos.forEach(function (d) {
            html += '<div class="card">'
                  +   '<h3 style="margin-top:0">' + esc(t(d.title)) + '</h3>'
                  +   '<p class="small muted">' + esc(s.filesLabel) + ': '
                  +     d.files.map(function (f) { return '<code>' + esc(f) + '</code>'; }).join(', ')
                  +   '</p>'
                  +   '<dl class="kv">'
                  +     '<dt>' + esc(s.howToRun) + '</dt><dd>' + esc(t(d.run)) + '</dd>'
                  +     '<dt>' + esc(s.whatYouSee) + '</dt><dd>' + esc(t(d.see)) + '</dd>'
                  +   '</dl>';

            if (d.notice) {
                html += '<div class="notice" style="margin-top:12px">'
                      +   '<strong>' + esc(s.notice) + '</strong>' + esc(t(d.notice))
                      + '</div>';
            }

            html += '<p style="margin:14px 0 0"><strong>' + esc(s.points) + '</strong></p>'
                  + '<ul class="points">';
            d.points.forEach(function (p) { html += '<li>' + esc(t(p)) + '</li>'; });
            html += '</ul>';

            if (d.table) {
                html += '<div class="divider"></div>'
                      + '<p><strong>' + esc(s.runBoth) + '</strong></p>'
                      + '<div class="table-wrap"><table class="data"><thead><tr>'
                      +   '<th>' + esc(s.tableOp) + '</th><th>' + esc(s.tableResult) + '</th>'
                      + '</tr></thead><tbody>';
                d.table.rows.forEach(function (r) {
                    html += '<tr><td>' + esc(t(r.op)) + '</td><td>' + esc(t(r.res)) + '</td></tr>';
                });
                html += '</tbody></table></div>';
            }

            html += '</div>';
        });

        html += '<div class="card">'
              +   '<h3 style="margin-top:0">' + esc(s.comparisonTitle) + '</h3>'
              +   '<p class="small muted">' + esc(s.comparisonSub) + '</p>'
              +   '<div class="table-wrap"><table class="data"><thead><tr>'
              +     '<th>' + esc(s.compCol) + '</th>'
              +     '<th>06_validation_array_no_function.php</th>'
              +     '<th>06_validation_array_controller.php</th>'
              +   '</tr></thead><tbody>';
        GUIDE.comparison.rows.forEach(function (r) {
            html += '<tr><td>' + esc(t(r.aspect)) + '</td>'
                  + '<td>' + esc(t(r.a)) + '</td>'
                  + '<td>' + esc(t(r.b)) + '</td></tr>';
        });
        html += '</tbody></table></div></div>';

        return html;
    }

    /* ============================================================
       Manual index
       ============================================================ */

    function manualTotalSteps() {
        return MANUAL.reduce(function (sum, c) { return sum + c.steps.length; }, 0);
    }

    function renderManualIndex() {
        var s = I18N[LANG].manual;
        var totalSteps = manualTotalSteps();
        var doneTotal = 0;

        var groups = [];
        var byGroup = {};
        MANUAL.forEach(function (c) {
            var g = t(c.group);
            if (!byGroup[g]) { byGroup[g] = []; groups.push(g); }
            byGroup[g].push(c);
        });

        var cards = '';
        groups.forEach(function (g) {
            cards += '<h3 class="h6 muted" style="margin:18px 0 10px">' + esc(g) + '</h3><div class="grid">';
            byGroup[g].forEach(function (c) {
                var done = loadTyped(c.key).length;
                doneTotal += done;
                var badge;
                if (done === 0) { badge = '<span class="badge">' + esc(s.notStarted) + '</span>'; }
                else if (done === c.steps.length) { badge = '<span class="badge badge-ok">' + esc(s.doneAll) + '</span>'; }
                else { badge = '<span class="badge badge-warn">' + esc(s.partial) + ' ' + done + ' / ' + c.steps.length + '</span>'; }

                cards += '<a class="tile" href="#/manual/' + c.key + '">'
                       +   '<div class="tile-kicker">' + esc(fmt(s.chapterLabel, MANUAL.indexOf(c) + 1)) + '</div>'
                       +   '<h3><code>' + esc(c.file) + '</code></h3>'
                       +   '<p>' + esc(t(c.title)) + '</p>'
                       +   '<div class="tile-foot">' + badge + ' · ' + c.steps.length + ' ' + esc(s.stepCount) + '</div>'
                       + '</a>';
            });
            cards += '</div>';
        });

        var percent = totalSteps ? Math.round(doneTotal * 100 / totalSteps) : 0;

        var html = '<h2 class="section-title">' + esc(s.title) + '</h2>'
                 + '<p class="section-sub">' + esc(s.sub) + '</p>'
                 + '<div class="card">'
                 +   '<div class="toolbar" style="justify-content:space-between">'
                 +     '<strong>' + esc(s.progressTitle) + '</strong>'
                 +     '<span class="small muted">' + MANUAL.length + ' ' + esc(s.fileCount) + ' · '
                 +       esc(s.typedCount) + ' ' + doneTotal + ' / ' + totalSteps + ' ' + esc(s.stepCount) + '</span>'
                 +   '</div>'
                 +   '<div class="progress progress-lg" style="margin-top:10px"><span style="width:' + percent + '%">' + percent + '%</span></div>'
                 +   '<p class="small muted" style="margin:10px 0 0">' + esc(s.progressHint) + '</p>'
                 + '</div>'
                 + cards;

        return html;
    }

    /* ============================================================
       Manual chapter
       ============================================================ */

    function renderChapter(key) {
        var s = I18N[LANG].manual;
        var index = -1, i;
        for (i = 0; i < MANUAL.length; i++) { if (MANUAL[i].key === key) { index = i; break; } }
        if (index === -1) { return renderNotFound(); }

        var c = MANUAL[index];
        var prev = MANUAL[index - 1] || null;
        var next = MANUAL[index + 1] || null;

        var html = '<div class="pager">'
                 +   '<a class="btn btn-sm" href="#/manual">' + esc(s.backToIndex) + '</a>'
                 +   '<div>';
        if (prev) { html += '<a class="btn btn-sm" href="#/manual/' + prev.key + '">' + esc(s.prev) + '</a> '; }
        html += '<span class="badge badge-dark">' + (index + 1) + ' / ' + MANUAL.length + '</span> ';
        if (next) { html += '<a class="btn btn-sm btn-primary" href="#/manual/' + next.key + '">' + esc(s.next) + '</a>'; }
        html += '</div></div>';

        html += '<div class="two-col"><aside>';

        /* terms panel */
        html += '<div class="term-panel">'
              +   '<h2 class="term-title">' + esc(s.termsTitle) + '</h2>'
              +   '<p class="term-sub">' + esc(s.termsSub) + '</p><ul class="list-unstyled">';
        c.terms.forEach(function (term) {
            html += '<li class="term-item">'
                  +   '<div class="term-name">' + esc(term.name) + '</div>'
                  +   '<span class="badge">' + esc(t(term.kind)) + '</span>'
                  +   '<div class="term-desc">' + esc(t(term.desc)) + '</div>'
                  + '</li>';
        });
        html += '</ul></div>';

        html += '<div class="term-panel" style="margin-top:14px;position:static">'
              +   '<h2 class="term-title">' + esc(s.allChapters) + '</h2>'
              +   '<ol class="chapter-list">';
        MANUAL.forEach(function (item, n) {
            html += '<li' + (item.key === key ? ' style="font-weight:700"' : '') + '>'
                  +   '<a href="#/manual/' + item.key + '">' + (n + 1) + '. ' + esc(item.file) + '</a></li>';
        });
        html += '</ol></div></aside><div>';

        /* chapter info */
        html += '<div class="card">'
              +   '<h1 style="font-size:20px;margin:0 0 6px">' + esc(t(c.title)) + '</h1>'
              +   '<p class="small muted">' + esc(s.fileLabel) + ': <code>' + esc(c.file) + '</code> · '
              +     c.steps.length + ' ' + esc(s.stepCount) + '</p>'
              +   '<dl class="kv" style="margin:12px 0 0">'
              +     '<dt>' + esc(s.goal) + '</dt><dd>' + esc(t(c.goal)) + '</dd>'
              +     '<dt>' + esc(s.run) + '</dt><dd>' + esc(t(c.run)) + '</dd>'
              +   '</dl>';
        if (c.notice) {
            html += '<div class="notice" style="margin-top:12px"><strong>' + esc(s.notice) + '</strong>' + esc(t(c.notice)) + '</div>';
        }
        html += '</div>';

        /* toolbar */
        html += '<div class="card"><div class="toolbar">'
              +   '<label class="switch"><input type="checkbox" id="toggleComment"> '
              +     esc(s.hideComments) + '</label>'
              +   '<button type="button" class="btn btn-sm" id="copyAll">' + esc(s.copyAll) + '</button>'
              +   '<div class="progress" style="margin-left:auto"><span id="handBar"></span></div>'
              +   '<span class="small muted" id="handText"></span>'
              +   '<button type="button" class="btn btn-sm" id="resetHand">' + esc(s.clear) + '</button>'
              + '</div></div>';

        /* steps */
        c.steps.forEach(function (step, n) {
            html += '<div class="card step-card">'
                  +   '<div class="step-head">'
                  +     '<h3><span class="badge badge-dark">' + (n + 1) + '</span>' + esc(t(step.title)) + '</h3>'
                  +     '<label class="switch small"><input type="checkbox" class="hand-check" data-step="' + n + '"> '
                  +       esc(s.handTyped) + '</label>'
                  +   '</div>'
                  +   '<div class="step-body">'
                  +     '<div class="code-caption">' + esc(fmt(s.codeCaption, n + 1)) + '</div>'
                  +     codeBlock(step.code, 'manual-code')
                  +     '<div class="explain-grid">'
                  +       '<div class="explain-box explain-why"><div class="explain-label">' + esc(s.why) + '</div>'
                  +         '<p>' + esc(t(step.why)) + '</p></div>'
                  +       '<div class="explain-box explain-purpose"><div class="explain-label">' + esc(s.purpose) + '</div>'
                  +         '<p>' + esc(t(step.purpose)) + '</p></div>'
                  +     '</div>'
                  +   '</div>'
                  + '</div>';
        });

        html += '</div></div>';

        return html;
    }

    function bindChapter(key) {
        var index = -1, i;
        for (i = 0; i < MANUAL.length; i++) { if (MANUAL[i].key === key) { index = i; break; } }
        if (index === -1) { return; }
        var c = MANUAL[index];
        var total = c.steps.length;
        var done = loadTyped(key);

        function refresh() {
            var percent = total ? Math.round(done.length * 100 / total) : 0;
            var bar = document.getElementById('handBar');
            var txt = document.getElementById('handText');
            if (bar) { bar.style.width = percent + '%'; }
            if (txt) { txt.textContent = done.length + ' / ' + total; }
            var boxes = view.querySelectorAll('.hand-check');
            for (var k = 0; k < boxes.length; k++) {
                boxes[k].checked = done.indexOf(boxes[k].getAttribute('data-step')) !== -1;
            }
        }

        var boxes = view.querySelectorAll('.hand-check');
        for (var b = 0; b < boxes.length; b++) {
            boxes[b].addEventListener('change', function () {
                var step = this.getAttribute('data-step');
                var at = done.indexOf(step);
                if (this.checked && at === -1) { done.push(step); }
                else if (!this.checked && at !== -1) { done.splice(at, 1); }
                saveTyped(key, done);
                refresh();
            });
        }

        var reset = document.getElementById('resetHand');
        if (reset) {
            reset.addEventListener('click', function () {
                done = [];
                saveTyped(key, done);
                refresh();
            });
        }

        var toggle = document.getElementById('toggleComment');
        if (toggle) {
            toggle.addEventListener('change', function () {
                var pres = view.querySelectorAll('.manual-code');
                for (var k = 0; k < pres.length; k++) {
                    if (this.checked) { pres[k].classList.add('hide-comments'); }
                    else { pres[k].classList.remove('hide-comments'); }
                }
            });
        }

        var copy = document.getElementById('copyAll');
        if (copy) {
            copy.addEventListener('click', function () {
                var code = '';
                var pres = view.querySelectorAll('.manual-code');
                for (var k = 0; k < pres.length; k++) { code += pres[k].textContent + '\n'; }
                var btn = this;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code).then(function () {
                        btn.textContent = t(I18N[LANG].manual.copyDone);
                        setTimeout(function () { btn.textContent = I18N[LANG].manual.copyAll; }, 1500);
                    });
                } else {
                    btn.textContent = t(I18N[LANG].manual.copyDone);
                    setTimeout(function () { btn.textContent = I18N[LANG].manual.copyAll; }, 1500);
                }
            });
        }

        refresh();
    }

    /* ============================================================
       Exercise list
       ============================================================ */

    function totalBlanks() {
        return EXERCISES.reduce(function (sum, ex) {
            return sum + Object.keys(ex.blanks).length;
        }, 0);
    }

    function renderExerciseList() {
        var s = I18N[LANG].ex;
        var progress = loadProgress();
        var total = totalBlanks();
        var correctBlanks = 0;
        var doneCount = 0;

        var cards = '<div class="grid">';
        EXERCISES.forEach(function (ex) {
            var n = Object.keys(ex.blanks).length;
            var rec = progress[ex.id];
            var status;
            if (rec) {
                correctBlanks += rec.correct;
                doneCount++;
                if (rec.correct === n) { status = '<span class="badge badge-ok">' + esc(s.mastered) + '</span>'; }
                else { status = '<span class="badge badge-warn">' + rec.correct + ' / ' + n + '</span>'; }
            } else {
                status = '<span class="badge">' + esc(s.notStarted) + '</span>';
            }

            cards += '<a class="tile" href="#/exercise/' + ex.id + '">'
                   +   '<div class="tile-kicker">' + esc(fmt(s.exerciseLabel, ex.id)) + '</div>'
                   +   '<h3>' + esc(t(ex.title)) + '</h3>'
                   +   '<p class="small muted">' + esc(s.source) + ': <code>' + esc(ex.source) + '</code></p>'
                   +   '<div class="tile-foot">' + levelBadge(ex.level) + ' ' + status + ' · ' + n + ' ' + esc(s.blanks) + '</div>'
                   + '</a>';
        });
        cards += '</div>';

        var percent = total ? Math.round(correctBlanks * 100 / total) : 0;

        var html = '<h2 class="section-title">' + esc(s.title) + '</h2>'
                 + '<p class="section-sub">' + esc(s.sub) + '</p>'
                 + '<div class="card">'
                 +   '<div class="toolbar" style="justify-content:space-between">'
                 +     '<strong>' + esc(s.progressTitle) + '</strong>'
                 +     '<span class="small muted">' + esc(s.practiced) + ' ' + doneCount + ' / ' + EXERCISES.length + ' · '
                 +       esc(s.correctOf) + ' ' + correctBlanks + ' / ' + total + '</span>'
                 +   '</div>'
                 +   '<div class="progress progress-lg" style="margin-top:10px"><span style="width:' + percent + '%">' + percent + '%</span></div>'
                 +   '<p class="small muted" style="margin:10px 0 0">' + esc(s.listNote) + '</p>'
                 + '</div>'
                 + cards;

        return html;
    }

    /* ============================================================
       Exercise detail
       ============================================================ */

    var exState = { id: null, values: {}, results: null, checked: false, reveal: false };

    function renderExerciseBlock(ex) {
        var parts = ex.code.split(/\[\[(\d+)\]\]/);
        var html = '<pre class="code-block">';
        for (var i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
                html += highlightCode(parts[i]);
            } else {
                var idx = parts[i];
                var blank = ex.blanks[idx] || { answer: '' };
                var res = exState.results ? exState.results[idx] : null;
                var value = exState.reveal ? blank.answer : (exState.values[idx] || '');
                var state = '';
                if (res && !exState.reveal) { state = res.correct ? ' is-correct' : ' is-wrong'; }
                var width = Math.max(8, String(blank.answer).length + 2);
                html += '<input type="text" class="code-input' + state + '"'
                      + ' data-blank="' + esc(idx) + '"'
                      + ' value="' + esc(value) + '"'
                      + ' style="width:' + width + 'ch"'
                      + ' autocomplete="off" spellcheck="false">';
            }
        }
        html += '</pre>';
        return html;
    }

    function renderExercise(id) {
        var s = I18N[LANG].ex;
        var ex = null;
        EXERCISES.forEach(function (e) { if (e.id === id) { ex = e; } });
        if (!ex) { return renderNotFound(); }

        if (exState.id !== id) {
            exState = { id: id, values: {}, results: null, checked: false, reveal: false };
        }

        var n = Object.keys(ex.blanks).length;
        var correctCount = 0;
        if (exState.results) {
            Object.keys(exState.results).forEach(function (k) {
                if (exState.results[k].correct) { correctCount++; }
            });
        }
        var allCorrect = exState.checked && correctCount === n;

        var html = '<div class="pager">'
                 +   '<a class="btn btn-sm" href="#/exercises">' + esc(s.backToList) + '</a><div>';
        if (id > 1) { html += '<a class="btn btn-sm" href="#/exercise/' + (id - 1) + '">' + esc(s.prev) + '</a> '; }
        if (id < EXERCISES.length) { html += '<a class="btn btn-sm btn-primary" href="#/exercise/' + (id + 1) + '">' + esc(s.next) + '</a>'; }
        html += '</div></div>';

        html += '<div class="card">'
              +   '<div class="toolbar" style="justify-content:space-between;align-items:flex-start">'
              +     '<h2 style="font-size:19px;margin:0">'
              +       esc(fmt(s.exerciseLabel, ex.id)) + colon() + esc(t(ex.title)) + '</h2>'
              +     levelBadge(ex.level)
              +   '</div>'
              +   '<p style="margin:12px 0 4px">' + esc(t(ex.prompt)) + '</p>'
              +   '<p class="small muted">' + esc(s.source) + ': <code>' + esc(ex.source) + '</code></p>'
              +   '<div style="margin-top:12px">' + renderExerciseBlock(ex) + '</div>'
              +   '<div class="toolbar" style="margin-top:14px">'
              +     '<button type="button" class="btn btn-ok" id="btnCheck">' + esc(s.check) + '</button>'
              +     '<button type="button" class="btn" id="btnReveal">' + esc(s.reveal) + '</button>'
              +     '<button type="button" class="btn" id="btnRetry">' + esc(s.retry) + '</button>'
              +   '</div>'
              + '</div>';

        if (exState.checked) {
            html += '<div class="alert ' + (allCorrect ? 'alert-ok' : 'alert-bad') + '">'
                  +   '<strong>' + (allCorrect ? esc(s.resultOk) + ' ' + correctCount + ' / ' + n
                                               : esc(s.correctOf) + ' ' + correctCount + ' / ' + n + ' ' + esc(s.resultBad))
                  +   '</strong></div>';

            html += '<div class="card"><h3 class="h6" style="margin-top:0">' + esc(s.explanations) + '</h3>';
            Object.keys(ex.blanks).forEach(function (idx) {
                var blank = ex.blanks[idx];
                var res = exState.results[idx];
                html += '<div class="blank-result ' + (res.correct ? 'ok' : 'bad') + '">'
                      +   '<div class="br-title">' + esc(fmt(s.blankLabel, idx)) + colon()
                      +     '<span class="' + (res.correct ? 'badge badge-ok' : 'badge badge-warn') + '">'
                      +       esc(res.correct ? s.correct : s.incorrect) + '</span></div>'
                      +   '<div class="br-body">'
                      +     '<div>' + esc(s.yourAnswer) + ': <code>' + esc(res.user === '' ? s.emptyAnswer : res.user) + '</code></div>';
                if (!res.correct) {
                    html += '<div>' + esc(s.correctAnswer) + ': <code>' + esc(blank.answer) + '</code></div>';
                }
                html += '<div class="muted" style="margin-top:4px">' + esc(t(blank.explain)) + '</div>'
                      +   '</div></div>';
            });
            html += '</div>';
        } else if (exState.reveal) {
            html += '<div class="alert alert-warn">' + esc(s.revealNote) + '</div>';
        }

        html += '<div class="card"><h3 class="h6" style="margin-top:0">' + esc(s.hints) + '</h3>';
        Object.keys(ex.blanks).forEach(function (idx) {
            html += '<details class="hint"><summary>' + esc(fmt(s.hintLabel, idx)) + '</summary>'
                  +   '<div class="hint-body">' + esc(t(ex.blanks[idx].hint)) + '</div></details>';
        });
        html += '</div>';

        html += '<div class="alert alert-info"><strong>' + esc(s.keynote) + '</strong>' + esc(t(ex.note)) + '</div>';

        return html;
    }

    function bindExercise(id) {
        var ex = null;
        EXERCISES.forEach(function (e) { if (e.id === id) { ex = e; } });
        if (!ex) { return; }

        function collect() {
            var inputs = view.querySelectorAll('.code-input');
            var values = {};
            for (var i = 0; i < inputs.length; i++) {
                values[inputs[i].getAttribute('data-blank')] = inputs[i].value;
            }
            return values;
        }

        var btnCheck = document.getElementById('btnCheck');
        if (btnCheck) {
            btnCheck.addEventListener('click', function () {
                var values = collect();
                var results = {};
                var correct = 0;
                Object.keys(ex.blanks).forEach(function (idx) {
                    var user = (values[idx] || '').trim();
                    var ok = isBlankCorrect(user, ex.blanks[idx]);
                    results[idx] = { user: user, correct: ok, expected: ex.blanks[idx].answer };
                    if (ok) { correct++; }
                });
                exState.values = values;
                exState.results = results;
                exState.checked = true;
                exState.reveal = false;

                var progress = loadProgress();
                var n = Object.keys(ex.blanks).length;
                var previous = progress[ex.id] ? progress[ex.id].correct : -1;
                if (correct > previous) { progress[ex.id] = { correct: correct, total: n }; }
                saveProgress(progress);

                render();
            });
        }

        var btnReveal = document.getElementById('btnReveal');
        if (btnReveal) {
            btnReveal.addEventListener('click', function () {
                exState.values = collect();
                exState.reveal = true;
                exState.checked = false;
                exState.results = null;
                render();
            });
        }

        var btnRetry = document.getElementById('btnRetry');
        if (btnRetry) {
            btnRetry.addEventListener('click', function () {
                exState = { id: id, values: {}, results: null, checked: false, reveal: false };
                render();
            });
        }
    }

    /* ============================================================
       Cheatsheet + 404
       ============================================================ */

    function renderCheatsheet() {
        var s = I18N[LANG].cheat;
        var html = '<h2 class="section-title">' + esc(s.title) + '</h2>'
                 + '<p class="section-sub">' + esc(s.sub) + '</p>'
                 + '<div class="card"><div class="table-wrap"><table class="data"><thead><tr>'
                 +   '<th>' + esc(s.colFn) + '</th><th>' + esc(s.colMeaning) + '</th>'
                 + '</tr></thead><tbody>';
        GUIDE.cheatsheet.forEach(function (row) {
            html += '<tr><td><code>' + esc(row.name) + '</code></td><td>' + esc(t(row.meaning)) + '</td></tr>';
        });
        html += '</tbody></table></div></div>';
        return html;
    }

    function renderNotFound() {
        return '<div class="card"><p>' + esc(t(I18N[LANG].notFound))
             + ' <a href="#/">' + esc(I18N[LANG].nav.home) + '</a></p></div>';
    }

    /* ============================================================
       Router
       ============================================================ */

    function setActiveNav(route) {
        var links = nav.querySelectorAll('a');
        for (var i = 0; i < links.length; i++) {
            if (links[i].getAttribute('data-route') === route) { links[i].classList.add('active'); }
            else { links[i].classList.remove('active'); }
        }
    }

    var current = { route: '', arg: '' };

    function render() {
        var hash = location.hash.replace(/^#/, '') || '/';
        var parts = hash.split('/').filter(function (p) { return p !== ''; });
        var route = parts[0] || 'home';
        var arg = parts[1] || '';

        var html, title, navRoute = route;

        if (route === 'guide') {
            html = renderGuide(); title = I18N[LANG].guide.title;
        } else if (route === 'manual') {
            if (arg) {
                html = renderChapter(arg);
                var ch = null;
                MANUAL.forEach(function (c) { if (c.key === arg) { ch = c; } });
                title = ch ? ch.file : I18N[LANG].manual.title;
            } else {
                html = renderManualIndex(); title = I18N[LANG].manual.title;
            }
        } else if (route === 'exercises') {
            html = renderExerciseList(); title = I18N[LANG].ex.title;
        } else if (route === 'exercise') {
            html = renderExercise(parseInt(arg, 10)); title = I18N[LANG].ex.title;
            navRoute = 'exercises';
        } else if (route === 'cheatsheet') {
            html = renderCheatsheet(); title = I18N[LANG].cheat.title;
        } else if (route === 'home') {
            html = renderHome(); title = I18N[LANG].home.heroTitle;
        } else {
            html = renderNotFound(); title = I18N[LANG].home.heroTitle; navRoute = '';
        }

        view.innerHTML = html;
        document.title = title + ' · CSIS 3280 Week 04';
        document.documentElement.lang = (LANG === 'zh' ? 'zh-CN' : 'en');
        setActiveNav(navRoute);

        if (route === 'manual' && arg) { bindChapter(arg); }
        if (route === 'exercise' && arg) { bindExercise(parseInt(arg, 10)); }

        current = { route: route, arg: arg };
        window.scrollTo(0, 0);
    }

    /* ---------------- chrome ---------------- */

    function applyStaticI18n() {
        var nodes = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < nodes.length; i++) {
            var key = nodes[i].getAttribute('data-i18n');
            var val = key.split('.').reduce(function (o, k) { return o ? o[k] : undefined; }, I18N[LANG]);
            if (typeof val === 'string') { nodes[i].textContent = val; }
        }
        var buttons = document.querySelectorAll('.langswitch button');
        for (var b = 0; b < buttons.length; b++) {
            if (buttons[b].getAttribute('data-lang') === LANG) { buttons[b].classList.add('active'); }
            else { buttons[b].classList.remove('active'); }
        }
    }

    function switchLang(lang) {
        if (lang === LANG) { return; }
        try { localStorage.setItem('w04_lang', lang); } catch (e) {}
        var url = 'app.html?lang=' + lang + (location.hash || '');
        location.href = url;
    }

    document.querySelectorAll('.langswitch button').forEach(function (btn) {
        btn.addEventListener('click', function () { switchLang(btn.getAttribute('data-lang')); });
    });

    var toggle = document.getElementById('navToggle');
    if (toggle) {
        toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    }
    nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') { nav.classList.remove('open'); }
    });

    window.addEventListener('hashchange', render);

    applyStaticI18n();
    render();
})();
