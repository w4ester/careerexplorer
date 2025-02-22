import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, ArrowRight, TrendingUp, Users } from 'lucide-react';

export const ClimateActionAnalyzer = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const initiatives = [
    {
      id: 1,
      name: 'Renewable Energy Transition',
      description: 'Transitioning to 100% renewable energy by 2045',
      jobs: [
        {
          title: 'Solar Installation Technician',
          socCode: '47-2231',
          demand: 'High',
          skills: ['Solar PV Installation', 'Electrical Systems', 'Safety Protocols']
        },
        {
          title: 'Wind Turbine Technician',
          socCode: '49-9081',
          demand: 'High',
          skills: ['Mechanical Systems', 'Troubleshooting', 'Height Work']
        }
      ]
    },
    {
      id: 2,
      name: 'Urban Forestry Expansion',
      description: 'Increasing urban tree canopy by 25% by 2030',
      jobs: [
        {
          title: 'Urban Forester',
          socCode: '19-1032',
          demand: 'Medium',
          skills: ['Tree Assessment', 'GIS Mapping', 'Project Management']
        }
      ]
    },
    {
      id: 3,
      name: 'Zero Waste Program',
      description: 'Achieving 90% waste diversion by 2040',
      jobs: [
        {
          title: 'Recycling Coordinator',
          socCode: '11-9199',
          demand: 'Medium',
          skills: ['Waste Management', 'Program Development', 'Public Education']
        },
        {
          title: 'Sustainability Analyst',
          socCode: '13-1199',
          demand: 'High',
          skills: ['Data Analysis', 'Environmental Regulations', 'Reporting']
        }
      ]
    }
  ];

  const analyzeInitiative = (initiative) => {
    setSelectedPlan(initiative);
    setAnalysis({
      totalJobs: initiative.jobs.length,
      skillsNeeded: Array.from(
        new Set(initiative.jobs.flatMap(job => job.skills))
      ),
      demandLevel: initiative.jobs.reduce((acc, job) => {
        acc[job.demand] = (acc[job.demand] || 0) + 1;
        return acc;
      }, {})
    });
  };

  const handleJobClick = (job) => {
    // Implement further interactive actions here.
    console.log(`Job selected: ${job.title} (SOC: ${job.socCode})`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Initiative Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Climate Initiatives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {initiatives.map((initiative) => (
                <div
                  key={initiative.id}
                  className="border rounded p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => analyzeInitiative(initiative)}
                >
                  <h3 className="font-semibold">{initiative.name}</h3>
                  <p className="text-sm text-gray-600">{initiative.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analysis Summary & Job Opportunities */}
        {selectedPlan && analysis && (
          <div className="space-y-4">
            {/* Analysis Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Initiative Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded">
                    <Users className="h-5 w-5 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{analysis.totalJobs}</div>
                    <div className="text-sm text-gray-600">Jobs</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded">
                    <TrendingUp className="h-5 w-5 mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {analysis.demandLevel.High || 0}
                    </div>
                    <div className="text-sm text-gray-600">High Demand</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded">
                    <Briefcase className="h-5 w-5 mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {analysis.skillsNeeded.length}
                    </div>
                    <div className="text-sm text-gray-600">Unique Skills</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Job Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedPlan.jobs.map((job, index) => (
                    <div 
                      key={index} 
                      className="border rounded p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleJobClick(job)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{job.title}</h3>
                        <span className={`text-sm px-2 py-1 rounded ${
                          job.demand === 'High' ? 'bg-green-100 text-green-800' :
                          job.demand === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {job.demand} Demand
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">SOC Code: {job.socCode}</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Required Skills:</p>
                        <ul className="text-sm mt-1 space-y-1">
                          {job.skills.map((skill, skillIndex) => (
                            <li key={skillIndex} className="flex items-center gap-2">
                              <ArrowRight className="h-4 w-4" />
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </div>
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

export default ClimateActionAnalyzer;