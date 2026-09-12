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
    camera.position.z = 5;

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(isDark ? 0x00f2fe : 0x0284c7, 2);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    // Differentiated Scene based on projectId
    if (projectId === 'library-management-system') {
      // Relational database nodes & query conduits
      const nodeGeo = new THREE.BoxGeometry(0.7, 0.5, 0.5);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x00f2fe : 0x0284c7,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: true
      });

      const nodes: THREE.Mesh[] = [];
      const positions = [
        [-1.2, 0.8, 0],
        [1.2, 0.8, 0],
        [-1.2, -0.8, 0],
        [1.2, -0.8, 0],
        [0, 0, 0.5] // central database controller
      ];

      positions.forEach((pos, i) => {
        const mesh = new THREE.Mesh(nodeGeo, i === 4 
          ? new THREE.MeshStandardMaterial({ color: isDark ? 0x7928ca : 0x4f46e5, roughness: 0.3, metalness: 0.7 })
          : nodeMat
        );
        mesh.position.set(pos[0], pos[1], pos[2]);
        group.add(mesh);
        nodes.push(mesh);
      });

      // Connecting conduit lines
      const lineMat = new THREE.LineBasicMaterial({
        color: isDark ? 0x00f2fe : 0x0284c7,
        transparent: true,
        opacity: 0.4
      });

      positions.slice(0, 4).forEach((pos) => {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0.5),
          new THREE.Vector3(pos[0], pos[1], pos[2])
        ]);
        const line = new THREE.Line(lineGeo, lineMat);
        group.add(line);
      });

    } else if (projectId === 'rock-paper-scissor') {
      // 3 Polyhedra representing Rock, Paper, Scissors
      // Rock: Dodecahedron
      const rockGeo = new THREE.DodecahedronGeometry(0.55);
      const rockMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0xec4899 : 0xdb2777,
        roughness: 0.4,
        metalness: 0.6
      });
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(-1.2, 0, 0);
      group.add(rock);

      // Paper: Flat Thin Torus
      const paperGeo = new THREE.TorusGeometry(0.55, 0.12, 16, 50);
      const paperMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x8b5cf6 : 0x7c3aed,
        roughness: 0.3,
        metalness: 0.7
      });
      const paper = new THREE.Mesh(paperGeo, paperMat);
      paper.position.set(1.2, 0, 0);
      group.add(paper);

      // Scissors: Central Crossed Octahedron
      const scissorGeo = new THREE.OctahedronGeometry(0.7, 0);
      const scissorMat = new THREE.MeshStandardMaterial({
        color: isDark ? 0x06b6d4 : 0x0891b2,
        wireframe: true
      });
      const scissor = new THREE.Mesh(scissorGeo, scissorMat);
      scissor.position.set(0, 0.3, 0);
      group.add(scissor);

    } else {
      // Todo List: Holographic Task Stack & Status Rings
      for (let i = 0; i < 3; i++) {
        const planeGeo = new THREE.BoxGeometry(2.0, 0.45, 0.05);
        const planeMat = new THREE.MeshStandardMaterial({
          color: i === 0 ? (isDark ? 0x10b981 : 0x059669) : (isDark ? 0x3b82f6 : 0x2563eb),
          transparent: true,
          opacity: 0.8 - i * 0.15,
          roughness: 0.2
        });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.position.set(0, (1 - i) * 0.75, (1 - i) * 0.25);
        group.add(plane);
      }

      // Checkmark orbit ring
      const ringGeo = new THREE.RingGeometry(0.35, 0.45, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0x10b981 : 0x059669,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(1.2, 0.75, 0.3);
      group.add(ring);
    }

    // Interactive rotation on hover
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
      const speed = isHovered ? 1.5 : 0.6;

      group.rotation.y += delta * speed * 0.5;
      group.rotation.x = Math.sin(clock.getElapsedTime() * 0.8) * 0.15;

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
      className="w-full h-full min-h-[220px] relative overflow-hidden rounded-xl"
      aria-label={`${projectId} 3D Visual`}
    />
  );
};
