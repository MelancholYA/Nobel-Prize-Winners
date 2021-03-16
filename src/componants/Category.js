import react, { useState, useEffect } from "react";
import prize from "../prize.json";

const Category = ({ match }) => {
  const [count, setCount] = useState(9);
  const [winners, setWinners] = useState([]);
  const thisWinners = prize.prizes.filter(
    (winner, i) => winner.category === match.params.category
  );
  useEffect(() => {
    setWinners(thisWinners.filter((winner, i) => i < count));
  }, [count]);
  console.log(thisWinners);
  return (
    <div className="category">
      <h1 className="title">{match.params.category} Nobel Prize Winners</h1>
      <ul className="holder">
        {winners.map((winner, i) => (
          <li key={i}>
            <h1>{winner.year}</h1>
            <ul>
              {winner.laureates ? (
                winner.laureates.map((winner) => (
                  <li>
                    {winner.firstname} {winner.surname}
                  </li>
                ))
              ) : (
                <li>No Data</li>
              )}
            </ul>
            <h4>
              {winner.laureates ? winner.laureates[0].motivation : "No Data"}
            </h4>
          </li>
        ))}
      </ul>
      {count < thisWinners.length && (
        <button onClick={() => setCount(count + 9)}>Load More</button>
      )}
    </div>
  );
};

export default Category;
