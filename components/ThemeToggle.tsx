'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, systemTheme, setTheme } = useTheme();

  const current = theme === 'system' ? systemTheme : resolvedTheme ?? theme;

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center">
      <span>Theme:</span>
      <ToggleGroup
        type="single"
        defaultValue={current}
        onValueChange={setTheme}>
        <ToggleGroupItem value="light" aria-label="Toggle light theme">
          Light
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Toggle dark theme">
          Dark
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
