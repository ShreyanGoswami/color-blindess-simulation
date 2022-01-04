import React, {useEffect} from "react";

import { Wrapper, Content } from "./Locus.styles";

import { FormCheck } from "react-bootstrap";

import * as Plotly from 'plotly.js';

import xData from '../../assets/lData';
import yData from '../../assets/mData';
import zData from '../../assets/sData';

import pxData from "../../assets/pxData";
import pyData from "../../assets/pyData";
import pzData from "../../assets/pzData";

const Locus = () => {

    const handleProjectionPlaneEnabled = (e) => {
        const update = {visible: e.target.checked};
        Plotly.restyle("plot", update, [1,2]);
    }

    const displayProtanopiaLocus = (e) => {
        
    }

    const layout = {
        height: 800,
        name: 'Spectral locus',
        showlegend: true,
        legend: {
            x: 1,
            xanchor: 'right',
            y: 0.9,
        },
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        },
        uirevision: true,
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        scene: {
            camera: {
                projection: {
                    type: 'orthographic'
                }
            },
            // https://plotly.com/javascript/3d-axes/
            //aspectmode: 'cube',
            xaxis: {
                autorange: true,
                //range: [0, 1],
                zeroline: true,
                zerolinecolor: '#000000',
                zerolinewidth: 5,
                showspikes: false,
                title: {
                    text: 'L'
                }
            },
            yaxis: {
                autorange: true,
                zeroline: true,
                zerolinecolor: '#000000',
                zerolinewidth: 5,
                scaleanchor: 'x',
                showspikes: false,
                title: {
                    text: 'M'
                }
            },
            zaxis: {
                autorange: true,
                zeroline: true,
                zerolinecolor: '#000000',
                zerolinewidth: 5,
                showspikes: false,
                title: {
                    text: 'S'
                }
            },
        }
    };

    const lmsTrace = {
        x: xData,
        y: yData,
        z: zData,
        type: "scatter3d",
        mode: "lines+markers",
        line: {
            width: 2,
            color: '#000000'
        },
        marker: {
            size: 6,
            opacity: 1
        },
        visible:true
    }

    const protanopiaLocus = {
        x: pxData,
        y: pyData,
        z: pzData
    }

    const plane1 = {
        type: "mesh3d",
        x: [0.05235866, 1.027, 0],
        y: [0.14667038, 0.9847, 0],
        z: [0.95667258, 0.9182, 0],
        color: 'purpleColor',
        opacity: 0.3,
        i: [0],
        j: [1],
        k: [2],
        visible: false
    }
    const plane2 = {
        type: "mesh3d",
        x: [0.9847601, 1.027, 0],
        y: [0.87614013, 0.9847, 0],
        z: [0.00165276, 0.9182, 0],
        color: 'orangeColor',
        opacity: 0.3,
        i: [0],
        j: [1],
        k: [2],
        visible:false
    }

    const data = [lmsTrace, plane1, plane2, protanopiaLocus];

    useEffect(() => {
        Plotly.newPlot("plot", data, layout);
        console.log('Drawing');
    });

    return (
        <Wrapper>
            <Content>
                <div className="controls">
                    <FormCheck
                        type="switch"
                        label="Show projection plane"
                        onChange={(e) => handleProjectionPlaneEnabled(e)}
                    />
                    <FormCheck
                        type="switch"
                        label="Show Protanopia Locus"
                        onChange={(e) => displayProtanopiaLocus(e)}
                    />
                    <FormCheck
                        type="switch"
                        label="Show sRGB Gamut"
                        onChange={(e) => handleProjectionPlaneEnabled(e)}
                    />
                </div>
                {/* <LocusVisualizer isPlaneVisible={plane[i]} isProtanopeLocusVisible={false} isSRGBGamutVisible={false}></LocusVisualizer> */}
                <div id="plot"></div>
            </Content>
        </Wrapper>
    )
}

export default Locus;