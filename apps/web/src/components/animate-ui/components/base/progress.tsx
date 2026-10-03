"use client";

import * as React from "react";

import {
  Progress as ProgressPrimitive,
  ProgressTrack as ProgressTrackPrimitive,
  ProgressIndicator as ProgressIndicatorPrimitive,
  ProgressLabel as ProgressLabelPrimitive,
  ProgressValue as ProgressValuePrimitive,
  type ProgressProps as ProgressPrimitiveProps,
  type ProgressTrackProps as ProgressTrackPrimitiveProps,
  type ProgressLabelProps as ProgressLabelPrimitiveProps,
  type ProgressValueProps as ProgressValuePrimitiveProps,
} from "@/components/animate-ui/primitives/base/progress";
import { cn } from "@/lib/utils";

type ProgressProps = ProgressPrimitiveProps;

function Progress(props: ProgressProps) {
  return <ProgressPrimitive {...props} />;
}

type ProgressTrackProps = ProgressTrackPrimitiveProps;

function ProgressTrack({ className, children, ...props }: ProgressTrackProps) {
  return (
    <ProgressTrackPrimitive
      className={cn(
        "bg-[#1E2436] relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      {children ?? (
        <ProgressIndicatorPrimitive className="bg-indigo-500 rounded-full h-full w-full flex-1" />
      )}
    </ProgressTrackPrimitive>
  );
}

type ProgressLabelProps = ProgressLabelPrimitiveProps;

function ProgressLabel(props: ProgressLabelProps) {
  return (
    <ProgressLabelPrimitive
      className="text-sm font-medium text-zinc-300"
      {...props}
    />
  );
}

type ProgressValueProps = ProgressValuePrimitiveProps;

function ProgressValue(props: ProgressValueProps) {
  return (
    <ProgressValuePrimitive
      className="text-sm font-mono text-indigo-400"
      {...props}
    />
  );
}

export {
  Progress,
  ProgressTrack,
  ProgressLabel,
  ProgressValue,
  type ProgressProps,
  type ProgressTrackProps,
  type ProgressLabelProps,
  type ProgressValueProps,
};
