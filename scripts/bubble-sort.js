/**
 * 冒泡排序
 */

function bubbleSort(array) {
  for (let j = 0; j < array.length; j++) {
    let complete = true;
    for (let i = 0; i < array.length - 1 - j; i++) {
      // 比较相邻数
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        complete = false;
      }
    }
    // 没有冒泡结束循环
    if (complete) {
      break;
    }
  }
  return array;
}

console.log(bubbleSort([2, 1, 3, 7, 6, 8, 4, 9, 5]))