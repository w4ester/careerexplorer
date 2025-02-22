// API configuration
const API_CONFIG = {
  ONET: {
    BASE_URL: 'https://services.onetcenter.org/ws/online/occupations',
    API_KEY: process.env.ONET_API_KEY
  },
  BLS: {
    BASE_URL: 'https://api.bls.gov/publicAPI/v2',
    API_KEY: process.env.BLS_API_KEY
  },
  CAREER_ONESTOP: {
    BASE_URL: 'https://api.careeronestop.org/v1',
    API_KEY: process.env.CAREER_ONESTOP_API_KEY
  }
};

export const fetchONETData = async (socCode) => {
  try {
    const response = await fetch(`${API_CONFIG.ONET.BASE_URL}/${socCode}`, {
      headers: {
        Authorization: `Bearer ${API_CONFIG.ONET.API_KEY}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching ONET data:', error);
    return null;
  }
};

export const fetchBLSData = async (socCode) => {
  try {
    const response = await fetch(`${API_CONFIG.BLS.BASE_URL}/timeseries/data/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Registration-Key': API_CONFIG.BLS_API_KEY
      },
      body: JSON.stringify({
        seriesid: [`OEUS${socCode}000000000000003`],
        startyear: '2020',
        endyear: '2024'
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching BLS data:', error);
    return null;
  }
};

export const fetchCareerOneStopData = async (socCode) => {
  try {
    const response = await fetch(`${API_CONFIG.CAREER_ONESTOP.BASE_URL}/occupation/${socCode}`, {
      headers: {
        Authorization: `Bearer ${API_CONFIG.CAREER_ONESTOP.API_KEY}`
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching CareerOneStop data:', error);
    return null;
  }
};