import React, { useEffect, useState } from "react";
import { createWrapper } from "next-redux-wrapper";
import initStore from "../store";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
import "../public/fonts/stylesheet.css";
import "./index.css";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import Popup from "../components/UI/Popup/Popup";
import TimePopup from "../components/TimePopup/TimePopup";
import { useSelector } from "react-redux";
import { GTMPageView } from "../UTILS/gtm";
import { ToastContainer, toast } from 'react-toastify';

import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-NNW6Q6X",
};

const MyApp = ({ Component, pageProps }) => {
  let userCompany
  if (typeof window !== 'undefined') {
    userCompany = localStorage.getItem('companyName')
  }
  const router = useRouter();
  const { company } = router.query

  const selectorPopup = useSelector((state) => state.popup.popup);

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
    const handleRouteChange = (url) => GTMPageView(url);
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  let content = (
    <>
      <Head>
        <title>Build your home | Red Roots Capital</title>
      </Head>
      <ToastContainer />
      {selectorPopup && (
        <Popup TimePopup>
          <TimePopup />
        </Popup>
      )}

      <Component {...pageProps} />
      {/* <script src="https://cdn.jsdelivr.net/gh/geocodezip/v3-utility-library@master/archive/maplabel/src/maplabel.js"/> */}
    </>
  );

  useEffect(() => {
    if (!userCompany && router.pathname == "/") router.replace("/");
    else if (!userCompany && router.pathname !== `/${userCompany}`) router.replace('/');
    else if (!userCompany && router.pathname !== `/${userCompany}/select_floorplan` ||
      router.pathname !== `/${userCompany}/detailed_floorplan` ||
      router.pathname !== `/${userCompany}/customize_lnterior` ||
      router.pathname !== `/${userCompany}/apply`
    ) router.replace('/')

    else if (userCompany && router.pathname !== "/") router.replace(`/${userCompany}`);
    else if (userCompany && router.pathname == "/") router.replace(`/${userCompany}`);

    router.prefetch(`/${company}/select_floorplan`);
    router.prefetch(`/${company}/detailed_floorplan`);
    router.prefetch(`/${company}/customize_lnterior`);
    router.prefetch(`/${company}/apply`);
  }, []);

  return content;
};

export const wrapper = createWrapper(initStore, { debug: !true });

export default wrapper.withRedux(MyApp);
