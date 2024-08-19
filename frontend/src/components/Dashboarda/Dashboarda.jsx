import React, { useState, useEffect } from 'react';
import axios from 'axios';
import polygon from "../../assets/admin.png";

const Dashboarda = ({ userId, HandlePopup12, HandlePopup18,HandlePopup19,setUserName2, setUserName1, handleLogout }) => {
    const [userData, setUserData] = useState(null);
    const [CheckUserData, setCheckUserData] = useState([]);
    const [CheckSellerData, setCheckSellerData] = useState([]);
    const [CheckRemovedData, setCheckRemovedData] = useState([]);
    const [ScreenData, setScreenData] = useState([]);
    const [error, setError] = useState(null);

    const bgStyle = {
        backgroundImage: `url(${polygon})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "30%",
        width: "100%",
        height: "20%",
        position: "relative",
    };
    const HandleRemove=(username)=>{
        setUserName1(username);
        HandlePopup18();        
    };
    const HandleRemove1=(username)=>{
        setUserName2(username);
        HandlePopup19();
    };
    const HandleSData = (name) => {
        console.log("Name:", name);
      
        // Wrap the name in an object
        axios.post('http://localhost:3002/api/sdata', { name })
          .then(response => {
            console.log(response.data.message);
            alert("Approved seller successfully");
          })
          .catch(error => {
            console.error('There was an error!', error);
            alert(`An error occurred during approving seller: ${error.message}`);
          });
      };
      
    const HandleRemoved = () => {
        axios.get(`http://localhost:3002/api/handleremove`)
            .then(response => {
                setCheckRemovedData(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('There was an error fetching removed user data!', error);
                setError('Unable to fetch removed user data.');
            });
    }
    const HandleCheckUsers = () => {
        axios.get(`http://localhost:3002/api/checkuser`)
            .then(response => {
                setCheckUserData(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('There was an error fetching the user data!', error);
                setError('Unable to fetch user data.');
            });
    }
    const HandleCheckSellers = () => {
        axios.get(`http://localhost:3002/api/checkSeller`)
            .then(response => {
                setCheckSellerData(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('There was an error fetching the seller data!', error);
                setError('Unable to fetch seller data.');
            });
    } 
    const HandleScreening = () => {
        axios.get(`http://localhost:3002/api/userscreening`)
            .then(response => {
                setScreenData(response.data);
                setError(null);
            })
            .catch(error => {
                console.error('There was an error fetching data!', error);
                setError('Unable to fetch seller data.');
            });
    }
    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3002/api/user/${userId}`)
                .then(response => {
                    setUserData(response.data);
                    setError(null);
                })
                .catch(error => {
                    console.error('There was an error fetching the user data!', error);
                    setError('Unable to fetch user data.');
                });
        }
    }, [userId]);

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!userData) return <div className="text-center">Loading...</div>;

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-2">
            <div className="w-full bg-white shadow-lg rounded-lg p-8 mx-4 mb-4">
                <h1 className="text-3xl font-bold text-primary mb-4 text-center hover:text-secondary">
                    Welcome Admin, {userData.username}
                </h1>
                <p className="text-lg text-gray-700 text-center">Email: {userData.email}</p>
            </div>

            <div>
                <p data-aos="fade-up" data-aos-delay="300" className="pt-5 mx-4 text-lg font-bold text-dark">Admin's Power!</p>
            </div>

            <div data-aos="fade-down" style={bgStyle} className="w-full bg-white shadow-lg rounded-lg p-10 mx-4 h-100 overflow-y-auto">
                <p className="mb-4">1. User & tiffin service seller has to login first to offer & use service.</p>
                <p className="mb-4">2. Keep track on the bugs and issue faced.</p>
                <p className="mb-4">3. Remove user or service seller from platform.</p>
                <p className="mb-4">4. New subscription plan must be approved by the board of directors.</p>
                <p className="mb-4">5. Removal of user or service without any proof of malpractice is prohibited.</p>
            </div>

            <div data-aos="fade-down" data-aos-delay="300" className="pt-3 w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 mx-4 flex justify-around space-x-4">
                <button onClick={HandleCheckUsers} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Check Users</button>
                <button onClick={HandleCheckSellers} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Check Sellers</button>
                <button onClick={HandleRemoved} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Removed Users/sellers</button>
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Add New Plans</button>
                <button className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Profit</button>
                <button onClick={HandleScreening} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Screening Proposals</button>
                <button onClick={HandlePopup12} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Add Blogs</button>
                <button onClick={handleLogout} className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:scale-105 duration-300 w-1/6">Logout</button>
            </div>

            {/* Check User Section */}
            <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
                <h2 className="text-2xl font-bold text-primary text-center mb-4">Your Users Data</h2>
                {CheckUserData && CheckUserData.length > 0 ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="py-2">UserID</th>
                                <th className="py-2">Email Id</th>
                                <th className="py-2">Username</th>
                                <th className="py-2">UserType</th>
                                <th className="py-2">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CheckUserData.map((user, index) => (
                                <tr key={index}>
                                    <td className="border-b py-2">{user.id}</td>
                                    <td className="border-b py-2">{user.email}</td>
                                    <td className="border-b py-2">{user.username}</td>
                                    <td className="border-b py-2">{user.userType}</td>
                                    <td className="border-b py-2">
                                        <button onClick={()=>HandleRemove(user.username)} className='bg-red-600 text-white rounded w-1/2'>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-lg text-center text-gray-700">No users available</p>
                )}
            </div>
            {/* Check Seller Section */}
            <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
                <h2 className="text-2xl font-bold text-primary text-center mb-4">Your Sellers Data</h2>
                {CheckSellerData && CheckSellerData.length > 0 ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="py-2">UserID</th>
                                <th className="py-2">Email Id</th>
                                <th className="py-2">Username</th>
                                <th className="py-2">UserType</th>
                                <th className="py-2">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CheckSellerData.map((user, index) => (
                                <tr key={index}>
                                    <td className="border-b py-2">{user.id}</td>
                                    <td className="border-b py-2">{user.email}</td>
                                    <td className="border-b py-2">{user.username}</td>
                                    <td className="border-b py-2">{user.userType}</td>
                                    <td className="border-b py-2">
                                        <button onClick={()=>HandleRemove1(user.username)} className='bg-red-600 text-white rounded w-1/2'>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-lg text-center text-gray-700">No Sellers available</p>
                )}
            </div>
            {/* Removed user Section */}
            <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
                <h2 className="text-2xl font-bold text-primary text-center mb-4">Removed User Data</h2>
                {CheckRemovedData && CheckRemovedData.length > 0 ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="py-2">Username</th>
                                <th className="py-2">Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CheckRemovedData.map((user, index) => (
                                <tr key={index}>
                                    <td className="border-b py-2">{user.username}</td>
                                    <td className="border-b py-2">{user.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-lg text-center text-gray-700">No Users available</p>
                )}
            </div>
            {/*Screening data Section */}
            <div className="w-full bg-white shadow-lg rounded-lg p-4 mx-4 mt-4">
                <h2 className="text-2xl font-bold text-primary text-center mb-4">Screening Proposal From Sellers</h2>
                {ScreenData && ScreenData.length > 0 ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="py-2">Id</th>
                                <th className="py-2">Username</th>
                                <th className="py-2">UserType</th>
                                <th className="py-2">Nationality</th>
                                <th className="py-2">Udai No</th>
                                <th className="py-2">Description</th>
                                <th className="py-2">Approval</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ScreenData.map((user, index) => (
                                <tr key={index}>
                                    <td className="border-b py-2">{user.id}</td>
                                    <td className="border-b py-2">{user.name}</td>
                                    <td className="border-b py-2">{user.userType}</td>
                                    <td className="border-b py-2">{user.nationality}</td>
                                    <td className="border-b py-2">{user.cardno}</td>
                                    <td className="border-b py-2">{user.description}</td>
                                    <td className="border-b py-2">
                                        <button onClick={()=>{HandleSData(user.name)}} className='bg-red-600 text-white rounded w-1/2'>
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-lg text-center text-gray-700">No Users available</p>
                )}
            </div>
        </div>
    );
};

export default Dashboarda;
