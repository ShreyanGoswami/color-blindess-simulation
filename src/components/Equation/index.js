import React from "react";

import { MathJax, MathJaxContext } from "better-react-mathjax";

const Equation = ({ values, mathConfig }) => {

    return (
        <>
            <MathJaxContext version={3} config={mathConfig} hideUntilTypeset={"first"}>
                <MathJax inline dynamic>
                    <span>{`$$ (${values[0].toLocaleString(undefined, { minimumFractionDigits: 3 })}) \\hat{i} + (${values[1].toLocaleString(undefined, { minimumFractionDigits: 3 })}) \\hat{j} + (${values[2].toLocaleString(undefined, { minimumFractionDigits: 3 })}) \\hat{k} $$`}</span>
                </MathJax>
            </MathJaxContext>
        </>
    )
}

export default Equation;