import store from "../Redux/store";
import { placeCard } from "../Redux/actions";
const playCardHandler = (playerId, cardId, fieldId, fieldPlayerId, handId) => {
  const state = store.getState();
  const { players } = state;
    let result = {
        success: null,
        message: null,
    }
  if (parseInt(fieldPlayerId) === parseInt(playerId)) {
    if (state.currentTurn === parseInt(playerId)) {
      const cardToSummon = players[playerId].hand[handId];
      if (players[playerId].currentMana >= cardToSummon.cost) {
        if (!players[playerId].field[fieldId]) {
          store.dispatch(placeCard(playerId, cardId, fieldId, handId));
          result.success = true;
        } else {
            result = {
                success: false,
                message: 'SPOT ON FIELD IS ALREADY OCCUPIED'
            }
        }
      } else {
        result = {
            success: false,
            message: 'PLAYER LACKS MANA'
        }
      }
    } else {
        result = {
            success: false,
            message: 'IT IS NOT PLAYERS TURN'
        }
    }
  } else {
    result = {
        success: false,
        message: 'PLAYER CANNOT PUT CARD ON OPPONENTS FIELD'
    }
  }
  return result
};

export default playCardHandler;
