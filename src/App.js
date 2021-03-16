import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import prize from "./prize.json";
import Category from "./componants/Category";
function App() {
  const chemistry = prize.prizes.filter(
    (prie) => prie.category === "chemistry"
  );
  const economics = prize.prizes.filter(
    (prie) => prie.category === "economics"
  );
  const literature = prize.prizes.filter(
    (prie) => prie.category === "literature"
  );
  const peace = prize.prizes.filter((prie) => prie.category === "peace");
  const physics = prize.prizes.filter((prie) => prie.category === "physics");
  const medicine = prize.prizes.filter((prie) => prie.category === "medicine");
  const [count, setCount] = useState(10);
  const [year, setYear] = useState(2020);
  const [lastwinners, setlastWinners] = useState([]);
  const years = medicine.filter((prie, i) => i < count);

  useEffect(() => {
    setlastWinners(
      prize.prizes.filter((prie) => prie.year === year.toString())
    );
  }, [year]);
  console.log(chemistry.length);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <h1 className="title">Nobel Prize Archive</h1>
            <div className="container">
              <div className="side">
                <div className="categories">
                  <h2>Pize Categories</h2>
                  <ul>
                    <li>
                      <Link to="/category/chemistry">chemistry</Link>
                    </li>
                    <li>
                      <Link to="/category/economics">economics</Link>
                    </li>
                    <li>
                      <Link to="/category/literature">literature</Link>
                    </li>
                    <li>
                      <Link to="/category/peace">peace</Link>
                    </li>
                    <li>
                      <Link to="/category/physics">physics</Link>
                    </li>
                    <li>
                      <Link to="/category/medicine">medicine</Link>
                    </li>
                  </ul>
                </div>
                <div className=" categories years">
                  <h2>Pize Years</h2>
                  <ul>
                    {years.map((year) => (
                      <li onClick={() => setYear(year.year)}>{year.year}</li>
                    ))}
                  </ul>
                  {count < medicine.length ? (
                    <button onClick={() => setCount(count + 10)}>
                      Load More
                    </button>
                  ) : (
                    <button>No More Data</button>
                  )}
                </div>
              </div>

              <div className="body">
                <h1>Prize Winners of {year}</h1>
                <ul>
                  {lastwinners.map((winner) => (
                    <li>
                      <h2>{winner.category}</h2>
                      <h3>laureates</h3>
                      <ul>
                        {winner.laureates
                          ? winner.laureates.map((winner) => (
                              <li>{` ${winner.firstname} ${winner.surname}`}</li>
                            ))
                          : "No Data"}
                      </ul>
                      <h3>motivation</h3>
                      <p>
                        {winner.laureates
                          ? winner.laureates[0].motivation
                          : "No Data"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Route>
          <Route exact path="/category/:category" component={Category} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
