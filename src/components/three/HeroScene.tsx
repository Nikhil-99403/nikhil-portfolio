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
    camera.position.z = 7.5;

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

    // 1. Outer Icosahedron Wireframe with Glowing Vertices
    const outerGeo = new THREE.IcosahedronGeometry(2.0, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x00f2fe : 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.4 : 0.5,
      roughness: 0.1,
      metalness: 0.9
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    assemblyGroup.add(outerMesh);

    // Vertex points for the outer icosahedron
    const vertexPointsMat = new THREE.PointsMaterial({
      color: isDark ? 0x00ff9d : 0x0ea5e9,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const vertexPoints = new THREE.Points(outerGeo, vertexPointsMat);
    assemblyGroup.add(vertexPoints);

    // 2. Inner Crystal / Core Polyhedron (Refractive Octahedron)
    const innerGeo = new THREE.OctahedronGeometry(1.15, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: isDark ? 0x7928ca : 0x4f46e5,
      emissive: isDark ? 0x3b0764 : 0x312e81,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.8,
      ior: 1.6,
      transparent: true,
      opacity: 0.9
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    assemblyGroup.add(innerMesh);

    // Inner wireframe shell
    const innerWireGeo = new THREE.OctahedronGeometry(1.25, 0);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f2fe : 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const innerWire = new THREE.Mesh(innerWireGeo, innerWireMat);
    assemblyGroup.add(innerWire);

    // 3. Cyber Gimbal Ring 1 (Torus with glowing nodes)
    const ring1Geo = new THREE.TorusGeometry(2.55, 0.025, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x00f2fe : 0x0284c7,
      transparent: true,
      opacity: 0.65
    });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    assemblyGroup.add(ring1);

    // 4. Cyber Gimbal Ring 2 (Torus with glowing nodes)
    const ring2Geo = new THREE.TorusGeometry(2.85, 0.02, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isDark ? 0x7928ca : 0x6366f1,
      transparent: true,
      opacity: 0.55
    });
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    assemblyGroup.add(ring2);

    // 5. Orbiting Satellite Crystal Shards
    const shardGroup = new THREE.Group();
    assemblyGroup.add(shardGroup);
    const shardCount = 6;
    const shards: THREE.Mesh[] = [];
    const shardGeo = new THREE.TetrahedronGeometry(0.18, 0);
    const shardMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x00f2fe : 0x0284c7,
      roughness: 0.2,
      metalness: 0.8
    });

    for (let i = 0; i < shardCount; i++) {
      const shard = new THREE.Mesh(shardGeo, shardMat);
      const angle = (i / shardCount) * Math.PI * 2;
      shard.position.set(Math.cos(angle) * 3.2, Math.sin(angle) * 0.8, Math.sin(angle) * 3.2);
      shardGroup.add(shard);
      shards.push(shard);
    }

    // 6. Floating Particle Constellation with Color Gradients
    const particleCount = window.innerWidth < 768 ? 160 : 350;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(isDark ? 0x00f2fe : 0x0284c7);
    const purpleColor = new THREE.Color(isDark ? 0x7928ca : 0x6366f1);
    const emeraldColor = new THREE.Color(isDark ? 0x00ff9d : 0x10b981);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const randVal = Math.random();
      const mixed = randVal < 0.5 
        ? cyanColor.clone().lerp(purpleColor, randVal * 2)
        : purpleColor.clone().lerp(emeraldColor, (randVal - 0.5) * 2);

      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    assemblyGroup.add(particles);

    // Multi-light configuration
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.3);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(isDark ? 0x00f2fe : 0x0284c7, 4.5, 40);
    cyanLight.position.set(4, 3, 5);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(isDark ? 0x7928ca : 0x818cf8, 4.0, 40);
    purpleLight.position.set(-4, -3, 4);
    scene.add(purpleLight);

    const emeraldLight = new THREE.PointLight(isDark ? 0x00ff9d : 0x34d399, 2.5, 30);
    emeraldLight.position.set(0, 4, -3);
    scene.add(emeraldLight);

    // Interactive mouse targets
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, speed: 0 };
    let lastMouseX = 0;
    let lastMouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x;
      mouse.targetY = y;

      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      mouse.speed = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.015, 0.25);
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
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

    // Visibility Observer
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
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouse.speed *= 0.94; // decay speed boost

      const dynamicSpeed = 1.0 + mouse.speed * 4.0;

      // Geometries rotation
      outerMesh.rotation.x = elapsedTime * 0.22 * dynamicSpeed + mouse.y * 0.45;
      outerMesh.rotation.y = elapsedTime * 0.28 * dynamicSpeed + mouse.x * 0.45;
      vertexPoints.rotation.copy(outerMesh.rotation);

      innerMesh.rotation.x = -elapsedTime * 0.4 * dynamicSpeed - mouse.y * 0.35;
      innerMesh.rotation.y = elapsedTime * 0.45 * dynamicSpeed + mouse.x * 0.35;
      innerWire.rotation.copy(innerMesh.rotation);

      // Core scale breathing
      const pulse = 1.0 + Math.sin(elapsedTime * 2.5) * 0.06;
      innerMesh.scale.set(pulse, pulse, pulse);
      innerWire.scale.set(pulse, pulse, pulse);

      ring1.rotation.z = elapsedTime * 0.2 * dynamicSpeed;
      ring1.rotation.x = Math.PI / 3 + mouse.y * 0.25;

      ring2.rotation.z = -elapsedTime * 0.16 * dynamicSpeed;
      ring2.rotation.y = Math.PI / 4 + mouse.x * 0.25;

      shardGroup.rotation.y = elapsedTime * 0.35;
      shardGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
      shards.forEach((s, idx) => {
        s.rotation.x += 0.02;
        s.rotation.y += 0.03;
        s.position.y = Math.sin(elapsedTime * 2 + idx) * 0.5;
      });

      particles.rotation.y = elapsedTime * 0.07;
      particles.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

      // Scroll depth zoom & transition
      const scrollFactor = Math.min(scrollY / 600, 1.8);
      assemblyGroup.position.z = -scrollFactor * 3.2;
      assemblyGroup.position.y = -scrollFactor * 1.4;
      assemblyGroup.rotation.z = scrollFactor * 0.5;

      // Lights dynamic tracking
      cyanLight.position.x = 4 + mouse.x * 3;
      cyanLight.position.y = 3 + mouse.y * 3;
      purpleLight.position.x = -4 - mouse.x * 2;
      purpleLight.position.y = -3 - mouse.y * 2;

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
