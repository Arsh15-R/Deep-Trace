"use client";

import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";

export default function EvidenceHero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Mouse parallax coordinates
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseRef.current.targetX = Math.max(-1, Math.min(1, x));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, y));
    };

    const container = containerRef.current;
    if (container) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Scroll driven reveal / lock
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 120 && !isRevealed) {
        setIsRevealed(true);
      } else if (scrollY <= 60 && isRevealed) {
        setIsRevealed(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isRevealed]);

  // 3D Canvas rendering engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0.35;
    let angleY = 0.45;
    let openProgress = 0; // 0 = closed cube, 1 = opened vault reveal

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // 3D Math & Projection
    // Isometric 3D Cube vertices [-1 to 1]
    const size = 95 * dpr;

    const project = (x: number, y: number, z: number, w: number, h: number) => {
      // Perspective projection
      const distance = 480 * dpr;
      const fov = distance / (distance + z);
      return {
        px: w / 2 + x * fov,
        py: h / 2 + y * fov,
        scale: fov,
      };
    };

    const rotatePoint = (x: number, y: number, z: number, rx: number, ry: number) => {
      // Y rotation
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // X rotation
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      return { x: x1, y: y2, z: z2 };
    };

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const isDark = resolvedTheme === "dark";

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Auto rotation + parallax
      angleY += 0.006;
      const currentAngleX = angleX + mouseRef.current.y * 0.2;
      const currentAngleY = angleY + mouseRef.current.x * 0.35;

      // Target reveal progress
      const targetOpen = isRevealed ? 1 : 0;
      openProgress += (targetOpen - openProgress) * 0.08;

      // 1. Soft Studio Contact Shadow on Ground
      const shadowY = h / 2 + size * 1.45;
      const shadowRadiusX = size * (1.5 - openProgress * 0.2);
      const shadowRadiusY = size * 0.35;
      const shadowGrad = ctx.createRadialGradient(
        w / 2,
        shadowY,
        0,
        w / 2,
        shadowY,
        shadowRadiusX
      );

      if (isDark) {
        shadowGrad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
        shadowGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.6)");
        shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.12)");
        shadowGrad.addColorStop(0.6, "rgba(0, 0, 0, 0.03)");
        shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      }

      ctx.beginPath();
      ctx.ellipse(w / 2, shadowY, shadowRadiusX, shadowRadiusY, 0, 0, Math.PI * 2);
      ctx.fillStyle = shadowGrad;
      ctx.fill();

      // 2. Define 6 faces of the Evidence Cube
      // Each face has 4 vertices and a normal
      const offset = openProgress * (size * 0.45); // opens on scroll

      // Faces definition: [v1, v2, v3, v4, faceCenterOffset, baseColorLight, baseColorDark]
      const cubeFaces = [
        // Top Face (moves upwards when opened)
        {
          pts: [
            [-size, -size, -size],
            [size, -size, -size],
            [size, -size, size],
            [-size, -size, size],
          ],
          shift: [0, -offset * 1.5, 0],
          lightFill: "#FFFFFF",
          darkFill: "#2C2C2E",
          edgeColor: isDark ? "#3A3A3C" : "#E5E5EA",
        },
        // Front Face
        {
          pts: [
            [-size, -size, size],
            [size, -size, size],
            [size, size, size],
            [-size, size, size],
          ],
          shift: [0, 0, offset],
          lightFill: "#F2F2F7",
          darkFill: "#1C1C1E",
          edgeColor: isDark ? "#2C2C2E" : "#D1D1D6",
        },
        // Right Face
        {
          pts: [
            [size, -size, size],
            [size, -size, -size],
            [size, size, -size],
            [size, size, size],
          ],
          shift: [offset, 0, 0],
          lightFill: "#E5E5EA",
          darkFill: "#151516",
          edgeColor: isDark ? "#2C2C2E" : "#D1D1D6",
        },
        // Left Face
        {
          pts: [
            [-size, -size, -size],
            [-size, -size, size],
            [-size, size, size],
            [-size, size, -size],
          ],
          shift: [-offset, 0, 0],
          lightFill: "#EAEAEA",
          darkFill: "#18181A",
          edgeColor: isDark ? "#2C2C2E" : "#D1D1D6",
        },
        // Back Face
        {
          pts: [
            [size, -size, -size],
            [-size, -size, -size],
            [-size, size, -size],
            [size, size, -size],
          ],
          shift: [0, 0, -offset],
          lightFill: "#DCDCE0",
          darkFill: "#121213",
          edgeColor: isDark ? "#2C2C2E" : "#D1D1D6",
        },
        // Bottom Face
        {
          pts: [
            [-size, size, size],
            [size, size, size],
            [size, size, -size],
            [-size, size, -size],
          ],
          shift: [0, offset * 0.5, 0],
          lightFill: "#D1D1D6",
          darkFill: "#0E0E10",
          edgeColor: isDark ? "#2C2C2E" : "#C7C7CC",
        },
      ];

      // Inner Core Checkmark / Sealed Token (revealed as cube opens)
      if (openProgress > 0.15) {
        const coreRot = rotatePoint(0, 0, 0, currentAngleX, currentAngleY);
        const pCore = project(coreRot.x, coreRot.y, coreRot.z, w, h);

        const coreRadius = (size * 0.42 * openProgress);
        ctx.save();
        ctx.beginPath();
        ctx.arc(pCore.px, pCore.py, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#2997FF" : "#0071E3";
        ctx.fill();

        // Draw inner checkmark
        ctx.lineWidth = 3.5 * dpr * openProgress;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(pCore.px - 10 * dpr * openProgress, pCore.py);
        ctx.lineTo(pCore.px - 2 * dpr * openProgress, pCore.py + 8 * dpr * openProgress);
        ctx.lineTo(pCore.px + 12 * dpr * openProgress, pCore.py - 7 * dpr * openProgress);
        ctx.stroke();
        ctx.restore();
      }

      // Project each face and calculate average Z for painter's depth sorting
      const projectedFaces = cubeFaces.map((face) => {
        let avgZ = 0;
        const projectedPts = face.pts.map((pt) => {
          const shiftedX = pt[0] + face.shift[0];
          const shiftedY = pt[1] + face.shift[1];
          const shiftedZ = pt[2] + face.shift[2];
          const rot = rotatePoint(shiftedX, shiftedY, shiftedZ, currentAngleX, currentAngleY);
          avgZ += rot.z;
          return project(rot.x, rot.y, rot.z, w, h);
        });
        avgZ /= face.pts.length;

        return {
          face,
          pts: projectedPts,
          avgZ,
        };
      });

      // Sort back-to-front
      projectedFaces.sort((a, b) => b.avgZ - a.avgZ);

      // Render each face with smooth studio lighting shading
      projectedFaces.forEach(({ face, pts }) => {
        ctx.beginPath();
        ctx.moveTo(pts[0].px, pts[0].py);
        for (let i = 1; i < pts.length; i++) {
          ctx.lineTo(pts[i].px, pts[i].py);
        }
        ctx.closePath();

        // Studio lighting gradient across face
        const grad = ctx.createLinearGradient(
          pts[0].px,
          pts[0].py,
          pts[2].px,
          pts[2].py
        );

        const baseColor = isDark ? face.darkFill : face.lightFill;
        grad.addColorStop(0, baseColor);
        grad.addColorStop(
          1,
          isDark ? "rgba(20, 20, 22, 0.95)" : "rgba(225, 225, 230, 0.95)"
        );

        ctx.fillStyle = grad;
        ctx.fill();

        // 1px hairline border
        ctx.lineWidth = 1 * dpr;
        ctx.strokeStyle = face.edgeColor;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [resolvedTheme, isRevealed, isVisible]);

  return (
    <div
      ref={containerRef}
      onClick={() => setIsRevealed(!isRevealed)}
      className="relative w-full max-w-[640px] h-[360px] sm:h-[440px] mx-auto cursor-pointer select-none flex items-center justify-center"
      title="Click or scroll to seal/unlock evidence"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: "none" }}
      />

      {/* Floating status pill beneath cube */}
      <motion.div
        animate={{
          opacity: 1,
          y: isRevealed ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute bottom-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-apple-surface/80 apple-vibrancy border border-apple-hairline text-[12px] text-apple-text-secondary shadow-apple-subtle"
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isRevealed ? "bg-apple-green" : "bg-apple-blue"
          }`}
        />
        <span>
          {isRevealed
            ? "Cryptographic Seal Verified (SHA-256 Locked)"
            : "Interactive Evidence Vault — Click or scroll"}
        </span>
      </motion.div>
    </div>
  );
}
