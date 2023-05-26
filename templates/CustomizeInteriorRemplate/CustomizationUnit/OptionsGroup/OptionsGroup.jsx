import { useState } from "react";
import { format } from "number-currency-format";

import styles from "./OptionsGroup.module.scss";
import Checkbox from "../../../../components/UI/Checkbox/Checkbox";
import InputCustomizeOption from "../../../../components/UI/InputCustomizeOption/InputCustomizeOption";
import { selectionFieldTypes } from "../../../../db/custumizationGroupsFairmont";

import DownArrow from "../../../../assets/img/arrow-down.png";
import RightArrow from "../../../../assets/img/right-arrow.png";

const isNotesSelected = (notesState, key) => {
  return notesState.find((value) => value === key);
};

const OptionsGroup = ({
  groupName,
  categoryType,
  options,
  activeOptionId,
  onChange,
  groupId,
  handleIconClick,
  notesState,
  notes,
  selectedPlan
}) => {
  const key = groupName + groupId;
  const isSelected = isNotesSelected(notesState, key);
  

  const filterOptions = options?.filter((item) => {
    if (selectedPlan?.homeType==="HUD-DW") {
      return  (item?.displayStatus === "On" || item?.displayStatus === undefined)
      && (item?.homeSeriesName?.some(name => name === selectedPlan?.homeSeriesName))
    }
    else
    {
    return (item?.displayStatus === "On" || item?.displayStatus === undefined)
      && (item?.homeSeriesName ===selectedPlan?.homeSeriesName) }
     
  })



  return (
    <div className={styles.group}>
      <div className={styles.group__name}>{groupName}</div>
      <div className={styles.group__options}>
        {filterOptions
          ?.sort((a, b) => a.price - b.price)
          ?.map((o, endChildIndex) => {
            const isQuantityType =
              o.categoryType === selectionFieldTypes.QUANTITY;
            const isMultipleType =
              o.categoryType === selectionFieldTypes.SELECT_MULTIPLE;
            const optionClasses = [styles.option];
            if (isQuantityType || isMultipleType) {
              if (
                Array.isArray(activeOptionId) &&
                activeOptionId.includes(o.id)
              ) {
                optionClasses.push(styles.option_active);
              }
            } else {
              if (activeOptionId == o.id)
                optionClasses.push(styles.option_active);
            }

            if (!isQuantityType && !isMultipleType && activeOptionId == o.id)
              optionClasses.push(styles.option_pointer_behaviour_none);

            return (
              <div
                className={optionClasses.join(" ")}
                style={{
                  marginBottom: isQuantityType || isMultipleType ? 5 : "unset",
                }}
                onClick={() => {
                  if (!isQuantityType || isMultipleType) {
                    const payload = { optionId: o.id };
                    if (isMultipleType)
                      payload.selectionType =
                        selectionFieldTypes.SELECT_MULTIPLE;
                    onChange(payload);
                  }
                }}
              >
                {<><div className={styles.option__label}>
                  {isQuantityType ? (
                    <InputCustomizeOption
                      groupId={groupId}
                      noOfUnit={o.noOfUnit}
                      activeOptionId={activeOptionId}
                      onChange={(value) => {

                        onChange({ optionId: o.id, value, endChildIndex })

                      }
                      }
                    />
                  ) : (
                    <Checkbox
                      checked={
                        (Array.isArray(activeOptionId) &&
                          activeOptionId.includes(o.id)) ||
                        activeOptionId == o.id
                      }
                    />
                  )}
                  <span>{o.name}</span>
                </div>
                  <div className={styles.option__price}>
                    $
                    {format(o.price, {
                      spacing: true,
                      showDecimals: "NEVER",
                    })}
                  </div></>}
              </div>
            );
          })}
        {
          <>
            <div className={styles.arrowContainer} onClick={handleIconClick}>
              <img
                src={isSelected ? DownArrow : RightArrow}
                className={styles.arrow}
              />
              <h5 className={styles.additionalNotes}>Additional Notes</h5>
            </div>

            {isSelected && (
              <input
                className={styles.addtionalNotesTextArea}
                placeholder="Type notes..."
                onChange={(event) => onChange({ notes: { event } })}
                value={notes}
              />
            )}
          </>
        }
      </div>
    </div>
  );
};

export default OptionsGroup;
