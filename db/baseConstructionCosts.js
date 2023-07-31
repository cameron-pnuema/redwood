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

export let result;
// export const baseContructionTotalCosts = {};

const setCost = () => {

  const data = store().getState().priceFactor.constructionCost.data;



  const displayed = data?.filter((item) => item.fields.displayStatus === "Fixed Cost");
 

  result = [
    { constructionOptionsMOD: {} },
    { constructionOptionsHUD_DW: {} },
    { constructionOptionsHUD_SW: {} },
  ];

  displayed.forEach((obj) => {
    const constructionSelectionName = obj.fields.constructionSelectionName + obj.fields[`How's it priced?`];
    result[0].constructionOptionsMOD[constructionSelectionName] = obj.fields.constructionOptionsMOD;
    result[1].constructionOptionsHUD_DW[constructionSelectionName] = obj.fields.constructionOptionsHUD_DW;
    result[2].constructionOptionsHUD_SW[constructionSelectionName] = obj.fields.constructionOptionsHUD_SW;
  });






  // if (!totalSqft) return 1;

  // baseContructionTotalCosts["1200ft"] = totalSqft.fields["1200 sq ft"];
  // baseContructionTotalCosts["1500ft"] = totalSqft.fields["1500 sq ft"];
  // baseContructionTotalCosts["2000ft"] = totalSqft.fields["2000 sq ft"];
  // baseContructionTotalCosts["1200ft-HUD-DW"] = totalSqft.fields["1200-sq-ft-HUD-DW"];
  // baseContructionTotalCosts["1500ft-HUD-DW"] = totalSqft.fields["1500-sq-ft-HUD-DW"];
  // baseContructionTotalCosts["2000ft-HUD-DW"] = totalSqft.fields["2000-sq-ft-HUD-DW"];
};

export const getBaseContructionCostsPerSqureFit = (data, roofPitch) => {
  setCost();



  const data2 = store().getState().priceFactor.constructionNewCost.data;


  const roofDependencyMap = {
    "Modular": "5/12",
    "HUD-DW": "3/12",
    "HUD-SW": "7/12"
  };

  const getMaxPriceByCategory = (data2, category, data) => {
    const filteredData = data2?.filter((house) => {
      const fields = house.fields;
      return (
        fields.category === category &&
        fields.homeWidth === data?.homeWidth &&
        fields.homeLengthMinimum <= data?.homeLength &&
        fields.homeLengthMaximum >= data?.homeLength
      );
    }
   
    );
   
    if (filteredData.length === 0) {
      return 0; 
    }
     return Math.max(...filteredData?.map((item) =>
      Math.max(item.fields.constructionOptionsHUD_DW, item.fields.constructionOptionsMOD)));
  };

  const actualHvacPrice = getMaxPriceByCategory(data2, "HVAC", data);
  const actualDeliveryPrice = getMaxPriceByCategory(data2, "Delivery", data);
  const actualGutterPrice = getMaxPriceByCategory(data2, "Gutters", data);

  


  const filteredPrice = data2?.filter((house) => {
    const fields = house.fields;
    const roofDependency = roofPitch ? roofPitch : roofDependencyMap[data?.homeType];

    return (
      house.fields?.homeWidth === data?.homeWidth &&
      house.fields?.homeLengthMinimum <= data?.homeLength &&
      house.fields?.homeLengthMaximum >= data?.homeLength &&
      house.fields?.roofDependency === roofDependency
    );
  });


  const actualPrice = filteredPrice?.map((item) => {
    const { constructionOptionsHUD_DW, constructionOptionsMOD } = item.fields;
    const maxValue = Math.max(constructionOptionsHUD_DW, constructionOptionsMOD);
    return maxValue
  })


  const category = "sq Ft";
  let sum = 0 + actualPrice[0] + actualHvacPrice + actualDeliveryPrice + actualGutterPrice

  const constructionOptions = data?.homeType === "HUD-DW"
    ? result[1].constructionOptionsHUD_DW
    : data?.homeType === "HUD-SW"
      ? result[2].constructionOptionsHUD_SW
      : result[0].constructionOptionsMOD;



  Object.entries(constructionOptions).forEach(([key, value]) => {

    if (key.includes("Per Sq Ft")) {
      constructionOptions[key] = value * data[category];
    }
    if (key.includes("Linear Feet")) {
      constructionOptions[key] = value * data?.homeLength;
    }
    sum += constructionOptions[key];

  });

  return sum;



  // if (!data?.[category] ) return null;
  // if(data?.homeType==="HUD-DW")return baseContructionTotalCosts[data[category] + "ft"+"-HUD-DW"] * data[category]
  // return baseContructionTotalCosts[data[category] + "ft"] * data[category]; 
};

