'use client';

import * as React from 'react';
import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export const StarsBackgroundDemo = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden border border-[#1E2436]">
      <StarsBackground
        starColor={resolvedTheme === 'dark' ? '#FFF' : '#000'}
        className={cn(
          'absolute inset-0 flex items-center justify-center rounded-xl',
          'dark:bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)] bg-[radial-gradient(ellipse_at_bottom,_#f5f5f5_0%,_#fff_100%)]',
        )}
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 pointer-events-none select-none">
          <span className="text-[10px] font-mono tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 mb-2">
            SPACE TELEMETRY FIELD
          </span>
          <h3 className="text-xl font-heading font-extrabold text-white tracking-wider">
            DEEPTRACE STARS ENGINE
          </h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm">
            Dynamic parallax starfield responding to cursor motion with multi-layered spring physics.
          </p>
        </div>
      </StarsBackground>
    </div>
  );
};

export default StarsBackgroundDemo;
