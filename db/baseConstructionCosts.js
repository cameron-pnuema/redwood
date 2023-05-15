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

export var result
// export const baseContructionTotalCosts = {};

const setCost = () => {
  const data = store().getState().priceFactor.constructionCost.data;
  // console.log("data", data)

  const displayed = data?.filter(
    (item) => item.fields["Displayed?"] === "Yes" || item.fields["Displayed?"] === undefined
  );

  // console.log("displayed==>",displayed)


  result = [{
    constructionOptionsMOD: {},
  }, {
    constructionOptionsHUD_DW: {},
  },
  {
    constructionOptionsHUD_SW: {},
  }];

  result[0].constructionOptionsMOD = displayed.reduce((acc, obj) => {
    acc[obj.fields.constructionCategory] = obj.fields.constructionOptionsMOD;
    return acc;
  }, {});

  result[1].constructionOptionsHUD_DW = displayed.reduce((acc, obj) => {
    acc[obj.fields.constructionCategory] = obj.fields.constructionOptionsHUD_DW;
    return acc;
  }, {});

  result[2].constructionOptionsHUD_SW = displayed.reduce((acc, obj) => {
    acc[obj.fields.constructionCategory] = obj.fields.constructionOptionsHUD_SW;
    return acc;
  }, {});

  //   console.log("dwwee===>",result)

  // console.log(" totalSqft ", totalSqft)

  // if (!totalSqft) return 1;

  // baseContructionTotalCosts["1200ft"] = totalSqft.fields["1200 sq ft"];
  // baseContructionTotalCosts["1500ft"] = totalSqft.fields["1500 sq ft"];
  // baseContructionTotalCosts["2000ft"] = totalSqft.fields["2000 sq ft"];
  // baseContructionTotalCosts["1200ft-HUD-DW"] = totalSqft.fields["1200-sq-ft-HUD-DW"];
  // baseContructionTotalCosts["1500ft-HUD-DW"] = totalSqft.fields["1500-sq-ft-HUD-DW"];
  // baseContructionTotalCosts["2000ft-HUD-DW"] = totalSqft.fields["2000-sq-ft-HUD-DW"];
};

export const getBaseContructionCostsPerSqureFit = (data) => {

  setCost();
  // console.log("data2",data)

  const category = "sq Ft"
  // console.log("hy1567",  data[category] )
  let sum = 0


  if (data?.homeType === "Modular") {
    //  console.log(result[0], ':::Ressult::::')
    const constructionOptionsMOD = result[0].constructionOptionsMOD;
    Object.entries(constructionOptionsMOD).forEach(([key, value]) => {
      if (value < 50) {
        constructionOptionsMOD[key] = value * data[category];
      }
      sum += constructionOptionsMOD[key];

    });
  }
  else if (data?.homeType === "HUD-DW") {
    // console.log(result[1], ':::Ressult::::')
    const constructionOptionsHUD_DW = result[1].constructionOptionsHUD_DW;
    Object.entries(constructionOptionsHUD_DW).forEach(([key, value]) => {
      if (value < 50) {
        constructionOptionsHUD_DW[key] = value * data[category];
      }
      sum += constructionOptionsHUD_DW[key];

    });
  }
  else if (data?.homeType === "HUD-SW") {
    // console.log(result[2], ':::Ressult::::')
    const constructionOptionsHUD_SW = result[2].constructionOptionsHUD_SW;
    Object.entries(constructionOptionsHUD_SW).forEach(([key, value]) => {
      if (value < 50) {
        constructionOptionsHUD_SW[key] = value * data[category];
      }
      sum += constructionOptionsHUD_SW[key];

    });
  }

  //  console.log("SUM", sum )
  return sum;

  // if (!data?.[category] ) return null;
  // if(data?.homeType==="HUD-DW")return baseContructionTotalCosts[data[category] + "ft"+"-HUD-DW"] * data[category]
  // return baseContructionTotalCosts[data[category] + "ft"] * data[category];

};
