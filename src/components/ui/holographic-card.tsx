"use client";

import React, { MouseEvent, useEffect, useRef, useState } from "react";

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: number; // px
}

const identityMatrix =
  "1, 0, 0, 0, " +
  "0, 1, 0, 0, " +
  "0, 0, 1, 0, " +
  "0, 0, 0, 1";

const maxRotate = 0.25;
const minRotate = -0.25;
const maxScale = 1;
const minScale = 0.97;

// Holographic overlay colours — loops through the spectrum
const overlayColors = [
  "hsl(358,100%,62%)",
  "hsl(30,100%,50%)",
  "hsl(60,100%,50%)",
  "hsl(96,100%,50%)",
  "hsl(233,85%,57%)",
  "hsl(271,85%,57%)",
  "hsl(300,60%,55%)",
  "hsl(180,80%,55%)",
  "transparent",
  "white",
];

export const HolographicCard: React.FC<HolographicCardProps> = ({
  children,
  className = "",
  borderRadius = 16,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [firstOverlayPosition, setFirstOverlayPosition] = useState(0);
  const [matrix, setMatrix] = useState(identityMatrix);
  const [currentMatrix, setCurrentMatrix] = useState(identityMatrix);
  const [disableInOutOverlayAnimation, setDisableInOutOverlayAnimation] = useState(true);
  const [disableOverlayAnimation, setDisableOverlayAnimation] = useState(false);
  const [isTimeoutFinished, setIsTimeoutFinished] = useState(false);

  const enterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout3 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getDimensions = () => {
    const rect = ref.current?.getBoundingClientRect();
    return {
      left: rect?.left ?? 0,
      right: rect?.right ?? 0,
      top: rect?.top ?? 0,
      bottom: rect?.bottom ?? 0,
    };
  };

  const getMatrix = (clientX: number, clientY: number) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    const scale = [
      maxScale - (maxScale - minScale) * Math.abs(xCenter - clientX) / (xCenter - left || 1),
      maxScale - (maxScale - minScale) * Math.abs(yCenter - clientY) / (yCenter - top || 1),
      maxScale -
        (maxScale - minScale) *
          (Math.abs(xCenter - clientX) + Math.abs(yCenter - clientY)) /
          ((xCenter - left || 1) + (yCenter - top || 1)),
    ];

    const rotate = {
      x1: 0.25 * ((yCenter - clientY) / (yCenter || 1) - (xCenter - clientX) / (xCenter || 1)),
      x2: maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / ((right - left) || 1),
      y2: maxRotate - (maxRotate - minRotate) * (top - clientY) / ((top - bottom) || 1),
      z0: -(maxRotate - (maxRotate - minRotate) * Math.abs(right - clientX) / ((right - left) || 1)),
      z1: 0.2 - (0.2 + 0.6) * (top - clientY) / ((top - bottom) || 1),
    };

    return (
      `${scale[0]}, ${rotate.y2 * 0}, ${rotate.z0}, 0, ` +
      `${rotate.x1}, ${scale[1]}, ${rotate.z1}, 0, ` +
      `${rotate.x2}, ${rotate.y2}, ${scale[2]}, 0, ` +
      `0, 0, 0, 1`
    );
  };

  const getOppositeMatrix = (_matrix: string, clientY: number, onMouseEnter?: boolean) => {
    const { top, bottom } = getDimensions();
    const oppositeY = bottom - clientY + top;
    const weakening = onMouseEnter ? 0.7 : 4;
    const multiplier = onMouseEnter ? -1 : 1;

    return _matrix
      .split(", ")
      .map((item, index) => {
        if (index === 2 || index === 4 || index === 8) {
          return -parseFloat(item) * multiplier / weakening;
        } else if (index === 0 || index === 5 || index === 10) {
          return "1";
        } else if (index === 6) {
          return (
            (multiplier * (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / ((top - bottom) || 1))) /
            weakening
          );
        } else if (index === 9) {
          return (maxRotate - (maxRotate - minRotate) * (top - oppositeY) / ((top - bottom) || 1)) / weakening;
        }
        return item;
      })
      .join(", ");
  };

  const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    [leaveTimeout1, leaveTimeout2, leaveTimeout3].forEach((t) => {
      if (t.current) clearTimeout(t.current);
    });
    setDisableOverlayAnimation(true);

    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setDisableInOutOverlayAnimation(false);
    enterTimeout.current = setTimeout(() => setDisableInOutOverlayAnimation(true), 350);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFirstOverlayPosition(
          (Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5
        );
      });
    });

    const mat = getMatrix(e.clientX, e.clientY);
    const opp = getOppositeMatrix(mat, e.clientY, true);
    setMatrix(opp);
    setIsTimeoutFinished(false);
    setTimeout(() => setIsTimeoutFinished(true), 200);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, right, top, bottom } = getDimensions();
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    setTimeout(
      () =>
        setFirstOverlayPosition(
          (Math.abs(xCenter - e.clientX) + Math.abs(yCenter - e.clientY)) / 1.5
        ),
      150
    );

    if (isTimeoutFinished) {
      setCurrentMatrix(getMatrix(e.clientX, e.clientY));
    }
  };

  const onMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const opp = getOppositeMatrix(matrix, e.clientY);
    if (enterTimeout.current) clearTimeout(enterTimeout.current);

    setCurrentMatrix(opp);
    setTimeout(() => setCurrentMatrix(identityMatrix), 200);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDisableInOutOverlayAnimation(false);
        leaveTimeout1.current = setTimeout(
          () => setFirstOverlayPosition(-firstOverlayPosition / 4),
          150
        );
        leaveTimeout2.current = setTimeout(() => setFirstOverlayPosition(0), 300);
        leaveTimeout3.current = setTimeout(() => {
          setDisableOverlayAnimation(false);
          setDisableInOutOverlayAnimation(true);
        }, 500);
      });
    });
  };

  useEffect(() => {
    if (isTimeoutFinished) setMatrix(currentMatrix);
  }, [currentMatrix, isTimeoutFinished]);

  // Build keyframe CSS string for idle animation
  const overlayKeyframes = overlayColors
    .map(
      (_, i) => `
    @keyframes holoOverlay${i + 1} {
      0%   { transform: rotate(${i * 10}deg); }
      50%  { transform: rotate(${(i + 1) * 10}deg); }
      100% { transform: rotate(${i * 10}deg); }
    }
  `
    )
    .join(" ");

  return (
    <div
      ref={ref}
      className={`relative cursor-pointer select-none ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: "700px" }}
    >
      <style>{overlayKeyframes}</style>

      {/* 3D-transformed wrapper */}
      <div
        style={{
          transform: `matrix3d(${matrix})`,
          transformOrigin: "center center",
          transition: "transform 200ms ease-out",
          borderRadius,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Children content */}
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>

        {/* Holographic rainbow overlay layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius,
            overflow: "hidden",
            mixBlendMode: "overlay",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          {overlayColors.map((color, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                transform: `rotate(${firstOverlayPosition + i * 10}deg)`,
                transformOrigin: "center center",
                transition: !disableInOutOverlayAnimation
                  ? "transform 200ms ease-out"
                  : "none",
                animation: disableOverlayAnimation
                  ? "none"
                  : `holoOverlay${i + 1} 5s infinite`,
                willChange: "transform",
                background: color,
                filter: "blur(8px)",
                opacity: 0.45,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
