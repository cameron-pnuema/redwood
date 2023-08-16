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
        key:"appoZqa8oxVNB0DVZ",
        email:"griffin@gscourtyardhomes.com",
        Title:"GS CourtYard Homes",
        templateDescription:(orderData)=> `Thes estimate of your dream home is $${orderData?.totalPrice}, which includes the base price, site prep, and all your customizations.All pricing is Turn-Key
        includes Foundation (40” concrete block crawl space), backfill, insulated crawl space, Delivery, Set-up, all interior and exterior finish work, Utility hook-ups (inside the foundation), HVAC (priced as total electric), Gutters, Cleaning, Sales tax.

        However, please note that the pricing does not include: Steps, driveway, septic, Well, seed and straw, landscaping, & all other unforseen site conditions (ex. Limestone under your ground), etc
        
           Your selected options are below. Note, you are able to make additional changes when representative reaches out, or you can feel free to call us in advance at 812-322-5151`,
        

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
        key:"appqwrDbUmW3KAXGN",
        email:"hjanssen79@gmail.com",
        Title:"Faw Afforable Homes",
        templateDescription:(totalPrice)=>`Thes estimate of your dream home is $${totalPrice}, which includes the base price ,site prep, and all your customizations.Additionally, All pricing includes:Foundation, backfill, Delivery, Set-up, all interior and exterior finish work, HVAC (excluding duct work beneath modular homes), Gutters, Cleaning, Sales tax and one of steps.

        However, please note that the pricing does not include: Utility hooks-up, driveway, septic, Well, seed and straw, landscaping, & resolving all other unforeseen site conditions.
        
             Your selected options are listed below.Prior to ordering the home,you can make additionalchanges to your home design by calling your representative at 217-508-7920`,
        

    }
};