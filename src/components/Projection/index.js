import { MathJaxContext, MathJax } from "better-react-mathjax";
import React from "react";

import { Wrapper, Content } from "./Projection.styles";

import { calculateNormal, projectColorOnNormal } from "../../compute/Normal";
import { convertSingleRGBToLMS } from "../../compute/ColorSpace";

const Projection = ({ title, data, invariant, pixel, mathConfig }) => {

    const textToBeDisplayed = [];

    for (let i = 0; i < data.length; i++) {
        textToBeDisplayed.push(<p key={i}>{data[i]}</p>);
    }
    const normal = calculateNormal(convertSingleRGBToLMS(invariant));
    const projectedValue = projectColorOnNormal(convertSingleRGBToLMS(normal), pixel);

    return (
        <Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content>
                <h3>{title}</h3>
                {textToBeDisplayed}
                <MathJaxContext version={3} config={mathConfig}>
                    <MathJax inline dynamic>
                        <span>{`$$ (${projectedValue[0]}) \\hat{i} + (${projectedValue[1]}) \\hat{j} + (${projectedValue[2]}) \\hat{k} $$`}</span>
                    </MathJax>
                </MathJaxContext>
            </Content>
        </Wrapper>
    )
}

export default Projection