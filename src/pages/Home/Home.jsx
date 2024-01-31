import { Canvas } from '@react-three/fiber';
import Cube from '../../components/Cube/Cube';
import React, { useContext, useEffect, useState } from 'react';
import SignIn from '../SignIn/SignIn';
import { AuthContext } from '../../Provider/AuthProviders';
import { useForm, Controller } from 'react-hook-form';

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

    return (
        <div className="">
            <div className="min-h-screen h-[100vh] w-full bg-indigo-950">
                <Canvas>
                    <Cube />
                </Canvas>
            </div>
            <div className="max-w-7xl mx-auto py-20">
                <SignIn />
                {/* task add form  */}
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

                <div className='mt-10 border overflow-x-auto rounded-lg p-5 bg-indigo-950 text-white xl:mx-0 mx-5'>
                    <h3 className='text-xl pt-2 pb-5 text-white font-semibold text-center '>Task List</h3>
                    <div className='relative overflow-x-auto shadow-md sm:rounded-lg bg-white'>
                        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th scope='col' className='px-6 py-3'>
                                        #
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Title
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Description
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Status
                                    </th>
                                    <th scope='col' className='px-6 py-3'>
                                        Action
                                    </th>
                                </tr>
                            </thead>


                            <tbody>
                                {tasks?.map((task, index) => (

                                    <tr key={index}
                                        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                                    >
                                        <td className='px-6 py-4'>{index + 1}</td>
                                        <td className='px-6 py-4'>{task?.title}</td>
                                        <td className='px-6 py-4'>{task?.description}</td>
                                        <td className='px-6 py-4 capitalize'>{task?.status}</td>
                                        <td className='px-6 text-center flex-grow md:flex-grow-0 py-4'>
                                            <a
                                                type='button'
                                                data-modal-target='editUserModal'
                                                data-modal-show='editUserModal'
                                                className='font-medium text-black cursor-pointer'
                                            >
                                                Edit
                                            </a>
                                            <span className='mx-5 my-1 block'>|</span>
                                            <a
                                                onClick={() => handleDelete(task._id)}
                                                type='button'
                                                data-modal-target='editUserModal'
                                                data-modal-show='editUserModal'
                                                className='font-medium text-red-500 dark:text-blue-500 cursor-pointer'
                                            >
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;