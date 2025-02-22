import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Book, ArrowRight, GraduationCap } from 'lucide-react';

export const SOCExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSOC, setSelectedSOC] = useState(null);

  const socDatabase = [
    {
      code: '47-2231',
      title: 'Solar Photovoltaic Installers',
      description: 'Assemble, install, and maintain solar photovoltaic systems on roofs or other structures in compliance with site assessment and schematics.',
      skills: [
        'Solar Panel Installation',
        'Electrical Systems',
        'Safety Protocols',
        'System Design',
        'Maintenance and Repair'
      ],
      education: [
        {
          level: 'Technical Certificate',
          duration: '6-12 months',
          topics: ['Solar Technology', 'Electrical Theory', 'Safety Standards']
        },
        {
          level: 'Associate Degree',
          duration: '2 years',
          topics: ['Renewable Energy Systems', 'Advanced Electronics', 'Project Management']
        }
      ],
      certifications: [
        'NABCEP PV Installation Professional',
        'OSHA Safety Certification',
        'State Electrical License'
      ],
      careerPath: [
        {
          level: 'Entry',
          title: 'Solar Installation Helper',
          experience: '0-2 years'
        },
        {
          level: 'Mid',
          title: 'Solar PV Installer',
          experience: '2-5 years'
        },
        {
          level: 'Senior',
          title: 'Lead Installer',
          experience: '5+ years'
        },
        {
          level: 'Advanced',
          title: 'Installation Manager',
          experience: '8+ years'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
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

        {/* SOC Details */}
        {selectedSOC && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{selectedSOC.title}</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>

            {/* Education & Career Path */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education & Career Path
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedSOC.careerPath.map((path, index) => (
                    <div
                      key={index}
                      className="border rounded p-4"
                    >
                      <h4 className="font-medium">{path.title}</h4>
                      <p className="text-sm text-gray-600">
                        {path.level} Level • {path.experience}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOCExplorer;