export const baseContructionCostsStructure =    [
    {
        'name': 'Foundation',
        '1200ft': 10.97,
        '1500ft': 10.40,
        '2000ft': 10.50
    },
    {
        'name': 'Delivery',
        '1200ft': 3.33,
        '1500ft': 3.00,
        '2000ft': 2.50
    },
    {
        'name': 'Utility Connections',
        '1200ft': 2.33,
        '1500ft': 1.87,
        '2000ft': 1.40
    },
    {
        'name': 'HVAC',
        '1200ft': 2.92,
        '1500ft': 2.34,
        '2000ft': 1.75
    },
    {
        'name': 'Set Up',
        '1200ft': 9.16,
        '1500ft': 8.26,
        '2000ft': 6.95
    },
    {
        'name': 'Plumbing',
        '1200ft': 1.59,
        '1500ft': 1.40,
        '2000ft': 1.20
    },
    {
        'name': 'Flooring',
        '1200ft': 0.34,
        '1500ft': 0.27,
        '2000ft': 0.30
    },
    {
        'name': 'Interior Finish',
        '1200ft': 3.75,
        '1500ft': 3.34,
        '2000ft': 3.00
    },
    {
        'name': 'Gutters',
        '1200ft': 1.11,
        '1500ft': 0.94,
        '2000ft': 0.85
    },
    {
        'name': 'Service & PITA',
        '1200ft': 4.16,
        '1500ft': 3.33,
        '2000ft': 2.50
    },
    {
        'name': 'Sales Tax',
        '1200ft': 2.50,
        '1500ft': 2.30,
        '2000ft': 2.00
    },
    {
        'name': 'Total Construction Cost',
        '1200ft': 42.16,
        '1500ft': 37.45,
        '2000ft': 32.95
    },
    {
        'name': 'Total (Per sq ft)',
        '1200ft': 50592.00,
        '1500ft': 56175.00,
        '2000ft': 65900.00
    },
]

export const baseContructionTotalCosts = {
    '1200ft': 42.16,
    '1500ft': 37.45,
    '2000ft': 32.95
}

export const getBaseContructionCostsPerSqureFit = (squreFit) =>  {
    if(!squreFit) return null
    return baseContructionTotalCosts[squreFit + 'ft'] * squreFit
}