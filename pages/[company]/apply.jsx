import React, { useState, useEffect } from "react";
import ApplyTemplate from "../../templates/ApplyTemplate/ApplyTemplate";
import useTimeout from "../../UTILS/useTimeout";
import emailjs from "emailjs-com";
import { useSelector, useDispatch } from "react-redux";
import { format } from "number-currency-format";
import { getLetter } from "../../assets/letter";
import { formValidator } from "../../UTILS/validator";
import { setUserInforModal } from "../../store/actions/popup";
import { getBaseContructionCostsPerSqureFit } from "../../db/baseConstructionCosts";
import { saveOrderData } from "../../api/saveOrderData"
import { getTotalCustomizationPrice } from "./Customize_Home";
import downloadPdfDocument from "../../UTILS/pdfGenerator";



let orderId

let hostName = typeof window !== "undefined" && window.location.hostname
let testName = typeof window !== "undefined" && window.location.hostname && hostName.includes("localhost")

const bccList = ['rex@redrootscapital.com', 'sam@redrootscapital.com', 'griffin@redrootscapital.com'];

const toList = ['sam@redrootscapital.com', 'griffin@redrootscapital.com']

const userBcc = "rex@redrootscapital.com"


const emailJsConfigs = {
  USER_ID: "user_2Bq5Rvgr1IGkLbUwbjy7z",
  SERVICE_ID: "service_pb301o9", //admin@redrootscapital.com
};

const formatPrice = (price) => {
  return format(price, {
    showDecimals: "NEVER",
  });
};

