import "./Calculator.css";
import Input_box from "../Input_box/Input_box";
import Output_box from "../Output_box/Output_box";
import { useEffect, useState } from "react";

const Calculator = () => {

  const [priceAuto, setPriceAuto] = useState(3300000);
  const [onePercentOfPriceAuto, setOnePercentOfPriceAuto] = useState();
  const [initialPayment, setInitialPayment] = useState(420000);

  const handleGetOnePercent = priceAuto / 100;
  const getPaymentPercent = initialPayment / handleGetOnePercent;
  const [initialPaymentPercent, setInitialPaymentPercent] =
    useState(getPaymentPercent);
  const [month, setMonth] = useState(60);

  const [monthlyPayment, setMonthlyPayment] = useState();
  const [sumOfLeasing, setSumOfLeasing] = useState();

  const handlePriceAutoChange = (priceAuto) => {
    setPriceAuto(priceAuto);
  };

  const handleInitialPaymentChange = (initialPayment) => {
    setInitialPayment(initialPayment);
  };

  const handleMonthChange = (month) => {
    setMonth(month);
    console.log(month)
  };

  useEffect(() => {
    setOnePercentOfPriceAuto(handleGetOnePercent);
    setInitialPaymentPercent(getPaymentPercent);
  }, [priceAuto, initialPayment]);
  
  useEffect(() => {
    const initial = priceAuto * (getPaymentPercent / 100);
    const monthPay =
      (priceAuto - initial) *
      ((0.035 * Math.pow(1 + 0.035, month)) / (Math.pow(1 + 0.035, month) - 1));
    setMonthlyPayment(monthPay);
  }, [priceAuto, initialPayment, month]);

  useEffect(() => {
    const priceLeasingSum = initialPayment + (month * monthlyPayment);
    setSumOfLeasing(priceLeasingSum);
  }, [monthlyPayment]);


  return (
    <div className="calculator">
      <h1 className="calculator__header">
        Рассчитайте стоимость автомобиля в лизинг
      </h1>
      <div className="calculator__container">
        <Input_box
          title="Стоимость автомобиля"
          text="₽"
          classNameP="input-box__mod_text"
          onChange={handlePriceAutoChange}
          onChangeRange={handlePriceAutoChange}
          defaultValue={priceAuto}
          value={priceAuto}
          minRange={1000000}
          maxRange={6000000}
          minInput={1000000}
          maxInput={6000000}
          defRangeValue={priceAuto + 200000}
        />
        <Input_box
          title="Первоначальный взнос"
          text="%"
          number={Math.round(initialPaymentPercent)}
          classNameDiv="input-box__mod"
          classNameP="input-box__mod_text-percent"
          onChange={handleInitialPaymentChange}
          //onChangeRange={handleInitialPaymentChange}
          defaultValue={initialPayment}
          minRange={10}
          maxRange={60}
          minInput={''}
          maxInput={''}
          defRangeValue={initialPaymentPercent}
        />
        <Input_box
          title="Срок лизинга"
          text="мес."
          classNameP="input-box__mod_text"
          minRange={1}
          maxRange={60}
          onChange={handleMonthChange}
          onChangeRange={handleMonthChange}
          defaultValue={month}
          minInput={1}
          maxInput={60}
          defRangeValue={month}
        />
        <Output_box
          title="Сумма договора лизинга"
          price={(Math.round(sumOfLeasing)).toLocaleString('ru')}
        />
        <Output_box
          title="Ежемесячный платеж от"
          price={(Math.round(monthlyPayment)).toLocaleString('ru')}
        />
        <button className="calculator__button">Оставить заявку</button>
      </div>
    </div>
  );
};

export default Calculator;
