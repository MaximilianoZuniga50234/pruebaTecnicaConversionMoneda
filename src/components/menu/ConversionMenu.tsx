import { useState } from "react";

const currencies = ["USD", "EUR", "ARS"];

const ConversionMenu = () => {

  //Estados utilizados para manejar la aplicación
  const [inputContent, setInputContent] = useState(0); //manejará la entrada
  const [outputContent, setOutputContent] = useState("");//manejará la salida
  const [actualCurrencyInput, setActualCurrencyInput] = useState("USD");// manejará la moneda ingresada
  const [actualCurrencyOutput, setActualCurrencyOutput] = useState("EUR");//manejará la moneda resultante

  //Función que se encarga de obtener los datos...
  const fecthConversion = async (currency: string) => {
    return await fetch(
      `https://v6.exchangerate-api.com/v6/1d7dccb74c67bdb82220f12d/latest/${currency}`
    ).then((res) => res.json());
  };

  //Función que se encarga de multiplicar
  const getCurrencyValue = (value: number) => {
    return value * Number(inputContent);
  };

  //Función que maneja el evento de conversion...
  const handleConvert = async () => {
    if (inputContent > 0) {
      const currencyData = await fecthConversion(actualCurrencyInput);
      const conversionRates = currencyData.conversion_rates;
      const currencyUnitValue = conversionRates[actualCurrencyOutput];
      setOutputContent(String(getCurrencyValue(currencyUnitValue)));
    } else {
      alert("Debe ingresar un valor numérico válido");
    }
  };

  //Función que maneja los cambios del campo de entrada...
  const handleChangeInput = (e: any) => {
    setInputContent(e.target.value);
  };

  //Función que maneja los cambios del drop-menu de input...
  const handleChangeDropI = (e: any) => {
    setActualCurrencyInput(e.target.value);
  };

  //Función que maneja los cambios del drop-menu de output...
  const handleChangeDropO = (e: any) => {
    setActualCurrencyOutput(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-slate-800 p-10">
      <div className="flex flex-row gap-3">
        <input
          value={inputContent}
          type="number"
          onChange={handleChangeInput}
          placeholder="Ingrese la cantidad"
          className="px-2 py-1 rounded-lg"
        />
        <select value={actualCurrencyInput} onChange={handleChangeDropI}>
          {currencies.map((currency) => (
            <option key={currencies.indexOf(currency)} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row gap-3">
        <input
          value={outputContent}
          type="text"
          readOnly
          placeholder="Resultado"
          className="px-2 py-1 rounded-lg"
        />
        <select value={actualCurrencyOutput} onChange={handleChangeDropO}>
          {currencies.map((currency) => {
            if (currency !== actualCurrencyInput)
              return (
                <option key={currencies.indexOf(currency)} value={currency}>
                  {currency}
                </option>
              );
          })}
        </select>
      </div>
      <button
        className="self-center text-white px-2 py-1 font-bold rounded-lg bg-red-500 hover:bg-red-400"
        onClick={handleConvert}
      >
        Convertir
      </button>
    </div>
  );
};

export default ConversionMenu;
