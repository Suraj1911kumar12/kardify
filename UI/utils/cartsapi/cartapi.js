import axios from '../../../axios';
import {UseAuth} from '../../context/AuthContext';

const fetchCartData = async () => {
  // Ensure that UseAuth is called within a React component or custom hook
  const auth = UseAuth();

  try {
    const response = await axios.get('/get-carts', {
      headers: {
        Authorization: auth.token, // Include 'Bearer ' prefix if needed
      },
    });

    // Check if the response contains the expected data
    if (response.data && response.data.data) {
      return response.data.data; // Return the cart data
    } else {
      console.error('Unexpected response structure:', response.data);
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    // Provide more detailed error information
    console.error('Failed to fetch cart data:', error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
};
