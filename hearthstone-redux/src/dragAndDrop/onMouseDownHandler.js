const onMouseDownHandler = (e, board, dragging) => {
    e.preventDefault();
  if (e.target.draggable) {
    if (e.target.dataset.cardinhand) {
      dragging = {
        type: "fromHand",
        cardId: e.target.dataset.cardid,
        handId: e.target.dataset.handid,
        dragObject: e.target.cloneNode(false),
        original: e.target,
        xDiff: e.pageX - e.target.offsetLeft,
        yDiff: e.pageY - e.target.offsetTop,
        drop: null,
        playerId: parseInt(e.target.dataset.playerid)
      };
      dragging.dragObject.id = "drag-object";
      dragging.dragObject.style.width = dragging.original.clientWidth + "px";
      dragging.dragObject.style.height = dragging.original.clientHeight + "px";
    } else if (e.target.dataset.cardinfield) {
      const dragObject = board.createElement("div");
      dragObject.classList.add("dot");
      dragObject.id = "drag-object";
      dragObject.style.left = e.pageX + "px";
      dragObject.style.top = e.pageY + "px";
      dragging = {
        type: "fromField",
        cardId: e.target.dataset.cardid,
        fieldId: e.target.dataset.fieldid,
        playerId: e.target.dataset.playerid,
        dragObject: dragObject
      };
      board.getElementById("board").appendChild(dragObject);
    }
  }
 
  return dragging;
};

export default onMouseDownHandler;
