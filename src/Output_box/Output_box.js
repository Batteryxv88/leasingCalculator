import "./Output_box.css";

const Output_box = (props) => {
  return (
    <div className="output-box">
      <p className="output-box__header">{props.title}</p>
      <p className="output-box__price">{props.price} ₽</p>
    </div>
  );
};

export default Output_box;
