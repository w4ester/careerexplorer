import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Book, ArrowRight, GraduationCap } from 'lucide-react';
import CareerSimulator from './CareerSimulator';
import OccupationDetails from './OccupationDetails';
import { searchOccupations } from '../services/onetApi';

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
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="simulator">Career Simulator</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <OccupationDetails socCode={selectedSOC.code} />
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
                          <h4 className="text-sm font-medium">Key Benefits:</h4>
                          <ul className="mt-1 text-sm text-gray-600">
                            <li>• Comprehensive theoretical knowledge</li>
                            <li>• Research opportunities</li>
                            <li>• Network building</li>
                          </ul>
                        </div>
                      </div>
                      <div className="border rounded p-4">
                        <h3 className="font-semibold">Accelerated Path</h3>
                        <p className="text-sm text-gray-600">
                          Fast-track certification program
                        </p>
                        <div className="mt-2">
                          <h4 className="text-sm font-medium">Key Benefits:</h4>
                          <ul className="mt-1 text-sm text-gray-600">
                            <li>• Faster entry into workforce</li>
                            <li>• Lower initial cost</li>
                            <li>• Focused practical skills</li>
                          </ul>
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