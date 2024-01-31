import { Canvas } from '@react-three/fiber';
import Cube from '../../components/Cube/Cube';
import React, { useContext, useEffect, useState } from 'react';
import SignIn from '../SignIn/SignIn';
import { AuthContext } from '../../Provider/AuthProviders';
import { useForm, Controller } from 'react-hook-form';
import TaskTable from '../../components/TaskTable/TaskTable';
import { Icon } from '@iconify/react';

const Home = () => {
    const { register, handleSubmit, control, reset } = useForm();
    const [tasks, setTasks] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        // Fetch tasks on component mount
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/tasks/');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/api/tasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, status: data.status }),
            });

            if (response.ok) {
                fetchTasks(); // Fetch updated tasks
                reset(); // Reset form after submission
            } else {
                const errorData = await response.json();
                console.error('Failed to add task:', errorData);
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };


    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchTasks(); // Fetch updated tasks
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const scrollToTask = () => {
        window.scrollTo({ top: 500, behavior: 'smooth' });
    };

    return (
        <div className="">
            <div className="min-h-screen h-[100vh] w-full bg-indigo-950 relative">
                <div className='absolute left-0 right-0 top-0 z-10 mt-20'>
                    
                    <div className='flex justify-center my-5'>
                        <Icon  onClick={() => scrollToTask()} icon="svg-spinners:wind-toy" className='text-8xl cursor-pointer text-white' />
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={() => scrollToTask()} className=' py-2 px-5 bg-white rounded-lg cursor-pointer'>View Task List</button>
                    </div>
                </div>
                <Canvas>
                    <Cube />
                </Canvas>
            </div>
            <div className="max-w-7xl mx-auto py-20">
                <SignIn />
                {/* task add form  */}
                {user &&
                    <form onSubmit={handleSubmit(onSubmit)} className="xl:mx-0 mx-5">
                        <div className="border p-5 rounded-lg bg-indigo-950">
                            <h3 className="text-xl pt-2 pb-5 text-white font-semibold text-center ">Task Add</h3>
                            <div className="flex gap-5 mb-5">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    className="border p-5 rounded-lg w-full"
                                    {...register('title', { required: true })}
                                />
                                <Controller
                                    name="status"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <select
                                            {...field}
                                            className="border px-5 rounded-lg w-full"
                                        >
                                            <option disabled>Select Status</option>
                                            <option value="active">Active</option>
                                            <option value="pending">Pending</option>
                                            <option value="complete">Complete</option>
                                        </select>
                                    )}
                                />
                            </div>
                            <textarea
                                name="description"
                                placeholder="Description"
                                className="border p-5 rounded-lg w-full"
                                {...register('description', { required: true })}
                            ></textarea>
                            <div className="flex justify-end">
                                <input
                                    type="submit"
                                    value={'Add Task'}
                                    className="text-white border px-5 py-2 rounded-lg mt-3 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer "
                                />
                            </div>
                        </div>
                    </form>
                }

                <TaskTable tasks={tasks} handleDelete={handleDelete} />

            </div>

        </div>
    );
};

export default Home;