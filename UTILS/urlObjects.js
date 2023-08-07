 export const urlObjects = {
    "gscourtyardhomes": {
        clientProfile:"https://api.airtable.com/v0/appNSZE4sLntsJdpb/Client%20List%20%26%20Profiles?maxRecords=100&view=Client%20List%20%26%20General%20Info",
        getMarkup:"https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Client%20Profile/recgPVsLYxndCLFLP",
        getFloorPlan:"https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Floorplan%20Costs?maxRecords=100&view=Grid%20view",
        getConstructionCost:"https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Construction%20Options?maxRecords=100&view=Grid%20view",
        getConstructionCostNew:"https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Construction%20Options%20(Size%20Dependent)?maxRecords=100&view=Grid%20view",
        selectOptionMOD:"https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/NEW%3A%20Selection%20Options%20(MOD)",
        selectOptionHUD_DW:"https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/NEW%3A%20Selection%20Options%20(HUD-DW)",
        selectOptionHUD_SW:"https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/NEW%3A%20Selection%20Options%20(HUD-SW)",
        orderDetail: (orderID) => `https://api.airtable.com/v0/appoZqa8oxVNB0DVZ/Orders?filterByFormula=SEARCH('${orderID}',{orderID})`,
        key:"appoZqa8oxVNB0DVZ"
    },
    "fawaffordablehomes":{
        clientProfile:"https://api.airtable.com/v0/appNSZE4sLntsJdpb/Client%20List%20%26%20Profiles?maxRecords=100&view=Client%20List%20%26%20General%20Info",
        getMarkup:"https://api.airtable.com/v0/appqwrDbUmW3KAXGN/Client%20Profile/recZ7XckhoxP71D9X",
        getFloorPlan:"https://api.airtable.com/v0/appqwrDbUmW3KAXGN/Floorplan%20Costs?maxRecords=100&view=Grid%20view",
        getConstructionCost:"https://api.airtable.com/v0/appqwrDbUmW3KAXGN/Construction%20Options?maxRecords=100&view=Grid%20view",
        getConstructionCostNew:"https://api.airtable.com/v0/appqwrDbUmW3KAXGN/Construction%20Options%20(Size%20Dependent)?maxRecords=100&view=Grid%20view",
        selectOptionMOD:"https://api.airtable.com/v0/appqwrDbUmW3KAXGN/NEW%3A%20Selection%20Options%20(MOD)",
        selectOptionHUD_DW:"https://api.airtable.com/v0/appqwrDbUmW3KAXGN/NEW%3A%20Selection%20Options%20(HUD-DW)",
        selectOptionHUD_SW:"https://api.airtable.com/v0/appqwrDbUmW3KAXGN/NEW%3A%20Selection%20Options%20(HUD-SW)",
        orderDetail: (orderID) =>`https://api.airtable.com/v0/appqwrDbUmW3KAXGN/Orders?filterByFormula=SEARCH('${orderID}',{orderID})`,
        key:"appqwrDbUmW3KAXGN"
    }
};