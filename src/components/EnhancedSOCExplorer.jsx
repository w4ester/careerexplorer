import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Book, ArrowRight, SunMedium, Wind, TreePine, ChevronRight, Briefcase, GraduationCap, LineChart } from 'lucide-react';
import CareerSimulator from './CareerSimulator';
import OccupationDetails from './OccupationDetails';
import CareerPathway from './CareerPathway';
import CertificationExplorer from './CertificationExplorer';
import { searchOccupations } from '../services/careerApi';

export const EnhancedSOCExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSOC, setSelectedSOC] = useState(null);
  const [occupations, setOccupations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);

  const [selectedCareer, setSelectedCareer] = useState(null);

  const featuredCareers = [
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

  const handleJobSelect = async (job) => {
    setLoading(true);
    try {
      const details = await fetchOccupationDetails(job.code);
      setSelectedJobDetails(details);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSkillLevelColor = (level) => {
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


  const handleFeaturedCareerClick = (career) => {
    setSelectedCareer(career);
    setOccupations(career.relatedJobs.map(job => ({
      code: job.code,
      title: job.title,
      description: `Part of ${career.title} career path`
    })));
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
                    className="border rounded p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedSOC(occupation)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{occupation.title}</h3>
                        <p className="text-sm text-gray-600">
                          SOC Code: {occupation.code}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Career Details with Tabs */}
        {selectedSOC && (
          <div className="space-y-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="details">Overview</TabsTrigger>
                <TabsTrigger value="pathway">Career Path</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
                <TabsTrigger value="simulator">Simulator</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <OccupationDetails socCode={selectedSOC.code} />
              </TabsContent>

              <TabsContent value="pathway">
                <CareerPathway careerPath={selectedSOC.careerPath} />
              </TabsContent>

              <TabsContent value="certifications">
                <CertificationExplorer certifications={selectedSOC.certifications} />
              </TabsContent>

              <TabsContent value="simulator">
                <CareerSimulator careerData={selectedSOC} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* Bottom Section - Featured Content */}
      {!selectedSOC && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Featured Green Careers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCareers.map((career, index) => {
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
                      onClick={() => handleFeaturedCareerClick(career)}
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
      
      {/* Job Listings */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedCareer && occupations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              {selectedCareer.title} Career Opportunities
            </h2>
            <div className="space-y-4">
              {occupations.map((job) => (
                <Card 
                  key={job.code} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedJobDetails?.title === job.title 
                      ? 'border-blue-500 shadow-md' 
                      : 'hover:border-gray-300 hover:shadow-sm'
                  }`}
                  onClick={() => handleJobSelect(job)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {job.title}
                      <ChevronRight className={`h-4 w-4 transition-transform ${
                        selectedJobDetails?.title === job.title ? 'rotate-90' : ''
                      }`} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">SOC Code: {job.code}</p>
                    <p className="text-sm text-gray-700">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Job Details Panel */}
        {selectedJobDetails && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-500" />
                  Career Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Skills Section */}
                <div>
                  <h3 className="font-semibold mb-3">Required Skills</h3>
                  <div className="space-y-2">
                    {selectedJobDetails.skills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{skill.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getSkillLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education Section */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Education Requirements
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm">Minimum: {selectedJobDetails.education.minimum}</p>
                    <p className="text-sm">Preferred: {selectedJobDetails.education.preferred}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSOCExplorer;