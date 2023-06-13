import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BreedsTable from "./Market";

const Markets = styled.div`
  display: flex;
`;

const StyledMarket = styled.button`
  margin: 10px;
  background-color: grey;
  gap: 100px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const CatMarket: React.FC = () => {
  const [catMarkets, setCatMarkets] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [marketName, setMarketName] = useState("");
  const [breeds1, setBreeds1] = useState([]);
  const [breeds2, setBreeds2] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:7421/cat-markets").then((res) => {
      setCatMarkets(res.data);
    });
  }, []);

  useEffect(() => {
    if (!marketName) return;
    axios.get(`http://localhost:7421/cat-market/${marketName}`).then((res) => {
      setBreeds(res.data);
      setBreeds1(res.data.map((breeds: any) => breeds[0]));
      setBreeds2(res.data.map((breeds: any) => breeds[1]));
    });
  }, [marketName]);

  return (
    <>
      <h1>Welcome to Cat Markets</h1>

      <Markets>
        {catMarkets.length > 0 &&
          catMarkets.map((market, idx) => (
            <StyledMarket onClick={() => setMarketName(market)} key={idx}>
              {market}
            </StyledMarket>
          ))}
      </Markets>

      <p>
        You are currently viewing <b>{marketName}</b> Market
      </p>

      {(breeds1.length > 0 || breeds2.length > 0) && (
        <BreedsTable breeds1={breeds1} breeds2={breeds2} breeds={breeds} />
      )}
    </>
  );
};

export default CatMarket;
