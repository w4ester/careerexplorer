import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Book, ArrowRight } from 'lucide-react';
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

  // Debounced search effect
  useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        setLoading(true);
        try {
          const results = await searchOccupations(searchQuery);
          setOccupations(results);
        } catch (error) {
          console.error('Error searching occupations:', error);
        } finally {
          setLoading(false);
        }
      }
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchQuery]);

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
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Solar Energy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Explore careers in solar installation, design, and project management.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Wind Power</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Discover opportunities in wind turbine technology and maintenance.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Urban Forestry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Learn about careers in urban forest management and conservation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSOCExplorer;