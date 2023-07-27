//Exterior
// - Shingles
// - Siding
// - Shutters
// - Doors
//Kitchen
// - Cabinets
// - Counters
// - Sinks
// - Islands
// - Backsplash
//Bath
// - Sinks
// - Shower/Tub
//Other
// - Flooring
// - Trim
// - Lighting 

export const selectionFieldTypes = {
  QUANTITY: 'quantity',
  SELECT_MULTIPLE: 'selectMultiple',
  SELECT_MULTIPLE_LF: 'linearFeetMultipleSelect',
  SELECT_ONE_LF:"linearFeetSelectOne"

}

export const selectionCategoryNames = {
  LIGNTING: 'lighting',
  ADDITONAL_ADDS_ON: 'additionalAddOns',
  WINDOWS: 'windows',

}

export const selectionCategoryFullNames = {
  QUANTITY: 'quantity',
  SELECT_ONE_LF: 'linear_feet_single_select',
  SELECT_ONE: 'select_one',
  MULTIPLE_SELECT: 'select_multiple',
  MULTIPLE_SELECT_LF:'linear_feet_multiple_select'
}

export const categoriesArray = [
  "Roofing",
  "Roofing Add Ons (Optional)",
  "Roof Pitch",
  "Siding",
  "Siding Add Ons (Optional)",
  "Sidewalls",
  "Shutters",
  "Shutters Add Ons (Optional)",
  "Windows (Optional)",
  "Blinds",
  "Exterior Lights",
  "Exterior Add Ons (Optional)",
  "Front Doors",
  "Rear Doors",
  "Exterior Door Add Ons (Optional)",
  "Patio Doors (Optional)",
  "Interior Door Add Ons (Optional)",
  "Interior Door Hardware (Optional)",
  "Trim",
  "Trim Upgrade (Optional)",
  'Carpet (Bedrooms, Living Room, & Hallways)',
  "Vinyl Flooring",
  "Vinyl Upgrades (Optional)",
  "Flooring Add Ons (Optional)",
  "Kitchen Cabinets",
  "Cabinet Add Ons (Optional)",
  "Master Bathroom Cabinets",
  "Master Bathroom Vanity",
  "Cabinet Hardware (Optional)",
  "Guest Bathroom Cabinets",
  "Utility Room Cabinets",
  "Kitchen Sink",
  "Kitchen Sink Faucet",
  "Island (Optional)",
  "Kitchen Countertop",
  "Counter Top Add Ons (Optional)",
  "Master Bathroom Countertop",
  "Guest Bathroom Countertop",
  "Utility Room Countertop",
  "Kitchen Backsplash",
  "Additional Backsplash Add Ons (Optional)",
  "Kitchen Backsplash Behind Range",
  "Wall Accents (Optional)",
  "Master Bathroom Backsplash",
  "Bathroom Backsplash",
  'Master Bathroom Shower/Tub',
  "Master Bathroom Sink Faucet",
  "Master Bathroom Add Ons (Optional)",
  "Guest Bathroom Shower/Tub",
  "Guest Bathroom Add Ons (Optional)",
  "Fireplace (Optional)",
  "Fireplace Add Ons (Optional)",
  "Fireplace Finish (Optional)",
  "Hutches and Desks (Optional)",
  "Home Entertainment Center (Optional)",
  "Drop Zones (Optional)",
  "Pantry (Optional)",
  "Utilities",
  "Hot Water Heater",
  'HVAC Add Ons (Optional)',
  "Thermostat",
  "Electrical Add Ons (Optional)",
  "Interior Lighting (Optional)",
  "Switches & Outlets (Optional)",
  "Range",
  "Range Add Ons (Optional)",
  "Refrigerator",
  "Ice Maker (Optional)",
  "Dishwasher Add Ons (Optional)",
  "Garbage Disposal (Optional)",
  "Microwave",
  "Microwave (Optional)",
  "Washer Add Ons (Optional)",
  "Dryer Add Ons (Optional)",
  "Utility Room Sink",
  "Utility Room Add Ons (Optional)",
  "General Construction (Optional)",
  "Insulation (Optional)",
  "Walls",
  'Walls Add Ons (Optional)',
  "Additional Ceiling Upgrades (Optional)"
];

