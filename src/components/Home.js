import React from "react";
import Header from "./Header";

import { Wrapper } from "./Home.styles";
import Info from "./Info";
import Normal from "./Normal";
import LMS from "./LMS";
import Protanopia from "./Protanopia";

import data from "../assets/data";
import Simulation from "./Simulation";

import test from "./../assets/test1.jpg"

const Home = () => {

    const mathJaxConfig = {
        loader: { load: ["[tex]/html"] },
        tex: {
          packages: { "[+]": ["html"] },
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"]
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"]
          ]
        }
      };

    const getId = (id, data) => {
        for (let i=0;i<data.length;i++) {
            if (data[i]["id"] === id) {
                return i;
            }
        }
    }

    const title = "title";
    const text = "text";
    const LMS1 = [0.05235866, 0.14667038, 0.95667258];
    const LMS2 = [0.9847601, 0.87614013, 0.00165276]
    const neutralWhite = [1.027,0.9847,0.9182]

    const pixel = [0,0,0];

    return (<Wrapper className="container">
        <Header></Header>
        <Info title={data[getId(1, data)][title]} data={data[getId(1, data)][text]}></Info>
        <Info title={data[getId(3, data)][title]} data={data[getId(3, data)][text]}></Info>
        <Info title={data[getId(4, data)][title]} data={data[getId(4, data)][text]}></Info>
        <Normal title={data[getId(5, data)][title]} data={data[getId(5, data)][text]} mathConfig={mathJaxConfig} lms1={LMS1} lms2={LMS2} white={neutralWhite}></Normal>
        <LMS title={data[getId(7, data)][title]} data={data[getId(7, data)][text]} pixel={pixel} mathConfig={mathJaxConfig}></LMS>
        <Simulation title={data[getId(10, data)][title]} data={data[getId(10, data)][text]} invariant1={LMS1} invariant2={LMS2} white={neutralWhite} config={mathJaxConfig}></Simulation>
        <Protanopia title={data[getId(11, data)][title]} data={data[getId(11, data)][text]} invariant1={LMS1} invariant2={LMS2} white={neutralWhite} imageForSimulation={test} config={mathJaxConfig}></Protanopia>
        <Info title={data[getId(12, data)][title]} data={data[getId(12, data)][text]}></Info>
    </Wrapper>);
}

export default Home;