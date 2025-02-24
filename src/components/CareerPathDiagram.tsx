import React, { useEffect } from 'react';
import mermaid from 'mermaid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
});

export const CareerPathDiagram: React.FC = () => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, []);

  const diagram = `
    graph TD
      Start[Entry Level] --> Solar[Solar Career Paths]
      Start --> Wind[Wind Career Paths]
      Start --> Urban[Urban Environmental Paths]
      
      %% Solar Career Paths
      Solar --> SolarTech[Solar Installation Technician]
      SolarTech --> SeniorTech[Senior Technician]
      SeniorTech --> TeamLead[Team Lead]
      TeamLead --> ProjectManager[Solar Project Manager]
      
      Solar --> SolarEng[Solar Energy Systems Engineer]
      SolarEng --> SeniorEng[Senior Engineer]
      SeniorEng --> LeadEng[Lead Engineer]
      LeadEng --> TechDirector[Technical Director]
      
      %% Wind Career Paths
      Wind --> WindTech[Wind Turbine Technician]
      WindTech --> SeniorWindTech[Senior Wind Technician]
      SeniorWindTech --> WindOps[Wind Farm Operations]
      WindOps --> WindManager[Wind Farm Manager]
      
      %% Urban Environmental Paths
      Urban --> Forester[Urban Forester]
      Forester --> SeniorForester[Senior Forester]
      SeniorForester --> Conservation[Conservation Manager]
      Conservation --> EnvDirector[Environmental Director]

      style Start fill:#e3f2fd
      style Solar fill:#fff8e1
      style Wind fill:#f1f8e9
      style Urban fill:#f3e5f5
  `;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Green Career Progression Paths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mermaid text-center overflow-x-auto">
            {diagram}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};