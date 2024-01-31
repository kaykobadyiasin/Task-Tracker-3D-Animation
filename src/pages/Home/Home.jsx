import { Canvas } from '@react-three/fiber';
import Cube from '../../components/Cube/Cube';
import React, { useContext, useEffect, useState } from 'react';
import SignIn from '../SignIn/SignIn';
import { AuthContext } from '../../Provider/AuthProviders';
import { useForm, Controller } from 'react-hook-form';
import TaskTable from '../../components/TaskTable/TaskTable';
import { Icon } from '@iconify/react';
import { apiBaseUrl } from '../../apiservice/api';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
    const { register, handleSubmit, control, reset, defaultValue } = useForm();
    const [tasks, setTasks] = useState([]);
    const [existingTask, setExistingTask] = useState();
    const { user } = useContext(AuthContext);


    // all task get 
    useEffect(() => {
        // Fetch tasks on component mount
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch(`https://server-seven-flax.vercel.app/api/tasks`);
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // new task add and update task 
    const onSubmit = async (data) => {
        try {
            if (existingTask) {
                // Update existing task logic
                const id = existingTask._id;
                const response = await fetch(`https://server-seven-flax.vercel.app/api/tasks/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...data, status: data?.status }),
                });

                if (response.ok) {
                    fetchTasks(); // Fetch updated tasks
                    setExistingTask(null); // Reset existingTask state
                    const notify = () =>
                        toast.success('Successfully Updated Task', {
                            position: 'top-right',
                        });
                    notify();
                    reset(); // Reset form after submission
                } else {

                    const errorData = await response.json();
                    const notify = () =>
                        toast.error('Failed to update task', {
                            position: 'top-right',
                        });
                    notify();
                    console.error('Failed to update task:', errorData);
                }
            } else {
                // Add new task logic
                const response = await fetch(`https://server-seven-flax.vercel.app/api/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...data, status: data.status }),
                });

                if (response.ok) {
                    fetchTasks(); // Fetch updated tasks
                    const notify = () =>
                        toast.success('Successfully Added New Task', {
                            position: 'top-right',
                        });
                    notify();
                    reset(); // Reset form after submission
                } else {
                    const errorData = await response.json();
                    console.error('Failed to add task:', errorData);
                }
            }
        } catch (error) {
            const notify = () =>
                toast.error('Failed to delete task', {
                    position: 'top-right',
                });
            notify();
            console.error('Error handling task:', error);
        }
    };




    const onUdate = async (data) => {
        setExistingTask(data)
    };

    // delete task 
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://server-seven-flax.vercel.app/api/tasks/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchTasks(); // Fetch updated tasks
                const notify = () =>
                    toast.success('Successfully Deleted Task', {
                        position: 'top-right',
                    });
                notify();
            } else {
                const notify = () =>
                    toast.error('Failed to delete task', {
                        position: 'top-right',
                    });
                notify();
                console.error('Failed to delete task');
            }
        } catch (error) {
            const notify = () =>
                toast.error('Error deleting task', {
                    position: 'top-right',
                });
            notify();
            console.error('Error deleting task:', error);
        }
    };

    const scrollToTask = () => {
        window.scrollTo({ top: 500, behavior: 'smooth' });
    };


    return (
        <div className="">
            <Toaster />
            <div className="min-h-screen h-[100vh] w-full bg-indigo-950 relative">
                <div className='absolute left-0 right-0 top-0 z-10 mt-20'>

                    <div className='flex justify-center my-5'>
                        <Icon onClick={() => scrollToTask()} icon="svg-spinners:wind-toy" className='text-8xl cursor-pointer text-white' />
                    </div>
                    <div className='flex justify-center'>
                        <button onClick={() => scrollToTask()} className=' py-2 px-5 bg-white rounded-lg cursor-pointer'>View Task List</button>
                    </div>
                </div>
                <Canvas>
                    <Cube />
                </Canvas>
            </div>
            <div className="container mx-auto py-20">
                <SignIn />
                {/* task add form  */}
                {user &&
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="xl:mx-0 mx-5">
                            <div className="border p-5 rounded-lg bg-indigo-950">
                                <h3 className="text-xl pt-2 pb-5 text-white font-semibold text-center ">{existingTask ? 'Task Update' : 'Task Add'}</h3>
                                <div className="flex gap-5 mb-5">
                                    <input
                                        defaultValue={existingTask ? existingTask.title : ''}
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
                                        defaultValue={existingTask ? existingTask.status : ''}
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
                                    defaultValue={existingTask ? existingTask.description : ''}
                                    className="border p-5 rounded-lg w-full"
                                    {...register('description', { required: true })}
                                ></textarea>
                                <div className="flex justify-end">
                                    <input
                                        type="submit"
                                        value={existingTask ? 'Update Task' : 'Add Task'}
                                        className="text-white border px-5 py-2 rounded-lg mt-3 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer "
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                }

                <TaskTable tasks={tasks} onUdate={onUdate} handleDelete={handleDelete} />

            </div>

        </div>
    );
};

export default Home;