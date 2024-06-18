document.querySelector('#alkali a').addEventListener('click', function() {
    var elements = document.querySelectorAll('#alkali_metals li');
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.add('flash');
    }
    setTimeout(function() {
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('flash');
      }
    }, 1000); // remove the "flash" class after 1 second
  });