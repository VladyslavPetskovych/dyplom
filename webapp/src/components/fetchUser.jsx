import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchUser({ chatId }) { 
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (!chatId) return; 

            setLoading(true);
            try {
                const response = await axios.get(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/getUser/${chatId}`);
                setUserData(response.data.user); 
                
                setError('');
            } catch (err) {
                setError('Failed to fetch user data');
                console.error('Error fetching user data:', err);
            }
            setLoading(false);
        };

        fetchUserData();
    }, [chatId]); 
    console.log(userData)
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : userData ? (
                <div>
                    <p>{userData.name || 'anon'}:</p>
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
}

export default FetchUser;
