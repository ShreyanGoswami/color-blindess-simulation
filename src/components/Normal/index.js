import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { createRef, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Wrapper, Content } from "./Normal.styles";
import { calculateNormal } from "./../../compute/Normal"

const Normal = ({ title, data, mathConfig, callback }) => {

    const [state, setState] = useState([0, 0, 0]);
    const r = createRef(null);
    const g = createRef(null);
    const b = createRef(null);


    const textToBeDisplayed = [];

    for (let i=0;i<data.length;i++) {
        textToBeDisplayed.push(<p key={i}>{data[i]}</p>);
    }

    const computeNormal = () => {
        // TODO check empty
        const invariant = [r.current.value, g.current.value, b.current.value];
        const res = calculateNormal(invariant);
        setState(res);
        if (callback !== undefined) {
            callback(invariant);
        }
    }

    return (
        <Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content className="row">
                <h3>{title}</h3>
                {textToBeDisplayed}
                <div className="input-group input-group-sm text-center">
                    <InputGroup className="col col-lg-2">
                        <InputGroup.Text id="basic-addon1">R</InputGroup.Text>
                        <FormControl key="red"
                            placeholder={state[0]} ref={r}/>
                    </InputGroup>
                    <InputGroup className="col col-lg-2">
                        <InputGroup.Text id="basic-addon1">G</InputGroup.Text>
                        <FormControl key="green" placeholder={state[1]} ref={g}/>
                    </InputGroup>
                    <InputGroup className="col col-lg-2">
                        <InputGroup.Text id="basic-addon1">B</InputGroup.Text>
                        <FormControl key="blue" placeholder={state[2]} ref={b}/>
                    </InputGroup>
                    <Button onClick={computeNormal}>Calculate</Button>
                </div>
                <div>
                <MathJaxContext version={3} config={mathConfig} hideUntilTypeset={"first"}>
                    <p className="additional-info">Computed Normal</p>
                    <MathJax inline dynamic>
                    <span>{`$$ (${state[0]}) \\hat{i} + (${state[1]}) \\hat{j} + (${state[2]}) \\hat{k} $$`}</span>
                    </MathJax>
                    <p><b>Note: The normal calculated in this step is in the RGB color space. You might think that we can transform the normal into LMS color space and then perform the simulation. However, that would not be correct. The correct step would be to convert this color into LMS space and then compute the normal. Can you think why?</b></p>
                </MathJaxContext>
                </div>
            </Content>
        </Wrapper>
    )
}

export default Normal;