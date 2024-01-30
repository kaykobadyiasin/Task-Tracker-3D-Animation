
import { Canvas } from '@react-three/fiber';
import Cube from '../../components/Cube/Cube';
import React from 'react';

const Home = () => {



    return (
        <div className='min-h-screen w-[100vw]'>
            
            <Canvas>
                <Cube />
            </Canvas>
        </div>
    );
};

export default Home;