const customizationGroup = [
  {
    category: 1,
    active: true,
    name: "Exterior",
    underCategories: [
      {
        id: 1,
        name: "Roof Pitch",
        active: null,
        options: [
          // { id: 1, name: '"4/12"', price: 0 },
          { id: 2, name: '"5/12"', price: 2000 },
          { id: 3, name: '"7/12"', price: 5000 },
        ],
      },
      {
        id: 2,
        name: "Shingles",
        active: null,
        options: [
          { id: 1, name: `Onxy Black`, price: 0 },
          { id: 2, name: `Estate Gray`, price: 0 },
          { id: 3, name: `Driftwood`, price: 0 },
        ],
      },
      {
        id: 3,
        name: "Siding",
        active: null,
        options: [
          { id: 1, name: `Cypress`, price: 0 },
          { id: 2, name: `Harvard Slate`, price: 0 },
          { id: 3, name: `Wicker`, price: 0 },
          { id: 4, name: `Pebble Clay`, price: 0 },
          { id: 5, name: `White`, price: 0 },
          { id: 6, name: `Marine Blue`, price: 2500 },
          { id: 7, name: `Graphite`, price: 2500 },
          { id: 8, name: `Redwood`, price: 2500 },
        ],
      },
      {
        id: 4,
        name: "Shutters",
        active: null,
        options: [
          { id: 1, name: `White Lineals`, price: 150 },
          { id: 2, name: `Brown`, price: 100 },
          { id: 3, name: `Pine`, price: 100 },
          { id: 4, name: `Sandstone`, price: 100 },
          { id: 5, name: `White`, price: 100 },
          { id: 6, name: `Royal`, price: 100 },
          { id: 7, name: `None`, price: 0 },
          { id: 8, name: `Berry`, price: 100 },
          { id: 9, name: `Black`, price: 100 },
        ],
      },
      // {
      //   id: 5,
      //   name: "Doors",
      //   active: null,
      //   options: [
      //     { id: 1, name: `Regular White 34x82`, price: 0 },
      //     {
      //       id: 2,
      //       name: `Round Top Etch Glass With / Sidelight (52x82 in.)`,
      //       price: 2000,
      //     },
      //     {
      //       id: 3,
      //       name: `Round Top Etch Glass With / Double Sidelight (66.5x82 in.)`,
      //       price: 2500,
      //     },
      //     { id: 4, name: `Fire Rated Door`, price: 500 },
      //     { id: 5, name: `Glass Slider (72x80 in.)`, price: 1100 },
      //     { id: 6, name: `Swing French Doors (75.5x82 in.)`, price: 2500 },
      //   ],
      // },
      // {
      //     id: 6,
      //     name: 'Windows',
      //     active: null,
      //     options: [
      //         { id: 1, name: `Arch Top *may require engineering fee`, price: 600 },
      //         { id: 2, name: `Additional 30"x60" window (per)`, price: 250 },
      //         { id: 3, name: `72"x14" transom`, price: 750 },
      //     ],
      // },
      {
        id: 7,
        name: "Outdoor Lighting",
        active: null,
        options: [
          { id: 1, name: `Rust Coach`, price: 0 },
          { id: 2, name: `Craftsman Coach`, price: 200 },
        ],
      },
      {
        id: 8,
        name: "Windows (Optional)",
        active: 1,
        categoryType: selectionFieldTypes.QUANTITY,
        categoryName: selectionCategoryNames.WINDOWS,
        options: [
          { id: 1, name: `Transom 72 x 14`, price: 500, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
          { id: 2, name: `Glass Block 32 x 40`, price: 600, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
          { id: 3, name: `Glass Block 8 x 48`, price: 350, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
          { id: 4, name: `Double Window`, price: 1200, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
          { id: 5, name: `Single Window `, price: 800, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
        ],
      },
      {
        id: 9,
        name: "Front Doors",
        active: null,
        options: [
          { id: 1, name: 'Round Top Glass', price: 1500 },
          { id: 2, name: 'Round Top Glass Double Sidelight', price: 1800 },
          { id: 3, name: 'Storm Door', price: 0 },
          { id: 4, name: 'Standard Front', price: 0 },
          { id: 5, name: 'Fiberglass Woodgrain', price: 950 },
        ]
      },
      {
        id: 10,
        name: "Rear Doors",
        active: null,
        options: [
          { id: 1, name: '9 Lite Storm Door', price: 1100 },
          { id: 2, name: 'Storm Door', price: 350 },
          { id: 3, name: '1/4 Lite Storm Door', price: 950 },
          { id: 4, name: 'Standard Rear Door', price: 0 },
          { id: 5, name: '1/4 Lite', price: 600 },
          { id: 6, name: '9 Lite ', price: 750 },
        ]
      },
      {
        id: 11,
        name: "Patio Doors (Optional)",
        active: false,
        options: [
          { id: 1, name: 'Patio (No Grids)', price: 1500 },
          { id: 2, name: 'French Doors', price: 2500 },
          { id: 3, name: 'Patio w/ Grids', price: 1500 },
        ]
      },
      {
        id: 12,
        name: `Master Bathroom: Vanity`,
        active: null,
        options: [
          { id: 1, name: `Single Bowl`, price: 0 },
          { id: 2, name: `Standard Double Vanity`, price: 0 },
          { id: 3, name: `Double Vanity w/Drawers`, price: 500 },
        ],
      },
      {
        id: 13,
        name: `Guest Bathroom: Vanity`,
        active: null,
        options: [
          { id: 1, name: `Single Bowl w/ Single Door`, price: 0 },
          { id: 2, name: `Single Bowl w/ Double Door`, price: 250 },
        ],
      },
    ],
  },
  {
    category: 2,
    active: false,
    name: "Kitchen",
    underCategories: [
      {
        id: 1,
        name: `Countertop`,
        active: null,
        options: [
          { id: 1, name: `Imperial Sand`, price: 0 },
          { id: 2, name: `Bernard Granite`, price: 0 },
          { id: 3, name: `Winter Carnival`, price: 0 },
          { id: 4, name: `Spring Carnival`, price: 0 },
          { id: 5, name: `Ebony Fusion`, price: 0 },
          { id: 6, name: `Azul Aran`, price: 900 },
          { id: 7, name: `Dolce Vita`, price: 900 },
          { id: 8, name: `Antique Marula Pine`, price: 900 },
          { id: 9, name: `Calcutta Marble`, price: 900 },
        ],
      },
      {
        id: 2,
        name: `Backsplash`,
        active: null,
        options: [
          { id: 1, name: `White (One Row)`, price: 0 },
          { id: 2, name: `Steel (One Row)`, price: 0 },
          { id: 3, name: `Graphite (One Row)`, price: 0 },
          { id: 4, name: `White (Full)`, price: 2000 },
          { id: 5, name: `Steel (Full)`, price: 2000 },
          { id: 6, name: `Graphite (Full)`, price: 2000 },
          { id: 7, name: `Black Stone`, price: 2000 },
          { id: 8, name: `Split Face Mosaic (Upgrade)`, price: 2500 },
          { id: 9, name: `Pewter Tin`, price: 1500 },
          { id: 10, name: `Oxide Graphite (One Row)`, price: 0 },
          { id: 11, name: `San Fransisco`, price: 2500 },
          { id: 12, name: `White Tin`, price: 1500 },
          { id: 13, name: `Mystic slate`, price: 1500 },
          { id: 14, name: `Timberwood`, price: 2500 },
        ],
      },
      {
        id: 3,
        name: `Cabinets`,
        active: null,
        options: [
          { id: 1, name: `Milan`, price: 0 },
          { id: 2, name: `Java`, price: 0 },
          { id: 3, name: `Rustic Shore`, price: 1000 },
          { id: 4, name: `Vintage Oak`, price: 1000 },
          { id: 5, name: `Stonehenge`, price: 1000 },
          { id: 6, name: `Cottage Slate`, price: 1000 },
        ],
      },
      {
        id: 4,
        name: `Cabinets size`,
        active: null,
        options: [
          { id: 1, name: `Cabinets (30")`, price: 0 },
          { id: 2, name: `Cabinets (40")`, price: 2250 },
        ],
      },
      {
        id: 5,
        name: `Island`,
        active: null,
        options: [
          { id: 4, name: `None`, price: 0 },
          { id: 3, name: `CE-1248 (28"x40")`, price: 300 },
          { id: 1, name: `CE-1374 (38"x59")`, price: 500 },
          { id: 2, name: `CE-1277 (36"x96")`, price: 800 },
          
        ],
      },
      {
        id: 6,
        name: `Kitchen Sink upgrade`,
        active: null,
        options: [
          { id: 1, name: `No Upgrade`, price: 0 },
          { id: 2, name: `Farm Sink With Moen Faucet`, price: 500 },
          { id: 3, name: `Deep Steel Sink`, price: 500 },
          { id: 4, name: `Moen Kitchen Faucet With Sprayer`, price: 500 },
        ],
      },
    ],
  },
  {
    category: 3,
    active: false,
    name: "Bath",
    underCategories: [
      {
        id: 1,
        name: `Master Bathroom: Shower/Tub`,
        active: null,
        options: [
          { id: 1, name: `1 Pc Tub With Shower`, price: 0 },
          { id: 4, name: `Corner Shower`, price: 250 },
          { id: 8, name: `Stand Alone Tub`, price: 350 },
          { id: 3, name: `2 Seat Shower (48")`, price: 400 },
          { id: 6, name: `1 Pc Corner Tub`, price: 750 },
          { id: 7, name: `Whirlpool Tub`, price: 1000 },
          { id: 2, name: `Bench Shower`, price: 1200 },
          { id: 5, name: `Ceramic Tile Shower`, price: 3000 },
        ],
      },
      {
        id: `guest-shower-tub`,
        name: `Guest Bathroom: Shower/Tub`,
        active: null,
        options: [
          { id: 1, name: `1 Pc Tub With Shower`, price: 0 },
          { id: 4, name: `Corner Shower`, price: 250 },
          { id: 8, name: `Stand Alone Tub`, price: 350 },
          { id: 3, name: `2 Seat Shower (48")`, price: 400 },
          { id: 6, name: `1 Pc Corner Tub`, price: 750 },
          { id: 2, name: `Bench Shower`, price: 1200 },
        ],
      },
    ],
  },
  {
    category: 4,
    active: false,
    name: "General",
    underCategories: [
      // {
      //     id: 1,
      //     name: `Flooring carpet`,
      //     active: null,
      //     options: [
      //         { id: 1, name: `Quarry cabinet 16 oz`, price: 0 },
      //         { id: 2, name: `Wood Smoke 18oz`, price: 600 },
      //         { id: 3, name: `Spanish Grey 18oz`, price: 600 },
      //         { id: 4, name: `Russet 18 oz`, price: 600 },
      //         { id: 5, name: `Baled Hay 18 0z`, price: 600 },
      //         { id: 6, name: `Sand Dollar 25 oz`, price: 1200 },
      //         { id: 7, name: `Mushroom Cap 25 oz`, price: 1200 },
      //         { id: 8, name: `Cloudburst 25 oz`, price: 1200 },
      //         { id: 9, name: `Truffle 25 oz`, price: 1200 },
      //         { id: 10, name: `Winter White 40oz`, price: 3000 },
      //         { id: 11, name: `Townhouse 40 oz`, price: 3000 },
      //         { id: 12, name: `Cold Water 40 oz`, price: 3000 },
      //         { id: 13, name: `Chamois 40 oz`, price: 3000 },
      //     ],
      // },
      // {
      //     id: 2,
      //     name: `Flooring vynal (per room)`,
      //     active: null,
      //     options: [
      //         { id: 1, name: `Rustic Adobe`, price: 300 },
      //         { id: 2, name: `Barnwood Greige`, price: 300 },
      //         { id: 3, name: `Cookies and Cream`, price: 300 },
      //     ],
      // },
      // {
      //   id: 3,
      //   name: `Doors additional`,
      //   active: null,
      //   options: [
      //     { id: 1, name: `None`, price: 0 },
      //     { id: 2, name: `6 Panel White (36 in.)`, price: 150 },
      //     { id: 3, name: `White Sliding Barn Door`, price: 1500 },
      //   ],
      // },
      {
        id: 4,
        name: `Appliances`,
        active: null,
        options: [
          { id: 1, name: `Black Standard`, price: 0 },
          { id: 2, name: `Electric`, price: 0 },
          { id: 3, name: `Black Upgraded`, price: 1800 },
          { id: 4, name: `Stainless Upgrade`, price: 1800 },
          { id: 5, name: `Gas`, price: 3500 },
        ],
      },
      {
        id: 5,
        name: `Fireplace`,
        active: null,
        options: [
          { id: 1, name: `None`, price: 0 },
          { id: 3, name: `Charleston Stack Half Stone Gas`, price: 1200 },
          { id: 5, name: `Charleston Stack Half Stone Electric`, price: 1200 },
          { id: 2, name: `Charleston Stack Full Stone Gas`, price: 1600 },
          { id: 4, name: `Charleston Stack Full Stone Electric`, price: 1600 },
          
        ],
      },
      {
        id: 6,
        name: `Home Entertainment System`,
        active: null,
        options: [
          { id: 5, name: `None`, price: 0 },
          { id: 3, name: `CE-2006 (48"x42")`, price: 500 },
          { id: 4, name: `CE-2036 (48")`, price: 500 },
          { id: 1, name: `Floating FEC901616 (No Bookcase) (90")`, price: 1200 },
          { id: 2, name: `Floating BC429418 (With Bookcase) (90")`, price: 1700 },
        ],
      },
      {
        id: 7,
        name: `Drop Zones`,
        active: null,
        options: [
          { id: 1, name: `None`, price: 0 },
          { id: 2, name: `2 Hooks, Bench, Shoe Storage CG-355`, price: 500 },
          {
            id: 3,
            name: `3 Hooks, Bench, Overhead Cab And Shoe Storage CG-411`,
            price: 600,
          },
        ],
      },
      {
        id: 8,
        name: `Trim`,
        active: null,
        options: [
          { id: 1, name: `Java Wrapped`, price: 0 },
          { id: 2, name: `Ibis Wrapped`, price: 0 },
          { id: 3, name: `White Wrapped`, price: 0 },
        ],
      },
      // { 
      //   id: `4-washer-dryer`,
      //   name: `Washer/dryer`,
      //   active: null,
      //   options: [
      //     { id: 1, name: `None`, price: 0 },
      //     { id: 2, name: `Include`, price: 1200 },
      //   ],
      // },
      {
        id: `5-hot-water-heater`,
        name: `Hot Water Heater`,
        active: null,
        options: [
          { id: 1, name: `40 Gallon`, price: 0 },
          { id: 2, name: `50 Gallon`, price: 650 },
        ],
      },
      {
        id: `9-utility-sink`,
        name: `Utility Sink (Laundry Room)`,
        active: null,
        options: [
          { id: 5, name: `None`, price: 0 },
          { id: 1, name: `Deep Sink SB-30`, price: 1100 },
          { id: 2, name: `Deep Sink CB-790 (51")`, price: 1300 },
          { id: 3, name: `Deep Sink CB-772 (60")`, price: 1500 },
          { id: 4, name: `Deep Sink With Overhead Cab (51")`, price: 1700 },
        ],
      },
      {
        id: 12,
        name: `Additonal Add Ons (Optional)`,
        active: 1,
        categoryType: selectionFieldTypes.QUANTITY,
        categoryName: selectionCategoryNames.ADDITONAL_ADDS_ON,
        options: [
          { id: 1, name: `Cost per USB Charging Dock`, price: 75, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
          { id: 2, name: `Cost per TV/Cable (Running Quanitity)`, price: 75, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
          { id: 3, name: `Cost per Outlet (Running Quanitity)`, price: 75, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
          { id: 4, name: `Cost per GFI Outlet (Running Quanitity)`, price: 75, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
        ],
      },
      {
        id: 13,
        name: `Lighting (Optional)`, 
        active: 1,
        categoryName: selectionCategoryNames.LIGNTING,
        categoryType: selectionFieldTypes.QUANTITY,
        options: [
          { id: 1, name: `Globe Light`, price: 75, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
          { id: 2, name: `Can Light`, price: 75, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
          { id: 3, name: `Reversible Fan`, price: 350, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
          { id: 4, name: ` 5 Arm Chandelier`, price: 350, noOfUnit: 0, categoryType: selectionFieldTypes.QUANTITY },
        ],
      },
    ],
  },
  {
      category: 5,
      active: false,
      name: 'Bathroom',
      underCategories: [
          {
              id: 1,
              name: `Backsplash`,
              active: null,
              options: [
                { id: 1, name: `White (One Row)`, price: 0 },
                { id: 2, name: `Steel (One Row)`, price: 0 },
                { id: 3, name: `Graphite (One Row)`, price: 0 },
                { id: 4, name: `White (Full)`, price: 2000 },
                { id: 5, name: `Steel (Full)`, price: 2000 },
                { id: 6, name: `Graphite (Full)`, price: 2000 },
                { id: 7, name: `Black Stone`, price: 2000 },
                { id: 8, name: `Split Face Mosaic (Upgrade)`, price: 2500 },
                { id: 9, name: `Pewter Tin`, price: 1500 },
                { id: 10, name: `Oxide Graphite (One Row)`, price: 0 },
                { id: 11, name: `San Fransisco`, price: 2500 },
                { id: 12, name: `White Tin`, price: 1500 },
                { id: 13, name: `Mystic slate`, price: 1500 },
                { id: 14, name: `Timberwood`, price: 2500 },
              ],
          },

      ]
  },

  {
    category: 6,
    active: false,
    name: "Flooring",
    underCategories: [
      {
        id: 1,
        name: `Flooring`,
        active: null,
        categoryType: 'freeForm',
        options: [
          {
            id: 1,
            name: `inputName`,
            type: 'textarea',
            price: 0,
            value: "",
            active: 1,
          },
        ],
      },
    ],
  },
];

export default customizationGroup;
