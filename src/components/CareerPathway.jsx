import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BriefcaseIcon, TrendingUpIcon } from 'lucide-react';

const CareerPathway = ({ careerPath }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const defaultPath = [
    {
      level: 'Entry',
      title: 'Entry Level Position',
      experience: '0-2 years',
      skills: ['Basic Technical Skills', 'Safety Awareness', 'Communication'],
      salary: '35,000 - 45,000'
    },
    {
      level: 'Mid',
      title: 'Mid-Level Specialist',
      experience: '2-5 years',
      skills: ['Advanced Technical Skills', 'Project Management', 'Team Leadership'],
      salary: '45,000 - 65,000'
    },
    {
      level: 'Senior',
      title: 'Senior Specialist',
      experience: '5-8 years',
      skills: ['Expert Technical Knowledge', 'Strategic Planning', 'Mentoring'],
      salary: '65,000 - 85,000'
    },
    {
      level: 'Advanced',
      title: 'Project Manager/Director',
      experience: '8+ years',
      skills: ['Program Management', 'Business Development', 'Strategic Leadership'],
      salary: '85,000+'
    }
  ];

  const pathData = careerPath || defaultPath;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Career Progression Path</h3>
        <div className="text-sm text-gray-600">Click levels for details</div>
      </div>

      {/* Career Path Timeline */}
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-8 w-1 bg-blue-200" />
        {pathData.map((level, index) => (
          <div
            key={level.level}
            className={`relative pl-20 pb-8 cursor-pointer group ${
              selectedLevel === index ? 'opacity-100' : 'opacity-70 hover:opacity-100'
            }`}
            onClick={() => setSelectedLevel(index)}
          >
            <div className="absolute left-6 w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow" />
            
            <Card className={`transition-all ${
              selectedLevel === index ? 'border-blue-500 shadow-lg' : 'hover:border-blue-300'
            }`}>
              <CardHeader className="py-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BriefcaseIcon className="h-5 w-5" />
                  {level.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{level.level} Level</span>
                    <span className="text-sm text-gray-600">{level.experience}</span>
                  </div>
                  
                  {selectedLevel === index && (
                    <div className="mt-4 space-y-4 animate-fadeIn">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {level.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Typical Salary Range</h4>
                        <div className="flex items-center gap-2">
                          <TrendingUpIcon className="h-4 w-4 text-green-500" />
                          <span className="text-sm">${level.salary}</span>
                        </div>
                      </div>

                      {index < pathData.length - 1 && (
                        <div className="pt-2">
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <ArrowRight className="h-4 w-4" />
                            <span>Next step: {pathData[index + 1].title}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerPathway;