c.addEventListener('click', function(event) {
  let x = event.pageX;
  let y = event.pageY;

  for (var i = 0; i < objects.length; i++) {
    objects[i].highlightVertice(x,y);
  }
});
