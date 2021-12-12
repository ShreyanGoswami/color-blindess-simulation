import React, { useState } from "react";
import Header from "./Header";

import { Wrapper } from "./Home.styles";
import Info from "./Info";
import Normal from "./Normal";
import LMS from "./LMS";
import Projection from "./Projection";

import data from "../assets/data";
import ColorSpace from "./ColorSpace";
import Simulation from "./Simulation";

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

    const [normal, setNormal] = useState([0,0,0]);
    const [pixel, setPixel] = useState([0,0,0]);

    const getId = (id, data) => {
        for (let i=0;i<data.length;i++) {
            if (data[i]["id"] === id) {
                return i;
            }
        }
    }

    return (<Wrapper className="container">
        <Header></Header>
        <Info title={data[getId(1, data)]["title"]} data={data[getId(1, data)]["text"]}></Info>
        <Info title={data[getId(2, data)]["title"]} data={data[getId(2, data)]["text"]}></Info>
        <Info title={data[getId(3, data)]["title"]} data={data[getId(3, data)]["text"]}></Info>
        <Info title={data[getId(4, data)]["title"]} data={data[getId(4, data)]["text"]}></Info>
        <Normal title={data[getId(5, data)]["title"]} data={data[getId(5, data)]["text"]} mathConfig={mathJaxConfig} callback={setNormal}></Normal>
        <ColorSpace title={data[getId(6, data)]["title"]} data={data[getId(6, data)]["text"]} mathConfig={mathJaxConfig} callback={setPixel}/>
        <LMS title={data[getId(7, data)]["title"]} data={data[getId(7, data)]["text"]} pixel={pixel} mathConfig={mathJaxConfig}></LMS>
        <Projection title={data[getId(9, data)]["title"]} data={data[getId(9, data)]["text"]} pixel={pixel} normal={normal} mathConfig={mathJaxConfig}/>
        <Simulation title={data[getId(10, data)]["title"]} data={data[getId(10, data)]["text"]} normal={normal}></Simulation>
    </Wrapper>);
}

export default Home;