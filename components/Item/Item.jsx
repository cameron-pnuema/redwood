import React from "react";
import styles from "./Item.module.scss";
import { useDispatch } from "react-redux";
import Button from "../UI/Button/Button";
import Router from "next/router";
import { setPlan } from "../../store/actions/lotAction";
import badroomsImg from "../../assets/img/icons/badrooms.svg";
import bathImg from "../../assets/img/icons/bath.svg";
import PlanImg from "../../assets/img/icons/blueprint.svg";
import cx from "classnames";
import { format } from "number-currency-format";
import { floorplanAction } from "../../store/actions/floorplan";
import { customizationAction } from "../../store/actions/customization";
import customizationGroupFairmont from "../../db/custumizationGroupsFairmont";
import customizationGroupMHE from "../../db/custumizationGroupsMHE";
import { useSelector } from "react-redux";
import { getBaseContructionCostsPerSqureFit } from "../../db/baseConstructionCosts";
import { Spinner } from "reactstrap"

const Item = ({ noButton, data }) => {
  const dispatch = useDispatch();
  const floorplan = useSelector((state) => state.floorplan.floorplan);

  const markupValue = useSelector((state) => state.priceFactor.markup.data);
  const MARK_UP_MULTIPLIER = markupValue.Notes;
  useSelector((state) => state.floorplan.floorplan);

  const airtableCustomization = useSelector(
    (state) => state.customization.airtableCustomization
  );

  const selectPlan = () => {
    dispatch(setPlan(data));
    const { manufacturer, title, s } = data;
    if (data.manufacturer === "MHE") {
      dispatch(customizationAction(airtableCustomization.MHE));
      dispatch(
        floorplanAction({
          ...floorplan,
          manufacturer: manufacturer,
          title: title,
        })
      );
    }
    if (data.manufacturer === "Fairmont") {
      dispatch(customizationAction(airtableCustomization.Fairmont));
      dispatch(
        floorplanAction({
          ...floorplan,
          manufacturer: manufacturer,
          title: title,
        })
      );
    }
    Router.replace("/detailed_floorplan");
  };

  const baseConstructionCosts = getBaseContructionCostsPerSqureFit(data?.s);
  const finalPrice = format(
    (data?.price + baseConstructionCosts) * MARK_UP_MULTIPLIER,
    {
      spacing: true,
      showDecimals: "NEVER",
    }
  )
  const setFinalPriceData=(data,finalPrice)=>{
    data.finalPrice=finalPrice
  }
  return (
    <div className={styles.Item}>
      {data && (
        <>
          {data.price ? (
            <span className={styles.Item__price}>
              $
              {finalPrice}
              {setFinalPriceData(data,finalPrice)}
            </span>
          ) : (
            <span className={styles.Item__price}>
              <Spinner animation="border" role="status" size="sm">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </span>
          )}

          <div className={styles.Item__wrapImg}>
            <img src={data.img} alt="img" />
          </div>

          <div className={styles.Item__wrapData}>
            <p className={styles.Item__title}>{data.title}</p>

            <div
              className={cx(styles.Item__params, {
                [styles.Item__noButton]: noButton,
              })}
            >
              <div className={styles.Item__paramsLabel}>
                <img src={badroomsImg} alt="badroomsImg" />
                <span>{data.bedrooms}</span>
                <span className={styles.Item__LabeName}>Bedrooms</span>
              </div>

              <div className={styles.Item__paramsLabel}>
                <img src={bathImg} alt="bathImg" />
                <span>{data.bathrooms}</span>
                <span className={styles.Item__LabeName}>Bathrooms</span>
              </div>

              <div className={styles.Item__paramsLabel}>
                <img src={PlanImg} alt="badroomsImg" />
                <span>{data.s}</span>
                <span className={styles.Item__LabeName}>Sq.Ft</span>
              </div>
            </div>

            {!noButton && (
              <Button
                text="View this Floorplan"
                style={{ width: "100%", height: "50px" }}
                onclick={() => selectPlan()}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Item;
