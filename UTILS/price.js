
 export const HousePrice = (floorplanAction, baseConstructionCosts, MARK_UP_MULTIPLIER) =>{
    const finalPrice = (floorplanAction + baseConstructionCosts) * MARK_UP_MULTIPLIER

    return finalPrice;
 }