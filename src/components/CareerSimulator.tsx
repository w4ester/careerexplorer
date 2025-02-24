import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { OccupationData } from '../services/careerApi';

interface CareerSimulatorProps {
  careerData: OccupationData;
}

interface CareerPathPoint {
  year: number;
  salary: number;
  role: string;
}

const CareerSimulator: React.FC<CareerSimulatorProps> = ({ careerData }) => {
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(5);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const generateCareerPath = (baseData: OccupationData, years: number): CareerPathPoint[] => {
    const growthRate = 0.05; // 5% annual growth
    const promotionYears = [2, 4, 6, 8]; // Years when promotions typically occur
    const roles = [
      'Entry Level',
      'Senior Level',
      'Lead/Supervisor',
      'Manager',
      'Director'
    ];

    return Array.from({ length: years + 1 }, (_, index) => {
      const year = index;
      const promotionIndex = promotionYears.filter(y => y <= year).length;
      const role = roles[Math.min(promotionIndex, roles.length - 1)];
      
      // Calculate salary with compound growth and promotion bumps
      const promotionMultiplier = 1 + (promotionIndex * 0.15); // 15% increase per promotion
      const baseGrowth = Math.pow(1 + growthRate, year);
      const salary = baseData.meanWage * baseGrowth * promotionMultiplier;

      return {
        year,
        salary: Math.round(salary),
        role
      };
    });
  };

  const careerPath = generateCareerPath(careerData, yearsOfExperience);

  return (
    <div className="space-y-6" onClick={() => setShowAlert(true)}>
      {showAlert && (
        <Alert className="mb-4">
          <h4 className="font-medium">Under Construction</h4>
          <p>This feature is currently being developed.</p>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Career Growth Simulation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={careerPath}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  label={{ value: 'Years of Experience', position: 'bottom' }}
                />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  label={{ value: 'Annual Salary', angle: -90, position: 'left' }}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Salary']}
                  labelFormatter={(year) => `Year ${year}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="salary"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                  name="Projected Salary"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Career Progression</h4>
            <div className="space-y-2">
              {careerPath.map((point, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div>
                    <span className="font-medium">Year {point.year}</span>
                    <span className="text-gray-600 ml-2">({point.role})</span>
                  </div>
                  <span className="text-blue-600 font-medium">
                    ${point.salary.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerSimulator;