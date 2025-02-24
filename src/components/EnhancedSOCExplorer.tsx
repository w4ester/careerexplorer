import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Book, ArrowRight, SunMedium, Wind, TreePine, ChevronRight, Briefcase, GraduationCap, LineChart, MapPin, DollarSign } from 'lucide-react';
import CareerSimulator from './CareerSimulator';
import OccupationDetails from './OccupationDetails';
import CareerPathway from './CareerPathway';
import CertificationExplorer from './CertificationExplorer';
import { searchOccupations, fetchOccupationDetails } from '../services/careerApi';
import type { OccupationData } from '../services/careerApi';

interface FeaturedCareer {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  searchTerms: string;
  relatedJobs: Array<{
    code: string;
    title: string;
  }>;
}

export const EnhancedSOCExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSOC, setSelectedSOC] = useState<string | null>(null);
  const [occupations, setOccupations] = useState<OccupationData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedJobDetails, setSelectedJobDetails] = useState<OccupationData | null>(null);
  const [selectedCareer, setSelectedCareer] = useState<FeaturedCareer | null>(null);

  const featuredCareers: FeaturedCareer[] = [
    {
      id: 'solar',
      title: 'Solar Energy',
      icon: SunMedium,
      description: 'Explore careers in solar installation, design, and project management.',
      searchTerms: 'solar photovoltaic renewable energy',
      relatedJobs: [
        { code: '47-2231', title: 'Solar Installation Technician' },
        { code: '17-2199', title: 'Solar Energy Systems Engineer' },
        { code: '47-1011', title: 'Solar Project Manager' }
      ]
    },
    {
      id: 'wind',
      title: 'Wind Power',
      icon: Wind,
      description: 'Discover opportunities in wind turbine technology and maintenance.',
      searchTerms: 'wind turbine renewable energy',
      relatedJobs: [
        { code: '49-9081', title: 'Wind Turbine Service Technician' },
        { code: '17-2199', title: 'Wind Energy Engineer' },
        { code: '49-1011', title: 'Wind Farm Operations Manager' }
      ]
    },
    {
      id: 'forestry',
      title: 'Urban Forestry',
      icon: TreePine,
      description: 'Learn about careers in urban forest management and conservation.',
      searchTerms: 'urban forestry conservation arborist',
      relatedJobs: [
        { code: '19-1032', title: 'Urban Forester' },
        { code: '37-3012', title: 'Arborist' },
        { code: '19-1031', title: 'Conservation Scientist' }
      ]
    }
  ];

  const handleJobSelect = async (job: { code: string; title: string }) => {
    setLoading(true);
    try {
      console.log('Fetching details for job:', job.code);
      const details = await fetchOccupationDetails(job.code);
      
      console.log('Received job details:', details);
      console.log('Job salary:', details.meanWage);
      setSelectedJobDetails(details);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSkillLevelColor = (level: string): string => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'basic':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleFeaturedCareerClick = async (career: FeaturedCareer) => {
    setSelectedCareer(career);
    setLoading(true);
    
    try {
      // Fetch details for each job
      const jobDetails = await Promise.all(
        career.relatedJobs.map(async (job) => {
          const details = await fetchOccupationDetails(job.code);
          return details;
        })
      );
      console.log('Fetched all job details:', jobDetails);
      setOccupations(jobDetails);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
    setLoading(false);
    setSelectedJobDetails(null);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search green careers, job titles, or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Occupation List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Green Careers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="animate-pulse">Searching...</div>
              ) : (
                occupations.map((occupation) => (
                  <div
                    key={occupation.code}
                    className={`border rounded p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                      selectedJobDetails?.title === occupation.title ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleJobSelect(occupation)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{occupation.title}</h3>
                        <p className="text-sm text-gray-600">SOC Code: {occupation.code}</p>
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-transform ${
                        selectedJobDetails?.title === occupation.title ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Details Panel */}
        {selectedJobDetails && (
          <OccupationDetails
            details={selectedJobDetails}
            loading={loading}
            error={null}
          />
        )}
      </div>

      {/* Featured Careers */}
      {!selectedSOC && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Featured Green Careers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCareers.map((career) => {
              const Icon = career.icon;
              return (
                <Card 
                  key={career.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-500 group"
                  onClick={() => handleFeaturedCareerClick(career)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon className="h-5 w-5 text-blue-500" />
                      {career.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {career.description}
                    </p>
                    <button 
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-200 ${
                        selectedCareer?.id === career.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium">
                        {selectedCareer?.id === career.id ? 'Viewing Jobs' : 'View Related Jobs'}
                      </span>
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSOCExplorer;