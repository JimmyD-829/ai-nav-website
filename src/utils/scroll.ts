/**
 * 平滑滚动工具函数
 * 解决点击导航时页面晃动/太快的问题
 * 使用自定义缓动动画，控制滚动时长和速度曲线
 */

interface ScrollOptions {
  duration?: number;      // 滚动时长(ms)，默认 600
  offset?: number;        // 顶部偏移量，默认 80(header高度)
  easing?: (t: number) => number;  // 缓动函数
}

// easeOutCubic 缓动函数 - 开始快，结束慢，视觉最舒适
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// easeInOutCubic 缓动函数 - 开始和结束都慢，中间快
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * 平滑滚动到指定元素
 * @param sectionId 目标元素ID
 * @param options 滚动选项
 */
export function scrollToSection(
  sectionId: string,
  options: ScrollOptions = {}
): void {
  const { duration = 600, offset = 80, easing = easeOutCubic } = options;

  const element = document.getElementById(sectionId);
  if (!element) return;

  const startY = window.scrollY;
  const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
  const distance = targetY - startY;

  // 如果距离很短，直接跳转
  if (Math.abs(distance) < 10) return;

  const startTime = performance.now();
  let animationId: number;

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);

    window.scrollTo(0, startY + distance * easedProgress);

    if (progress < 1) {
      animationId = requestAnimationFrame(step);
    }
  }

  animationId = requestAnimationFrame(step);
}

/**
 * 滚动到页面顶部
 * @param duration 滚动时长(ms)，默认 400
 */
export function scrollToTop(duration: number = 400): void {
  const startY = window.scrollY;
  if (startY === 0) return;

  const startTime = performance.now();
  let animationId: number;

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    window.scrollTo(0, startY * (1 - easedProgress));

    if (progress < 1) {
      animationId = requestAnimationFrame(step);
    }
  }

  animationId = requestAnimationFrame(step);
}

/**
 * 快速滚动（用于小距离）
 */
export function scrollToSectionFast(sectionId: string, offset: number = 80): void {
  scrollToSection(sectionId, { duration: 300, offset, easing: easeInOutCubic });
}
