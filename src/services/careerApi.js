// DataUSA API service
const DATA_USA_BASE_URL = 'https://datausa.io/api';

export const searchOccupations = async (query) => {
  try {
    const response = await fetch(`${DATA_USA_BASE_URL}/data?soc=occupations&measure=Total%20Population,Average%20Wage&year=latest`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return filterOccupations(data.data, query);
  } catch (error) {
    console.error('Error fetching occupations:', error);
    throw error;
  }
};

export const fetchOccupationDetails = async (socCode) => {
  try {
    const response = await fetch(`${DATA_USA_BASE_URL}/data?soc=${socCode}&measure=Total%20Population,Average%20Wage,Average%20Age&year=latest`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return processOccupationData(data.data[0]);
  } catch (error) {
    console.error('Error fetching occupation details:', error);
    throw error;
  }
};

// Helper function to filter occupations based on search query
const filterOccupations = (data, query) => {
  if (!query) return data;
  const lowerQuery = query.toLowerCase();
  return data.filter(occ => 
    occ.occupation_title?.toLowerCase().includes(lowerQuery) ||
    occ.occupation_description?.toLowerCase().includes(lowerQuery)
  );
};

// Helper function to process occupation data
const processOccupationData = (rawData) => {
  return {
    title: rawData.occupation_title,
    description: rawData.occupation_description || 'Description not available',
    averageWage: rawData['Average Wage'],
    totalEmployed: rawData['Total Population'],
    skills: getDefaultSkills(rawData.occupation_title),
    education: getDefaultEducation(),
    outlook: getDefaultOutlook()
  };
};

// Helper function to provide default skills based on occupation
const getDefaultSkills = (occupationTitle) => {
  // We'll provide some generic skills that are relevant to most green jobs
  return [
    {
      name: 'Problem Solving',
      level: 'Advanced',
      description: 'Identifying complex problems and reviewing related information to develop and evaluate options.'
    },
    {
      name: 'Technical Knowledge',
      level: 'Intermediate',
      description: 'Understanding and applying technical principles and methods.'
    },
    {
      name: 'Environmental Awareness',
      level: 'Advanced',
      description: 'Understanding environmental regulations and sustainability practices.'
    },
    {
      name: 'Communication',
      level: 'Intermediate',
      description: 'Effectively conveying information and ideas in written and verbal form.'
    },
    {
      name: 'Project Management',
      level: 'Intermediate',
      description: 'Planning, organizing, and overseeing projects to achieve specific goals.'
    }
  ];
};

// Helper function to provide default education requirements
const getDefaultEducation = () => {
  return {
    minimum: "Bachelor's Degree",
    preferred: "Master's Degree",
    alternatives: [
      {
        name: 'Technical Certification',
        duration: '6-12 months',
        type: 'Certification'
      },
      {
        name: 'Associate Degree',
        duration: '2 years',
        type: 'Degree'
      }
    ]
  };
};

// Helper function to provide default job outlook
const getDefaultOutlook = () => {
  return {
    growth: '8%',
    outlook: 'Growing faster than average',
    period: '2023-2033',
    opportunities: [
      'Increasing focus on sustainability',
      'Government environmental regulations',
      'Growing demand for renewable energy',
      'Corporate environmental responsibility'
    ]
  };
};