import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Briefcase, Award, TrendingUp, GraduationCap } from 'lucide-react';

const OccupationDetails = ({ details, loading, error }) => {

  if (loading) {
    return <div className="animate-pulse">Loading occupation details...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-gray-600">{details?.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium">Average Salary</h4>
                <p className="text-lg font-semibold">
                  ${details?.meanWage?.toLocaleString() || 'N/A'}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Total Employed</h4>
                <p className="text-lg font-semibold">
                  {details?.employment?.toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Required Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {details?.skills.map((skill, index) => (
              <div key={index} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </div>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {skill.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Minimum Required</h3>
              <p className="text-lg font-semibold">{details?.education.minimum}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Alternative Paths</h3>
              <div className="mt-2 space-y-2">
                {details?.education.alternatives.map((alt, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded">
                    <p className="font-medium">{alt.name}</p>
                    <p className="text-sm text-gray-600">Duration: {alt.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Job Outlook
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium">Growth Rate</h4>
                <p className="text-lg font-semibold">{details?.outlook.growth}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Period</h4>
                <p className="text-lg font-semibold">{details?.outlook.period}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium">Growth Factors</h4>
              <ul className="mt-2 space-y-1">
                {details?.outlook.opportunities.map((opp, index) => (
                  <li key={index} className="text-sm text-gray-600">• {opp}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OccupationDetails;