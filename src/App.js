import React from 'react';
import './App.css';
import { knapsackProblem } from './knapsack-problem/KnapsackProblem';

function App() {
  const [backpackItems, setBackpackItems] = React.useState([]);
  const [knapsackProblemSolution, setKnapsackProblemSolution] = React.useState(null)
  const [actualWeightToBeAdded, setActualWeightToBeAdded] = React.useState("");
  const [actualValueToBeAdded, setActualValueToBeAdded] = React.useState("");
  const [backpackCapacity, setBackpackCapacity] = React.useState("");

  // React.useEffect(() => {
  //   var items = [
  //     { w: 70, v: 135 },
  //     { w: 73, v: 139 },
  //     { w: 77, v: 149 },
  //     { w: 80, v: 150 },
  //     { w: 82, v: 156 },
  //     { w: 87, v: 163 },
  //     { w: 90, v: 173 },
  //     { w: 94, v: 184 },
  //     { w: 98, v: 192 },
  //     { w: 106, v: 201 },
  //     { w: 110, v: 210 },
  //     { w: 113, v: 214 },
  //     { w: 115, v: 221 },
  //     { w: 118, v: 229 },
  //     { w: 120, v: 240 },
  //   ];

  //   var capacity = 750;

  //   setBackpackCapacity(capacity);
  //   setBackpackItems(items);
  //   setKnapsackProblemSolution(knapsackProblem(items, capacity));
  // }, [])

  function getTotalWeightForSolution() {
    let totalWeight = 0;

    knapsackProblemSolution.subset.map((item) => {
      totalWeight += item.w;
    })

    return totalWeight;
  }

  React.useEffect(() => {
    setActualWeightToBeAdded("");
    setActualValueToBeAdded("");
  }, [backpackItems]);

  return (
    <div style={{ padding: 16, display: "flex", flexDirection: "column" }}>
      <font style={{
        fontWeight: "bold",
        fontSize: 46
      }}>
        Problema da Mochila
      </font>
      <font style={{
        fontSize: 26
      }}>
        Sem Repetições (0/1) | Programação Dinâmica
      </font>

      <div
        style={{ display: "flex", flexDirection: "row", marginTop: 16 }}
      >
        <label>
          Peso:
          <input
            value={actualWeightToBeAdded}
            style={{ marginLeft: 12 }}
            onChange={(evt) => { setActualWeightToBeAdded(evt.target.value) }} />
        </label>
        <label style={{ marginLeft: 24 }}>
          Valor:
          <input
            value={actualValueToBeAdded}
            style={{ marginLeft: 12 }}
            onChange={(evt) => { setActualValueToBeAdded(evt.target.value) }} />
        </label>
        <button
          style={{ marginLeft: 12 }}
          onClick={() => {
            setBackpackItems([
              ...backpackItems,
              { w: parseInt(actualWeightToBeAdded), v: parseInt(actualValueToBeAdded) }
            ])
          }}>
          Adicionar à Lista de Itens
        </button>
      </div>

      <div
        style={{ display: "flex", flexDirection: "row", marginTop: 16 }}
      >
        <label>
          Capacidade da Mochila:
          <input
            value={backpackCapacity}
            style={{ marginLeft: 12 }}
            onChange={(evt) => { setBackpackCapacity(parseInt(evt.target.value)) }} />
        </label>
      </div>

      <div style={{ marginTop: 18, display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          {backpackItems.length > 0 ?
            <div>
              {backpackItems.map((item, index) => (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <div
                    style={{
                      borderRadius: '50%',
                      height: 32,
                      width: 32,
                      border: "2px solid black",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <font style={{ fontSize: 24, color: '#000', marginLeft: -1, }}>
                      {index + 1}
                    </font>
                  </div>
                  <div style={{ marginLeft: 16, display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <font style={{
                        fontSize: 10
                      }}>
                        PESO
                      </font>
                      <font style={{
                        fontSize: 16,
                        fontWeight: "bold"
                      }}>
                        {item.w}
                      </font>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
                      <font style={{
                        fontSize: 10
                      }}>
                        VALOR
                  </font>
                      <font style={{
                        fontSize: 16,
                        fontWeight: "bold"
                      }}>
                        {item.v}
                      </font>
                    </div>
                  </div>
                </div>
              ))}
              {backpackCapacity.length !== 0 && (
                <button
                  onClick={() => {
                    setKnapsackProblemSolution(
                      knapsackProblem(backpackItems, backpackCapacity)
                    )
                  }}>
                  Gerar Mochila
            </button>
              )}
            </div>
            : (
              <font style={{
                fontSize: 14
              }}>
                Não há itens. Eles aparecerão aqui quando adicionados.
            </font>
            )}
        </div>
        {knapsackProblemSolution !== null && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <font style={{
              fontWeight: "bold",
              fontSize: 32
            }}>
              Mochila
            </font>

            <div style={{ marginTop: 8, display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <font style={{
                  fontSize: 16
                }}>
                  Valor Total
                </font>
                <font style={{
                  fontSize: 24,
                  fontWeight: "bold"
                }}>
                  {knapsackProblemSolution.maxValue}
                </font>
              </div>
              <div style={{ marginLeft: 16, display: "flex", flexDirection: "column" }}>
                <font style={{
                  fontSize: 16
                }}>
                  Peso Total
                </font>
                <font style={{
                  fontSize: 24,
                  fontWeight: "bold"
                }}>
                  {getTotalWeightForSolution()}
                </font>
              </div>
            </div>

            <div style={{ marginTop: 8, display: "flex", flexDirection: "column" }}>
              <font style={{
                fontSize: 16,
                marginBottom: 4
              }}>
                Itens na Mochila
              </font>
              {knapsackProblemSolution.subset.map((item, index) => (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <div
                    style={{
                      borderRadius: '50%',
                      height: 32,
                      width: 32,
                      backgroundColor: "#000",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <font style={{ fontSize: 24, color: '#FFF', marginLeft: -1, }}>
                      {index + 1}
                    </font>
                  </div>
                  <div style={{ marginLeft: 16, display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <font style={{
                        fontSize: 10
                      }}>
                        PESO
                    </font>
                      <font style={{
                        fontSize: 16,
                        fontWeight: "bold"
                      }}>
                        {item.w}
                      </font>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
                      <font style={{
                        fontSize: 10
                      }}>
                        VALOR
                </font>
                      <font style={{
                        fontSize: 16,
                        fontWeight: "bold"
                      }}>
                        {item.v}
                      </font>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

export default App;
