export const filterSelectFloorplan = (floorPlanFilter, plansSlot) => {
    return plansSlot.filter((plan) => {
        let data = true
        floorPlanFilter.forEach((filterObj) => {
            const filterResult = filterByOperation(filterObj, plan)
            data = data && filterResult
        })
        return data
       
    })
}

const filterByOperation = (filterObj, plan) => {
    
    if (filterObj.operation === "range") {
        return getDataBetweenRange(filterObj, plan)
    } else if (filterObj.operation === "greater") {
        return getDataGreaterThanValue(filterObj, plan)
    }
    else {
        return getEqualData(filterObj, plan)
    }

}
const getPrice = (price) => parseFloat(price?.replace(/,/g, ''));
const getDataBetweenRange = (filterObj, plan) => {
    if (filterObj.title === "Square Feet") {
        return ((Number(plan.fields['sq Ft']) >= filterObj.min) && (Number(plan.fields['sq Ft']) <= filterObj.max))
    } else if (filterObj.title === "Price") {
        return ((getPrice(plan.fields.finalPrice) >= filterObj.min) && (getPrice(plan.fields.finalPrice) <= filterObj.max))
    }
}

const getEqualData = (filterObj, plan) => {
    if (filterObj.title === "Square Feet") {
        return plan.fields['sq Ft'] === filterObj.value
    } else if (filterObj.title === "Price") {
        return plan.fields.finalPrice === filterObj.value
    } else if (filterObj.title === "Bedrooms") {
        return plan.fields.bedCount == filterObj.value
    }
    else if (filterObj.title === "Bathrooms") {
        return plan.fields.bathCount == filterObj.value
    }
    else if (filterObj.title === "Home Type") {
        // currently we dont have home type
        return plan.fields.homeType === filterObj.value
    }
}

const getDataGreaterThanValue = (filterObj, plan) => {
  
    if (filterObj.title === "Square Feet") {
        return plan.fields['sq Ft'] > filterObj.value
    } else if (filterObj.title === "Price") {
        return plan.fields.finalPrice > filterObj.value
    } else if (filterObj.title === "Bedrooms") {
        return plan.fields.bedCount > filterObj.value
    }
    else if (filterObj.title === "Bathrooms") {
        return plan.fields.bathCount> filterObj.value
    }
}

export const HOME_TYPE={
    MODULAR:"Modular",
    HUDDW:"HUD-DW"
}