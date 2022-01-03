import React from "react";
import * as Plotly from 'plotly.js';

import { Wrapper, Content } from "./Locus.styles";

import xData from '../../assets/lData';
import yData from '../../assets/mData';
import zData from '../../assets/sData';
import { useEffect } from "react";

const Locus = () => {

    useEffect(() => {
        const trace = {
            x: xData,
            y: yData,
            z: zData,
            type: "scatter3d",
            mode: "lines+markers",
            line: {
                width: 6,
                color: 'rgb(127,127,127)'
            }
        }
    
        const data = [trace]
        Plotly.newPlot("visualize-locus", data);
    },[])

    return (
        <Wrapper>
            <Content>

                <div id="visualize-locus"></div>
            </Content>
        </Wrapper>
    )
}

export default Locus;