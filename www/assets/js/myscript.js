$(function () {
     $("#incident").click(function() {
       window.location = 'incident.html'; 
     });
     $("#docs_kit").click(function() {
       window.location = 'docskit.html'; 
     });
     $("#contacts").click(function() {
       window.location = 'contacts.html'; 
     });
     $("#sos").click(function() {
       $("#sos").removeClass("btn-danger glow_effect");
       $("#sos").addClass("btn-success disabled");
       $("#sos").attr('disabled','disabled');
       setInterval(function(){ 
         $("#sos").removeClass("btn-success disabled");
         $("#sos").addClass("btn-danger glow_effect");
         $("#sos").removeAttr('disabled');
       }, 300000);
     });
   });

   window.onload = function() {
     var trigger = document.getElementById('cd-nav-trigger'),
       menu = document.getElementById('cd-main-nav'),
       menuItems = menu.getElementsByTagName('li');
     trigger.onclick  = function toggleMenu() {
       if( $('#cd-nav-trigger').hasClass('menu-is-open') ) {
         trigger.setAttribute('class', 'cd-nav-trigger');
         menu.setAttribute('class', '');
       } else {
         trigger.setAttribute('class', 'cd-nav-trigger menu-is-open');
         menu.setAttribute('class', 'is-visible');
       }
       }
 
       for (var i = 0; i < menuItems.length; i++) {
         menuItems[i].onclick  = function closeMenu() {
           trigger.setAttribute('class', 'cd-nav-trigger');
           menu.setAttribute('class', '');
         }
     }
   }