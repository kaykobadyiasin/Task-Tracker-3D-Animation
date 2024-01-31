import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';


const Cube = () => {

    const cubeRef = useRef();

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += delta;
        cubeRef.current.rotation.x += delta;
        
    })

    return (
        <>
            <OrbitControls />
            <spotLight />
            <ambientLight />
            <Stars/>
            
            <mesh ref={cubeRef}>
                <boxGeometry  />
                <meshStandardMaterial />
            </mesh>
            </>
    );
};

export default Cube;