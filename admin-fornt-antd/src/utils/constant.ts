/**
 * 全局变量参数
 */
export const TOKEN_KEY = process.env.UMI_APP_TOKEN_KEY || 'IAS-TOKEN';

/**
 * 判断当前设备是否为移动端
 */
export function isMobile() {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPod|BlackBerry|Mobile/i.test(navigator.userAgent);
}
