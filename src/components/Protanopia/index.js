import React, { createRef, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { Wrapper, Content } from "./Protonopia.styles";

import { convertLMSToRGB, convertRGBToLMS, convertToRGB, simulateProtanopia} from "../../compute/ColorSpace";
import { calculatePlane } from "../../compute/Normal";

const Protanopia = ({ title, data, imageForSimulation, invariant1, invariant2, white }) => {

    const textToBeDisplayed = [];
    const canvas = createRef(null);
    const canvasAfter = createRef(null);
    const [loading, setLoading] = useState(false);

    const img = createRef(new Image());

    useEffect(() => {
        img.current.src = imageForSimulation;
    },[img, imageForSimulation]);

    const drawImage = () => {
        const ctx = canvas.current.getContext('2d');
        ctx.canvas.height = img.current.height;
        ctx.canvas.width = img.current.width;
        ctx.drawImage(img.current, 0, 0);
    }

    const simulate = () => {
        setLoading(() => true);
        let ctx = canvas.current.getContext('2d');
        const h = img.current.height;
        const w = img.current.width;
        let updatedImage = convertRGBToLMS(ctx.getImageData(0, 0, w, h).data.slice(), h, w)
        
        const normal1 = calculatePlane(white, invariant1);
        const normal2 = calculatePlane(white, invariant2);

        updatedImage = simulateProtanopia(updatedImage, h, w, normal1, normal2, white);

        updatedImage = convertLMSToRGB(updatedImage, h, w);

        updatedImage = convertToRGB(updatedImage, h, w);
        ctx = canvasAfter.current.getContext('2d');
        ctx.canvas.height = img.current.height;
        ctx.canvas.width = img.current.width;
        const simulatedImage = new ImageData(Uint8ClampedArray.from(updatedImage), w, h);

        ctx.putImageData(simulatedImage, 0, 0);

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
                <p>In the same vein, you can supply an invariant color in Step 1 and try to simulate the other deficiencies. Remember to perform the simulation correctly identify a color that is the same for a trichromat and a dichroma.</p>
            </Content>
        </Wrapper>
    )

}

export default Protanopia;