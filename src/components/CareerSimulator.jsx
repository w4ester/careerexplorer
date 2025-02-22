import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const defaultCareerData = {
  education: {
    programs: [
      { cost: 60000, duration: 4 }, // Traditional 4-year degree
      { cost: 15000, duration: 1 }  // Accelerated certification
    ]
  },
  marketData: {
    salary: {
      entry: 45000
    }
  }
};

const CareerSimulator = ({ careerData = defaultCareerData }) => {
  const [selectedPath, setSelectedPath] = useState('traditional');
  const [yearsSimulated] = useState(10);
  
  // Simulation parameters
  const parameters = {
    traditional: {
      educationCost: careerData.education.programs[0].cost,
      timeToComplete: careerData.education.programs[0].duration,
      startingSalary: careerData.marketData.salary.entry,
      growthRate: 0.05,
      loanInterest: 0.045
    },
    accelerated: {
      educationCost: careerData.education.programs[1].cost,
      timeToComplete: careerData.education.programs[1].duration,
      startingSalary: careerData.marketData.salary.entry * 0.9,
      growthRate: 0.06,
      loanInterest: 0.045
    }
  };

  const calculateProjections = (path) => {
    const params = parameters[path];
    const projections = [];
    
    let totalDebt = params.educationCost;
    let currentSalary = params.startingSalary;
    let netWorth = -totalDebt;
    
    for (let year = 0; year <= yearsSimulated; year++) {
      if (year < params.timeToComplete) {
        totalDebt *= (1 + params.loanInterest);
        projections.push({
          year,
          salary: 0,
          netWorth: -totalDebt,
          status: 'In Training'
        });
        continue;
      }
      
      currentSalary *= (1 + params.growthRate);
      const yearlyDebtPayment = totalDebt * 0.1;
      totalDebt -= yearlyDebtPayment;
      netWorth = netWorth + currentSalary * 0.7 - yearlyDebtPayment;
      
      projections.push({
        year,
        salary: Math.round(currentSalary),
        netWorth: Math.round(netWorth),
        status: 'Working'
      });
    }
    
    return projections;
  };

  const projections = calculateProjections(selectedPath);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Career Path Simulator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded ${
                selectedPath === 'traditional' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100'
              }`}
              onClick={() => setSelectedPath('traditional')}
            >
              Traditional Path
            </button>
            <button
              className={`px-4 py-2 rounded ${
                selectedPath === 'accelerated' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100'
              }`}
              onClick={() => setSelectedPath('accelerated')}
            >
              Accelerated Path
            </button>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={projections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year" 
                  label={{ value: 'Years', position: 'bottom' }} 
                />
                <YAxis 
                  yAxisId="left"
                  label={{ value: 'Salary ($)', angle: -90, position: 'left' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  label={{ value: 'Net Worth ($)', angle: 90, position: 'right' }}
                />
                <Tooltip 
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="salary" 
                  stroke="#2563eb" 
                  name="Annual Salary"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="netWorth" 
                  stroke="#059669" 
                  name="Net Worth"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Education Investment</h3>
              <p className="text-gray-600">
                Cost: ${parameters[selectedPath].educationCost.toLocaleString()}
              </p>
              <p className="text-gray-600">
                Duration: {parameters[selectedPath].timeToComplete} years
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Career Trajectory</h3>
              <p className="text-gray-600">
                Starting Salary: ${parameters[selectedPath].startingSalary.toLocaleString()}
              </p>
              <p className="text-gray-600">
                Annual Growth: {(parameters[selectedPath].growthRate * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerSimulator;