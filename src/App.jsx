import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";
import ImageCrypto from "./assets/img/imagen-criptos.png";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const App = () => {
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState({});

  /* This is a hook that is called when the component is mounted and when the component is updated. */
  useEffect(() => {
    if (Object.keys(currencies).length > 0) {
      /**
       * We are setting the loading state to true, then we are setting the quote state to an empty
       * object, then we are destructuring the currency and cryptocurrency states, then we are setting
       * the url to the api endpoint, then we are fetching the url, then we are setting the result to
       * the response in json format, then we are setting the quote state to the result, then we are
       * setting the loading state to false
       */
      const quoteCrypto = async () => {
        setLoading(true);
        setQuote({});
        const { currency, cryptocurrency } = currencies;
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptocurrency}&tsyms=${currency}`;
        const response = await fetch(url);
        const result = await response.json();

        setQuote(result.DISPLAY[cryptocurrency][currency]);
        setLoading(false);
      };

      quoteCrypto();
    }
  }, [currencies]);

  return (
    <Container>
      <Image src={ImageCrypto} alt="Cryptocurrency image" />
      <div>
        <Heading>Quote cryptocurrencies instantly</Heading>
        <Form setCurrencies={setCurrencies} />
        {loading && <Spinner />}
        {quote.PRICE && <Result quote={quote} />}
      </div>
    </Container>
  );
};

export default App;
