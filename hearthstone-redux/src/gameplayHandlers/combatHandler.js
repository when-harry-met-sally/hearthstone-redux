import store from "../Redux/store";
import {
  setHealthOfMinion,
  setHealthOfHero,
  setChargeOfMinion
} from "../Redux/actions";
const combatHandler = (
  attackingPlayerId,
  defendingPlayerId,
  attackingMinionFieldId,
  defendingMinionFieldId
) => {
  const state = store.getState();
  const { players } = state;
  let result = {
    success: null,
    message: null
  };

  if (state.currentTurn === attackingPlayerId) {
    if (attackingPlayerId !== defendingPlayerId) {
      const attackingMinion =
        players[attackingPlayerId].field[attackingMinionFieldId];
      if (attackingMinion.charge === true) {
          if (defendingMinionFieldId){
        if (defendingMinionFieldId !== "hero") {
          const defendingMinion =
            players[defendingPlayerId].field[defendingMinionFieldId];
          const newAttackingHealth =
            attackingMinion.health - defendingMinion.attack;
          const newDefendingHealth =
            defendingMinion.health - attackingMinion.attack;
          store.dispatch(
            setHealthOfMinion(
              attackingPlayerId,
              attackingMinionFieldId,
              newAttackingHealth
            )
          );
          store.dispatch(
            setHealthOfMinion(
              defendingPlayerId,
              defendingMinionFieldId,
              newDefendingHealth
            )
          );
        } else {
          const attackingMinion =
            players[attackingPlayerId].field[attackingMinionFieldId];
          const newHeroHealth =
            state.players[defendingPlayerId].health - attackingMinion.attack;
          store.dispatch(setHealthOfHero(defendingPlayerId, newHeroHealth));
        }
        store.dispatch(
            setChargeOfMinion(attackingPlayerId, attackingMinionFieldId, false)
          );
        } else {
            result = {
                success: false,
                message: "NO TARGET"
              };
        }
      } else {
        result = {
          success: false,
          message: "MINION IS NOT READY"
        };
      }
    } else {
      result = {
        success: false,
        message: "PLAYER CANNOT ATTACK HIS OWN MINIONS"
      };
    }
  } else {
    result = {
      success: false,
      message: "PLAYER CANOT ATTACK WHEN NOT HIS TURN"
    };
  }
  return result;
};

export default combatHandler;
