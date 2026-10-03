import { useEffect, useState, type RefObject } from 'react';
import { useLocation } from 'react-router';

export function useLauncherPosition(button: RefObject<HTMLButtonElement | null>, open: boolean) {
  const { pathname } = useLocation();
  const [bottom, setBottom] = useState(20);
  useEffect(() => {
    if (open) { setBottom(20); return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const launcher = button.current;
      if (!launcher) return;
      const box = launcher.getBoundingClientRect();
      const actions = Array.from(document.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea, summary'))
        .filter((el) => !el.closest('#avatar') && el.getClientRects().length)
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.bottom > 0 && r.top < innerHeight && r.right > box.left && r.left < box.right);
      let next = 20;
      for (let candidate = 20; candidate <= Math.min(280, innerHeight - 120); candidate += 64) {
        const top = innerHeight - candidate - box.height;
        const end = innerHeight - candidate;
        if (!actions.some((r) => r.bottom + 8 > top && r.top - 8 < end)) { next = candidate; break; }
      }
      setBottom((previous) => previous === next ? previous : next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [button, open, pathname]);
  return bottom;
}
