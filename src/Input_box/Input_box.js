import { useState, useRef } from "react";
import "./Input_box.css";

const Input_box = (props) => {

  const handlePriceChange = (evt) => {
    props.onChange(evt.target.value);
  };

  const handleChangeRangeInput = (evt) => {
    props.onChangeRange(evt.target.value)
    console.log(evt.target.value)
    // evt.target.style = `background: linear-gradient(to right, #FF9514 0%,
    //   #FF9514 ${(rangeValue) * 1.66}%, #E1E1E1 ${(rangeValue) * 1.66}%, #E1E1E1 100%)`;
  };

  return (
    <div className="input-box">
      <p className="input-box__header">{props.title}</p>
      <div className="input-box__all-field">
        <input
          className="input-box__input"
          value={props.value}
          type="number"
          onInput={handlePriceChange}
          //min={props.minInput}
          max={props.maxInput}
        ></input>
        <div className={props.classNameDiv}>
          <p className={props.classNameP}>
            {props.number}
            {props.text}
          </p>
        </div>
      </div>
      <input
        className="input-box__range"
        type="range"
        min={props.minRange}
        max={props.maxRange}
        defaultValue={props.defRangeValue}
        step="1"
        onInput={handleChangeRangeInput}
      ></input>
    </div>
  );
};

export default Input_box;
