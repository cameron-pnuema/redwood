import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/layout";
import CustomizeInteriorRemplate from "../../templates/CustomizeInteriorRemplate/CustomizeInteriorRemplate";
import useTimeout from "../../UTILS/useTimeout";
import {
  customizationAction,
  setCustomizationPriceAction,
} from "../../store/actions/customization";
import {
  selectionCategoryNames,
  selectionFieldTypes,
} from "../../db/custumizationGroupsFairmont";

var homeLength

const getPrice = (data) => {
  let price = 0;
  data.forEach((item) => {
    price += Number(item?.price) || 0;
  });
  return price;
};

export const getTotalCustomizationPrice = (customizations) => {
  let categories = [];

  customizations.forEach((c) => {
    categories = categories.concat(c.underCategories);

  });

  let customizationPrice = 0;


  categories.forEach((c) => {
    const activeOption = c.options.find((o) => o?.id === c.active);
    if (
      c.categoryName === selectionCategoryNames.WINDOWS ||
      c.categoryName === selectionCategoryNames.LIGNTING ||
      c.categoryName === selectionCategoryNames.ADDITONAL_ADDS_ON ||
      c.categoryType === "quantity" ||   c.categoryType === "windows"||
      c.name === 'Discount(Optional)'|| c.categoryType==='lighting'
    ) {
      c.options.map((a) => {
        if (Array.isArray(c.active) && c.active.includes(a.id)) {
          if (a.categoryType === selectionFieldTypes.QUANTITY) {
            if (a.noOfUnit && a.noOfUnit > 0)
              customizationPrice += a?.price * a.noOfUnit;
          } else {
            customizationPrice += a?.price;
          }
        }
        else if (a?.name === "I/O") {
          customizationPrice += a?.price;
        }
      });
    }
    
    else {
      if (!activeOption) return;
      customizationPrice += activeOption?.price;

    }
  });
  return customizationPrice;
};

