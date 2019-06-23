import React from "react";
import { connect } from "react-redux";
import endTurnHandler from "../gameplayHandlers/endTurnHandler";

function TurnButton({ currentTurn }) {
  const handleClick = () => {  
    endTurnHandler(currentTurn)
  }
  return (
    <input type="button" value="Turn" onClick={handleClick} />
  );
}
const mapStateToProps = ({ currentTurn, players }) => ({
  currentTurn,
  mana: players[0].totalMana
});

export default connect(
  mapStateToProps,
  null,
)(TurnButton);
