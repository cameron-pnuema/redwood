import { staticImagesPlans } from "../UTILS/static-images";
import store from "../store";

//27066
const plans = [
  {
    id: 1,
    img: "/plans/barton-II-mhe/1_Barton_II_Front_of_House.jpg",
    rums: 6,
    toilet: 3,
    kitchenSize: 12,
    bedrooms: 3,
    bathrooms: 2,
    ceil: 4,
    s: 1200,
    images: Object.values(staticImagesPlans.BARTON_II_MHE),
    price: null,
    title: "Barton II",
    // manufacturer: "MHE",
    type: "typeA",
  },
  {
    id: 2,
    img: "/plans/davinci-fairmont/newport_front_house.jpg",
    rums: 9,
    toilet: 5,
    kitchenSize: 5,
    bedrooms: 3,
    bathrooms: 2,
    ceil: 4,
    s: 1500,
    images: Object.values(staticImagesPlans.NEWPORT_FAIRMONT),
    price: null,
    title: "Newport",
    // manufacturer: "Fairmont",
    type: "typeA",
  },

  {
    id: 3,
    img: "/plans/franklin-fairmont/img1.webp",
    rums: 7,
    toilet: 2,
    kitchenSize: 5,
    bedrooms: 3,
    bathrooms: 2,
    ceil: 2.6,
    s: 1500,
    images: Object.values(staticImagesPlans.GLENN_FOREST_MHE),
    price: null,
    title: "Glenn Forest",
    // manufacturer: "MHE",
    type: "typeA",
  },

  {
    id: 4,
    img: "/plans/glenn-creek-mhe/woodland_bay_front_of_home.jpg",
    rums: 2,
    toilet: 2,
    kitchenSize: 8,
    bedrooms: 2,
    bathrooms: 2,
    ceil: 2.8,
    s: 1200,
    images: Object.values(staticImagesPlans.WOODLAND_NAY_FAIRMONT),
    price: null,
    title: "Woodland Bay",
    // manufacturer: "Fairmont",
    type: "typeA",
  },
  {
    id: 5,
    img: "/plans/barton-mhe/1_Barton_Front_of_House.jpg",
    rums: 5,
    toilet: 5,
    kitchenSize: 7,
    bedrooms: 3,
    bathrooms: 2,
    ceil: 3,
    s: 1200,
    images: Object.values(staticImagesPlans.BARTON_I_MHE),
    price: null,
    title: "Barton",
    // manufacturer: "MHE",
    type: "typeA",
  },
  {
    id: 6,
    img: "/plans/rebud-mhe/1_Redbud_Front_of_House.jpg",
    rums: 4,
    toilet: 1,
    kitchenSize: 9,
    bedrooms: 3,
    bathrooms: 2,
    ceil: 2.4,
    s: 2000,
    images: Object.values(staticImagesPlans.REBUD_MHE),
    price: null,
    title: "Redbud",
    // manufacturer: "MHE",
    type: "typeA",
  },
  {
    id: 7,
    img: "/plans/barton2-mhe/img1.webp",
    rums: 5,
    toilet: 1,
    kitchenSize: 9,
    bedrooms: 4,
    bathrooms: 2,
    ceil: 2.4,
    s: 2000,
    images: Object.values(staticImagesPlans.GOLDBERG_FAIRMONT),
    price: null,
    title: "Goldberg",
    // manufacturer: "Fairmont",
    type: "typeA",
  },


  {
    id: 8,
    img: "/plans/barton-II-mhe/1_Barton_II_Front_of_House.jpg",
    rums: 6,
    toilet: 3,
    kitchenSize: 12,
    bedrooms: 3,
    bathrooms: 2,
    ceil: 4,
    s: 1200,
    images: Object.values(staticImagesPlans.BARTON_II_MHE),
    price: null,
    title: "Barton Creek II",
    // manufacturer: "MHE",
    type: "typeA",
  },


  {
    id: 9,
    img: "/plans/franklin-fairmont/img1.webp",
    rums: 7,
    toilet: 2,
    kitchenSize: 5,
    bedrooms: 3,
    bathrooms: 2,
    ceil: 2.6,
    s: 1500,
    images: Object.values(staticImagesPlans.GLENN_FOREST_MHE),
    price: null,
    title: "Glenn Creek",
    // manufacturer: "MHE",
    type: "typeA",
  },


  {
    id: 10,
    img: "/plans/barton-mhe/1_Barton_Front_of_House.jpg",
    rums: 5,
    toilet: 5,
    kitchenSize: 7,
    bedrooms: 3,
    bathrooms: 2,
    ceil: 3,
    s: 1200,
    images: Object.values(staticImagesPlans.BARTON_I_MHE),
    price: null,
    title: "Barton Creek",
    // manufacturer: "MHE",
    type: "typeA",
  },
  {
    id: 11,
    img: "/plans/rebud-mhe/1_Redbud_Front_of_House.jpg",
    rums: 4,
    toilet: 1,
    kitchenSize: 9,
    bedrooms: 3,
    bathrooms: 2,
    ceil: 2.4,
    s: 2000,
    images: Object.values(staticImagesPlans.REBUD_MHE),
    price: null,
    title: "Redbud",
    // manufacturer: "MHE",
    type: "typeA",
  },

];

const setPlans = () => {
  const data = store().getState().priceFactor.floorPlan.data;
  console.log(data,'xxxxxxxxxxxxx');
  plans.forEach((plan) => {
    data.forEach((floor) => {
      const { Floorplan, Manufacturer, Price,HomeType } = floor.fields;
      if (plan.title === Floorplan) {
        plan.price = Price;
        plan.homeType=HomeType
        plan.manufacturer=Manufacturer
      }
    });
  });
  return plans
};
export default setPlans;
