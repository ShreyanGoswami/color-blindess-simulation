import { MathJax, MathJaxContext } from "better-react-mathjax";
import React from "react";
import Locus from "../Locus";

import { Wrapper, Content } from "./Intuition.styles";

const Intuition = ({ title, data, mathConfig }) => {

    const textToBeDisplayed = [];

    for (let i = 0; i < data.length; i++) {
        textToBeDisplayed.push(<p key={i}>{data[i]}</p>);
    }

    return (
        <Wrapper className="d-grid gap-3 pt-3 mb-4 px-4 bg-light border rounded-3">
            <Content>
                <MathJaxContext mathConfig={mathConfig}>
                <h3 id="link-1">{title}</h3>
                {textToBeDisplayed}
                <MathJax>
                <p>You might be thinking that if one cone cell is missing, the perceivable colors should then lie on a 2D plane. And you would be right. Extensive research has shown that colors that a dichromat can see lie on a 2D plane rather than in a 3D space. Geometrically, you can think of this as projecting a point <b>[L, M, S]</b>, a color that normal people can see, onto a plane <b>P</b>; the projected point <b>[L’, M’, S’]</b> on the plane <b>P</b> is the actual color that a color-blind person would see.</p>
                <p>Two questions remain. First, where is the plane <b>P</b>? Understandably, this plane would depend on the exact kind of dichromacy a color-blind person has. Second, how is a color (3D point) mapped to the 2D plane <b>P</b>?</p>
                <p>Answering the questions depends on the assumption made about color blindness. A widely accepted assumption is that a color <b>C [L, M, S]</b> will be perceived as the color <b>C’ [L’, M, S]</b> by a protanopia. Note that the M and S cone responses do not change, and only the L cone response changes. This is not all that surprising: since a protanope misses the L cones, the M and S cone responses should not change. Intuitively, this is moving a color along the L-axis.</p>
                <p>Since the M and S coordinates do not change, this mapping is essentially an <a href="https://en.wikipedia.org/wiki/Orthographic_projection">orthographic projection</a> of the point <b>C [L, M, S]</b> toward the <i>MS</i>-plane and intersecting the projection with the plane <b>P</b>. The intercept on <b>P</b> is <b>C'</b>. Note that if <b>L'</b> is 0, then <b>P</b> is the MS-plane, but as we will see later, <b>L'</b>is not 0, and so the <i>MS</i>-plane and <b>P</b> are not the same plane. Equivalently, you can also think of this as an oblique projection of the point <b>C</b> onto <b>P</b>, and the projected point is <b>C'</b>.</p>
                <p>This assumption about dichromacy has two important implications. First, all the colors along the <b>C-C'</b> line will be perceived as the same color by a protanope, since all those colors will eventually be mapped to the same point <b>C'</b>. In general, all the colors on a line parallel to the L-axis will be perceived as the same color. Such a line is sometimes called a confusion line.</p>
                <p>Second, the color <b>C'</b> will be perceived as the same between a trichromat and a protanope, because it will be projected to the same point <b>C'</b>. Colors like <b>C'</b> are called isochromes. In general, any color that is on the plane <b>P</b> is an isochrome.</p>
                <p>The second point above is critical; it allows us to derive the plane <b>P</b>. A plane is uniquely described by 3 points. If we can find 3 isochromes, we can construct the plane! This is easier said than done, because we can never be certain of another person’s color sensation. Imagine we have a normal trichromat and a protanope looking at a color; even if they have the same color sensation, how would they communicate with each other about it? Note that this is a different task than asking a dichromat whether two colors appear the same, for which we could simply two colors on a confusion line.</p>
                <p>Remarkably, there is an exceedingly rare color-blindness called unilateral dichromacy, where a person’s one eye is dichromatic and the other eye is trichromatic. These people have two kinds of eyes but one brain. Color matching between the two eyes by a unilateral dichromat would allow us to identify isochromes, assuming of course that the dichromatic eye and the trichromatic eye are similar to those of a “normal” dichromatic and trichromatic eye, respectively. Such studies show that monochromatic lights at 475 nm and 575 nm are isochromes for protanopes and deuteranopes, and for tritanopes isochromes are found at 485 nm and 660 nm. It is also found that equal-energy white (EEW) appears to be the same between dichromats and trichromats. We now have our three isochromes for protanopes (475 nm, 575 nm, and EEW) and can construct the projection plane.</p>
                <p>Below is an interactive tool that visualizes the plane and how the spectral locus is mapped to the plane. You can also enter the LMS values of a color and click simulate to see where the color is located before and after the projection.</p>
                {/* TODO place tool here */}
                <Locus></Locus>
                <p>One particularly interesting thing to note is that confusion lines all converge to the same point in the xy-chromaticity diagram, as experimentally confirmed by many studies. Understandingly, the exact convergence point depends on the particular kind of dichromacy. See a visualization <a href="http://www.daltonize.org/2010/05/there-is-not-just-one-color-blindness.html">here</a>. This is because the confusion lines are parallel to each other in the XYZ/LMS space, and the projection from XYZ to xy is a perspective projection, which converges parallel lines. Some color-blindness simulations, such as the one done by <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=7759">Meyer and Greenberg (1988)</a>, perform the simulation leveraging the convergence point. Interestingly, the Meyer and Greenberg paper also leverages the convergence points of different dichromacy to derive the LMS cone sensitivities from the XYZ color matching functions.</p>
                
                </MathJax>
                </MathJaxContext>
            </Content>
        </Wrapper>
    )

}

export default Intuition;