import axios from 'axios';

const apiKey = 'AIzaSyAH2um5Dl3iVSCPj2u3F0igZwapRTMziK4';
export const getLocationName= async(lat,long)=>{
    try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`
        );
        if (response.data.status === 'OK') {
          // Extract the place name (formatted address) from the response
          const placeName = response.data.results[0].formatted_address;
          console.log("place name>>",placeName)
          return placeName;
        } else {
          // Handle error response
          console.error('Geocoding API error:', response.data.error_message);
          console.log("place name error>>",response.data.error_message)
          return null;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        return null;
      }
}