const getFieldToUser = ({ option, itemPrice, numOfUnit, categoryName }) => {

  let htmlElement = "";
  if (categoryName === "Vinyl Upgrades " || categoryName === "Discount ") {
    if (option?.price === 0) {
      htmlElement += ``
    }
    else (option?.value).filter(Boolean).forEach((item) => {
      htmlElement += `<tr>
      <td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;"></td>
      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"> ${item?.value} </td>
      <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;"> $ ${formatPrice(item?.price) || 0} </td>
      <td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;">
      <span>Notes</span>: ${""}
      </td>
    </tr>
    `
    });
  }
  else if (categoryName === "Windows " || categoryName === "Additional Add Ons " || categoryName === "Lighting ") {
    if (option == null || option?.numOfUnit === 0 || itemPrice === 0) {
      return htmlElement = `<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;"> </td>
      <td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;">  </td>
      `;
    }
    else {
      htmlElement = `<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;">${option?.name} ${numOfUnit} </td>
      <td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;"> $${formatPrice(
        itemPrice
      )} </td>
      `;
    }
  }
  else {
    htmlElement = `<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;">${option?.name} ${numOfUnit} </td>
    <td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;"> $${formatPrice(
      itemPrice
    )} </td>
    `;
  }
  return htmlElement;
};
const Apply = ({ data }) => {
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

  const markupValue = useSelector(state => state.priceFactor.markup.data);
  const MARK_UP_MULTIPLIER = markupValue.Notes
  const userFilledData = useSelector((state) => state.user.userFilledData);
  const customizationPrice = useSelector(
    (state) => state.customization.customization
  );

  const finalPrice = getTotalCustomizationPrice(customizationPrice);
  const floorplan = useSelector((state) => state.floorplan.floorplan);
  const lot = selectorLot.lotData;
 
  const Plan = selectorLot.planData;
 
  useEffect(() => {
    setDetails(userFilledData);
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
    let errors = formValidator(userDetails);
    const baseConstructionCosts = getBaseContructionCostsPerSqureFit(Plan);
    const totalPrice = formatPrice(
      (Plan?.floorplanPrice + baseConstructionCosts) * MARK_UP_MULTIPLIER +
      (finalPrice || 0)
    )
    

    const responseData = await saveOrderData({
      fields: {
        email: userDetails?.email,
        orderInfo: сustomizations,
        userInfo: userDetails,
        selectedPlan: selectorLot,
        price: {
          finalPrice: totalPrice,
          floorPlanCost: formatPrice(Plan.floorplanPrice)
        },

        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        phoneNumber: userDetails?.phoneNumber,
        city: userDetails?.city,
        state: userDetails?.state,
        zipCode: userDetails?.zipCode,
        county: userDetails?.country,
        finalPrice:Plan?.finalPrice,
        floorPlanCost:Plan?.floorplanPrice ,
        homeType:Plan?.homeType,
       manufacturerName:Plan?.manufacturerName,
        sqFT: Plan['sq Ft'] , 
      },
      

      typecast: true
    })
    orderId = responseData.fields.orderID
    if (Object.keys(errors).length) {
      setDetails({ ...userDetails, errors });
      dispatch(setUserInforModal(true));
      return;
    }
    try {
      setIsLoading(true);
      let html = ``;
      let price = 0;
      html += `<h1 style="text-align: center"> Your order number is ${orderId} </h1>`
      html += `<h3 style="border: 1px solid #000000; padding: 10px; text-align: center;" > Please note the pricing does not include: Steps, driveway, septic, Well, seed and straw, landscaping, & all other unforeseen site conditions (ex. Limestone under your ground), etc. </h3>`;
      сustomizations?.forEach((c) => {
        html += `<h3 style="text-align: center; border: 1px solid #dddddd; margin:0; padding:10px; background: #8e8e8e">${c.name}</h3>`;
        html +=
          '<table style="border-collapse: collapse; width: 100% ; margin-bottom:30px">';
        c.underCategories.forEach((cc) => {
          let options = cc.options.filter((o) => {
            if (Array.isArray(cc.active)) {
              return cc.active.includes(o.id);
            }
            return cc.name === "Flooring" || o.id === cc.active;
          });

          options.map((option) => {
            price += option?.Price;

            if (option.noOfUnit && option.noOfUnit < 1) {
              return;
            }
            let numOfUnit = option.noOfUnit
              ? `<div> Number Of Quantity: ${option.noOfUnit}</div>`
              : "";

            let itemPrice = option?.price;
            if (option.noOfUnit) {
              itemPrice = itemPrice * option.noOfUnit;
            }
            else if (option.noOfUnit === 0) {
              itemPrice = 0
            }
            let categoryName = cc.name.replace("(Optional)", "");
            let shownFieldToUser = getFieldToUser({
              option,
              itemPrice,
              numOfUnit,
              categoryName,
            });
            if (categoryName != "Discount " && categoryName != "Vinyl Upgrades ") {
              html += '<tr >';
              html += `<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;">${categoryName}</td>`;
              html += `${shownFieldToUser}`;
              html += '<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;">';
              html += `<span>Notes</span>: ${cc.notes || ""}`;
              html += "</td>";
              html += "</tr>";
            }
            else if (categoryName == "Vinyl Upgrades ") {
              html += '<tr >';
              html += `<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;">${categoryName}</td>`;
              html += `<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;"> </td>`;
              html += `<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;"> </td>`;
              html += '<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;">';
              html += `<span>Notes</span>: ${cc.notes || ""}`;
              html += "</td>";
              html += `${shownFieldToUser}`;

            }
            else {
              html += ""
            }
          });
        });
        html += "</table>";

      });
      сustomizations?.forEach((c) => {
        c.underCategories.filter((cc) => {
          if (cc?.name === "Discount (Optional)") {
            (cc.options?.forEach((item) => {
              if (item.price != 0) {
                html += `<h3 style="text-align: center; border: 1px solid #dddddd; margin:0; padding:10px; background: #8e8e8e">${cc.name}</h3>`;
                html +=
                  '<table style="border-collapse: collapse; width: 100% ; margin-bottom:30px">';

                const option = item.value
                option?.filter(Boolean).map((item) => {
                  html += '<tr >';
                  html += `<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;">Discount</td>`;
                  html += ` 
                <td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;"> ${item?.value} </td> 
                <td style="border: 1px solid #dddddd; text-align: right;  padding: 8px;">  $ ${formatPrice(item?.price)}  </td>
              `
                  html += '<td style="border: 1px solid #dddddd; text-align: left;  padding: 8px;">';
                  html += `<span>Notes</span>: ${cc.notes || ""}`;
                  html += "</td>";
                  html += "</tr>"

                })
                html += "</table>";
              }

            }))
          }
        })

      });
      html += `<h5 style="text-align: center;">Misc Notes</h5>`;
      html +=
        '<ul style="list-style: none; text-align: center;  padding-left: 0;">';
      html += '<li style="text-align: center; margin-left: 0;">';
      html += `Customer Name :${userDetails.firstName}  ${userDetails.lastName}`;
      html += "</li>";
      html += '<li style="text-align: center; margin-left: 0;">';
      html += `Phone Number :${userDetails.phoneNumber} `;
      html += "</li>";

      if
        (userDetails.zipCode && userDetails.state) {
        html += '<li style="text-align: center; margin-left: 0;">';
        html += `Address:1234 Cherry Lane City , ${userDetails.state} , ${userDetails.zipCode}`;
        html += "</li>"
      };

      html += "</ul>";

      let financeBlock = ``;
      if (floorplan.floorplanName === "Fairmont") {
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
      } else if (floorplan.floorplanName === "MHE") {
        financeBlock +=
          '<h3 style="text-align: center;">Financing Information:</h3>';
        financeBlock += `<p style="text-align: center;margin:0;">Manufacturer: Manufactured Housing Enterprises, Inc</p>`;
        financeBlock +=
          '<ul style="list-style: none; text-align: center;  padding-left: 0;">';
        financeBlock += '<li style="text-align: center; margin-left: 0;">';
        financeBlock += `Model, Size: ${floorplan.title} ${floorplan.width} x ${floorplan.length} <b>MHE Builder</b>`;
        financeBlock += "</li>";
        financeBlock +=
          '<li style="text-align: center; margin-left: 0;">Name of Retailer: GS Courtyard Homes: 510 N. Range St. Westport, IN 47283</li>';
        financeBlock += "</ul>";
      }

      let lotName = `№${lot.id}`;
      let planName = `${Plan.Floorplan}`;

      const obj = {
        ...e,
        lot: lotName,
        Plan: planName,
        customization: html,
        financeBlock: financeBlock,
        to: testName ? [] : toList,
        bcc: testName ? ["testingrrc.bcc@mailinator.com"] : userBcc
      };

      const reqData = await downloadPdfDocument({ rootElementId: html, downloadFileName: "test.js" });


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
            Plan.otherPhotos.map(
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
          floorplan_name: Plan.floorplanName,
          floorplan_area: Plan['sq Ft'],
          floorplan_bedrooms: Plan.bathCount,
          floorplan_bathrooms: Plan.bedCount,
          floorplan_price: formatPrice(Plan.floorplanPrice),
          customizations_price: formatPrice(price),
          total_price: totalPrice,
          customizatoins: html,
          financeBlock: financeBlock,
          content: reqData,
          to: userDetails.email,
          bcc: testName ? ["testingrrc.bcc@mailinator.com"] : bccList

        },

        emailJsConfigs.USER_ID
      );

  
      setCompleted(true);
      window &&
        window.dataLayer &&
        window.dataLayer.push({ event: "ApplyFormSubmitted" });
    } catch (error) {
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
        orderId={orderId}
      />
    </>
  );
};

export default Apply;
