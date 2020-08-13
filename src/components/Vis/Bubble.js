import React from 'react';
import * as d3 from 'd3';
import { useResize } from './Resize';

export default ({ bubbleData, setSelected, selected }) => {
    const { size, ref } = useResize();
    const [width, height] = size;
    const pack = (data) =>
        d3
            .pack()
            .size([width - 2, height - 2])
            .padding(3)(d3.hierarchy({ children: data }).sum((d) => d.value));
    const pokeStuffing = pack(bubbleData);

    const colors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dark: '#705848',
        dragon: '#7038F8',
        steel: '#B8B8D0',
        fairy: '#F0B6BC',
    };

    return (
        <div ref={ref} style={{ width: '100%', height: '90vh' }}>
            <svg
                className="BubbleChart"
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                overflow="auto"
            >
                <title>Pokemon Types</title>
                {pokeStuffing.children && (
                    <>
                        {pokeStuffing.children.map((child, index) => {
                            return (
                                <g
                                    key={index}
                                    transform={`translate(${child.x + 1},${child.y + 1})`}
                                    onClick={() => {
                                        setSelected(child.data);
                                    }}
                                >
                                    <circle
                                        id={`${child.data.type}-${child.data.count}`}
                                        r={child.r}
                                        fillOpacity={selected.type === child.data.type ? '1' : '0.45'}
                                        fill={colors[child.data.type.toLowerCase()] || '#ff7f0e'}
                                    />
                                </g>
                            );
                        })}

                        {pokeStuffing.children.map((child, index) => {
                            return (
                                <g key={index} transform={`translate(${child.x + 1},${child.y + 1})`}>
                                    <text textAnchor="middle" fill="#000000">
                                        <tspan>{child.data.type.toUpperCase()}</tspan>
                                    </text>
                                </g>
                            );
                        })}
                    </>
                )}
            </svg>
        </div>
    );
};
