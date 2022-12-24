import { v4 as uuid } from "uuid";
import React from "react";
import { useAxios } from "./hooks";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const formatter = (data) => {
    return { image: data.cards[0].image, id: uuid() };
  };

  const [cards, addCard, removeCards] = useAxios({
    url: "https://deckofcardsapi.com/api/deck/new/draw/",
    keyName: "playingCards",
    formatter,
  });

  const handleAdd = () => {
    addCard();
  };

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={handleAdd}>Add a playing card!</button>
        <button onClick={removeCards}>Remove cards</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map((cardData) => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
