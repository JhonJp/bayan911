//$(function () {
     //sending SOS data
     $("#sos").click(function() {
       $("#sos").removeClass("btn-danger glow_effect");
       $("#sos").addClass("btn-success disabled");
       $("#sos").attr('disabled','disabled');
       
       var data = {
        "data": [{
            name: "Maria Magdalena",
            phone: "+639271880864",
            title: "SOS Request",
            priority: "High"
            // coordinates:  [121.0215032,
            // 14.5520482],
        }]
      }
       
        $.ajax({
          type: "POST",
          url: "http://10.10.1.57:100/demo/api/mobile/sos.php",
          data: JSON.stringify(data),
          beforeSend: showAlert(),
          success: function(result){
            console.log("success");
            console.log(result);
            setTimeout(function(){ 
              $("#sos").removeClass("btn-danger");
              $("#sos").addClass("btn-success");
            }, 5000);
          },
          error: function(error){
            $("#sos").removeClass("btn-success disabled");
            $("#sos").addClass("btn-danger glow_effect");
            $("#sos").removeAttr('disabled');
            console.log("error");
            console.log(JSON.parse(error.responseText));
            
          }
        });
       
       setInterval(function(){ 
         $("#sos").removeClass("btn-success disabled");
         $("#sos").addClass("btn-danger glow_effect");
         $("#sos").removeAttr('disabled');
       }, 30000);
     });
  // });

  //bottom buttons click
  function page(id){
    if (id === 'incident'){
      //$("#incident").click(function() {
        window.location = '../../pages/user/incident.html'; 
      //});
    }else if (id === 'docs_kit'){
      //$("#docs_kit").click(function() {
        window.location = '../../pages/user/docskit.html'; 
      //});
    }else{
      //$("#contacts").click(function() {
        window.location = '../../pages/user/contacts.html'; 
      //});
    }
}

// alert dialog dismissed
function alertDismissed() {
  // do something
}

// Show a custom alert
//
function showAlert() {
    navigator.notification.alert(
        'You are the winner!',  // message
        alertDismissed,         // callback
        'Game Over',            // title
        'Done'                  // buttonName
    );
}