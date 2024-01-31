import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProviders';

const TaskTable = ({ tasks, onUdate, handleDelete }) => {

    const { user } = useContext(AuthContext);

    return (
        <div className='mt-5 border overflow-x-auto rounded-lg p-5 bg-indigo-950 text-white xl:mx-0 mx-5'>
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
                            {user && <th scope='col' className='px-6 py-3'>
                                Action
                            </th>}
                        </tr>
                    </thead>


                    <tbody>
                        {tasks?.map((task, index) => (

                            <tr key={index}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                            >
                                <td className='px-6 py-4'>{index + 1}</td>
                                <td className='px-6 py-4 text-justify'>{task?.title}</td>
                                <td className='px-6 py-4 text-justify'>{task?.description}</td>
                                <td className='px-6 py-4 capitalize'>{task?.status}</td>
                                {user && <td className='px-6 text-center md:flex flex-grow-0 lg:flex-grow py-4'>
                                    <a
                                        onClick={() => onUdate(task._id)}
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
                                </td>}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskTable;