import React, { useEffect, createRef } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import { Wrapper, Content } from "./Locus.styles";

import { FormCheck } from "react-bootstrap";

import * as Plotly from 'plotly.js';

import xData from '../../assets/lData';
import yData from '../../assets/mData';
import zData from '../../assets/sData';

import { calculatePlane, projectColorOnNormalForProtanopia } from "../../compute/Normal";


const Locus = ({ invariant1, invariant2, white }) => {

    const pxData = [];
    const pyData = [];
    const pzData = [];

    const rData = [];
    const gData = [];
    const bData = [];

    const l = createRef(null);
    const m = createRef(null);
    const s = createRef(null);

    const pX = []
    const pY = []
    const pZ = []
    const originalX = []
    const originalY = []
    const originalZ = []

    const displayProjectionPlane = (e) => {
        const update = { visible: e.target.checked };
        Plotly.restyle("plot", update, [1, 2]);
    }

    const displayProtanopiaLocus = (e) => {
        const update = { visible: e.target.checked };
        Plotly.restyle("plot", update, [3]);
    }

    const displaysRGBGamut = (e) => {
        const update = { visible: e.target.checked };
        Plotly.restyle("plot", update, [4]);
    }

    const project = () => {
        const plane1 = calculatePlane(white, invariant1);
        const plane2 = calculatePlane(white, invariant2);
        const original = [parseFloat(l.current.value),
        parseFloat(m.current.value),
        parseFloat(s.current.value)]
        originalX.length = 0;
        originalY.length = 0;
        originalZ.length = 0;
        originalX.push(original[0]);
        originalY.push(original[1]);
        originalZ.push(original[2]);

        const res = projectColorOnNormalForProtanopia(plane1,
            plane2,
            white,
            original);
        pX.length=0;
        pY.length=0;
        pZ.length=0;
        

        pX.push(res[0]);
        pY.push(res[1]);

        pZ.push(res[2]);

        const update = { visible: true };
        Plotly.restyle("plot", update, [5,6]);
    }

    const deriveProtanopiaLocus = () => {
        const plane1 = calculatePlane(white, invariant1);
        const plane2 = calculatePlane(white, invariant2);
        for (let i = 0; i < xData.length; i++) {
            const res = projectColorOnNormalForProtanopia(plane1, plane2, white, [xData[i], yData[i], zData[i]]);
            pxData.push(res[0]);
            pyData.push(res[1]);
            pzData.push(res[2]);
        }
    }

    deriveProtanopiaLocus();

    const layout = {
        height: 750,
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
        visible: true
    }

    const protanopiaLocus = {
        x: pxData,
        y: pyData,
        z: pzData,
        visible: false,
        type: "scatter3d",
        mode: "lines+markers",
        line: {
            width: 2,
            color: '#000000'
        },
        marker: {
            size: 6,
            opacity: 1
        }
    }

    const sRGB = {
        x: rData,
        y: gData,
        z: bData,
        visible: false,
        type: "scatter3d",
        mode: "lines",
        line: {
            width: 2,
            color: '#000000'
        }
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
        visible: false
    }
    const projectedPointTrace = {
        x: pX,
        y: pY,
        z: pZ,
        type: "scatter3d",
        mode: "markers",
        marker: {
            size: 6,
            opacity: 1
        },
        visible: false,
        color: "greenColor",
        name: "Simulated"
    };
    const originalPointTrace = {
        x: originalX,
        y: originalY,
        z: originalZ,
        type: "scatter3d",
        mode: "markers",
        marker: {
            size: 6,
            opacity: 1
        },
        visible: false,
        color: "blackColor",
        name: "Original"
    };


    const data = [lmsTrace, plane1, plane2, protanopiaLocus, sRGB, projectedPointTrace, originalPointTrace];

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
                        onChange={(e) => displayProjectionPlane(e)}
                    />
                    <FormCheck
                        type="switch"
                        label="Show Protanopia Locus"
                        onChange={(e) => displayProtanopiaLocus(e)}
                    />
                    <FormCheck
                        type="switch"
                        label="Show sRGB Gamut"
                        onChange={(e) => displaysRGBGamut(e)}
                    />
                    You can enter LMS values and see where the projection lies. Make sure to enable the projection plane so that you can see the projected point
                    <div className="input-group">
                        <InputGroup className="col col-sm-3">
                            <InputGroup.Text id="basic-addon1">L</InputGroup.Text>
                            <FormControl key="l" ref={l} />
                        </InputGroup>
                        <InputGroup className="col col-sm-3">
                            <InputGroup.Text id="basic-addon1">M</InputGroup.Text>
                            <FormControl key="m" ref={m} />
                        </InputGroup>
                        <InputGroup className="col col-sm-3">
                            <InputGroup.Text id="basic-addon1">S</InputGroup.Text>
                            <FormControl key="s" ref={s} />
                        </InputGroup>
                        <Button className="col col-sm-2" onClick={project}>Project</Button>

                    </div>
                </div>
                <div id="plot"></div>
            </Content>
        </Wrapper>
    )
}

export default Locus;