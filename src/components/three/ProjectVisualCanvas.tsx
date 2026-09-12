import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ProjectVisualCanvasProps {
  projectId: string;
  isDark?: boolean;
}

export const ProjectVisualCanvas: React.FC<ProjectVisualCanvasProps> = ({ projectId, isDark = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(isDark ? 0x00f2fe : 0x0284c7, 3);
    dirLight.position.set(4, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(isDark ? 0x7928ca : 0x6366f1, 3.5, 30);
    pointLight.position.set(-3, -3, 3);
    scene.add(pointLight);

    // Dynamic Elements based on projectId
    const pulseObjects: THREE.Object3D[] = [];

    if (projectId === 'library-management-system') {
      // 1. Central Database Server Core
      const coreGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 32);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: isDark ? 0x00f2fe : 0x0284c7,
        emissive: isDark ? 0x004466 : 0x0369a1,
        roughness: 0.15,
        metalness: 0.8,
        transmission: 0.4
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);
      pulseObjects.push(core);

      // Stacked database disks
      [-0.4, 0.4].forEach((yOffset) => {
        const disk = new THREE.Mesh(coreGeo, coreMat);
        disk.position.y = yOffset;
        disk.scale.set(0.9, 0.8, 0.9);
        group.add(disk);
      });

      // Orbiting Relational Table Nodes
      const tableGeo = new THREE.BoxGeometry(0.45, 0.35, 0.35);
      const tableMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x7928ca : 0x4f46e5,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true
      });

      const positions = [
        [-1.6, 0.7, 0.4],
        [1.6, 0.7, -0.4],
        [-1.6, -0.7, -0.4],
        [1.6, -0.7, 0.4]
      ];

      positions.forEach((pos) => {
        const table = new THREE.Mesh(tableGeo, tableMat);
        table.position.set(pos[0], pos[1], pos[2]);
        group.add(table);

        // Glowing connection line to core
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(pos[0], pos[1], pos[2])
        ]);
        const lineMat = new THREE.LineBasicMaterial({
          color: isDark ? 0x00f2fe : 0x38bdf8,
          transparent: true,
          opacity: 0.5
        });
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
      });

    } else if (projectId === 'rock-paper-scissor') {
      // 3 Dynamic Polyhedra: Dodecahedron (Rock), Torus (Paper), Dual Pyramids (Scissors)
      const rockGeo = new THREE.DodecahedronGeometry(0.65);
      const rockMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0xf43f5e : 0xe11d48,
        roughness: 0.3,
        metalness: 0.7
      });
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(-1.3, 0.2, 0);
      group.add(rock);
      pulseObjects.push(rock);

      const paperGeo = new THREE.TorusGeometry(0.6, 0.12, 16, 60);
      const paperMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0xa855f7 : 0x9333ea,
        roughness: 0.2,
        metalness: 0.8
      });
      const paper = new THREE.Mesh(paperGeo, paperMat);
      paper.position.set(1.3, 0.2, 0);
      group.add(paper);
      pulseObjects.push(paper);

      const scissorGeo = new THREE.OctahedronGeometry(0.75, 0);
      const scissorMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x00f2fe : 0x0284c7,
        wireframe: true
      });
      const scissor = new THREE.Mesh(scissorGeo, scissorMat);
      scissor.position.set(0, -0.4, 0.5);
      group.add(scissor);
      pulseObjects.push(scissor);

    } else {
      // Todo List: 3 Floating Holographic Task Cards with Animated Checkmark Rings
      for (let i = 0; i < 3; i++) {
        const cardGeo = new THREE.BoxGeometry(2.2, 0.45, 0.04);
        const cardMat = new THREE.MeshPhysicalMaterial({
          color: i === 0 ? (isDark ? 0x10b981 : 0x059669) : (isDark ? 0x3b82f6 : 0x2563eb),
          roughness: 0.1,
          metalness: 0.4,
          transparent: true,
          opacity: 0.85 - i * 0.18
        });
        const card = new THREE.Mesh(cardGeo, cardMat);
        card.position.set(0, (1 - i) * 0.65, (1 - i) * 0.3);
        group.add(card);
        pulseObjects.push(card);
      }

      // Checkmark glowing ring
      const ringGeo = new THREE.TorusGeometry(0.3, 0.05, 16, 50);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0x00ff9d : 0x10b981
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(1.4, 0.65, 0.4);
      group.add(ring);
    }

    // Ambient floating particles
    const pGeo = new THREE.BufferGeometry();
    const pCount = 60;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) {
      pPos[i] = (Math.random() - 0.5) * 5.0;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      color: isDark ? 0x00f2fe : 0x0284c7,
      transparent: true,
      opacity: 0.6
    });
    const pPoints = new THREE.Points(pGeo, pMat);
    group.add(pPoints);

    // Mouse Interaction
    let isHovered = false;
    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const speed = isHovered ? 2.2 : 0.8;

      group.rotation.y += delta * speed * 0.4;
      group.rotation.x = Math.sin(clock.getElapsedTime() * 0.8) * 0.12;

      pulseObjects.forEach((obj, idx) => {
        const scale = 1.0 + Math.sin(clock.getElapsedTime() * 2 + idx) * 0.05;
        obj.scale.set(scale, scale, scale);
      });

      pPoints.rotation.y += delta * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [projectId, isDark]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[240px] relative overflow-hidden rounded-xl"
      aria-label={`${projectId} 3D Visual`}
    />
  );
};
