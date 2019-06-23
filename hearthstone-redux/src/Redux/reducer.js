import cards from "../Data/Cards";
import {
  SET_TURN,
  PLACE_CARD,
  SET_HEALTH_OF_MINION,
  REMOVE_MINION_FROM_FIELD,
  SET_HEALTH_OF_HERO,
  SET_CHARGE_OF_MINION,
  SET_TOTAL_MANA,
  SET_CURRENT_MANA
} from "./types";

const initialState = {
  playerId: 0,
  enemyId: 1,
  currentTurn: 0,
  players: [
    {
      id: 0,
      hand: cards,
      field: [null, null, null, null, null, null, null],
      currentMana: 0,
      totalMana: 0,
      health: 30
    },
    {
      id: 1,
      hand: cards,
      field: [null, null, null, null, null, null, null],
      currentMana: 0,
      totalMana: 0,
      health: 30
    }
  ]
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TURN: {
      return { ...state, currentTurn: action.payload };
    }
    case SET_TOTAL_MANA: {
      const { players } = state;
      const temp = [...players];
      const { playerId, newTotalMana } = action.payload;
      temp[playerId].totalMana = newTotalMana;
      return { ...state, players: [...temp] };
    }
    case SET_CURRENT_MANA: {
        const { players } = state;
        const temp = [...players];
        const { playerId, newCurrentMana } = action.payload;
        temp[playerId].currentMana = newCurrentMana;
        return { ...state, players: [...temp] };
      }
    case PLACE_CARD: {
      const { players } = state;
      const { playerId, cardId, positionId, handId } = action.payload;
      const temp = [
        {
          ...players[0],
          field: [...players[0].field],
          hand: [...players[0].hand]
        },
        {
          ...players[1],
          field: [...players[1].field],
          hand: [...players[1].hand]
        }
      ];
      temp[playerId].field[positionId] = {
        ...cards[cardId],
        health: cards[cardId].initialHealth,
        attack: cards[cardId].initialAttack,
        charge: false
      };
      temp[playerId].hand.splice(handId, 1);
      temp[playerId].currentMana =
        temp[playerId].currentMana - cards[cardId].cost;
      return { ...state, players: [...temp] };
    }
    case SET_HEALTH_OF_MINION: {
      const { players } = state;
      const { playerId, fieldId, newHealth } = action.payload;
      const temp = [
        {
          ...players[0],
          field: [...players[0].field],
          hand: [...players[0].hand]
        },
        {
          ...players[1],
          field: [...players[1].field],
          hand: [...players[1].hand]
        }
      ];
      temp[playerId].field[fieldId] = {
        ...temp[playerId].field[fieldId],
        health: newHealth
      };
      return { ...state, players: [...temp] };
    }
    case REMOVE_MINION_FROM_FIELD: {
      const { players } = state;
      const { playerId, fieldId } = action.payload;
      const temp = [
        {
          ...players[0],
          field: [...players[0].field],
          hand: [...players[0].hand]
        },
        {
          ...players[1],
          field: [...players[1].field],
          hand: [...players[1].hand]
        }
      ];
      temp[playerId].field[fieldId] = null;
      return { ...state, players: [...temp] };
    }
    case SET_HEALTH_OF_HERO: {
      const { players } = state;
      const temp = [{ ...players[0] }, { ...players[1] }];
      const { playerId, newHealth } = action.payload;
      temp[playerId].health = newHealth;
      return { ...state, players: [...temp] };
    }
    case SET_CHARGE_OF_MINION: {
        console.log('charing')
      const { players } = state;
      const { playerId, fieldId, charge } = action.payload;
      const temp = [
        {
          ...players[0],
          field: [...players[0].field],
          hand: [...players[0].hand]
        },
        {
          ...players[1],
          field: [...players[1].field],
          hand: [...players[1].hand]
        }
      ];
      temp[playerId].field[fieldId] = {
        ...temp[playerId].field[fieldId],
        charge: charge
      };
      return { ...state, players: [...temp] };
    }
    default:
      return state;
  }
}

export default reducer;
