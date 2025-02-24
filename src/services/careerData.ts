import careerData from '../data/career_data.json';

export interface CareerStats {
  code: string;
  title: string;
  employment: number;
  meanWage: number;
  medianWage: number;
  topStates: Array<{
    name: string;
    employment: number;
    meanWage: number;
  }>;
}

export interface CareerDataResponse {
  lastUpdated: string;
  careers: CareerStats[];
}

/**
 * Get career statistics from cached BLS data
 * @param socCode - SOC occupation code
 * @returns Career statistics or null if not found
 */
export const getCareerStats = (socCode: string): CareerStats | null => {
  const data = careerData as CareerDataResponse;
  return data.careers.find(career => career.code === socCode) || null;
};

/**
 * Get all available career statistics
 * @returns Array of career statistics
 */
export const getAllCareerStats = (): CareerStats[] => {
  const data = careerData as CareerDataResponse;
  return data.careers;
};

/**
 * Get the last update time of the career data
 * @returns ISO date string of last update
 */
export const getLastUpdateTime = (): string => {
  const data = careerData as CareerDataResponse;
  return data.lastUpdated;
};