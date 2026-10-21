"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";

interface GymHeroCanvasProps {
  className?: string;
}

export default function GymHeroCanvas({ className = "" }: GymHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlFailed, setWebGlFailed] = useState(false);

  useEffect(() => {
    // 1. Check WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      // Defer state update to avoid synchronous render cascading
      const timeout = setTimeout(() => setWebGlFailed(true), 0);
      return () => clearTimeout(timeout);
    }

    // 2. Check Reduced Motion preference
    const motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!containerRef.current) return;

    // 3. Initialize Three.js Scene
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      container.appendChild(renderer.domElement);
    } catch {
      const timeout = setTimeout(() => setWebGlFailed(true), 0);
      return () => clearTimeout(timeout);
    }

    // 4. Build Procedural Chrome Dumbbell Sculpture
    const dumbbellGroup = new THREE.Group();

    // Chrome Material
    const chromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 0.95,
      roughness: 0.18,
    });

    // Dark Textured Grip Material
    const knurledMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f1f1f,
      metalness: 0.85,
      roughness: 0.5,
    });

    // Steel Weight Plates Material
    const plateMaterial = new THREE.MeshStandardMaterial({
      color: 0x2b2b2b,
      metalness: 0.8,
      roughness: 0.25,
    });

    // Handle Bar
    const handleGeo = new THREE.CylinderGeometry(0.14, 0.14, 3.2, 32);
    const handleMesh = new THREE.Mesh(handleGeo, knurledMaterial);
    handleMesh.rotation.z = Math.PI / 2;
    dumbbellGroup.add(handleMesh);

    // Inner Knurling Rings
    const ringGeo = new THREE.TorusGeometry(0.18, 0.04, 16, 32);
    const ringLeft = new THREE.Mesh(ringGeo, chromeMaterial);
    ringLeft.position.x = -1.1;
    ringLeft.rotation.y = Math.PI / 2;
    dumbbellGroup.add(ringLeft);

    const ringRight = new THREE.Mesh(ringGeo, chromeMaterial);
    ringRight.position.x = 1.1;
    ringRight.rotation.y = Math.PI / 2;
    dumbbellGroup.add(ringRight);

    // Weight Plates Geometry (Stepped Hexagonal Dumbbell Heads)
    const createDumbbellHead = (side: number) => {
      const headGroup = new THREE.Group();

      // Outer Heavy Hex Plate
      const outerPlateGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 6);
      const outerMesh = new THREE.Mesh(outerPlateGeo, plateMaterial);
      outerMesh.rotation.z = Math.PI / 2;
      outerMesh.position.x = side * 1.75;
      headGroup.add(outerMesh);

      // Inner Accent Plate
      const innerPlateGeo = new THREE.CylinderGeometry(1.0, 1.0, 0.35, 6);
      const innerMesh = new THREE.Mesh(innerPlateGeo, chromeMaterial);
      innerMesh.rotation.z = Math.PI / 2;
      innerMesh.position.x = side * 1.35;
      headGroup.add(innerMesh);

      // End Cap Nut
      const capGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 6);
      const capMesh = new THREE.Mesh(capGeo, chromeMaterial);
      capMesh.rotation.z = Math.PI / 2;
      capMesh.position.x = side * 2.05;
      headGroup.add(capMesh);

      return headGroup;
    };

    dumbbellGroup.add(createDumbbellHead(-1));
    dumbbellGroup.add(createDumbbellHead(1));

    // Dynamic initial tilt
    dumbbellGroup.rotation.x = 0.45;
    dumbbellGroup.rotation.y = -0.6;
    dumbbellGroup.rotation.z = 0.3;

    scene.add(dumbbellGroup);

    // 5. Lighting Setup (Monochrome rim studio lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 3.5);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    const topFill = new THREE.PointLight(0xffffff, 1.2, 20);
    topFill.position.set(0, 4, 3);
    scene.add(topFill);

    // 6. Interactive Parallax & Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 1.2;
      mouseY = (e.clientY / innerHeight - 0.5) * 1.2;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (!motionMediaQuery.matches) {
        // Continuous slow athletic rotation & floating bob
        dumbbellGroup.rotation.y += delta * 0.4;
        dumbbellGroup.position.y = Math.sin(clock.getElapsedTime() * 1.2) * 0.15;

        // Smooth mouse parallax lerp
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        dumbbellGroup.rotation.x = 0.45 + targetY * 0.35;
        dumbbellGroup.rotation.z = 0.3 + targetX * 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Responsive Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      resizeObserver.disconnect();

      // Dispose Three.js objects
      handleGeo.dispose();
      ringGeo.dispose();
      chromeMaterial.dispose();
      knurledMaterial.dispose();
      plateMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Static Fallback when WebGL is unavailable
  if (webGlFailed) {
    return (
      <div
        className={`flex items-center justify-center p-6 ${className}`}
        aria-label="Unisex Fitness Brand Visual"
      >
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 opacity-80 filter drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
          <Image
            src="/brand/logo.jpg"
            alt="Unisex Fitness Iconic Dumbbell Sculpture"
            fill
            className="object-cover rounded-full border-2 border-[#343434]"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[320px] sm:h-[400px] lg:h-[480px] pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
