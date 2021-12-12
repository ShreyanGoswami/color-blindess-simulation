import React, { createRef } from "react";
import { Button } from "react-bootstrap";

import { Wrapper, Content } from "./Simulation.styles";

import { convertLMSToRGB, convertRGBToLMS, simulateColorBlindness, convertToRGB, convertSingleRGBToLMS, test, removeGamma } from "../../compute/ColorSpace";
import { calculateNormal } from "../../compute/Normal";

const Simulation = ({ title, data, normal }) => {

    const textToBeDisplayed = [];
    const canvas = createRef(null);
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
        const ctx = canvas.current.getContext('2d');
        const h = img.current.height;
        const w = img.current.width;
        let updatedImage = convertRGBToLMS(ctx.getImageData(0,0,w,h).data.slice(), h, w)
        
        normal = (calculateNormal(convertSingleRGBToLMS(normal)));
        console.log('Normal ' + normal);
        updatedImage = simulateColorBlindness(updatedImage, h, w, normal); // TODO check this
        
        updatedImage = convertLMSToRGB(updatedImage, h, w);

        updatedImage = convertToRGB(updatedImage, h, w);
        console.log('Finished simulation');
        const simulatedImage = new ImageData(Uint8ClampedArray.from(updatedImage), w, h);
        ctx.putImageData(simulatedImage, 0, 0);
    }

    for (let i = 0; i < data.length; i++) {
        textToBeDisplayed.push(<p key={i}>{data[i]}</p>);
    }

    return (
        <Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content className="row">
                <h3>{title}</h3>
                {textToBeDisplayed}
                <canvas ref={canvas}></canvas>
                <img ref={img} onLoad={drawImage} alt="" hidden></img>
                <div className="mb-3">
                    <input className="form-control" type="file" id="formFile" onChange={handleImage} />
                </div>
                <Button onClick={simulate}>Simulate</Button>
            </Content>
        </Wrapper>
    )

}

export default Simulation;