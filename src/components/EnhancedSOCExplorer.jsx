import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Book, ArrowRight, GraduationCap } from 'lucide-react';
import { fetchONETData, fetchBLSData, fetchCareerOneStopData } from '../services/careerApi';
import CareerSimulator from './CareerSimulator';

export const EnhancedSOCExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSOC, setSelectedSOC] = useState(null);
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCareerData = async (socCode) => {
      setLoading(true);
      try {
        const [onetData, blsData, careerOneStopData] = await Promise.all([
          fetchONETData(socCode),
          fetchBLSData(socCode),
          fetchCareerOneStopData(socCode)
        ]);

        setCareerData({
          ...onetData,
          marketData: blsData,
          opportunities: careerOneStopData
        });
      } catch (error) {
        console.error('Error fetching career data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedSOC) {
      fetchCareerData(selectedSOC.code);
    }
  }, [selectedSOC]);

  const socDatabase = [
    {
      code: '47-2231',
      title: 'Solar Photovoltaic Installers',
      description: 'Assemble, install, and maintain solar photovoltaic systems...',
      skills: [
        'Solar Panel Installation',
        'Electrical Systems',
        'Safety Protocols',
        'System Design',
        'Maintenance and Repair'
      ],
      education: {
        programs: [
          { cost: 60000, duration: 4 },
          { cost: 15000, duration: 1 }
        ]
      },
      marketData: {
        salary: {
          entry: 45000,
          median: 65000,
          experienced: 85000
        }
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search SOC codes, job titles, or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SOC Code List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              SOC Codes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socDatabase.map((soc) => (
                <div
                  key={soc.code}
                  className="border rounded p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedSOC(soc)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{soc.title}</h3>
                      <p className="text-sm text-gray-600">SOC Code: {soc.code}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {soc.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Details with Tabs */}
        {selectedSOC && (
          <div className="space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="simulator">Career Simulator</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedSOC.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <p>Loading career details...</p>
                    ) : (
                      <>
                        <p className="text-gray-600">{selectedSOC.description}</p>
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Required Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedSOC.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6">
                          <h4 className="font-medium mb-2">Salary Information</h4>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Entry Level</p>
                              <p className="font-medium">
                                ${selectedSOC.marketData.salary.entry.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Median</p>
                              <p className="font-medium">
                                ${selectedSOC.marketData.salary.median.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Experienced</p>
                              <p className="font-medium">
                                ${selectedSOC.marketData.salary.experienced.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle>Education Pathways</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded p-4">
                        <h3 className="font-semibold">Traditional Path</h3>
                        <p className="text-sm text-gray-600">
                          4-year degree program with comprehensive training
                        </p>
                        <div className="mt-2">
                          <p className="text-sm">
                            Cost: ${selectedSOC.education.programs[0].cost.toLocaleString()}
                          </p>
                          <p className="text-sm">
                            Duration: {selectedSOC.education.programs[0].duration} years
                          </p>
                        </div>
                      </div>
                      <div className="border rounded p-4">
                        <h3 className="font-semibold">Accelerated Path</h3>
                        <p className="text-sm text-gray-600">
                          Fast-track certification program
                        </p>
                        <div className="mt-2">
                          <p className="text-sm">
                            Cost: ${selectedSOC.education.programs[1].cost.toLocaleString()}
                          </p>
                          <p className="text-sm">
                            Duration: {selectedSOC.education.programs[1].duration} year
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="simulator">
                <CareerSimulator careerData={selectedSOC} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedSOCExplorer;