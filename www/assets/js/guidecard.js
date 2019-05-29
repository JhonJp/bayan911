//ajax request
$.ajax({
     url: "http://10.10.1.57:100/demo/api/mobile/getfaqs.php",
     success: function(result){
       var tag = "";
       for (var i = 0; i < result.length; i++){
         var name = result[i].question;
         var faqid = result[i].faq_no;
         var phone = result[i].answer;
         var id = result[i].id;
         if (faqid != 'FAQ1'){  
           //append data to tag html
             tag += 
             "<div id=\""+i+"\" onclick=\"openthis(this.id);\" class=\"card\">"+
                 "<div class=\"card-body text-left\">"+
                   "<h6 class=\"card-title\" style=\"font-size: 15px; color: #000;\">"+ name + "</h6>"+
                   "<p id=\"card-"+i+"\" class=\"card-text\" style=\"font-size:15px;color:#000;\">"+ phone.replace(/\r\n/g, "<br>").substring(0,80) +".....</p>"+
                   "<div class=\"panel card-text\" id=\"panel-"+i+"\">"+
                     "<p class=\"card-text\" style=\"font-size: 15px; color: #000;\">"+ phone.replace(/\r\n/g, "<br>") +
                     "</p>"+
                   "</div><br>"+
                   "<a style=\"color: #FF0000;\">Read more</a>"+
                 "</div><br>"+
             "</div>";
         }
       }
       //insert data into view
       document.getElementById('faqs').innerHTML = tag;
     },
     error: function(){
     }
   });