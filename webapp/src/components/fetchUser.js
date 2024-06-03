// getUserData.js
import axios from 'axios';

export const getUserData = async (userId) => {

  try {
    const response = await axios.get(`https://ip-194-99-21-21-101470.vps.hosted-by-mvps.net/server3/users/getUser/${userId}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; 
  }
};
