document.addEventListener("offline", onOffline, false);

  function onOffline() {
      // Handle the offline event
      $('#offline').addClass('show');
      $('#offline').attr('style','display:block;padding-top:25%;background:rgba(0,0,0,0.5);');
  }

  document.addEventListener("online", onOnline, false);

  function onOnline() {
      // Handle the online event
      $('#offline').removeClass('show');
      $('#offline').attr('style','display:none;');
  }