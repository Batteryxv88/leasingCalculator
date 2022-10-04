import { useState, useRef } from "react";
import "./InputBox.css";

const InputBox = (props) => {

  const handlePriceChange = (evt) => {
    props.onChange(evt.target.value);
  };

  const handleChangeRangeInput = (evt) => {
    props.onChangeRange(evt.target.value)
    // evt.target.style = `background: linear-gradient(to right, #FF9514 0%,
    //   #FF9514 ${(rangeValue) * 1.66}%, #E1E1E1 ${(rangeValue) * 1.66}%, #E1E1E1 100%)`;
  };


  const [inputStyle, setInputStyle] = useState("#f3f3f4");

  const handleChangeInputColor = (evt) => {
      setInputStyle("#ffffff")
  }

  return (
    <div className="input-box">
      <p className="input-box__header">{props.title}</p>
      <div className="input-box__all-field" style={{
          'backgroundColor': inputStyle
        }}>
        <input
          className="input-box__input"
          id={props.id}
          name={props.name}
          value={props.value}
          type="number"
          onInput={handlePriceChange}
          //onChange={handleChangeInputColor}
          min={props.minInput}
          max={props.maxInput}
          style={{
            'backgroundColor': inputStyle
          }}
        ></input>
        <div className={props.classNameDiv} style={{
          'backgroundColor': inputStyle
        }}>
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

export default InputBox;
