import React from "react";

function hand({ hand, playerId, currentMana, currentTurn }) {
  const content = hand.map((card, i) => {
    const usable =
      card.cost <= currentMana && playerId === currentTurn? "usable responsive-img" : "responsive-img";
    return (
      <img
        draggable="true"
        data-cardinhand="true"
        data-playerid={playerId}
        data-cardid={card.id}
        data-handid={i}
        key={i}
        alt=""
        src={card.img}
        className={usable}
      />
    );
  });

  return <div className="hand">{content}</div>;
}

export default hand;
