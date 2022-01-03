import React from "react";
import * as Plotly from 'plotly.js';

import { Wrapper, Content } from "./Locus.styles";

import xData from '../../assets/lData';
import yData from '../../assets/mData';
import zData from '../../assets/sData';
import { configFor3DMesh } from "../../utils/graphPlotHelper";

import { useEffect } from "react";
import { FormCheck } from "react-bootstrap";

const Locus = () => {

    useEffect(() => {
       plotLocus();
    }, []);

    const plotLocus = () => {
        const trace = {
            x: xData,
            y: yData,
            z: zData,
            type: "scatter3d",
            mode: "lines+markers",
            line: {
                width: 3,
                color: 'rgb(127,127,127)'
            },
            marker: {
                size: 5
            }
        }
        const data = [trace]
        Plotly.newPlot("visualize-locus", data);
    }

    const handleProjectionPlaneEnabled = (e) => {
        if (e.target.checked) {
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

            const planeData = {
                type: "mesh3d",
                x: [0.05235866,0.9847601,1.027,0],
                y: [0.14667038,0.87614013,0.9847,0],
                z: [0.95667258,0.00165276,0.9182,0],
                i: [0,1],
                j: [2,2],
                k: [3,3]
            }
            const data = [trace, planeData];
            Plotly.newPlot("visualize-locus", data);
        } else {
            plotLocus();
        }
    }

    return (
        <Wrapper>
            <Content>
                <FormCheck 
                type="switch"
                label="Show projection plane"
                onChange={(e)=>handleProjectionPlaneEnabled(e)}
                />
                <div id="visualize-locus"></div>
            </Content>
        </Wrapper>
    )
}

export default Locus;