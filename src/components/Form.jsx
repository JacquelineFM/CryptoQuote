import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectCurrencies from "../hooks/useSelectCurrencies";
import { currencies } from "../data/currencies";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({ setCurrencies }) => {
  const [error, setError] = useState(false);
  const [cryptos, setCryptos] = useState([]);
  const [currency, SelectCurrencies] = useSelectCurrencies(
    "Select your currency",
    currencies
  );
  const [cryptocurrency, SelectCryptocurrency] = useSelectCurrencies(
    "Select your cryptocurrency",
    cryptos
  );

  /* Fetching data from the API and storing it in the arrayCryptos variable. */
  useEffect(() => {
    /**
     * The function queryAPI() is an asynchronous function that fetches data from the API and stores it
     * in the arrayCryptos variable.
     */
    const queryAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const response = await fetch(url);
      const result = await response.json();

      const arrayCryptos = result.Data.map((crypto) => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };

        return object;
      });

      setCryptos(arrayCryptos);
    };

    queryAPI();
  }, []);

  /**
   * If the currency or cryptocurrency is empty, set the error to true and return. Otherwise, set the
   * error to false and set the currencies to the currency and cryptocurrency.
   * @returns the object { currency, cryptocurrency }.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if ([currency, cryptocurrency].includes("")) {
      setError(true);
      return;
    }

    setError(false);
    setCurrencies({ currency, cryptocurrency });
  };

  return (
    <>
      {error && <Error>All fields are required!</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCurrencies />
        <SelectCryptocurrency />
        <InputSubmit type="submit" value="quote" />
      </form>
    </>
  );
};

export default Form;
