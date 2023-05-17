
export const HousePrice = (floorplanAction, baseConstructionCosts, MARK_UP_MULTIPLIER) => {

   let finalPrice;
   
   if (MARK_UP_MULTIPLIER < 50) {
     finalPrice = (floorplanAction + baseConstructionCosts) * MARK_UP_MULTIPLIER;
   } else {
     finalPrice = floorplanAction + baseConstructionCosts + MARK_UP_MULTIPLIER;
   }
 
   return finalPrice;
 };