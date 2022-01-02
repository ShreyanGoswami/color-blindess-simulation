import React, { createRef, useState } from "react";
import { Button } from "react-bootstrap";
import Spinner from "./../Spinner";
import * as Plotly from 'plotly.js';

import { Wrapper, Content } from "./Simulation.styles";

import { convertLMSToRGB, convertRGBToLMS, convertToRGB, simulateProtanopia } from "../../compute/ColorSpace";
import { calculatePlane } from "../../compute/Normal";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { configFor3DScatterPlot } from "../../utils/graphPlotHelper";

const Simulation = ({ title, data, invariant1, invariant2, white, mathConfig }) => {

    const textToBeDisplayed = [];
    const canvas = createRef(null);
    const canvasAfter = createRef(null);
    const [loading, setLoading] = useState(false);

    const img = createRef(new Image());

    const handleImage = (e) => {
        if (e.target.files && e.target.files.item(0)) {
            img.current.src = URL.createObjectURL(e.target.files[0]);
        }
    }

    const drawImage = () => {
        const ctx = canvas.current.getContext('2d');
        ctx.canvas.height = img.current.height;
        ctx.canvas.width = img.current.width;
        ctx.drawImage(img.current, 0, 0);

        const h = img.current.height;
        const w = img.current.width;
        const imgData = ctx.getImageData(0, 0, w, h).data;

        const res = convertRGBToLMS(imgData);
        const L = res[1];
        const M = res[2];
        const S = res[3];
        
        const [data, layout, config] = configFor3DScatterPlot([L],[M],[S],["Original"])
        Plotly.newPlot("visualize-simulation", data, layout, config);
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
        Plotly.newPlot("visualize-simulation", data, layout, config);
        
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
                <MathJaxContext config={mathConfig}>
                    <MathJax>
                        <span>{`$$\\overrightarrow{Q}\\times\\overrightarrow{N}=0$$`}</span>
                        <span>{`$$\\Rightarrow L'= - \\frac{My + Sz}{x}$$`}</span>
                <p>Since we have two planes we follow the brlow method for choosing one plane over another. Let Q<span>{`$(L_Q,M_Q,S_Q)$`}</span> be the input color, W($L_W,M_W,S_W$) be the neutral white then </p>
                If <span>{`$\\frac{S_Q}{M_Q} \\lt \\frac{S_W}{M_W}$`}</span> then the plane described by white and 575nm else pick the plane described by white and 475nm.
                </MathJax>
                </MathJaxContext>

                <div>You can upload an image below to visualise how it would look like to a protanope.</div>
                <div className="center-items">
                    <canvas ref={canvas} className="canvas"></canvas>
                    <canvas ref={canvasAfter} className="canvas"></canvas>
                </div>
                <img ref={img} onLoad={drawImage} alt="" hidden></img>
                <div className="gap-below mx-auto">
                    <input className="col col-md-6 gap-below-responsive" type="file" id="formFile" onChange={handleImage} />
                    <Button className="col col-md-2" onClick={simulate} disabled={loading}>Simulate</Button>
                </div>
                <div id="visualize-simulation" className="col-lg-11 col-md-11 col-10 col-centered gap-below center-items"></div>
                <p>
                One thing to note about the simulation here is that an sRGB color, after protanopic projection, would be outside the gamut. You can visually convince yourself of this by toggling the “sRGB gamut” switch in the 3D plot above, and see that when projecting the gamut to the plane, some colors will be outside the gamut, meaning that some colors that protanopes can see won’t be precisely represented in the sRGB color space.
                </p>
                <p>
                To deal with that, we simply clamp the values to the [0, 255] range, essentially performing a gamut mapping using the Absolute Colorimetric <a href="https://creativepro.com/out-of-gamut-realizing-good-intentions-with-rendering-intents/">rendering intent</a>. In order to better display a protanopia-simulated image on a sRGB display, some color-blindness simulations choose display primaries and white to be isochromes. For instance, <a href="http://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf">Vienot et al. (1999)</a> use the display black (K), blue (B), and white (W) of a display gamut as isochromes to derive the projection plane, which is the diagonal plane formed by KBW, which is also guaranteed to pass through the yellow point of the gamut. While the actual simulated colors are slightly distorted in theory compared to using isochromes that are experimentally derived, the advantage of this approach is that more colors in the gamut, after projection, can still be in the gamut and thus displable (see the paragraph before the Conclusion section).
                </p>
            </Content>
            {loading && <Spinner />}
        </Wrapper>
    )

}

export default Simulation;