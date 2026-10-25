<?php
// filter_has_var(INPUT_POST, 'watchNow')
//   判断 POST 请求中是否存在名为 watchNow 的变量。
//   因为只有被点击的提交按钮才会把自己的 name 提交上来，
//   所以"存在 watchNow"就等价于"用户点了 WatchNow 按钮"。
if(filter_has_var(INPUT_POST, 'watchNow')){
    print 'You selected WatchNow';
}
else{
    // 否则说明提交来自另一个按钮（watchLater）
    print 'You selected WatchLater';
}

// 补充：也可以用 isset($_POST['watchNow']) 达到同样效果。
// 更严谨的写法是先检查 watchLater 是否真的存在，再判断两者都不存在的情况。