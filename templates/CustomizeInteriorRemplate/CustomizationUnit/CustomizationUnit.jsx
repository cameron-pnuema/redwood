import react, { useRef } from "react";
import styles from "./CustomizationUntit.module.scss";
import Button from "../../../components/UI/Button/Button";
import { format } from "number-currency-format";
import { useSelector } from "react-redux";
import Router from "next/router";
import { useRouter } from "next/router";
import OptionGroup from "./OptionsGroup/OptionsGroup";
import { getBaseContructionCostsPerSqureFit } from "../../../db/baseConstructionCosts";
import FloringUpgrade from "./FloringUpgrade";
import DiscountUpgrade from "./DiscountUpgrade";


const formatPrice = (price) => {
  return format(price, {
    showDecimals: "NEVER",
  });
};

const CustomizationUnit = ({
  categoryName,
  optionGroups,
  onChange,
  onNext,
  onBack,
  totalCategories,
  currentCategory,
  totalCustomizationPrice,
  isCurrentStepCompleted,
  isAllStepsCompleted,
  selectedPlan,
  refForTheScrollToTop,
  handleIconClick,
  notesState,
}) => {
  const customizations = useSelector(
    (state) => state.customization.customization
  );
  const markupValue = useSelector(state => state.priceFactor.markup.data);
  const MARK_UP_MULTIPLIER = markupValue.Notes

  const router = useRouter();
  const { company } = router.query

  console.log("company",company)
  // const topRef = useRef(null)

  let progressWidth = `${(100 * (currentCategory - 1)) / totalCategories}%`;
  if (isAllStepsCompleted) progressWidth = "100%";

  let totalCompleted = currentCategory - 1;
  if (isAllStepsCompleted) totalCompleted = currentCategory;

  let body = null;
  if (!isAllStepsCompleted)
    body = (
      <>
        <div className={styles.body__category}>
          <div className={styles.body__categoryName}>{categoryName}</div>
          <div className={styles.body__categoryDivider}></div>
        </div>
        <div className={styles.body__list}>
          {/* {categoryName === "Flooring" &&
                    <div className={styles.body__card}>
                        <p className={styles.body__card_text}>Please note one carpet and one vinyl selection below.</p>
                        <textarea
                            className={styles.body__card_textArea}
                            name="flooring"
                            onChange={(event) => onChange({ inputAnswer: event.target.value })}
                            value={og.options.find(o => o.id === og.active).value}
                        />
                        <p className={styles.body__card__disclaimer}>*Flooring customization will be coming soon. A representative will reach out to you to discuss flooring options.</p>
                    </div>
                } */}
          {optionGroups?.map((og) => {

            let optionGroup = null;
            if (categoryName === "Flooring" || categoryName === 'Other ') {
              if (og.name === "Discount (Optional)") {
                return optionGroup = (
                  null                );
              }
              else
                if (og.name === "Vinyl Upgrades (Optional)") {
                  optionGroup = (
                    <>
                      <div className={styles.body__card}>
                        <p className={styles.body__card_text}>
                          Vinyl Flooring Upgrades (Optional)
                        </p>
                        <FloringUpgrade og={og} onChange={onChange} />
                      </div>
                    </>
                  );
                }
                else {
                  optionGroup = (
                    <OptionGroup
                      groupName={og.name}
                      categoryType={og.categoryType}
                      options={og.options}
                      activeOptionId={og.active}
                      groupId={og.id}
                      onChange={({
                        optionId,
                        value,
                        endChildIndex,
                        selectionType,
                        notes,
                      }) => {
                        const payload = { groupId: og.id, optionId };
                        if (value) payload.inputAnswer = value;
                        if (endChildIndex !== undefined)
                          payload.endChildIndex = endChildIndex;
                        if (selectionType) payload.selectionType = selectionType;
                        if (notes) {
                          payload.notes = notes;
                        }

                        onChange(payload);
                      }}
                      handleIconClick={() => handleIconClick(og)}
                      notesState={notesState}
                      notes={og.notes}
                    />
                  );
                }
            }

            if (categoryName !== "Flooring")
              optionGroup = (
                <OptionGroup
                  groupName={og.name}
                  categoryType={og.categoryType}
                  options={og.options}
                  activeOptionId={og.active}
                  groupId={og.id}
                  onChange={({
                    optionId,
                    value,
                    endChildIndex,
                    selectionType,
                    notes,
                  }) => {
                    const payload = { groupId: og.id, optionId };
                    if (value) payload.inputAnswer = value;
                    if (endChildIndex !== undefined)
                      payload.endChildIndex = endChildIndex;
                    if (selectionType) payload.selectionType = selectionType;
                    if (notes) {
                      payload.notes = notes;
                    }

                    onChange(payload);
                  }}
                  handleIconClick={() => handleIconClick(og)}
                  notesState={notesState}
                  notes={og.notes}
                />
              );

            return optionGroup;
          })}
        </div>
        <h3>Additional Notes</h3>
      </>
    );

  const getTotalPrice = () => {
    const basePrice = selectedPlan?.floorplanPrice;
    const baseConstructionCosts = getBaseContructionCostsPerSqureFit(
      selectedPlan
    );
    return (
      (basePrice + baseConstructionCosts) * MARK_UP_MULTIPLIER +
      totalCustomizationPrice
    );
  };

  if (isAllStepsCompleted)
    body = (
      <>
       
        <div className={styles.summary}>
          <div className={styles.summary__total}>
            Total: ${formatPrice(getTotalPrice())}
          </div>
          {/* <div className={styles.summary__item}>Base price:  ${formatPrice(selectedPlan?.price * MARK_UP_MULTIPLIER)}</div>
            <div className={styles.summary__item}>Base construction costs:  ${formatPrice(getBaseContructionCostsPerSqureFit(selectedPlan?.s) * MARK_UP_MULTIPLIER)}</div> */}
          <div className={styles.summary__item}>
            Customizations: ${formatPrice(totalCustomizationPrice)}
          </div>
          <div className={styles.summary__action}>
            <Button
              text="Submit"
              disabled={currentCategory !== totalCategories}
              style={{ width: "100%", height: 50 }}
              onclick={() => Router.replace(`/${company}/apply`)}
            />
          </div>

          <div className={styles.summary__disclaimer}>
            All pricing is Turn-Key: Includes Foundation (40” concrete block crawl
            space), backfill, insulated crawl space, Delivery, Set-up, all
            interior and exterior finish work, Utility hook-ups (inside the
            foundation), HVAC (priced as total electric), Gutters, Cleaning, Sales
            tax.

          </div>
        </div>

        {optionGroups?.map((og) => {
          let optionGroup = null; {
            if (og.name === "Discount (Optional)") {
              return optionGroup = (
                <>
                  <div className={styles.body__card} style={{ marginTop: "35px" }}>
                    <p className={styles.body__card_text}>
                    Credit or Trade-In
                    </p>
                    <DiscountUpgrade og={og} onChange={onChange}/>
                  </div>
                </>
              );
            }
          }
        })}

      </>
    );

  // const ref = useRef(null)

  const handleBottomBtnClick = () => {
    onNext();
    refForTheScrollToTop.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className={styles.customization}>
        <div className={[styles.customization__header, styles.header].join(" ")}>
          <div className={styles.header__top}>
            <div className={styles.header__info}>
              <h3>Customize your house</h3>
              <div>
                Total completed {totalCompleted} out {totalCategories}, +$
                {formatPrice(totalCustomizationPrice)}
              </div>
            </div>
            <div className={styles.header__actions}>
              {currentCategory > 1 && (
                <Button text="Back" noArrow theme4 onclick={onBack} />
              )}
              {!isAllStepsCompleted && (
                <Button
                  text="Next"
                  noArrow
                  onclick={onNext}
                  disabled={
                    totalCategories === currentCategory - 1 ||
                    !isCurrentStepCompleted
                  }
                />
              )}
              {isAllStepsCompleted && (
                <Button
                  text="Submit"
                  noArrow
                  onclick={() => Router.replace(`/${company}/apply`)}
                />
              )}
            </div>
          </div>
          <div className={styles.header__progress}>
            <div
              className={styles.header__progressState}
              style={{ width: progressWidth }}
            ></div>
          </div>
        </div>
        <div className={[styles.customization__body, styles.body].join(" ")}>
          {body}
        </div>
        {!isAllStepsCompleted && (
          <div className={styles.customization__bottomAction}>
            <Button
              style={{ fon: "40" }}
              text="Next"
              noArrow
              onclick={handleBottomBtnClick}
              disabled={
                totalCategories === currentCategory - 1 || !isCurrentStepCompleted
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CustomizationUnit;
