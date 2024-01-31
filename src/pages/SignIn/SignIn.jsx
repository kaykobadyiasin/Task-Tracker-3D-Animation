import React, { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import { AuthContext } from '../../Provider/AuthProviders';
import toast from 'react-hot-toast';

const SignIn = () => {
    const { user, loading, setLoading, signIn, logOut } = useContext(AuthContext);

    const handleGoogleSignIn = () => {
        setLoading(true)
        signIn()
            .then(result => {
                const user = result.user
                console.log(user)
                const notify = () =>
                    toast.success('Successfully Sign In with Accout Google', {
                        position: 'top-right',
                    });
                notify();
                setLoading(false)
            })
            .catch(error => {
                console.log('error', error.message)
                const notify = () =>
                    toast.error(error.message, {
                        position: 'bottom-right',
                    });
                notify();
            })
    }

    const handleSignOut = () => {
        setLoading(true)
        logOut()
            .then(result => {
                console.log(result)
                setLoading(false)
                const notify = () =>
                    toast.success('Successfully Sign Out with Accout Google', {
                        position: 'top-right',
                    });
                notify();
            })
            .catch(error => {
                console.log('error', error)
                const notify = () =>
                    toast.success(error, {
                        position: 'top-right',
                    });
                notify();
            })

    }



    return (
        <div className='flex justify-end gap-5 xl:mx-0 mx-5'>


            {user ?
                <div className='w-12 h-12 rounded-full border'>
                    <img src={user?.photoURL} className='w-full h-full object-cover rounded-full' alt="" />
                </div>
                :
                <Icon icon="mdi:user-circle" className='w-12 h-12 rounded-full border' />
            }

            {user ?
                <button onClick={handleSignOut} className='border rounded-lg px-2 py-2 mb-5 flex gap-2 items-center'>
                    <Icon icon="devicon:google" className='text-3xl' />
                    <span className='font-semibold'>Sign Out {loading && <Icon icon="svg-spinners:pulse-3" />}</span>
                </button>
                :

                <button onClick={handleGoogleSignIn} className='border rounded-lg px-2 py-2 flex gap-2 items-center'>
                    <Icon icon="devicon:google" className='text-3xl' />
                    <span className='font-semibold'>Sign with google</span>
                </button>
            }
        </div>
    );
};

export default SignIn;