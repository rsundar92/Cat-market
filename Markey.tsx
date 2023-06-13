import { useEffect, useState } from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
  table,
  th,
  td {
    border: 1px solid;
    width: 80%;
  }

  div {
    margin: 40px 0;
  }
`;

const BreedsTable: React.FC<{ breeds1: any; breeds2: any; breeds: any }> = ({
  breeds1 = [],
  breeds2 = [],
  breeds,
}) => {
  const [buyDayBreed1, setBuyDayBreed1] = useState(0);
  const [sellDayBreed1, setSellDayBreed1] = useState(0);
  const [buyDayBreed2, setBuyDayBreed2] = useState(0);
  const [sellDayBreed2, setSellDayBreed2] = useState(0);
  const [maxProfitBreed1, setMaxProfitBreed1] = useState(0);
  const [maxProfitBreed2, setMaxProfitBreed2] = useState(0);

  useEffect(() => {
    const data = breeds;

    let maxProfitBreed1 = -1000; //arbitrary value to have max loss
    let buyDayBreed1;
    let sellDayBreed1;

    let maxProfitBreed2 = -1000;
    let buyDayBreed2;
    let sellDayBreed2;

    for (let i = 0; i < data.length; i++) {
      const breedData = data[i];
      const furmasterBuy = breedData[0].buy;
      const furmasterSell = breedData[0].sell;
      const couchDestroyerBuy = breedData[1] && breedData[1].buy;
      const couchDestroyerSell = breedData[1] && breedData[1].sell;

      if (furmasterSell - furmasterBuy > maxProfitBreed1) {
        maxProfitBreed1 = furmasterSell - furmasterBuy;
        buyDayBreed1 = i + 1; //adding one as array starts from 0
        sellDayBreed1 = i + 1;
      }

      if (couchDestroyerSell - couchDestroyerBuy > maxProfitBreed2) {
        maxProfitBreed2 = couchDestroyerSell - couchDestroyerBuy;
        buyDayBreed2 = i + 1;
        sellDayBreed2 = i + 1;
      }

      for (let j = i + 1; j < data.length; j++) {
        const nextBreedData = data[j];
        const nextFurmasterSell = nextBreedData[0].sell;
        const nextCouchDestroyerSell =
          nextBreedData[1] && nextBreedData[1].sell;

        if (nextFurmasterSell - furmasterBuy > maxProfitBreed1) {
          maxProfitBreed1 = nextFurmasterSell - furmasterBuy;
          buyDayBreed1 = i + 1;
          sellDayBreed1 = j + 1;
        }

        if (nextCouchDestroyerSell - couchDestroyerBuy > maxProfitBreed2) {
          maxProfitBreed2 = nextCouchDestroyerSell - couchDestroyerBuy;
          buyDayBreed2 = i + 1;
          sellDayBreed2 = j + 1;
        }
      }
    }

    setBuyDayBreed1(buyDayBreed1 || 0);
    setSellDayBreed1(sellDayBreed1 || 0);
    setBuyDayBreed2(buyDayBreed2 || 0);
    setSellDayBreed2(sellDayBreed2 || 0);
    setMaxProfitBreed1(maxProfitBreed1 || 0);
    setMaxProfitBreed2(maxProfitBreed2 || 0);

    console.log("Furmaster: Buy on Day:", buyDayBreed1);
    console.log("Furmaster: Sell on Day:", sellDayBreed1);
    console.log("Couch Destroyer: Buy on Day:", buyDayBreed2);
    console.log("Couch Destroyer: Sell on Day:", sellDayBreed2);
  }, [breeds]);

  return (
    <TableWrapper>
      <div>
        <p style={{ color: "red" }}>
          Breed Name: {breeds1[0] && breeds1[0]?.breed}
        </p>
        <table>
          <thead>
            <th>Day</th>
            <th>Buy</th>
            <th>Sell</th>
          </thead>
          <tbody>
            {breeds1.map((breed: any, idx: number) => (
              <tr>
                <>
                  <td key={idx}>{idx + 1}</td>
                  <td key={idx}>{breed.buy}</td>
                  <td key={idx}>{breed.sell}</td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
        {breeds1[0] && breeds1[0].breed} should be bought on day {buyDayBreed1}{" "}
        and sold on day {sellDayBreed1}
        <p>Maximum profit = {maxProfitBreed1}</p>
      </div>

      {breeds2[0] && breeds2[0]?.breed && (
        <div>
          <p style={{ color: "red" }}>
            Breed Name: {breeds2[0] && breeds2[0]?.breed}
          </p>
          <table>
            <thead>
              <th>Day</th>
              <th>Buy</th>
              <th>Sell</th>
            </thead>
            <tbody>
              {breeds2 &&
                Array.isArray(breeds2) &&
                breeds2.map(
                  (breed: any, idx: number) =>
                    breed && (
                      <tr>
                        <>
                          <td key={idx}>{idx + 1}</td>
                          <td key={idx}>{breed.buy}</td>
                          <td key={idx}>{breed.sell}</td>
                        </>
                      </tr>
                    )
                )}
            </tbody>
          </table>
          {breeds2[0] && breeds2[0].breed} should be bought on day{" "}
          {buyDayBreed2} and sold on day {sellDayBreed2}
          <p>Maximum profit = {maxProfitBreed2}</p>
        </div>
      )}
    </TableWrapper>
  );
};

export default BreedsTable;
