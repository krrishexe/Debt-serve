import React, { useEffect } from 'react'
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { loginSchema } from "../models/index"
import axios from 'axios'
import "../Media/CSS/Signup.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';
import { useContext } from 'react';
import { BASE_URL } from '../utils/constants';

const initialValues = { email: '', password: '' }

function Login() {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            // console.log(values)
        }
    })
    useEffect(() => {
        console.log(values)
    }, [values, errors])
    const [loading, setLoading] = useState(false)
    const [passwordBtn, setPasswordBtn] = useState(false)

    const onLogin = async (e) => {
        try {
            console.log(values)
            e.preventDefault()
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/me`, values)
            if (response.data.status === 200) {
                console.log(response.data)
                localStorage.setItem('accessToken', response.data.accessToken)  // for access token

                console.log("Login Successful " + response.data)
                toast.success(`Login successful 🦄 ${response.data.message} `, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                toast.success(`You will be redirected to homepage in 🦄 3 seconds.`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                const getUserData = async () => {
                    try {
                        const url = `${BASE_URL}/me`;
                        const token = localStorage.getItem('accessToken');
                        let data = await axios.post(url, { accessToken: token }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            withCredentials: true,
                        });
                        console.log(data.data);
                        localStorage.setItem('user', JSON.stringify(data.data.user));
                        setUser(data.data.user);
                    } catch (error) {
                        console.error("Error fetching user data:", error.message);
                    }
                };
                getUserData()
                setTimeout(() => {
                    navigate(`/`)
                }, 3000);
            } else {
                console.log("Login Failed " + response.data.message)
                toast.error(`Login Failed ❌ ${response.data.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                values.email = ''
                values.password = ''

            }

        } catch (error) {
            console.log("Login Failed " + error.message)
            toast.error(`Login Failed ❌ ${error.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }
    })

    return (
        <>
            {/* <div className='container1 container'>
                <div className="signup-container" style={{ boxShadow: "5px 5px 5px 0px rgba(0,5,228,0.1)" }}>
                    <h2 className="signup-title ubuntu-regular" >Sign In</h2>
                    <div className="signup-form-container">
                        <form className="signup-form" onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="input-field"
                                />
                                {errors.email && touched.email && <p className="error-message">{errors.email}</p>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div>

                                    <input
                                        type={passwordBtn ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        placeholder="Enter your Password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="input-field"
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setPasswordBtn(!passwordBtn)}
                                    >
                                        <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zm0 144a144 144 0 1 1 288 0 144 144 0 1 1-288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                        </svg>
                                    </button>
                                </div>
                                {errors.password && touched.password && <p className="error-message">{errors.password}</p>}
                            </div>

                            <button
                                className={loading ? `btn loader` : `btn button-submit`}
                                disabled={Object.keys(errors).length > 0 || Object.values(values).some(value => !value)}
                                onClick={onLogin}
                            >
                                {loading ? "" : "Login"}
                            </button>
                            <ToastContainer />
                            <p className="text-center">
                                Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div> */}
            <form onSubmit={handleSubmit}>


                <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl my-16">
                    <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80")' }} />
                    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                        <div className="flex justify-center mx-auto">
                            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt />
                        </div>
                        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                            Welcome back!
                        </p>
                        <a href="#" className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <div className="px-4 py-2">
                                <svg className="w-6 h-6" viewBox="0 0 40 40">
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                </svg>
                            </div>
                            <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
                        </a>
                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />
                            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                                with email</a>
                            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4" />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="Email">Email Address</label>
                            <input id="email" value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Enter your Email" />
                            {errors.email && touched.email && <p className="error-message">{errors.email}</p>}
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Password</label>
                                <a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a>
                            </div>
                            <input className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type={passwordBtn ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter your Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            {errors.password && touched.password && <p className="error-message">{errors.password}</p>}
                        </div>
                        <div className="mt-6">
                            <button
                                className={loading ? `btn loader` : `btn button-submit w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50`}
                                disabled={Object.keys(errors).length > 0 || Object.values(values).some(value => !value)}
                                onClick={onLogin}
                            >
                                {loading ? "" : "Login"}
                            </button>
                            <ToastContainer />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                            <Link to="/signup" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>
                            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
                        </div>
                    </div>
                </div>

            </form>

        </>
    );
}

export default Login;
