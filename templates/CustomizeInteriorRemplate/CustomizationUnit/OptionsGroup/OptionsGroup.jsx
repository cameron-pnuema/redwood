import { useState } from 'react';
import { format } from 'number-currency-format';

import styles from './OptionsGroup.module.scss';
import Checkbox from '../../../../components/UI/Checkbox/Checkbox'
import InputCustomizeOption from '../../../../components/UI/InputCustomizeOption/InputCustomizeOption';
import { selectionFieldTypes } from '../../../../db/custumizationGroupsFairmont';



const OptionsGroup = ({ groupName, categoryType, options, activeOptionId, onChange, groupId }) => {

    console.log(options, categoryType, 'optionsoptionsoptions');

    const isQuantityType = categoryType === selectionFieldTypes.QUANTITY
    const isMultipleType = categoryType === selectionFieldTypes.SELECT_MULTIPLE

    
    return (
        <div className={styles.group}>
            <div className={styles.group__name}>
                {groupName}
            </div>
            <div className={styles.group__options}>
                {
                    options.map((o, endChildIndex) => {
                        const optionClasses = [styles.option];
                        if (activeOptionId == o.id) optionClasses.push(styles.option_active);

                        
                        return (
                            <div 
                                className={optionClasses.join(' ')} 
                                onClick={() => {
                                   !isQuantityType && onChange(o.id)
                                }}
                            >
                                <div className={styles.option__label}>
                                    {!isQuantityType && 
                                    <Checkbox
                                        checked={activeOptionId == o.id}
                                    />
                            }
                                    <span>
                                        {o.name}
                                    </span>
                                </div>
                                <div className={styles.option__price}>
                                   {isQuantityType && 
                                    <InputCustomizeOption 
                                        groupId={groupId} 
                                        inputValue={o.inputValue} 
                                        activeOptionId={activeOptionId}
                                        onChange={(value) => onChange(o.id, value, endChildIndex)}
                                    />}
                                   ${format(o.price, {
                            spacing: true,
                            showDecimals: 'NEVER',
                        })}
                                </div>
                            </div>
                        );
                    })
                }


            </div>
        </div>
    );
};

export default OptionsGroup;