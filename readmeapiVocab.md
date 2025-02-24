# API Vocabulary & Data Structures

This document defines the standard vocabulary and data structures used throughout the Career Explorer application to ensure consistency.

## Career Data

### Basic Properties
- `code` (string): SOC occupation code (e.g., "47-2231")
- `title` (string): Job title (e.g., "Solar Installation Technician")
- `description` (string): Detailed job description

### Salary & Employment
- `meanWage` (number): Average annual salary in USD
- `medianWage` (number): Median annual salary in USD
- `employment` (number): Total number of people employed in this occupation

### Geographic Data
- `topStates` (array): Top states for this occupation
  ```typescript
  {
    name: string;        // State name
    employment: number;  // Number of jobs in state
    meanWage: number;   // Average salary in state
  }
  ```

### Skills & Requirements
- `skills` (array): Required skills for the occupation
  ```typescript
  {
    name: string;        // Skill name
    level: 'Basic' | 'Intermediate' | 'Advanced';
    description: string; // Skill description
  }
  ```

### Education
- `education` (object): Education requirements
  ```typescript
  {
    minimum: string;    // Minimum required education
    preferred: string;  // Preferred education level
    alternatives: Array<{
      name: string;     // Alternative path name
      duration: string; // Time to complete
      type: 'Certification' | 'Degree';
    }>;
  }
  ```

### Job Outlook
- `outlook` (object): Future job prospects
  ```typescript
  {
    growth: string;           // Growth rate percentage
    outlook: string;         // Growth description
    period: string;         // Time period (e.g., "2023-2033")
    opportunities: string[]; // Growth factors
  }
  ```

## Example Data Structure

```json
{
  "code": "47-2231",
  "title": "Solar Installation Technician",
  "description": "Install and maintain solar energy systems...",
  "meanWage": 52000,
  "medianWage": 48000,
  "employment": 28570,
  "topStates": [
    {
      "name": "California",
      "employment": 4285,
      "meanWage": 59800
    }
  ],
  "skills": [
    {
      "name": "Problem Solving",
      "level": "Advanced",
      "description": "Identifying and resolving technical issues"
    }
  ],
  "education": {
    "minimum": "High School Diploma",
    "preferred": "Associate's Degree",
    "alternatives": [
      {
        "name": "Solar Certification",
        "duration": "6 months",
        "type": "Certification"
      }
    ]
  },
  "outlook": {
    "growth": "8%",
    "outlook": "Growing faster than average",
    "period": "2023-2033",
    "opportunities": [
      "Increasing demand for renewable energy"
    ]
  }
}
```

## Important Notes

1. Salary Properties:
   - Always use `meanWage` and `medianWage` for consistency
   - Values are annual salaries in USD
   - Do not use variants like "averageWage" or "avgSalary"

2. Employment Properties:
   - Use `employment` for job counts
   - Do not use variants like "totalEmployed" or "jobCount"

3. Geographic Data:
   - State-level data follows the same property names as national data
   - Use the same wage property names (`meanWage`, not "stateSalary")

4. Type Consistency:
   - All wage/salary values are numbers (not strings)
   - All employment counts are numbers (not strings)
   - Use proper TypeScript types to enforce these rules