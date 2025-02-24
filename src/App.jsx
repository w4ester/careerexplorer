import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Briefcase, GraduationCap, ExternalLink } from 'lucide-react';
import { ClimateActionAnalyzer } from './components/ClimateActionAnalyzer';
import { EnhancedSOCExplorer } from './components/EnhancedSOCExplorer';

const App = () => {
  const [selectedSOC, setSelectedSOC] = useState(null);
  const [activeTab, setActiveTab] = useState('climate');

  // Handler for when a job is selected from climate initiatives
  const handleJobSelect = (socCode) => {
    setSelectedSOC(socCode);
    setActiveTab('careers'); // Switch to careers tab when job is selected
  };

  const resources = {
    climatePlans: [
      {
        title: "State Climate Action Plans",
        url: "https://www.c2es.org/content/state-climate-action-plans/"
      },
      {
        title: "EPA Climate Change Programs",
        url: "https://www.epa.gov/climate-change"
      },
      {
        title: "Conservation International Programs",
        url: "https://www.conservation.org/programs"
      }
    ],
    careerResources: [
      {
        title: "Environmental Career Opportunities",
        url: "https://www.ecojobs.com/"
      },
      {
        title: "Green Jobs Network",
        url: "https://www.greenjobs.net/"
      },
      {
        title: "Environmental Career Center",
        url: "https://environmentalcareer.com/"
      }
    ],
    education: [
      {
        title: "Environmental Certifications Guide",
        url: "https://www.environmentalscience.org/careers/certifications"
      },
      {
        title: "Green Training Programs",
        url: "https://www.sustainable.org/education"
      },
      {
        title: "Environmental Education Resources",
        url: "https://www.epa.gov/education"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Environmental Careers Explorer
          </h1>
          <p className="mt-2 text-gray-600">
            Connect Environmental Literacy with Green Career Opportunities
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Alert className="mb-8">
          <AlertTitle>Getting Started</AlertTitle>
          <AlertDescription>
            Explore climate action initiatives, discover related career opportunities, 
            and simulate different career paths to understand potential returns on investment.
            Use the tabs below to navigate between different sections.
          </AlertDescription>
        </Alert>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="climate" className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Climate Initiatives
            </TabsTrigger>
            <TabsTrigger value="careers" className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Career Explorer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="climate" className="space-y-6">
            <ClimateActionAnalyzer onJobSelect={handleJobSelect} />
          </TabsContent>

          <TabsContent value="careers" className="space-y-6">
            <EnhancedSOCExplorer 
              initialSOC={selectedSOC}
              onSOCChange={setSelectedSOC}
            />
          </TabsContent>
        </Tabs>

        {/* Resource Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Climate Action Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {resources.climatePlans.map((resource, index) => (
                    <li key={index} className="text-sm">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                        {resource.title} <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Career Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {resources.careerResources.map((resource, index) => (
                    <li key={index} className="text-sm">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                        {resource.title} <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education & Training
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {resources.education.map((resource, index) => (
                    <li key={index} className="text-sm">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                        {resource.title} <ExternalLink className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            Environmental Careers Explorer - Connecting Education with Green Career Opportunities
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;