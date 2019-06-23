import store from '../Redux/store';
import { removeMinionFromField } from "../Redux/actions";
const deadHandler = () => {
    const state = store.getState();
    const { players } = state;
    players.forEach((player, playerId) => {
        if (player.health <= 0){
            alert('PLAYER ' + player.id + ' LOST')
        }
        player.field.forEach((position, positionId) => {
            if (position){
                if (position.health <= 0){
                    store.dispatch(removeMinionFromField(playerId, positionId));
                }
            }
        })
    })
}

export default deadHandler;