import React, { useState } from "react";
import Header from "./Header";

import { Wrapper } from "./Home.styles";
import Info from "./Info";
import Normal from "./Normal";
import LMS from "./LMS";
import Projection from "./Projection";
import Protanopia from "./Protanopia";

import data from "../assets/data";
import ColorSpace from "./ColorSpace";
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

    const [invariant, setInvariant] = useState([0,0,0]);
    const [pixel, setPixel] = useState([0,0,0]);

    const getId = (id, data) => {
        for (let i=0;i<data.length;i++) {
            if (data[i]["id"] === id) {
                return i;
            }
        }
    }

    const title = "title";
    const text = "text";

    return (<Wrapper className="container">
        <Header></Header>
        <Info title={data[getId(1, data)][title]} data={data[getId(1, data)][text]}></Info>
        <Info title={data[getId(2, data)][title]} data={data[getId(2, data)][text]}></Info>
        <Info title={data[getId(3, data)][title]} data={data[getId(3, data)][text]}></Info>
        <Info title={data[getId(4, data)][title]} data={data[getId(4, data)][text]}></Info>
        <Normal title={data[getId(5, data)][title]} data={data[getId(5, data)][text]} mathConfig={mathJaxConfig} callback={setInvariant}></Normal>
        <ColorSpace title={data[getId(6, data)][title]} data={data[getId(6, data)][text]} mathConfig={mathJaxConfig} callback={setPixel}/>
        <LMS title={data[getId(7, data)][title]} data={data[getId(7, data)][text]} pixel={pixel} mathConfig={mathJaxConfig}></LMS>
        <Projection title={data[getId(9, data)][title]} data={data[getId(9, data)][text]} pixel={pixel} invariant={invariant} mathConfig={mathJaxConfig}/>
        <Simulation title={data[getId(10, data)][title]} data={data[getId(10, data)][text]} invariant={invariant}></Simulation>
        <Protanopia title={data[getId(11, data)][title]} data={data[getId(11, data)][text]} invariant1={[0.05235866, 0.14667038, 0.95667258]} invariant2={[0.9847601, 0.87614013, 0.00165276]} neutralWhite={[1.027,0.9847,0.9182]} imageForSimulation={test}></Protanopia>
    </Wrapper>);
}

export default Home;