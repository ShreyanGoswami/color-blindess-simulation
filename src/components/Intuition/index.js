import React from "react";

import { Wrapper, Content } from "./Intuition.styles";

const Intuition = ({ title, data, mathConfig }) => {

    const textToBeDisplayed = [];

    for (let i = 0; i < data.length; i++) {
        textToBeDisplayed.push(<p key={i}>{data[i]}</p>);
    }

    return (
        <Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content>
                <h3 id="link-1">{title}</h3>
                {textToBeDisplayed}
            </Content>
        </Wrapper>
    )

}

export default Intuition;