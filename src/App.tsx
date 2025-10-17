import { useState } from "react";
import ReactConfetti from "react-confetti";

export default function App() {
  const combinazioniVincenti = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [mosse, setMosse] = useState(["", "", "", "", "", "", "", "", ""]);
  const [turn, setTurn] = useState("X");
  const [vince, setVince] = useState();
  // | Cosa fai                     | Effetto                                           |
  // | ---------------------------- | ------------------------------------------------- |
  // | `mosse[id] = "X"`            | Cambia l’array ma React **non ridisegna**         |
  // | `[...mosse]`                 | Crea una **nuova copia** (immutabile)             |
  // | `setMosse(nuovaCopia)`       | Aggiorna lo stato e **React ridisegna**           |
  // | `setMosse(mosse => { ... })` | Usa il valore più recente di `mosse` (più sicuro) |

  function square(id: number) {
    setMosse((mosse) => {
      const copia = [...mosse];
      if (copia[id] == "" && !checkWinner(copia)) copia[id] = turno();

      const vincitore = checkWinner(copia);
      if (vincitore) winner(vincitore);
      return copia;
    });
  }

  function winner(dato: any) {
    setVince(() => dato);
  }

  function checkWinner(mosse: string[]) {
    for (let combo of combinazioniVincenti) {
      const [a, b, c] = combo;
      if (mosse[a] && mosse[a] === mosse[b] && mosse[a] === mosse[c]) {
        return mosse[a];
      }
    }
    return null;
  }

  function turno() {
    if (turn == "X") {
      setTurn((_turno) => "O");
      return "X";
    } else {
      setTurn((_turno) => "X");
      return "O";
    }
  }

  function effetti() {
    if (vince)
      return (
        <>
          <ReactConfetti />
          <h1>Ha vinto {vince}</h1>
        </>
      );
  }

  function giocatore() {
    if (turn == "X")
      return (
        <div className="turno justify-center text-7xl">
          Tocca al giocatore 1
        </div>
      );
    else
      return (
        <div className="turno justify-center text-7xl">
          Tocca al giocatore 2
        </div>
      );
  }

  return (
    <>
      <div className="flex flex-col items-center bg-gradient-to-r bg-blue-500 to-red-300 min-h-screen">
        <div className="flex turno justify-center text-7xl mb-16 mt-30">
          {vince ? effetti() : giocatore()}
        </div>
        <div className="tabella grid grid-cols-3 grid-rows-3 h-[500px] w-[500px] object-center">
          <button
            onClick={() => square(0)}
            className="cursor-pointer border-r-4 border-b-4"
          >
            <p className="text-8xl">{mosse[0]}</p>
          </button>
          <button
            onClick={() => square(1)}
            className="cursor-pointer border-r-4 border-b-4 border-l-4"
          >
            <p className="text-8xl">{mosse[1]}</p>
          </button>
          <button
            onClick={() => square(2)}
            className="cursor-pointer border-l-4 border-b-4"
          >
            <p className="text-8xl">{mosse[2]}</p>
          </button>
          <button
            onClick={() => square(3)}
            className="cursor-pointer border-t-4 border-r-4 border-b-4"
          >
            <p className="text-8xl">{mosse[3]}</p>
          </button>
          <button onClick={() => square(4)} className="cursor-pointer border-4">
            <p className="text-8xl">{mosse[4]}</p>
          </button>
          <button
            onClick={() => square(5)}
            className="cursor-pointer border-t-4 border-b-4 border-l-4"
          >
            <p className="text-8xl">{mosse[5]}</p>
          </button>
          <button
            onClick={() => square(6)}
            className="cursor-pointer border-t-4 border-r-4"
          >
            <p className="text-8xl">{mosse[6]}</p>
          </button>
          <button
            onClick={() => square(7)}
            className="cursor-pointer border-l-4 border-t-4 border-r-4"
          >
            <p className="text-8xl">{mosse[7]}</p>
          </button>
          <button
            onClick={() => square(8)}
            className="cursor-pointer border-t-4 border-l-4"
          >
            <p className="text-8xl">{mosse[8]}</p>
          </button>
        </div>
        <button
          onClick={() => {
            setMosse(["", "", "", "", "", "", "", "", ""]),
              setTurn("X"),
              setVince(undefined);
          }}
          className="border-2 rounded-2xl w-3xs mt-10 bg-white/45 cursor-pointer hover:scale-105 text-3xl"
        >
          RESET
        </button>
      </div>
    </>
  );
}
