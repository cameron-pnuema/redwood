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
const getPrice = (price) => parseFloat(price.replace(/,/g, ''));
const getDataBetweenRange = (filterObj, plan) => {
    if (filterObj.title === "Square Feet") {
        return ((plan.s >= filterObj.min) && (plan.s <= filterObj.max))
    } else if (filterObj.title === "Price") {
        return ((getPrice(plan.finalPrice) >= filterObj.min) && (getPrice(plan.finalPrice) <= filterObj.max))
    }
}

const getEqualData = (filterObj, plan) => {
    if (filterObj.title === "Square Feet") {
        return plan.s === filterObj.value
    } else if (filterObj.title === "Price") {
        return plan.finalPrice === filterObj.value
    } else if (filterObj.title === "Bedrooms") {
        return plan.bedrooms === filterObj.value
    }
    else if (filterObj.title === "Bathrooms") {
        return plan.bathrooms === filterObj.value
    }
    else if (filterObj.title === "Home Type") {
        // currently we dont have home type
        return plan.homeType === filterObj.value
    }
}

const getDataGreaterThanValue = (filterObj, plan) => {
    if (filterObj.title === "Square Feet") {
        return plan.s > filterObj.value
    } else if (filterObj.title === "Price") {
        return plan.finalPrice > filterObj.value
    } else if (filterObj.title === "Bedrooms") {
        return plan.bedrooms > filterObj.value
    }
    else if (filterObj.title === "Bathrooms") {
        return plan.bathrooms > filterObj.value
    }
}

export const HOME_TYPE={
    MODULAR:"Modular",
    HUDDW:"HUD-DW"
}