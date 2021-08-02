import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/layout/layout';
import CustomizeInteriorRemplate from '../templates/CustomizeInteriorRemplate/CustomizeInteriorRemplate';
import useTimeout from '../UTILS/useTimeout';
import { customizationAction } from '../store/actions/customization';
import { selectionCategoryNames, selectionFieldTypes } from '../db/custumizationGroupsFairmont';


export const getTotalCustomizationPrice = (customizations) => {
    let categories = [];
    customizations.forEach(c => {
        categories = categories.concat(c.underCategories);
    });

    let customizationPrice = 0;
    categories.forEach(c => {
        const activeOption = c.options.find(o => o.id === c.active);
        
        if( c.categoryName === selectionCategoryNames.WINDOWS || 
            c.categoryName === selectionCategoryNames.LIGNTING || 
            c.categoryName === selectionCategoryNames.ADDITONAL_ADDS_ON
        ){
            c.options.map(a => {
                if(Array.isArray(c.active) && c.active.includes(a.id)){
                    if(a.categoryType === selectionFieldTypes.QUANTITY){
                        if(a.noOfUnit && a.noOfUnit > 0) customizationPrice += (a.price * a.noOfUnit)
                    }else{
                        customizationPrice += a.price
                    }
                }
            })

        }else{
            if (!activeOption) return;
            customizationPrice += activeOption.price;
        }
    });

    return customizationPrice;
}

const CustomizeInterior = () => {

    useTimeout();

    const selectedPlan = useSelector(state => state.lot.planData);
    const customizations = useSelector(state => state.customization.customization);
    const dispatch = useDispatch();

    const activeCustomizationCategory = customizations.find(c => c.active);
    const activeCategoryIndex = customizations.findIndex(c => c.active);
    const totalCustomizationPrice = getTotalCustomizationPrice(customizations);
    const [isAllStepsCompleted, setAllStepsCompleted] = useState(activeCategoryIndex === customizations.length - 1);



    const handleCustomizationChange = ({ groupId, optionId, inputAnswer, endChildIndex, selectionType }) => {

        const newCustomizations = customizations.map(category => {

            if (category.category !== activeCustomizationCategory.category) return category;

            return {
                ...category,
                underCategories: category.underCategories.map(uc => {
                    if (uc.id !== groupId) return uc;

                    if (
                        uc.name === 'Flooring' || 
                        uc.categoryName === selectionCategoryNames.WINDOWS || 
                        uc.categoryName === selectionCategoryNames.LIGNTING || 
                        uc.categoryName === selectionCategoryNames.ADDITONAL_ADDS_ON
                        ) {


                        let selectionItem = { ...uc }
                        selectionItem.options = [
                            ...uc.options.map((el, index) => {

                                if (el.name === `inputName`) {
                                    return {
                                        ...el,
                                        value: inputAnswer
                                    }

                                }

                                if(uc.categoryType === selectionFieldTypes.QUANTITY){
                                    if(index === endChildIndex){
                                        return {
                                            ...el,
                                            noOfUnit: inputAnswer || 0
                                        }
                                    }
                                    return {
                                        ...el,
                                    }
                                }
                            })
                        ]

                        if( uc.categoryType === selectionFieldTypes.QUANTITY || selectionType === selectionFieldTypes.SELECT_MULTIPLE ){
                            
                            let activeItemsIds = []
                            if(Array.isArray(selectionItem.active)){
                                activeItemsIds = selectionItem.active 
                            }

                            if(selectionType === selectionFieldTypes.SELECT_MULTIPLE){

                                if(activeItemsIds.includes(optionId)){
                                    activeItemsIds = activeItemsIds.filter(a => a !== optionId )
                                }else{
                                    activeItemsIds.push(optionId)
                                }
                               

                            }else{
                                const isActive = inputAnswer && inputAnswer > 0
                                if(isActive && !activeItemsIds.includes(optionId)){
                                    activeItemsIds.push(optionId)
                                }else if(!isActive  && activeItemsIds.includes(optionId)){
                                    activeItemsIds = activeItemsIds.filter(b => b !== optionId )
                                }
                            }
                            selectionItem.active = activeItemsIds.length > 0 ? activeItemsIds : 1

                        }else{
                            selectionItem.active = optionId
                        }

                        return selectionItem
                    }

                    return {
                        ...uc,
                        active: optionId
                    }
                })
            }
        })
        dispatch(customizationAction(newCustomizations))
    };

    const handleNextCategory = () => {
        if (activeCategoryIndex >= customizations.length - 1) {
            setAllStepsCompleted(true);
            return;
        }
        changeActiveCategory(activeCategoryIndex + 1);
    };

    const handleBackCategory = () => {
        if (activeCategoryIndex <= 0) return;
        if (activeCategoryIndex == customizations.length - 1 && isAllStepsCompleted) {
            setAllStepsCompleted(false);
            return;
        }
        changeActiveCategory(activeCategoryIndex - 1);
    };

    const changeActiveCategory = (categoryIndex) => {
        const newCustomizations = customizations.map((c, i) => {
            if (i !== categoryIndex) return { ...c, active: false };
            // console.log(c, 'ccccccccccccccccccc')
            // console.log('categoryIndex' , categoryIndex)
            if (i === categoryIndex) {
                //   console.log(c, 'c')
                return {
                    ...c,
                    active: true,
                    underCategories: [
                        ...c.underCategories.map(el => {
                            if (el.name === `Flooring`) {
                                return {
                                    ...el,
                                    active: 1
                                }
                            }
                            return {
                                ...el
                            }
                        })
                    ]
                }
            }


            return {
                ...c,
                active: true,
            }
        });
        dispatch(customizationAction(newCustomizations))
    };




    useEffect(() => {
    }, []);

    const numberGroupsInStep = activeCustomizationCategory?.underCategories?.length;
    const numberCompletedGroupsInStep = activeCustomizationCategory?.underCategories.filter(uc => uc.active !== null).length;

    return (
        <Layout>
            <CustomizeInteriorRemplate
                activeCustomizationCategory={activeCustomizationCategory}
                onCustomizationChange={handleCustomizationChange}
                onNext={handleNextCategory}
                onBack={handleBackCategory}
                totalCategories={customizations.length}
                currentCategory={activeCategoryIndex + 1}
                selectedPlan={selectedPlan}
                totalCustomizationPrice={totalCustomizationPrice}
                isCurrentStepCompleted={numberGroupsInStep === numberCompletedGroupsInStep}
                isAllStepsCompleted={isAllStepsCompleted}

            // selectorPlan={selectorPlan}
            // customization={customization}
            // onSelectCustomization={selectCustomization}
            // setTab={setTab}
            // setUnderTab={setUnderTab}
            />
        </Layout>
    );
};

export default CustomizeInterior;