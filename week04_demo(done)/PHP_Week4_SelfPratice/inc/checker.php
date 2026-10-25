<?php
/**
 * 答案校对：把用户答案和标准答案"规范化"后再比较，
 * 这样大小写、空格、单双引号、结尾分号的差异不会造成误判。
 */

/**
 * 规范化答案：折叠空白、去掉引号、去掉结尾分号、统一小写
 */
function normalizeAnswer(string $answer): string
{
    $s = trim($answer);
    $s = preg_replace('/\s+/', ' ', $s);       // 多个空白折叠成一个空格
    $s = str_replace(["'", '"'], '', $s);      // 单引号 / 双引号视为等价
    $s = rtrim($s, ';');                       // 结尾分号可写可不写
    $s = trim($s);
    return strtolower($s);                     // 大小写不敏感
}

/**
 * 判断某一个空是否填对
 *
 * @param string $userAnswer 用户填写的内容
 * @param array  $blank      该空的配置（answer / accepted）
 */
function isBlankCorrect(string $userAnswer, array $blank): bool
{
    $user = normalizeAnswer($userAnswer);
    if ($user === '') {
        return false;                          // 空着不算对
    }

    // accepted 里可以配置多种等价写法，默认只用标准答案
    $accepted = $blank['accepted'] ?? [$blank['answer']];
    foreach ($accepted as $candidate) {
        if ($user === normalizeAnswer((string) $candidate)) {
            return true;
        }
    }
    return false;
}

/**
 * 校对整道题
 *
 * @param array $exercise  题目数组
 * @param array $submitted 用户提交的内容 [ 空编号 => 答案 ]
 * @return array [ 空编号 => ['user'=>.., 'correct'=>bool, 'expected'=>..] ]
 */
function checkExercise(array $exercise, array $submitted): array
{
    $results = [];
    foreach ($exercise['blanks'] as $index => $blank) {
        $userAnswer = isset($submitted[$index]) ? trim((string) $submitted[$index]) : '';
        $results[$index] = [
            'user'     => $userAnswer,
            'correct'  => isBlankCorrect($userAnswer, $blank),
            'expected' => $blank['answer'],
        ];
    }
    return $results;
}

/**
 * 统计某次校对答对的空数
 */
function countCorrect(array $results): int
{
    $correct = 0;
    foreach ($results as $result) {
        if ($result['correct']) {
            $correct++;
        }
    }
    return $correct;
}
