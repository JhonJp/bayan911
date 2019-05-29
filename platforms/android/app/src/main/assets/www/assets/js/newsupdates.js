$.ajax({
     url: "https://newsapi.org/v2/top-headlines?country=ph&apiKey=6f297ca000034fbe86a4a47459a77a57",
     success: function(result){
       var tag = "";
       for (var i = 0; i < result['articles'].length; i++){
 
           var title = result['articles'][i].title;
           var desc;
           var url = result['articles'][i].url;
           var img = result['articles'][i].urlToImage;
           var author = result['articles'][i].author;
           var publish = result['articles'][i].publishedAt;
           
           //check if no description.
           if (typeof result['articles'][i].description != 'undefined' && result['articles'][i].description) {
             //deal with description'
             desc = result['articles'][i].description
           }else{
             desc = result['articles'][i].content
           }
           //check author if null
           if (typeof result['articles'][i].author != 'undefined' && result['articles'][i].author) {
             //deal with author'
             author = result['articles'][i].author
           }else{
             author = "No Author"
           }
           //append data to tag html
           tag += 
             "<div class=\"card\">"+
                 "<img class=\"card-img-top\" src=\""+ img +"\">"+
                 "<div class=\"card-body text-left\">"+
                   "<h6 class=\"card-title\" style=\"font-size: 18px; color: #000;\">"+ title + "</h6>"+
                  // "<p class=\"card-text\" style=\"font-size: 15px; color: #000;\">"+ desc.substring(0,100) +".....</p>"+
                   "<p class=\"card-text\">"+
                     "<small class=\"text-muted\">"+
                       "By : "+ author + "<br>"+
                       "Date : "+ publish + "<br>"+
                       "Source : newsapi.org</small></p>"+
                   "<a onclick=\"window.open('"+url+"','_system','location=yes'); return false;\" style=\"color: #FF0000;\">Read more</a>"+
                 "</div><br>"+
             "</div>";
       }
       //insert data into view
       document.getElementById('news').innerHTML = tag;
     },
     error: function(){
     }
   });