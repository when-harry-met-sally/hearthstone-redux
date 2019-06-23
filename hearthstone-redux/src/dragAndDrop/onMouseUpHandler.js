const onMouseUpHandler = (board, dragging) => {
  console.log(dragging);
  if (dragging) {
      console.log(dragging.drop)
    if (dragging.type === "fromHand") {
      dragging.original.style.visibility = null;
      if (dragging.drop) {
        dragging.drop.style.backgroundColor = null;
      }
    } else if (dragging.type === "fromField") {
      if (dragging.drop) {
        dragging.drop.style.backgroundColor = null;
        dragging.dropPlayerId = parseInt(dragging.drop.dataset.playerid);
        dragging.dropId = dragging.drop.dataset.id;
      }
    }
    if (board.getElementById("drag-object")) {
      board.getElementById("board").removeChild(dragging.dragObject);
    }
  }
  return dragging;
};
export default onMouseUpHandler;
