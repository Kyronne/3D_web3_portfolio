import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ( { isMobile }) => {
  const computer = useGLTF("./ethereum/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.15} 
      groundColor='black' />
      <pointLight intensity={1} />
      <spotLight 
      position={[-10, 50, 20]}
      angle={0.15}
      penumbra={1}
      intensity={1}
      castShadow
      shadow-mapSize={1024}
      />
      <primitive 
      object={computer.scene}
      scale={isMobile ? 0.5 : 0.7}
      position={isMobile ? [-1, -1, 0] : [-1, 0, 0]}
      rotation={[-0.01, 1, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
       const mediaQuery = window.matchMedia("(max-width: 500px)");

      setIsMobile(mediaQuery.matches);
    
      const handleMediaQueryChange = (event) => {
        setIsMobile(event.matches);
      }

      mediaQuery.addEventListener('change', 
      handleMediaQueryChange);

      return () => {
        mediaQuery.removeEventListener('change', 
        handleMediaQueryChange )
      }

      }, [])
    
   return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 1, 20], fov: 22 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;