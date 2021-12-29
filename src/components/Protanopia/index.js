import React, { createRef, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as Plotly from 'plotly.js';

import { Wrapper, Content } from "./Protonopia.styles";

import { convertLMSToRGB, convertRGBToLMS, convertToRGB, simulateProtanopia} from "../../compute/ColorSpace";
import { calculatePlane } from "../../compute/Normal";
import { configFor3DScatterPlot } from "../../utils/graphPlotHelper";

const Protanopia = ({ title, data, imageForSimulation, invariant1, invariant2, white }) => {

    const textToBeDisplayed = [];
    const canvas = createRef(null);
    const canvasAfter = createRef(null);
    const img = createRef(new Image());

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        img.current.src = imageForSimulation;
    },[img, imageForSimulation]);

    const drawImage = () => {
        const ctx = canvas.current.getContext('2d');
        ctx.canvas.height = img.current.height;
        ctx.canvas.width = img.current.width;
        ctx.drawImage(img.current, 0, 0);

        // Plot here
        const h = img.current.height;
        const w = img.current.width;
        const imgData = ctx.getImageData(0, 0, w, h).data;

        const res = convertRGBToLMS(imgData);
        const L = res[1];
        const M = res[2];
        const S = res[3];
        const [data, layout, config] = configFor3DScatterPlot([L],[M],[S], ["Original"])
        Plotly.newPlot("visualize-ishihara", data, layout, config);
    }

    const simulate = () => {
        setLoading(() => true);
        let ctx = canvas.current.getContext('2d');
        const h = img.current.height;
        const w = img.current.width;

        const normal1 = calculatePlane(white, invariant1);
        const normal2 = calculatePlane(white, invariant2);
        let [updatedImage, L, M, S] = convertRGBToLMS(ctx.getImageData(0, 0, w, h).data)
        const res = simulateProtanopia(updatedImage, h, w, normal1, normal2, white);
        updatedImage = res[0];
        const lConverted = res[1];
        const mConverted = res[2];
        const sConverted = res[3];

        updatedImage = convertLMSToRGB(updatedImage, h, w);

        updatedImage = convertToRGB(updatedImage, h, w);
        ctx = canvasAfter.current.getContext('2d');
        ctx.canvas.height = img.current.height;
        ctx.canvas.width = img.current.width;
        const simulatedImage = new ImageData(Uint8ClampedArray.from(updatedImage), w, h);

        ctx.putImageData(simulatedImage, 0, 0);
        
        const [data, layout, config] = configFor3DScatterPlot([L, lConverted], [M, mConverted], [S, sConverted], ["Original", "Simulated"], ['rgb(188,195,113)','rgb(87,128,161)']);
        Plotly.newPlot("visualize-ishihara", data, layout, layout,config);
        
        setLoading(() => false);
    }

    for (let i = 0; i < data.length; i++) {
        textToBeDisplayed.push(<p key={i}>{data[i]}</p>);
    }
    
    return (
        <Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content className="row">
                <h3>{title}</h3>
                {textToBeDisplayed}
                <div className="center-items">
                    <canvas ref={canvas} className="canvas"></canvas>
                    <canvas ref={canvasAfter} className="canvas"></canvas>
                </div>
                <img ref={img} onLoad={drawImage} alt="" hidden></img>
                <div className="gap-below mx-auto center-items">
                    <Button className="col col-md-2" onClick={simulate} disabled={loading}>Simulate</Button>
                </div>
                <div id="visualize-ishihara" className="col-lg-11 col-md-11 col-10 col-centered gap-below center-items"></div>
            </Content>
        </Wrapper>
    )

}

export default Protanopia;