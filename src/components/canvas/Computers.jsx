import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ( { isMobile }) => {
  const computer = useGLTF("./ethereum/scene.gltf");

  return (
    <mesh >
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
      scale={isMobile ? 0.50 : 0.7}
      position={isMobile ? [-1, -1, 0] : [-1, 0, 0]}
      rotation={[-0.01, 1, 0]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
    const [isMobile, setIsMobile] = useState(false);
   
    useEffect(() => {
       // Event Listener that changes screen size
       const mediaQuery = window.matchMedia("(max-width: 500px)");

       // Set the initial value of 'isMobile' state variable
      setIsMobile(mediaQuery.matches);
      
      // Define a callback function to handle changes to the media query
      const handleMediaQueryChange = (event) => {
        setIsMobile(event.matches);
      }

      // Add the callback function as a listener for the changes to the media query.
      mediaQuery.addEventListener('change', 
      handleMediaQueryChange);

      // Remove the listener when the component leaves mobile view
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