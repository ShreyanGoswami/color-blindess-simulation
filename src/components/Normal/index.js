
import React from "react";
import { Wrapper, Content } from "./Normal.styles";
import { calculateNormal, calculatePlane } from "./../../compute/Normal"
import Equation from "../Equation";

const Normal = ({ title, data, mathConfig, lms1, lms2, white }) => {

    const textToBeDisplayed = [];

    for (let i = 0; i < data.length; i++) {
        textToBeDisplayed.push(<p key={i}>{data[i]}</p>);
    }

    const normal1 = calculateNormal(white, lms1);
    const normal2 = calculatePlane(white, lms2);

    return (
        <Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content className="row">
                <h3 id="link-1">{title}</h3>
                {textToBeDisplayed}
                <div>
                    <p className="additional-info">Computed Normals</p>
                    <Equation values={normal1} mathConfig={mathConfig} />
                    <Equation values={normal2} mathConfig={mathConfig} />
                </div>
            </Content>
        </Wrapper>
    )
}

export default Normal;
