$.ajax({
     url: "https://jsonplaceholder.typicode.com/albums",
     success: function(result){
       var tag = "";
       //console.log(tag);
       for (var i = 0; i < result.length; i++){

           var title = result[i].title;

           //append data to tag html
           tag += "<div class=\"groups\">"+
               "<a onclick=\"window.open('http://beta.gpexpresscargo.com/filetest.pdf','_system','location=yes'); return false;\">"+
                 "<div class=\"gr-item\">"+
                 "<i class=\"now-ui-icons files_single-copy-04\"></i>"+
               "</div>"+
               "<p>"+title.substring(1, 10)+"...</p></a>"+
             "</div>";
       }
       //insert data into view
       document.getElementById('doc_types').innerHTML = tag;
     },
     error: function(){
     }
   });