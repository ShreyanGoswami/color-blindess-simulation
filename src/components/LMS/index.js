import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";
import { convertSingleRGBToLMS } from "../../compute/ColorSpace";
import Equation from "../Equation";

import { Wrapper, Content } from "./LMS.styles";

const LMS = ({ title, data, pixel, mathConfig }) => {

    const textToBeDisplayed = [];

    for (let i = 0; i < data.length; i++) {
        textToBeDisplayed.push(<p key={i}>{data[i]}</p>);
    }

    const convertedValue = convertSingleRGBToLMS(pixel);

    return (
        <Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content>
                <h3>{title}</h3>
                {textToBeDisplayed}
                <Equation values={convertedValue} mathConfig={mathConfig} />
                <p>To transform from linear RGB to LMS, we use the matrix below. Ensure that the RGB value is in linear RGB space. Observe how the rows add up to 1 ensuring white in one color space is converted to white in another</p>
                <MathJaxContext version={3} config={mathConfig}>
                    <MathJax>
                        <span>{`$$ \\begin{bmatrix} 0.31399022 & 0.63951294 & 0.04649755 \\\\ 0.15537241 & 0.75789446 & 0.08670142 \\\\ 0.01775239 & 0.10944209 & 0.87256922 \\end{bmatrix} $$`}</span>
                    </MathJax>
                </MathJaxContext>
                <p>To transform from LMS to linear RGB, we need to use the inverse of the above matrix.</p>
            </Content>
        </Wrapper>
    )
}

export default LMS;