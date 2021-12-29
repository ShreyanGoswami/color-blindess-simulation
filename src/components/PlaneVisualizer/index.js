import React, {useEffect} from "react";

import * as Plotly from 'plotly.js';
import { configFor3DMesh } from "../../utils/graphPlotHelper";

import { Wrapper, Content } from "./PlaneVisualizer.styles";

export const PlaneVisualizer = () => {
    // #Improvement: There is a potential to improve this so that any two planes can be visualized

    useEffect(() => {
        const [planeData, layout] = configFor3DMesh([0,-0.807,0.803,1.027],[0,0.934,-0.903,0.9847],[0,-0.099,0.070,0.9182],[0,0],[1,2],[3,3])
        Plotly.newPlot('visualize-planes', planeData, layout);
    }, [])

    return (
        <Wrapper>
            <Content>
                <div id="visualize-planes"></div>
            </Content>
        </Wrapper>
    )
};

export default PlaneVisualizer;