const CustomizeInterior = () => {
  useTimeout();

  const selectedPlan = useSelector((state) => state.lot.planData);



  const customizations = useSelector(
    (state) => state.customization.customization
  );

 


  const dispatch = useDispatch();
  const [notesState, setNotesState] = useState([]);


  const activeCustomizationCategory = customizations.find((c) => c.active);

  const activeCategoryIndex = customizations.findIndex((c) => c.active);

  const totalCustomizationPrice = getTotalCustomizationPrice(customizations);

  const [isAllStepsCompleted, setAllStepsCompleted] = useState(
    activeCategoryIndex === customizations.length - 1
  );
  const handleCustomizationChange = ({
    groupId,
    optionId,
    inputAnswer,
    endChildIndex,
    selectionType,
    notes,
  }) => {


    const newCustomizations = customizations.map((category) => {
      if (category.category !== activeCustomizationCategory.category)
        return category;


    

      return {
        ...category,
        underCategories: category.underCategories.map((uc) => {
          if (uc.id !== groupId) return uc;
          if (notes) {
            uc.notes = notes?.event?.target?.value;
            return uc;
        
          }
        
    
          if (
            uc.categoryType === selectionFieldTypes.QUANTITY ||
            uc.name === 'Discount(Optional)' ||
            uc.categoryName === selectionCategoryNames.WINDOWS ||
            uc.categoryName === selectionCategoryNames.LIGNTING ||
            uc.categoryName === selectionCategoryNames.ADDITONAL_ADDS_ON||
            uc.categoryType === "windows"|| uc.categoryType==='lighting'
          ) {

            let selectionItem = { ...uc };
        
            selectionItem.options = [
              ...uc.options.map((el, index) => {

                if (el.name === `I/O`) {

                  return {
                    ...el,
                    value: inputAnswer || [],
                    price: - getPrice(inputAnswer || []),
                    active: true,
                  };
                }
                // else if (el.name === `N/A`) {
                //   return {
                //     ...el,
                //     value: inputAnswer || [],
                //     price: getPrice(inputAnswer || []),
                //     active: true,
                //   };
                // }


                if (uc.categoryType === selectionFieldTypes.QUANTITY||  uc.categoryType === "windows"|| uc.categoryType==='lighting') {
                  if (index === endChildIndex) {
                    return {
                      ...el,
                      noOfUnit: inputAnswer || 0,
                    };
                  }
                  return {
                    ...el,
                  };
                }
              }),
            ];

            if (
              uc.categoryType === selectionFieldTypes.QUANTITY ||
              selectionType === selectionFieldTypes.SELECT_MULTIPLE ||
              uc.name.includes("Optional")||
              uc.categoryType===selectionFieldTypes.SELECT_MULTIPLE_LF
            ) {

              let activeItemsIds = [];
              if (Array.isArray(selectionItem.active)) {
                activeItemsIds = selectionItem.active;
              }

              if (selectionType === selectionFieldTypes.SELECT_MULTIPLE 
                 ) {
                      
                if (activeItemsIds.includes(optionId)) {
                  activeItemsIds = activeItemsIds.filter((a) => a !== optionId);
                 

                } else {
                  activeItemsIds.push(optionId);
                 
                }
              }


              else {
                if (activeItemsIds.includes(optionId)) {
                  activeItemsIds = activeItemsIds.filter((a) => a !== optionId);
                } else {
                  activeItemsIds.push(optionId);
                }
              }


              if (selectionType === selectionFieldTypes.QUANTITY) {

                if (activeItemsIds.includes(optionId)) {
                  activeItemsIds = activeItemsIds.filter((a) => a !== optionId);
                } else {
                  activeItemsIds.push(optionId)
                }
              }

              selectionItem.active =
                activeItemsIds.length > 0 ? activeItemsIds : 0;
            }
           

            else {

              selectionItem.active = optionId;
            }

            return selectionItem;
          }
          if (notes) uc.notes = notes?.event?.target?.value;
          return {
            ...uc,
            active: optionId,
          };
        }),
      };
    });


    dispatch(customizationAction(newCustomizations));
    dispatch(setCustomizationPriceAction(totalCustomizationPrice));
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
    if (
      activeCategoryIndex == customizations.length - 1 &&
      isAllStepsCompleted
    ) {
      setAllStepsCompleted(false);
      return;
    }
    changeActiveCategory(activeCategoryIndex - 1);
  };
  //   ca.splice(underCategories.length-1, 0, {
  //     ...el,
  //     active: 1,
  //   });
  const get = (underCategories) => {

    const ca = [...underCategories];
    underCategories.forEach((el, i) => {
      if (el.name === `Flooring`) {
        let c = ca[underCategories.length - 1];
        ca[underCategories.length - 1] = {
          ...el,
          active: 1,
        };
        ca[i] = c;
      }
    });
    return ca;
  };
  const changeActiveCategory = (categoryIndex) => {
    const newCustomizations = customizations.map((c, i) => {
      if (i !== categoryIndex) return { ...c, active: false };
      if (i === categoryIndex) {
        return {
          ...c,
          active: true,
          underCategories: [...get(c.underCategories)],
        };
      }

      return {
        ...c,
        active: true,
      };
    });
    dispatch(customizationAction(newCustomizations));
  };

  useEffect(() => {
    const data = []
    activeCustomizationCategory?.underCategories?.forEach((item) => {
      if (item.notes) {
        data.push(item.name + item.id)
      }
    })
    setNotesState(data)
  }, [activeCustomizationCategory?.underCategories]);

  const numberGroupsInStep =
    activeCustomizationCategory?.underCategories?.length;
  const numberCompletedGroupsInStep =
    activeCustomizationCategory?.underCategories.filter(
      (uc) => uc.active !== null
    ).length;

  const handleIconClick = (data) => {
    const key = data.name + data.id;
    const filteredNote = notesState.find((value) => value === key);
    if (!filteredNote) setNotesState(notesState.concat(key));
    if (filteredNote) {
      const nonSelectedNote = notesState.filter((value) => value !== key);
      setNotesState(nonSelectedNote);
    }
  };

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
        isCurrentStepCompleted={
          numberGroupsInStep === numberCompletedGroupsInStep
        }
        isAllStepsCompleted={isAllStepsCompleted}
        handleIconClick={handleIconClick}
        notesState={notesState}
      />
    </Layout>
  );
};

export default CustomizeInterior;
