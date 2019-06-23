import store from "../Redux/store";
import { setTotalMana, setCurrentMana, setChargeOfMinion } from "../Redux/actions";

const startTurnHandler = currentTurn => {
  const state = store.getState();
  const { players } = state;
  const newTotalMana = players[currentTurn].totalMana + 1;
  if (newTotalMana <= 10) {
    store.dispatch(setTotalMana(currentTurn, newTotalMana));
    store.dispatch(setCurrentMana(currentTurn, newTotalMana));
  } else {
    store.dispatch(setCurrentMana(currentTurn, 10));
  }
  players[currentTurn].field.forEach((minion, fieldId) => {
    if (minion){
        store.dispatch(setChargeOfMinion(currentTurn, fieldId, true));
    }
})
  
};

export default startTurnHandler;
