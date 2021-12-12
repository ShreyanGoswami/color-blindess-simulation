import styled from "styled-components";

export const Wrapper = styled.div`
`

export const Content = styled.div`

    .canvas {
        height: 300px !important;
        width: 300px !important;
        margin-bottom: 30px;
    }

    .gap-below {
        margin-bottom: 20px;
    }

    .center-items {
        text-align: center;
    }

    canvas {
        margin-left:20px;
    }

    .gap-below-responsive {
        @media screen and (max-width:768px) {
            margin-bottom:10px;
        }
    }
`;