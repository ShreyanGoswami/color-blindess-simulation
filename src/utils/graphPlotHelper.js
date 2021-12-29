
export const configFor3DMesh = (xData, yData, zData, iVertex, jVertex, kVertex, xAxisLabel = "L cone", yAxisLabel = "M cone", zAxisLabel = "S cone") => {
    const planeData = [{
        type: 'mesh3d',
        x: xData,
        y: yData,
        z: zData,
        i: iVertex,
        j: jVertex,
        k: kVertex
    }];

    const layout = {
        font: { size: 15 },
        scene: {
            xaxis: { title: xAxisLabel },
            yaxis: { title: yAxisLabel },
            zaxis: { title: zAxisLabel },
        }
    };

    return [planeData, layout];
};

export const configFor3DScatterPlot = (xData, yData, zData, legends, xAxisLabel = "L cone", yAxisLabel = "M cone", zAxisLabel = "S cone") => {
    const data = []
    for (let i=0;i<xData.length;i++) {
        const trace = {
            x: xData[i],
            y: yData[i],
            z: zData[i],
            type: "scatter3d",
            mode: "markers",
            marker: {
                size: 5,
                color: 'rgb(188,195,113)',
                symbol: 'circle',
                lines: {
                    color: 'rgb(127,127,127)',
                    wdith: 1,
                    opacity: 0.8
                }
            },
            name: legends[i]
        };
        data.push(trace);
    }
    
    const layout = {
        font: { size: 15 },
        scene: {
            xaxis: { title: xAxisLabel },
            yaxis: { title: yAxisLabel },
            zaxis: { title: zAxisLabel },
        }
    };
    const config = {responsive: true};
    return [data,layout, config]
}