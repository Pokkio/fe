export function authorization () {
  // 获取cookie的Authorization
  let d = this.$cookies.get('Authorization');
  return d;
}