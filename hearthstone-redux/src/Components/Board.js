import React from "react"; //
import { connect } from "react-redux";
import Hero from "./Hero";
import Field from "./Field";
import Hand from "./Hand";
import TurnButton from "./TurnButton";
import Mana from "./Mana";
import combatHandler from "../gameplayHandlers/combatHandler";
import deadHandler from "../gameplayHandlers/deadHandler";
import playCardHandler from "../gameplayHandlers/playCardHandler";
import startTurnHandler from "../gameplayHandlers/startTurnHandler";
import onMouseDownHandler from "../dragAndDrop/onMouseDownHandler";
import onMouseMoveHandler from "../dragAndDrop/onMouseMoveHandler";
import onMouseUpHandler from "../dragAndDrop/onMouseUpHandler";
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dragging = null;
  }
  componentDidMount() {
    startTurnHandler(0);

    document.addEventListener("mousedown", e => {
      this.dragging = onMouseDownHandler(e, document, this.dragging);
    });
    document.addEventListener("mousemove", e => {
      this.dragging = onMouseMoveHandler(
        e,
        document,
        this.dragging,
        this.props.players
      );
    });

    document.addEventListener("mouseup", () => {
      this.dragging = onMouseUpHandler(document, this.dragging);
      if (this.dragging) {
        switch (this.dragging.type) {
          case "fromHand":
            this.handlePlaceCard(this.dragging);
            break;
          case "fromField":
            this.handleCardAttack(this.dragging);
            break;
          default:
        }
      }
      this.dragging = null;
    });
  }

  handlePlaceCard = drop => {
    const outcome = playCardHandler(
      drop.playerId,
      drop.cardId,
      drop.drop.dataset.id,
      drop.drop.dataset.playerid,
      drop.handId
    );
    console.log(outcome);
  };

  handleCardAttack = drop => {
    const attackingPlayerId = parseInt(drop.playerId);
    const defendingPlayerId = parseInt(drop.dropPlayerId);
    const attackingMinionFieldId = parseInt(drop.fieldId);
    const defendingMinionFieldId = !drop.hero ? parseInt(drop.dropId) : "hero";

    const outcome = combatHandler(
      attackingPlayerId,
      defendingPlayerId,
      attackingMinionFieldId,
      defendingMinionFieldId
    );
    deadHandler();
    console.log(outcome);
  };

  render() {
    const playerSide =
      this.props.currentTurn === this.props.playerId
        ? "current-turn-side"
        : null;
    const enemySide =
      this.props.currentTurn === this.props.enemyId
        ? "current-turn-side"
        : null;
    return (
      <div id="board">
        <div className={enemySide}>
          <Hero health={this.props.enemyHealth} playerId={this.props.enemyId} />
          <Mana
            currentMana={this.props.enemyCurrentMana}
            totalMana={this.props.enemyTotalMana}
          />
          <Hand hand={this.props.enemyHand} playerId={this.props.enemyId} />
          <Field
            field={this.props.enemyField}
            playerId={this.props.enemyId}
            currentTurn={this.props.currentTurn}
            yourField={false}
          />
        </div>
        <br />
        <div>
          <TurnButton />
        </div>
        <br />
        <div className={playerSide}>
          <Field
            field={this.props.yourField}
            playerId={this.props.playerId}
            currentTurn={this.props.currentTurn}
            yourField={true}
          />
          <Hand
            hand={this.props.yourHand}
            playerId={this.props.playerId}
            currentMana={this.props.yourCurrentMana}
            currentTurn={this.props.currentTurn}
          />

          <Mana
            currentMana={this.props.yourCurrentMana}
            totalMana={this.props.yourTotalMana}
          />

          <Hero health={this.props.yourHealth} playerId={this.props.playerId} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ playerId, enemyId, currentTurn, players }) => ({
  yourHand: players[playerId].hand,
  yourField: players[playerId].field,
  yourCurrentMana: players[playerId].currentMana,
  yourTotalMana: players[playerId].totalMana,
  enemyHand: players[enemyId].hand,
  enemyField: players[enemyId].field,
  enemyCurrentMana: players[enemyId].currentMana,
  enemyTotalMana: players[enemyId].totalMana,
  playerId,
  enemyId,
  currentTurn,
  players,
  enemyHealth: players[enemyId].health,
  yourHealth: players[playerId].health
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
