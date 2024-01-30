import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';


const Cube = () => {

    const cubeRef = useRef();

    useFrame((state, delta) => {
        cubeRef.current.rotation.y += 0.01;
        cubeRef.current.rotation.x += 0.01;
    })

    return (
        <>
            <OrbitControls />
            <spotLight />
            <ambientLight />
            <mesh ref={cubeRef}>
                <boxGeometry  />
                <meshStandardMaterial />
            </mesh>
        </>
    );
};

export default Cube;