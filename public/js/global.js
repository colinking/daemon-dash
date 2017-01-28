
$(() => {
  $('#logout').on('click', (e) => {
    e.preventDefault();
    $.post('/api/logout', (data) => {
      if (data.redirect) window.location.href = data.redirect;
    });
  });
});
