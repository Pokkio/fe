'use strict';
// 插入到指定节点后面

function insertAfter(newEle, targetEle) {
    var parent = targetEle.parentNode;
    if (parent.lastChild == targetEle) {
        parent.appendChild(newEle);
    } else {
        parent.insertBefore(newEle, targetEle.nextSibling);
    }
}