function toggleDisplayState(elementId, state="block") {
  /*
  toggle the style display of an element
  args: id of the element
  */
  var target = document.getElementById(elementId);

  if (target.style.display == state) {
    target.style.display = "none";
  } else {
    target.style.display = state;
  }
}

export {toggleDisplayState};
