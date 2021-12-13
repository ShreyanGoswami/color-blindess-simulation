import React, { createRef, useState } from "react";
import { Button } from "react-bootstrap";
import Spinner from "./../Spinner";

import { Wrapper, Content } from "./Protonopia.styles";

import { convertLMSToRGB, convertRGBToLMS, simulateColorBlindness, convertToRGB, convertSingleRGBToLMS } from "../../compute/ColorSpace";
import { calculateNormal } from "../../compute/Normal";

const Protonopia = ({ title, data, invariant }) => {

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
    }

    const simulate = () => {
        setLoading(() => true);
        let ctx = canvas.current.getContext('2d');
        const h = img.current.height;
        const w = img.current.width;
        let updatedImage = convertRGBToLMS(ctx.getImageData(0, 0, w, h).data.slice(), h, w)
        console.log(invariant);
        const normal = (calculateNormal(convertSingleRGBToLMS(invariant)));
        console.log('Normal ' + normal);
        updatedImage = simulateColorBlindness(updatedImage, h, w, normal); // TODO check this

        updatedImage = convertLMSToRGB(updatedImage, h, w);

        updatedImage = convertToRGB(updatedImage, h, w);
        console.log('Finished simulation');

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
                <div className="gap-below mx-auto">
                    <input className="col col-md-6 gap-below-responsive" type="file" id="formFile" onChange={handleImage} />
                    <Button className="col col-md-2" onClick={simulate} disabled={loading}>Simulate</Button>
                </div>
                <p>In the same vein, you can supply an invariant point in Step 1 and try to simulate the other deficiencies.</p>
            </Content>
        </Wrapper>
    )

}

export default Protonopia;