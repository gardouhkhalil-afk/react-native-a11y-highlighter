import type { ElementLayout } from '../types';

export function measureElement(
  ref: React.RefObject<any>
): Promise<ElementLayout | null> {
  return new Promise((resolve) => {
    if (!ref.current) {
      resolve(null);
      return;
    }

    try {
      ref.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          if (
            x === undefined ||
            y === undefined ||
            width === undefined ||
            height === undefined
          ) {
            resolve(null);
            return;
          }
          resolve({ x, y, width, height });
        }
      );
    } catch {
      resolve(null);
    }
  });
}
