import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroSceneProps {
  isDark?: boolean;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ isDark = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire interactive assembly
    const assemblyGroup = new THREE.Group();
    scene.add(assemblyGroup);

    // 1. Outer Icosahedron Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x00f2fe : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.45,
      roughness: 0.2,
      metalness: 0.8
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    assemblyGroup.add(outerMesh);

    // 2. Inner Crystal / Core Polyhedron
    const innerGeo = new THREE.OctahedronGeometry(1.0, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x7928ca : 0x4f46e5,
      emissive: isDark ? 0x220044 : 0x1e1b4b,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      ior: 1.5,
      transparent: true,
      opacity: 0.85
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    assemblyGroup.add(innerMesh);

    // 3. Cyber Ring Gimbal 1
    const ring1Geo = new THREE.TorusGeometry(2.3, 0.025, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f2fe : 0x38bdf8,
      transparent: true,
      opacity: 0.5
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    assemblyGroup.add(ring1);

    // 4. Cyber Ring Gimbal 2
    const ring2Geo = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x4facfe : 0x6366f1,
      transparent: true,
      opacity: 0.4
    });
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    assemblyGroup.add(ring2);

    // 5. Floating Particle Constellation
    const particleCount = window.innerWidth < 768 ? 120 : 250;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(isDark ? 0x00f2fe : 0x0284c7);
    const purpleColor = new THREE.Color(isDark ? 0x7928ca : 0x4f46e5);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = cyanColor.clone().lerp(purpleColor, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    assemblyGroup.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(isDark ? 0x00f2fe : 0x0284c7, 3.5, 50);
    pointLight.position.set(3, 4, 5);
    scene.add(pointLight);

    const purpleLight = new THREE.PointLight(isDark ? 0x7928ca : 0x818cf8, 3, 50);
    purpleLight.position.set(-3, -3, 3);
    scene.add(purpleLight);

    // Mouse & Scroll interaction targets
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Visibility Observer to pause loop when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Rotate geometries
      outerMesh.rotation.x = elapsedTime * 0.2 + mouse.y * 0.4;
      outerMesh.rotation.y = elapsedTime * 0.25 + mouse.x * 0.4;

      innerMesh.rotation.x = -elapsedTime * 0.35 - mouse.y * 0.3;
      innerMesh.rotation.y = elapsedTime * 0.4 + mouse.x * 0.3;

      ring1.rotation.z = elapsedTime * 0.15;
      ring1.rotation.x = Math.PI / 3 + mouse.y * 0.2;

      ring2.rotation.z = -elapsedTime * 0.12;
      ring2.rotation.y = Math.PI / 4 + mouse.x * 0.2;

      particles.rotation.y = elapsedTime * 0.05;

      // Scroll depth zoom & transition
      const scrollFactor = Math.min(scrollY / 700, 1.5);
      assemblyGroup.position.z = -scrollFactor * 2.8;
      assemblyGroup.position.y = -scrollFactor * 1.2;
      assemblyGroup.rotation.z = scrollFactor * 0.4;

      // Subtle light following mouse
      pointLight.position.x = 3 + mouse.x * 2;
      pointLight.position.y = 4 + mouse.y * 2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      style={{ touchAction: 'pan-y' }}
      aria-label="Interactive 3D Geometric Core"
    />
  );
};
