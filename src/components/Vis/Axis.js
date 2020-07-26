import React, { useMemo } from 'react';
import * as d3 from 'd3';

export default ({ domain, range, width }) => {
    const ticks = useMemo(() => {
        const xScale = d3.scaleLinear().domain(domain).range(range);

        const scaleWidth = range[1] - range[0];
        const pixelsPerTick = 30;
        const numberOfTicksTarget = Math.max(1, Math.floor(scaleWidth / pixelsPerTick));

        return xScale.ticks(numberOfTicksTarget).map((value) => ({
            value,
            xOffset: xScale(value),
        }));
    }, [domain.join('-'), range.join('-')]);
    return (
        <svg viewBox={`0 0 ${width} 40`} width={width} height="40">
            <path d={['M', range[0], 6, 'v', -6, 'H', range[1], 'v', 6].join(' ')} fill="none" stroke="currentColor" />
            {ticks.map(({ value, xOffset }) => (
                <g key={value} transform={`translate(${xOffset}, 0)`}>
                    <line y2="6" stroke="currentColor" />
                    <text
                        key={value}
                        style={{
                            fontSize: '10px',
                            textAnchor: 'middle',
                            transform: 'translateY(20px)',
                        }}
                    >
                        {value}
                    </text>
                </g>
            ))}
        </svg>
    );
};
