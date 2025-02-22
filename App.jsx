import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Briefcase, GraduationCap, Search, Book, ArrowRight } from 'lucide-react';
import { ClimateActionAnalyzer } from './ClimateActionAnalyzer';
import { SOCExplorer } from './SOCExplorer';

const App = () => {
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
            and learn about required skills and education pathways. Use the tabs below 
            to navigate between different sections.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="climate" className="space-y-8">
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
            <ClimateActionAnalyzer />
          </TabsContent>

          <TabsContent value="careers" className="space-y-6">
            <SOCExplorer />
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
                  <li className="text-sm">State and Local Climate Initiatives</li>
                  <li className="text-sm">Environmental Protection Goals</li>
                  <li className="text-sm">Conservation Programs</li>
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
                  <li className="text-sm">Job Search Platforms</li>
                  <li className="text-sm">Industry Associations</li>
                  <li className="text-sm">Professional Networks</li>
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
                  <li className="text-sm">Certification Programs</li>
                  <li className="text-sm">Training Opportunities</li>
                  <li className="text-sm">Continuing Education</li>
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