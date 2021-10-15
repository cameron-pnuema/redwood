import React, { useState, useEffect } from "react";
import ApplyTemplate from "../templates/ApplyTemplate/ApplyTemplate";
import useTimeout from "../UTILS/useTimeout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ReactGA from "react-ga";
import emailjs from "emailjs-com";
import { useSelector, useDispatch } from "react-redux";
import { format } from "number-currency-format";
import { getLetter } from "../assets/letter";
import imgToBase64 from "../UTILS/imgToBase64";
import { formValidator } from "../UTILS/validator";
import { setUserInforModal } from "../store/actions/popup";
import { MARK_UP_MULTIPLIER } from "../db/collectiionCustomize";
import { getBaseContructionCostsPerSqureFit } from "../db/baseConstructionCosts";

const emailJsConfigs = {
  USER_ID: "user_2Bq5Rvgr1IGkLbUwbjy7z",
  SERVICE_ID: "service_pb301o9", //admin@redrootscapital.com
};

const formatPrice = (price) => {
  return format(price, {
    showDecimals: "NEVER",
  });
};

const Apply = () => {
  const [isCompleted, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [userDetails, setDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    description: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    errors: {},
  });

  const selectorLot = useSelector((state) => state.lot);
  const сustomizations = useSelector(
    (state) => state.customization.customization
  );
  const customizationPrice = useSelector(
    (state) => state.customization.customizationPrice
  );
  const floorplan = useSelector((state) => state.floorplan.floorplan);

  const lot = selectorLot.lotData;
  const Plan = selectorLot.planData;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const details = JSON.parse(window.localStorage.getItem("USER_DETAILS"));
      if (details) {
        setDetails(details);
      }
    }
  }, []);

  const handleChange = (value, name) => {
    const data = { ...userDetails };
    data[name] = value;
    setDetails(data);
  };

  useTimeout();

  async function sendEmail(e) {
    const env = "Staging";
    let errors = formValidator(userDetails);
    if (Object.keys(errors).length) {
      setDetails({ ...userDetails, errors });
      dispatch(setUserInforModal(true));
      return;
    }

    try {
      setIsLoading(true);
      let html = ``;
      let price = 0;
      html += `<div>Enviroment: <h1>${env}</h1></div>`;
      html += `<h3 style="border: 1px solid #000000; padding: 10px; text-align: center;" > Please note the pricing does not include: Steps, driveway, septic, Well, seed and straw, landscaping, & all other unforeseen site conditions (ex. Limestone under your ground), etc. </h3>`;
      сustomizations?.forEach((c) => {
        html += `<h3 style="text-align: center;">${c.name}</h3>`;
        html +=
          '<ul style="list-style: none; text-align: center;  padding-left: 0;">';
        c.underCategories.forEach((cc) => {
          const options = cc.options.filter((o) => {
            if (Array.isArray(cc.active)) {
              return cc.active.includes(o.id);
            }

            return cc.name === "Flooring" || o.id === cc.active;
          });

          options.map((option) => {
            price += option?.price;

            if (option.noOfUnit && option.noOfUnit < 1) {
              return;
            }

            const numOfUnit = option.noOfUnit
              ? `> Number Of Quantity: ${option.noOfUnit}`
              : "";

            let itemPrice = option?.price;

            if (option.noOfUnit) {
              itemPrice = itemPrice * option.noOfUnit;
            }

            const categoryName = cc.name.replace("(Optional)", "");

            let shownFieldToUser = `<span>${option?.name} ($${formatPrice(
              itemPrice
            )}) ${numOfUnit} </span>`;
            if (option?.type === "textarea")
              shownFieldToUser = `<span>${
                option.value ? option?.value : "not specified"
              }</span>`;

            html += '<li style="text-align: center; margin-left: 0;">';
            html += `<span>${categoryName}</span>: ${shownFieldToUser}`;
            html += "</li>";
          });
        });
        html += "</ul>";
      });

      if (userDetails.description) {
        html += `<h3 style="text-align: center;">Misc Notes</h3>`;
        html +=
          '<ul style="list-style: none; text-align: center;  padding-left: 0;">';
        html += '<li style="text-align: center; margin-left: 0;">';
        html += `${userDetails.description}`;
        html += "</li>";
        html += "</ul>";
      }

      let financeBlock = ``;
      if (floorplan.manufacturer === "Fairmont") {
        financeBlock +=
          '<h3 style="text-align: center;">Financing Information:</h3>';
        financeBlock += `<p style="text-align: center;margin:0;">Manufacturer: Fairmont Homes, LLC</p>`;
        financeBlock +=
          '<ul style="list-style: none; text-align: center;  padding-left: 0;">';
        financeBlock += '<li style="text-align: center; margin-left: 0;">';
        financeBlock += `Model, Size: ${floorplan.title} <b>${floorplan.width} x ${floorplan.length} Fairmont Builder</b>`;
        financeBlock += "</li>";
        financeBlock +=
          '<li style="text-align: center; margin-left: 0;">Name of Community: GS Courtyard Homes: 510 N. Range St. Westport, IN 47283</li>';
        financeBlock += "</ul>";
      } else if (floorplan.manufacturer === "MHE") {
        financeBlock +=
          '<h3 style="text-align: center;">Financing Information:</h3>';
        financeBlock += `<p style="text-align: center;margin:0;">Manufacturer: Manufactured Housing Enterprises, Inc</p>`;
        financeBlock +=
          '<ul style="list-style: none; text-align: center;  padding-left: 0;">';
        financeBlock += '<li style="text-align: center; margin-left: 0;">';
        financeBlock += `Model, Size: ${floorplan.title} ${floorplan.width} x ${floorplan.length} <b>MHE Builder</b>`;
        financeBlock += "</li>";
        financeBlock +=
          '<li style="text-align: center; margin-left: 0;">Name of Community: GS Courtyard Homes: 510 N. Range St. Westport, IN 47283</li>';
        financeBlock += "</ul>";
      }

      let lotName = `№${lot.id}`;
      let planName = `${Plan.title}`;
      const obj = {
        ...e,
        lot: lotName,
        Plan: planName,
        customization: html,
        financeBlock: financeBlock,
      };
      const baseConstructionCosts = getBaseContructionCostsPerSqureFit(Plan?.s);

      // console.log(price,'yyyyyyyyyyy',Plan);
      await emailjs.send(
        emailJsConfigs.SERVICE_ID,
        "applicatoin",
        obj,
        emailJsConfigs.USER_ID
      );
      await emailjs.send(
        emailJsConfigs.SERVICE_ID,
        "user_report",
        {
          preview: getLetter(
            Plan.images.map(
              (i) =>
                `https://rrc-home-configurator-git-dev-vpilip.vercel.app${i}`
            )
          ),
          first_name: userDetails.firstName,
          last_name: userDetails.lastName,
          lot_id: lot.id,
          lot_area: lot.length * lot.width,
          lot_width: lot.width,
          lot_length: lot.length,
          floorplan_name: Plan.title,
          floorplan_area: Plan.s,
          floorplan_bedrooms: Plan.bedrooms,
          floorplan_bathrooms: Plan.bathrooms,
          floorplan_price: formatPrice(Plan.price),
          customizations_price: formatPrice(price),
          total_price: formatPrice(
            ((Plan.price + baseConstructionCosts) * MARK_UP_MULTIPLIER)+(customizationPrice || 0)
          ),
          customizatoins: html,
          financeBlock: financeBlock,
          to: userDetails.email,
        },
        emailJsConfigs.USER_ID
      );

      setCompleted(true);
      window &&
        window.dataLayer &&
        window.dataLayer.push({ event: "ApplyFormSubmitted" });
    } catch (error) {
      console.log(error, ">>>>>>>>>>>>>>>>>");
      setIsLoading(false);
    }
  }

  return (
    <>
      <ApplyTemplate
        submit={sendEmail}
        isCompleted={isCompleted}
        isLoading={isLoading}
        formValues={userDetails}
        handleChange={handleChange}
      />
    </>
  );
};

export default Apply;
