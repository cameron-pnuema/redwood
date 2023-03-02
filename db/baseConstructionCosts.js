import store from "../store/index";

export const baseContructionCostsStructure = [
  {
    Name: "Foundation",
    "1200ft": 10.97,
    "1500ft": 10.4,
    "2000ft": 10.5,
  },
  {
    Name: "Delivery",
    "1200ft": 3.33,
    "1500ft": 3.0,
    "2000ft": 2.5,
  },
  {
    Name: "Utility Connections",
    "1200ft": 2.33,
    "1500ft": 1.87,
    "2000ft": 1.4,
  },
  {
    Name: "HVAC",
    "1200ft": 2.92,
    "1500ft": 2.34,
    "2000ft": 1.75,
  },
  {
    Name: "Set Up",
    "1200ft": 9.16,
    "1500ft": 8.26,
    "2000ft": 6.95,
  },
  {
    Name: "Plumbing",
    "1200ft": 1.59,
    "1500ft": 1.4,
    "2000ft": 1.2,
  },
  {
    Name: "Flooring",
    "1200ft": 0.34,
    "1500ft": 0.27,
    "2000ft": 0.3,
  },
  {
    Name: "Interior Finish",
    "1200ft": 3.75,
    "1500ft": 3.34,
    "2000ft": 3.0,
  },
  {
    Name: "Gutters",
    "1200ft": 1.11,
    "1500ft": 0.94,
    "2000ft": 0.85,
  },
  {
    Name: "Service & PITA",
    "1200ft": 4.16,
    "1500ft": 3.33,
    "2000ft": 2.5,
  },
  {
    Name: "Sales Tax",
    "1200ft": 2.5,
    "1500ft": 2.3,
    "2000ft": 2.0,
  },
  {
    name: "Total Construction Cost",
    "1200ft": 42.16,
    "1500ft": 37.45,
    "2000ft": 32.95,
  },
  {
    name: "Total (Per sq ft)",
    "1200ft": 50592.0,
    "1500ft": 56175.0,
    "2000ft": 65900.0,
  },
];

export const baseContructionTotalCosts = {};

const setCost = () => {
  const data = store().getState().priceFactor.constructionCost.data;
  
  const totalSqft = data?.find(
    (item) => item.fields.constructionCategory === "Total Per Sq Ft"
  );
 
  if (!totalSqft) return 1;
  baseContructionTotalCosts["1200ft"] = totalSqft.fields["1200 sq ft"];
  baseContructionTotalCosts["1500ft"] = totalSqft.fields["1500 sq ft"];
  baseContructionTotalCosts["2000ft"] = totalSqft.fields["2000 sq ft"];
  baseContructionTotalCosts["1200ft-HUD-DW"] = totalSqft.fields["1200-sq-ft-HUD-DW"];
  baseContructionTotalCosts["1500ft-HUD-DW"] = totalSqft.fields["1500-sq-ft-HUD-DW"];
  baseContructionTotalCosts["2000ft-HUD-DW"] = totalSqft.fields["2000-sq-ft-HUD-DW"];
};

export const getBaseContructionCostsPerSqureFit = (data) => {
 setCost();
  const category = "Sq Ft Category"
  if (!data [category] ) return null;
  if(data.homeType==="HUD-DW")return baseContructionTotalCosts[data[category] + "ft"+"-HUD-DW"] * data[category]
  return baseContructionTotalCosts[data[category] + "ft"] * data[category];
};
