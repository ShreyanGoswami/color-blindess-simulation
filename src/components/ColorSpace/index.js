import React, { useState, createRef } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { InputGroup, FormControl, Button } from "react-bootstrap";

import { Wrapper, Content } from "./ColorSpace.styles";
import { removeGamma } from "../../compute/ColorSpace";

const ColorSpace = ({ title, data, callback, mathConfig }) => {

    const [state, setState] = useState([0, 0, 0])
    const textToBeDisplayed = [];
    const r = createRef(null);
    const g = createRef(null);
    const b = createRef(null);

    for (let i = 0; i < data.length; i++) {
        textToBeDisplayed.push(<div key={i} className="col-sm6">{data[i]}</div>);
    }

    const linearize = () => {
        const temp = []
        temp.push(removeGamma(r.current.value));
        temp.push(removeGamma(g.current.value));
        temp.push(removeGamma(b.current.value));
        setState(temp);
        if (callback !== undefined) {
            callback(temp);
        }
    };

    return (<Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
        <Content>
            <h3>{title}</h3>
            {textToBeDisplayed}
            <MathJaxContext version={3} config={mathConfig} hideUntilTypeset={"first"}>
                <MathJax inline dynamic>
                    <p className="additional-info">For a given pixel value, <span>$c$</span> between 0 and 1</p>
                    <span>{`$$ f(c) = \\begin{cases} \\frac{\\frac{c}{255}}{12.92}, & \\text{c<=0.04045 * 255} \\\\ \\frac{\\frac{c}{255}+0.055}{1.055}, & \\text{c>0.04045 * 255} \\end{cases} $$`}</span>
                </MathJax>
                <div className="">You might be aware that a pixel value is between 0 and 255. So first you have to scale the value down by dividing the pixel value by 255. Enter RGB values in the boxes below to see how the computation happens. Note: This step is required for images on disk which are converted into non linear RGB to improve the color quality</div>
                <div className="input-group input-group-sm text-center">
                    <InputGroup className="col col-sm-3">
                        <InputGroup.Text id="basic-addon1">R</InputGroup.Text>
                        <FormControl key="red"
                            placeholder={state[0]} ref={r} />
                    </InputGroup>
                    <InputGroup className="col col-sm-3">
                        <InputGroup.Text id="basic-addon1">G</InputGroup.Text>
                        <FormControl key="green" placeholder={state[1]} ref={g} />
                    </InputGroup>
                    <InputGroup className="col col-sm-3">
                        <InputGroup.Text id="basic-addon1">B</InputGroup.Text>
                        <FormControl key="blue" placeholder={state[2]} ref={b} />
                    </InputGroup>
                    <Button className="col col-sm-2" onClick={linearize}>Calculate</Button>
                </div>
                <div className="math-equation">
                <MathJax inline dynamic>
                    <div className="col col-md-3">{`$$ (${state[0]}) \\hat{i} + (${state[1]}) \\hat{j} + (${state[2]}) \\hat{k} $$`}</div>
                </MathJax>
                </div>
            </MathJaxContext>
        </Content>
    </Wrapper>)

}

export default ColorSpace;