
$(function () {
     var btnid = '';
     $("button").click(function(){
          if (this.id != 'submit_incident'){
            if ($("#"+this.id).hasClass("btn-danger") ) {
              $("#"+this.id).removeClass("btn-danger");
              $("#submit_incident").addClass("btn-danger");
            }else{
                btnid = this.id;
                $("button").removeClass("btn-danger");
                $("#submit_incident").addClass("btn-danger");
                $("#"+btnid).addClass("btn-danger");
                console.log(btnid);
            }
          }
     });
   
     //form submissions
     $('#submit_incident').on('click',function(e) {
       //e.preventDefault();
       var locate = $('#location').val();
       var rem = $('#remarks').val();
   
       var formData = new FormData(this);
       var files = [];
     
       files.push(
         $('#file_first')[0].files[0].name,
         $('#file_second')[0].files[0].name,
         $('#file_third')[0].files[0].name,
       );
   
       var formData = {
         "data": [{
           incident : btnid, 
           location : $('#location').val(),
           remarks : $('#remarks').val(),
           attachment : files,
         }]
       }
  
       $.ajax({
           type:'POST',
           url: 'http://10.10.1.57:100/demo/api/mobile/incident.php',
           data: formData,
           cache:false,
           contentType: false,
           processData: false,
           beforeSend: function() { 
             $('#loads').addClass('show');
             $('#loads').attr('style','display:block;padding-top:40%;background:rgba(0,0,0,0.5);');
           },
           success:function(result){
              console.log("success");
              $('#loader_icon').removeClass('now-ui-icons loader_refresh spin');
              $('#loader_icon').addClass('now-ui-icons ui-1_check');
              $('#loader_txt').text("Upload Complete");
              console.log(formData);
              setInterval(
                function(){
                  $('#loads').removeClass('show');
                  $('#loads').attr('style','display:none;');
                  window.location = '../../pages/user/incident.html';
                }
              , 3000);
           },
           error: function(error){
              console.log("error");
              $('#loader_icon').removeClass('now-ui-icons loader_refresh spin');
              $('#loader_icon').addClass('now-ui-icons ui-1_simple-remove');
              $('#loader_txt').text("Upload Failed");
              
              setInterval(
                function(){
                  $('#loads').removeClass('show');
                  $('#loads').attr('style','display:none;');
                }
              , 1500);
           }
       });
     });
});