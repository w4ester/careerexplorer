import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Clock, DollarSign, GraduationCap } from 'lucide-react';

const CertificationExplorer = ({ certifications }) => {
  const [selectedCert, setSelectedCert] = useState(null);

  const defaultCerts = [
    {
      name: 'NABCEP PV Installation Professional',
      type: 'Professional Certification',
      duration: '6-12 months',
      cost: '500-1,000',
      requirements: [
        'High school diploma or equivalent',
        '58 hours of advanced PV training',
        '2,000 hours of work experience',
        'Pass certification exam'
      ],
      benefits: [
        'Industry-recognized credential',
        'Higher earning potential',
        'Career advancement opportunities',
        'Professional recognition'
      ]
    },
    {
      name: 'OSHA Safety Certification',
      type: 'Safety Certification',
      duration: '1-2 months',
      cost: '200-500',
      requirements: [
        'Complete OSHA 30-hour course',
        'Pass safety examinations',
        'Complete hands-on training'
      ],
      benefits: [
        'Required for most positions',
        'Enhanced workplace safety knowledge',
        'Job site compliance',
        'Employer requirement satisfaction'
      ]
    },
    {
      name: 'State Electrical License',
      type: 'State License',
      duration: '3-4 years',
      cost: '1,000-2,000',
      requirements: [
        'Complete apprenticeship program',
        '4 years of documented experience',
        'Pass state examination',
        'Background check'
      ],
      benefits: [
        'Legal requirement for electrical work',
        'Higher salary potential',
        'Independent contractor opportunities',
        'Professional credibility'
      ]
    }
  ];

  const certsData = certifications || defaultCerts;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Certifications List */}
        <div className="space-y-4">
          {certsData.map((cert, index) => (
            <Card
              key={cert.name}
              className={`cursor-pointer transition-all ${
                selectedCert === index ? 'border-blue-500 shadow-lg' : 'hover:border-blue-300'
              }`}
              onClick={() => setSelectedCert(index)}
            >
              <CardHeader className="py-3">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {cert.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{cert.type}</span>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{cert.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certification Details */}
        {selectedCert !== null && (
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Certification Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration & Cost
                  </h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">Time: {certsData[selectedCert].duration}</p>
                    <p className="text-sm flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Cost: ${certsData[selectedCert].cost}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Requirements
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {certsData[selectedCert].requirements.map((req, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        • {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Benefits
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {certsData[selectedCert].benefits.map((benefit, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        • {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CertificationExplorer;