import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/constants';
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import UserContext from '../Context/UserContext';



function Home() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext);
    const [balance, setBalance] = useState(null);
    const [loan_amount, setLoan_amount] = useState(null);
    const [tenure, setTenure] = useState(null);
    const [referenceId, setReferenceId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/checkCreditorBalance`,referenceId);
            if(response){
                toast.success(`Successfully fetched balance : ${response.data.message} `, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setBalance(response.data.current_balance);
                setLoan_amount(response.data.loan_amount);
                setTenure(response.data.tenure);
                setReferenceId(null)
            }else if(response.data.status == "ERR_NETWORK"){
                toast.error(`Error Fetching balance:  ❌ ${response.data.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setReferenceId(null)
            }
        } catch (error) {
            console.error("Error fetching balance:", error);
            toast.error(`Error Fetching balance:  ❌ ${error.data.message}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setBalance(null);
            setReferenceId(null);
        }
    };

    // useEffect(() => {
    //     if (!localStorage.getItem('user')) {
    //       navigate('/login')
    //     }
    //   }, [])
    
    
    return (
        <>
            <div className="container text-5xl">
                <div className="flex">
                    <h1 className="text-5xl ubuntu-regular">Hello {user}</h1>
                    <picture>
                        <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b_1f3fb/512.webp" type="image/webp" />
                        <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b_1f3fb/512.gif" alt="👋" width="64" height="64" className="" />
                    </picture>
                </div>

                <p className="text-3xl ubuntu-regular">Please enter the reference ID to get the balance :</p>


                <div style={{ width: '500px' }} className=" my-4 ">
                    <div>
                        <div>
                            <input
                                type="text"
                                id="default-input"
                                value={referenceId}
                                onChange={(e) => setReferenceId(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <ToastContainer />
                <button
                    style={{ backgroundColor: "#5e4baf" }}
                    type="submit"
                    className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmit}
                >submit
                </button>
                

                {balance !== null && (
                    <div className="text-3xl my-4">
                        <p>Balance: {balance}</p>
                        <p>Tenure: {tenure}</p>
                        <p>loan_amount: {loan_amount}</p>
                    </div>
                )}

            </div>
        </>
    )
}

export default Home
