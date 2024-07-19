import { useEffect, useState } from "react";
import "./App.css";
// import SingleCard from "./components/SingleCard.css";
import SingleCard from "./components/Single-cards";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);

  const shafleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (choiceOne && choiceTwo) {
      return;
    }

    if (!choiceOne) {
      setChoiceOne(card);
    } else if (!choiceTwo) {
      setChoiceTwo(card);
      setDisable(true);
    }
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisable(false);
    setTurns((prev) => prev + 1);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
      }
      let timerId = setTimeout(() => {
        resetTurn();
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shafleCards();
  }, []);

  return (
    <div className="App">
      <h1>Jujutsu Kaisen</h1>
      <button onClick={shafleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disable={disable}
          />
        ))}
        <p>Количество ходов: {turns}</p>
      </div>
    </div>
  );
}

export default App;
