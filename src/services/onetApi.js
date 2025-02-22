// O*NET API service
const ONET_BASE_URL = 'https://services.onetcenter.org/ws/';
const ONET_VERSION = 'v1/';

// Function to construct the Authorization header
const getAuthHeader = () => {
  // You'll need to register for an API key at https://services.onetcenter.org/
  const apiKey = process.env.VITE_ONET_API_KEY;
  return `Basic ${btoa(apiKey + ':')}`; // Base64 encode the API key
};

// Fetch occupation details by SOC code
export const fetchOccupationDetails = async (socCode) => {
  try {
    const response = await fetch(`${ONET_BASE_URL}${ONET_VERSION}online/occupations/${socCode}`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching occupation details:', error);
    throw error;
  }
};

// Fetch occupation skills
export const fetchOccupationSkills = async (socCode) => {
  try {
    const response = await fetch(`${ONET_BASE_URL}${ONET_VERSION}online/occupations/${socCode}/skills`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching occupation skills:', error);
    throw error;
  }
};

// Fetch occupation technology skills
export const fetchOccupationTechnology = async (socCode) => {
  try {
    const response = await fetch(`${ONET_BASE_URL}${ONET_VERSION}online/occupations/${socCode}/technology`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching occupation technology:', error);
    throw error;
  }
};

// Fetch occupation credentials
export const fetchOccupationCredentials = async (socCode) => {
  try {
    const response = await fetch(`${ONET_BASE_URL}${ONET_VERSION}online/occupations/${socCode}/credentials`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching occupation credentials:', error);
    throw error;
  }
};

// Search occupations by keyword
export const searchOccupations = async (keyword) => {
  try {
    const response = await fetch(`${ONET_BASE_URL}${ONET_VERSION}online/search?keyword=${encodeURIComponent(keyword)}`, {
      headers: {
        'Authorization': getAuthHeader(),
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching occupations:', error);
    throw error;
  }
};