document.addEventListener('DOMContentLoaded', function () {
  var currentUrl = window.location.href;
  var links = document.querySelectorAll('nav.main-menu ul.menu li a');
  for (var i = 0; i < links.length; i++) {
    if (currentUrl.includes(links[i].href)) {
      links[i].classList.add('active');
    }
  }
});
