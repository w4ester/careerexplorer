import careerData from '../data/career_data.json';
console.log('Loaded career data:', careerData);

export interface Skill {
  name: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  description: string;
}

export interface Education {
  minimum: string;
  preferred: string;
  alternatives: Array<{
    name: string;
    duration: string;
    type: 'Certification' | 'Degree';
  }>;
}

export interface JobOutlook {
  growth: string;
  outlook: string;
  period: string;
  opportunities: string[];
}

export interface OccupationData {
  title: string;
  code: string;
  description: string;
  meanWage: number;
  employment: number;
  skills: Skill[];
  education: Education;
  outlook: JobOutlook;
  topStates?: Array<{
    name: string;
    employment: number;
  }>;
}

/**
 * Search for occupations based on query string
 * @param query - Search query string
 * @returns Promise with filtered occupation data
 */
export const searchOccupations = async (query: string): Promise<OccupationData[]> => {
  try {
    console.log('Searching occupations with query:', query);
    
    // Use the JSON data directly
    const careers = careerData.careers.map(career => ({
      ...career,
      // Transform the data to match our OccupationData interface
      description: getDefaultDescription(career.title),
      skills: getDefaultSkills(career.title),
      education: getDefaultEducation(),
      outlook: getDefaultOutlook()
    }));

    console.log('Available careers:', careers);
    
    const lowerQuery = query.toLowerCase();
    const filtered = careers.filter(career => 
      career.title.toLowerCase().includes(lowerQuery) ||
      career.code.toLowerCase().includes(lowerQuery)
    );

    console.log('Filtered careers:', filtered);
    return filtered;
  } catch (error) {
    console.error('Error searching occupations:', error);
    throw error;
  }
};

/**
 * Fetch detailed occupation information
 * @param socCode - SOC occupation code
 * @returns Promise with processed occupation data
 */
export const fetchOccupationDetails = async (socCode: string): Promise<OccupationData> => {
  try {
    console.log('Fetching details for SOC code:', socCode);
    console.log('Available careers:', careerData.careers);
    
    // Find the career in our JSON data
    const career = careerData.careers.find(c => c.code === socCode);
    console.log('Raw career data:', career);
    console.log('Found career data:', career);
    
    if (!career) {
      throw new Error('No data available for this occupation');
    }

    // Transform the data to match our OccupationData interface
    const details: OccupationData = {
      title: career.title,
      code: career.code,
      description: getDefaultDescription(career.title),
      meanWage: career.meanWage,
      employment: career.employment,
      skills: getDefaultSkills(career.title),
      education: getDefaultEducation(),
      outlook: getDefaultOutlook(),
      topStates: career.topStates.map(state => ({
        name: state.name,
        employment: state.employment
      }))
    };

    console.log('Transformed career details:', details);
    return details;
  } catch (error) {
    console.error('Error fetching occupation details:', error);
    throw error;
  }
};

/**
 * Get default description for an occupation
 * @param title - Occupation title
 * @returns Default description
 */
const getDefaultDescription = (title: string): string => {
  const descriptions: Record<string, string> = {
    'Solar Installation Technician': 
      'Install, maintain, and repair solar energy systems on roofs or other structures in compliance with site assessment and schematics. May include measuring, cutting, assembling, and bolting structural framing and solar modules. May perform minor electrical work such as current checks.',
    'Solar Energy Systems Engineer':
      'Design and develop solar energy systems and components, including solar panels, solar thermal systems, and integrated solar solutions. Evaluate project requirements, conduct site assessments, and ensure optimal system performance.',
    'Solar Project Manager':
      'Plan, coordinate, and supervise solar installation projects from inception to completion. Manage project timelines, budgets, and resources while ensuring compliance with safety regulations and quality standards.',
    'Wind Turbine Technician':
      'Install, maintain, and repair wind turbines. Inspect turbine components, troubleshoot mechanical and electrical issues, and collect turbine data for testing and analysis. Perform regular maintenance to ensure optimal turbine performance.',
    'Urban Forester':
      'Plan, establish, and maintain urban forests and tree populations. Develop and implement urban forestry programs, conduct tree inventories, and manage tree health care. Work to enhance urban environmental quality and promote sustainable urban forestry practices.'
  };
  
  return descriptions[title] || 'Description not available';
};

/**
 * Get default skills for an occupation
 * @param title - Occupation title
 * @returns Array of skills
 */
const getDefaultSkills = (title: string): Skill[] => {
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

/**
 * Get default education requirements
 * @returns Education requirements
 */
const getDefaultEducation = (): Education => {
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

/**
 * Get default job outlook information
 * @returns Job outlook information
 */
const getDefaultOutlook = (): JobOutlook => {
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