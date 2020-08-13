import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { useResize } from './Resize';
import XAxis from './Axis';
const colors = ['#F8D030', '#98D8D8', '#C03028', '#A040A0', '#E0C068', '#A890F0', '#F85888'];

export default ({ data }) => {
    const { size, ref } = useResize();
    const [width, height] = size;
    const [graphData, setData] = useState([]);
    const arrangeData = (data) => {
        const tempData = [];
        data.forEach((datum) => {
            tempData.push({ x: datum.stat.name, y: datum.base_stat });
        });
        setData(tempData);
    };
    useEffect(() => {
        arrangeData(data);
    }, [data]);

    const x = (data) =>
        d3
            .scaleBand()
            .range([0, width - 20])
            .domain(d3.range(data.length))
            .padding(0.2);
    const xLinear = x(graphData);
    const y = (data) =>
        d3
            .scaleLinear()
            .range([height - 10, 0])
            .domain([0, d3.max(data, (d) => d.y)])
            .nice();
    const yLinear = y(graphData);

    return (
        <div className="PokeStats__container" ref={ref}>
            <h3>Stats</h3>
            <svg
                className="PokeStats"
                width={width}
                height={height + 50}
                viewBox={`0 0 ${width} ${height}`}
                overflow="auto"
            >
                <title>Pokemon Stats</title>
                <XAxis bottom={20} left={10} right={0} height={height} scale={xLinear} data={graphData} />
                {graphData.map((stat, index) => {
                    return (
                        <g transform={`translate(${10}, ${-10})`}>
                            <text
                                transform={`translate(${xLinear(index) + 25}, ${yLinear(stat.y)})`}
                                textAnchor="middle"
                                alignmentBaseline="baseline"
                                fill="#000"
                                fontSize="16"
                            >
                                {stat.y}
                            </text>
                            <rect
                                x={xLinear(index)}
                                y={yLinear(stat.y)}
                                height={yLinear(0) - yLinear(stat.y)}
                                width={xLinear.bandwidth()}
                                fill={colors[index]}
                            />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};
