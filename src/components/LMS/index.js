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
                <MathJaxContext version={3} config={mathConfig}>
                <p>
                    The matrix to convert from linear sRGB to XYZ is taken from <a href="http://www.brucelindbloom.com/index.html?WorkingSpaceInfo.html">www.brucelindbloom.com</a>
                    <MathJax>
                        <span>{`$$ \\begin{bmatrix} 0.4124564 & 0.3575761 & 0.1804375 \\\\ 0.2126729 & 0.75789446 & 0.0721750 \\\\ 0.0193339 & 0.1191920 & 0.9503041 \\end{bmatrix} $$`}</span>
                    </MathJax>
                </p>
                <MathJax>
                <p>
                    The matrix to convert from XYZ to LMS adapted to D65 illuminant is 
                </p>
                </MathJax>
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