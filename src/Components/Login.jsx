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
            console.log(values)
        }
    })
    useEffect(()=>{
        console.log(values)
    },[values,errors])
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
        <div className='container1 container'>
            <div className="signup-container" style={{boxShadow: "5px 5px 5px 0px rgba(0,5,228,0.1)"}}>
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
        </div>
    );
}

export default Login;
