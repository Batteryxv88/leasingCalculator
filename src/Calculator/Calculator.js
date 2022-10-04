import "./Calculator.css";
import InputBox from "../InputBox/InputBox";
import OutputBox from "../OutputBox/OutputBox";
import { useEffect, useState } from "react";

const Calculator = () => {
  const [priceAuto, setPriceAuto] = useState(3300000); // Стоимость авто
  const [onePercentOfPriceAuto, setOnePercentOfPriceAuto] = useState(); // Один процент от стоимости авто
  const [initialPayment, setInitialPayment] = useState(420000); // Первоначальный взнос

  const handleGetOnePercent = priceAuto / 100; // Находим процент от стоимости авто
  const getPaymentPercent = initialPayment / handleGetOnePercent; // Находим первоначальный взнос в процентах отстоимости авто
  const [initialPaymentPercent, setInitialPaymentPercent] =
    useState(getPaymentPercent); // Первоначальный взнос в процентах
  const [month, setMonth] = useState(60); // Месяц

  const [monthlyPayment, setMonthlyPayment] = useState(); // Ежемесячный платеж
  const [sumOfLeasing, setSumOfLeasing] = useState(); // Сумма лизинга
  const initial = priceAuto * (initialPaymentPercent / 100);

  const handlePriceAutoChange = (priceAuto) => {
    setPriceAuto(priceAuto);
  };

  const handleInitialPaymentChange = (initialPayment) => {
    setInitialPayment(initialPayment);
  };

  const handleMonthChange = (month) => {
    setMonth(month);
  };

  useEffect(() => {
    setOnePercentOfPriceAuto(handleGetOnePercent);
    setInitialPaymentPercent(getPaymentPercent);
  }, [priceAuto, initialPayment]);

  useEffect(() => {
    const monthPay =
      (priceAuto - initial) *
      ((0.035 * Math.pow(1 + 0.035, month)) / (Math.pow(1 + 0.035, month) - 1));
    setMonthlyPayment(monthPay);
    console.log(initial);
  }, [priceAuto, initialPayment, month]);

  useEffect(() => {
    const priceLeasingSum = initialPayment + month * monthlyPayment;
    setSumOfLeasing(priceLeasingSum);
    console.log(sumOfLeasing);
    console.log(initialPayment);
    console.log(month);
    console.log(monthlyPayment);
    console.log(priceAuto);
  }, [monthlyPayment, initialPayment, priceAuto]);


  return (
    <div className="calculator">
      <h1 className="calculator__header">
        Рассчитайте стоимость автомобиля в лизинг
      </h1>
      <form className="calculator__container">
        <InputBox
          title="Стоимость автомобиля"
          text="₽"
          classNameP="input-box__mod_text"
          id="price"
          name="price"
          onChange={handlePriceAutoChange}
          onChangeRange={handlePriceAutoChange}
          value={priceAuto}
          minRange={1000000}
          maxRange={6000000}
          minInput={1000000}
          maxInput={6000000}
          defRangeValue={priceAuto + 200000}
        />
        <InputBox
          title="Первоначальный взнос"
          text="%"
          number={Math.round(initialPaymentPercent)}
          classNameDiv="input-box__mod"
          classNameP="input-box__mod_text-percent"
          id="initialFee"
          name="initialFee"
          onChange={handleInitialPaymentChange}
          onChangeRange={handleInitialPaymentChange}
          value={initialPayment}
          minRange={10}
          maxRange={60}
          minInput={""}
          maxInput={""}
          defRangeValue={initialPaymentPercent}
        />
        <InputBox
          title="Срок лизинга"
          text="мес."
          classNameP="input-box__mod_text"
          id="period"
          name="period"
          minRange={1}
          maxRange={60}
          onChange={handleMonthChange}
          onChangeRange={handleMonthChange}
          value={month}
          minInput={1}
          maxInput={60}
          defRangeValue={month}
        />

        <OutputBox
          title="Сумма договора лизинга"
          price={Math.round(sumOfLeasing).toLocaleString("ru")}
        />
        <OutputBox
          title="Ежемесячный платеж от"
          price={Math.round(monthlyPayment).toLocaleString("ru")}
        />

        <button className="calculator__button">Оставить заявку</button>
      </form>
    </div>
  );
};

export default Calculator;
