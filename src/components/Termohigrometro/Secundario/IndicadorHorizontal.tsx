import React from "react";

interface props {
  maxValue: number;
  currentValue: number;
  color: string;
  unidad: string;
}

const IndicadorHorizontal = (props: props) => {
  return (
    <div className="progress-bar">
      <div
        style={{
          border: "solid",
          borderWidth: 1,
          borderRadius: 5,
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 3,
          paddingRight: 3,
        }}
      >
        <div
          className="progress-bar-inner"
          style={{
            width: `${(props.currentValue / props.maxValue) * 100}%`,
            backgroundColor: props.color,
          }}
        >
          <div style={{textAlign: 'center'}} className="progress-bar-text">{props.currentValue}{props.unidad}  </div>
        </div>
      </div>
    </div>
  );
};

export default IndicadorHorizontal;
