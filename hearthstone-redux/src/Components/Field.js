import React from "react";

function Field({ field, playerId, currentTurn, yourField}) {
  const content = field.map((position, i) => {
    let usable;
    console.log(currentTurn)
    if (position){
        usable = position.charge && currentTurn === playerId && yourField? "usable responsive-img" : "responsive-img";
    }
    const occupant = position ? (
      <img
        src={position.img}
        data-cardinfield="true"
        draggable="true"
        data-playerid={playerId}
        data-fieldid={i}
        data-cardid={position.id}
        className={usable}
        alt=""
      />
    ) : null;
    let healthStyle;
    if (position){
        healthStyle = position.health < position.initialHealth ? 'damaged': null;
    }
    const stats = position ? (
      <div className='center'>
        <div>Attack: {position.attack}</div>
        <div className={healthStyle}>Health: {position.health}</div>
      </div>
    ) : null;
    return (
      <div
        className="field-position"
        data-drop="true"
        data-playerid={playerId}
        data-id={i}
        key={i}
      >
        {occupant}
        {stats}
      </div>
    );
  });
  return <div className="field">{content}</div>;
}

export default Field;
