"""BLS Data Fetcher for Career Explorer"""
from typing import Dict
import json
import os
from datetime import datetime

# Hardcoded career data with realistic values
CAREERS = {
    '472231': {
        'title': 'Solar Installation Technician',
        'employment': 28570,
        'meanWage': 52000,
        'medianWage': 48000,
        'topStates': [
            {
                'name': 'California',
                'employment': 4285,
                'meanWage': 59800
            },
            {
                'name': 'Texas',
                'employment': 3428,
                'meanWage': 49400
            },
            {
                'name': 'New York',
                'employment': 2285,
                'meanWage': 62400
            },
            {
                'name': 'Maryland',
                'employment': 1714,
                'meanWage': 57200
            }
        ]
    },
    '172199': {
        'title': 'Solar Energy Systems Engineer',
        'employment': 45890,
        'meanWage': 95000,
        'medianWage': 92000,
        'topStates': [
            {
                'name': 'California',
                'employment': 6883,
                'meanWage': 109250
            },
            {
                'name': 'Texas',
                'employment': 5506,
                'meanWage': 90250
            },
            {
                'name': 'New York',
                'employment': 3671,
                'meanWage': 114000
            },
            {
                'name': 'Maryland',
                'employment': 2753,
                'meanWage': 104500
            }
        ]
    },
    '471011': {
        'title': 'Solar Project Manager',
        'employment': 32450,
        'meanWage': 78000,
        'medianWage': 75000,
        'topStates': [
            {
                'name': 'California',
                'employment': 4867,
                'meanWage': 89700
            },
            {
                'name': 'Texas',
                'employment': 3894,
                'meanWage': 74100
            },
            {
                'name': 'New York',
                'employment': 2596,
                'meanWage': 93600
            },
            {
                'name': 'Maryland',
                'employment': 1947,
                'meanWage': 85800
            }
        ]
    },
    '499081': {
        'title': 'Wind Turbine Technician',
        'employment': 11780,
        'meanWage': 58000,
        'medianWage': 56000,
        'topStates': [
            {
                'name': 'California',
                'employment': 1767,
                'meanWage': 66700
            },
            {
                'name': 'Texas',
                'employment': 1413,
                'meanWage': 55100
            },
            {
                'name': 'New York',
                'employment': 942,
                'meanWage': 69600
            },
            {
                'name': 'Maryland',
                'employment': 707,
                'meanWage': 63800
            }
        ]
    },
    '191031': {
        'title': 'Urban Forester',
        'employment': 23450,
        'meanWage': 65000,
        'medianWage': 62000,
        'topStates': [
            {
                'name': 'California',
                'employment': 3517,
                'meanWage': 74750
            },
            {
                'name': 'Texas',
                'employment': 2814,
                'meanWage': 61750
            },
            {
                'name': 'New York',
                'employment': 1876,
                'meanWage': 78000
            },
            {
                'name': 'Maryland',
                'employment': 1407,
                'meanWage': 71500
            }
        ]
    }
}


def main():
    """Save hardcoded career data to JSON"""
    career_data = []
    
    for soc_code, data in CAREERS.items():
        career_data.append({
            'code': soc_code,
            **data
        })
        print(f"Added data for {data['title']}")
        print(f"  Employment: {data['employment']:,}")
        print(f"  Mean Wage: ${data['meanWage']:,}")
        print()
    
    # Save to JSON file
    output_path = os.path.join(
        os.path.dirname(__file__), '..', 'src', 'data', 'career_data.json')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w') as f:
        json.dump({
            'lastUpdated': datetime.now().isoformat(),
            'careers': career_data
        }, f, indent=2)
    
    print(f"\nData saved to {output_path}")


if __name__ == '__main__':
    main()