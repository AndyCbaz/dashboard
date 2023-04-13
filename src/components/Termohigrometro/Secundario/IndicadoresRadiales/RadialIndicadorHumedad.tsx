import React from "react";
import "./RadialIndicatorHumedad.css";

type Props = {
  valor: number;
  circleWidth: number;
  unidad: string;
};

export const RadialIndicadorHumedad: React.FC<Props> = ({
  valor,
  circleWidth,
  unidad,
}) => {
  const radio = 30;
  const dashArray = radio * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * valor) / 100;
  return (
    <div>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="10px"
          r={radio}
          className="circle-back-humedad"
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="10px"
          r={radio}
          className="circle-progress-humedad"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />

        <text
          x="20%"
          y="50%"
          dy="0.3em"
          // textAnchor="sm"
          className="circle-text-humedad"
        >
          {valor} {unidad}
        </text>
      </svg>
    </div>
  );
};
