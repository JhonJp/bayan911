   //ajax request
   $.ajax({
    url: "http://10.10.1.57:100/demo/api/mobile/getcontacts.php",
    success: function(result){
      var tag = "";
      for (var i = 0; i < result.length; i++){
        var name = result[i].accountname;
        var phone = result[i].phone;
        var id = result[i].id;
        var finname;
        if (name.length > 32){
          finname = name;
          //append data to tag html
          tag += "<div id=\""+id+"\" class=\"chip\">"+
            "<img src=\"../../assets/images/sc_icons/bayan.png\" alt=\"User\" width=\"50\" height=\"50\">"+
            "<div class=\"txt\">"+
              "<h6 class=\"nname\">"+finname+"</h6>"+
              //"<small class=\"phonenum\">"+phone+"</small>"+
              //"<span class=\"callbtn\"></span>"+
            "</div>"+
          "</div>";
        }else{
          finname = name;
          //append data to tag html
          tag += "<div id=\""+id+"\" class=\"chip\">"+
            "<img src=\"../../assets/images/sc_icons/bayan.png\" alt=\"User\" width=\"50\" height=\"50\">"+
            "<div class=\"txt\">"+
              "<h6 class=\"nname\">"+finname+"</h6>"+
              "<small class=\"phonenum\">"+phone+"</small>"+
              //"<span class=\"callbtn\"></span>"+
            "</div>"+
          "</div>";
        }
      }
      //insert data into view
      document.getElementById('contact_list').innerHTML = tag;
    },
    error: function(){
    }
  });
  
  function filter() {
   var input, filter, ul, li, a, i, txtValue;
   input = document.getElementById("search");
   filter = input.value.toUpperCase();
   ul = document.getElementById("contact_list");
   li = ul.getElementsByTagName("div");
   for (i = 0; i < li.length; i++) {
       a = li[i].getElementsByTagName("h6")[0];
       txtValue = a.textContent || a.innerText;
       if (txtValue.toUpperCase().indexOf(filter) > -1) {
           li[i].style.display = "";
       } else {
           li[i].style.display = "none";
       }
   }
  }
  
  
      //ajax div clicked phone call
  $(document).on('click','.chip', function(event){
    event.preventDefault();
    //var name = $('#'+this.id+' .txt .nname').text();
    var number = $('#'+this.id+' .txt .phonenum').text();
    //alert(number);
    var link = 'tel:'+number;
    console.log(link);
    window.open(link, '_system', 'location=yes');
  });