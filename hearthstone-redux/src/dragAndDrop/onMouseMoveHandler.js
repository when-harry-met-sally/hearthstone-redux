import withinFieldHandler from './withinFieldHandler';

const onMouseMoveHandler = (e, board, dragging, players) => {
  if (dragging) {
    if (dragging.type === "fromHand") {
      if (!board.getElementById("drag-object")) {
        dragging.original.style.visibility = "hidden";
        board.getElementById("board").appendChild(dragging.dragObject);
      }
      const drop = withinFieldHandler(e, board);
      if (!dragging.drop && drop) {
        dragging.drop = drop;
        dragging.drop.style.backgroundColor = "lightblue";
      } else if (dragging.drop !== drop) {
        dragging.drop.style.backgroundColor = null;
        dragging.drop = drop;
        if (dragging.drop) {
          dragging.drop.style.backgroundColor = "lightblue";
        }
      }
      dragging.dragObject.style.left = e.pageX - dragging.xDiff + "px";
      dragging.dragObject.style.top = e.pageY - dragging.yDiff + "px";
    } else if (dragging.type === "fromField") {
      const drop = withinFieldHandler(e, board);
      dragging.dragObject.style.left = e.pageX + "px";
      dragging.dragObject.style.top = e.pageY + "px";

      if (!dragging.drop && drop) {
        if (
          drop.dataset.hero ||
          players[drop.dataset.playerid].field[drop.dataset.id]
        ) {
          dragging.hero = drop.dataset.hero ? true : false;
          dragging.drop = drop;
          dragging.drop.style.backgroundColor = "rgb(243, 191, 191)";
        }
      } else if (dragging.drop && dragging.drop !== drop) {
        dragging.drop.style.backgroundColor = null;
        dragging.drop = drop;
        if (dragging.drop) {
          dragging.drop.style.backgroundColor = "rgb(243, 191, 191)";
        }
      }
    }
  } else {
    if (board.getElementById("dragObject")) {
      board.getElementById("board").removeChild(dragging.dragObject);
    }
  }
  return dragging;
};

export default onMouseMoveHandler;
