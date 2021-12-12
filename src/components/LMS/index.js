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
            </Content>
        </Wrapper>
    )
}

export default LMS;