import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { createRef, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Wrapper, Content } from "./Normal.styles";
import { calculateNormal } from "./../../compute/Normal"
import { removeGamma } from "../../compute/ColorSpace";

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
        const res = calculateNormal([r.current.value, g.current.value, b.current.value]);
        setState(res);
        if (callback !== undefined) {
            callback(res);
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
                </MathJaxContext>
                </div>
            </Content>
        </Wrapper>
    )
}

export default Normal;