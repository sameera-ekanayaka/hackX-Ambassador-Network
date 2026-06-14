"use client";

import React, { HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ');

export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  accentColor: string;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  activeIndex: number;
  radius?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, activeIndex, className, radius = 320, ...props }, ref) => {
    const N = items.length;
    const anglePerItem = 360 / N;
    const rotation = -activeIndex * anglePerItem;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Timeline Carousel"
        className={cn('relative w-full h-full flex items-center justify-center', className)}
        style={{ perspective: '1200px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            // how far (in degrees) from the front face
            const relAngle = ((itemAngle + rotation) % 360 + 360) % 360;
            const dist = relAngle > 180 ? 360 - relAngle : relAngle;

            // Only show 3 cards clearly; hide the rest
            let opacity = 0;
            let scale = 0.85;
            if (dist === 0) { opacity = 1; scale = 1; }
            else if (dist <= anglePerItem + 5) { opacity = 0.45; scale = 0.9; }
            else if (dist <= anglePerItem * 2 + 5) { opacity = 0.15; scale = 0.8; }

            const isActive = i === activeIndex;

            return (
              <div
                key={item.id}
                className="absolute"
                style={{
                  width: '280px',
                  height: '380px',
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) scale(${scale})`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-140px',
                  marginTop: '-190px',
                  opacity,
                  transition: 'opacity 0.5s ease, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <div
                  className="w-full h-full rounded-2xl overflow-hidden group"
                  style={{
                    border: isActive
                      ? `1px solid ${item.accentColor}50`
                      : '1px solid rgba(255,255,255,0.07)',
                    boxShadow: isActive
                      ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${item.accentColor}20`
                      : '0 8px 30px rgba(0,0,0,0.4)',
                    background: '#020C1B',
                  }}
                >
                  {/* Image wrapper filling the entire card */}
                  <div className="relative w-full h-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Accent tint overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-40"
                      style={{
                        background: `linear-gradient(to bottom, ${item.accentColor}05 0%, rgba(2,12,27,0.7) 100%)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';
export { CircularGallery };
