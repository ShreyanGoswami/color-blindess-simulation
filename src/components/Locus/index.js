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
        const layout = {
            height: 500,
            paper_bgcolor: '#f8f9fa'
        }
        const data = [trace]
        Plotly.newPlot("visualize-locus", data, layout);
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

            const plane1 = {
                type: "mesh3d",
                x: [0.05235866,1.027,0],
                y: [0.14667038,0.9847,0],
                z: [0.95667258,0.9182,0],
                color:'rgb(233,207,187)',
                i: [0],
                j: [1],
                k: [2]
            }
            const plane2 = {
                type: "mesh3d",
                x: [0.9847601,1.027,0],
                y: [0.87614013,0.9847,0],
                z: [0.00165276,0.9182,0],
                color:'rgb(198,188,222)',
                opacity:0.75,
                i: [0],
                j: [1],
                k: [2]
            }
            const layout = {
                height: 500,
                paper_bgcolor: '#f8f9fa'
            }
            const data = [trace, plane1, plane2];
            Plotly.newPlot("visualize-locus", data, layout);
        } else {
            plotLocus();
        }
    }

    return (
        <Wrapper>
            <Content>
                <div className="controls">
                <FormCheck 
                type="switch"
                label="Show projection plane"
                onChange={(e)=>handleProjectionPlaneEnabled(e)}
                />
                <FormCheck 
                type="switch"
                label="Show Protanopia Locus"
                onChange={(e)=>handleProjectionPlaneEnabled(e)}
                />
                <FormCheck 
                type="switch"
                label="Show sRGB Gamut"
                onChange={(e)=>handleProjectionPlaneEnabled(e)}
                />
                </div>
                <div id="visualize-locus" className="col-lg-9 col-sm-5 long"></div>
            </Content>
        </Wrapper>
    )
}

export default Locus;