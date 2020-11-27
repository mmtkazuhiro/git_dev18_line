$(".sousin").on("click", function () {
    // メッセージが空だと送信できないようにする
    if (document.getElementById('text').value == "" )  {
        return;
    }


  navigator.geolocation.getCurrentPosition(basho);
  function basho(position) {
      var jouhou = "緯度:" + position.coords.latitude;
      jouhou += "・経度:" + position.coords.longitude;
      var date = new Date(position.timestamp);
      jouhou += "・時間:" + date.toLocaleString();
      
      document.getElementById('result_position').innerHTML = `${jouhou}`;
      console.log(jouhou)
  }

    newPostRef.push({
      text:$('#text').val(),
      position: $('#map_text').val()
    })
    $("#text").val("");
    $("#map_text").val("");
  });

  newPostRef.on("child_added", function (data) {
    let v = data.val();
    console.log(v);
    let soushin = `<p class=message><div class=jikan>${v.position}</div><div class=textmessage>${v.text}</div></p>`;
    
    // prependだと上に追加されるが、appendだと新規メッセージが下に追加される
    $(".output").append(soushin);

    // ランダム送信モードが送信回数1000回を超えると出現するようにする
    var length=$('.output p').filter(':visible').length;
    console.log(length);
    if(length  >= 2000){
        $(".mode").show();
        $("#setumei").show();
    }

    function inputCheck() {
        var inputValue = document.getElementById( "inputForm" ).value;
        console.log(input);
      }

  });



  $(".mode").on("click", function () {
    var randomsend = Math.floor(Math.random() *4);
    if(randomsend == 0){
        if (document.getElementById('text').value == "" )  {
            return;
        }
        newPostRef.push({
            text:$('#text').val()
          })
          $("#text").val(""); 
    }else if(randomsend == 1){
        if (document.getElementById('text').value == "" )  {
            return;
        }
        $("#text").val(""); 
        
    }else if(randomsend == 2){
        if (document.getElementById('text').value == "" )  {
            return;
        }
        $("#text").val(""); 
    }else if(randomsend == 3){
        if (document.getElementById('text').value == "" )  {
            return;
        }
        $("#text").val(""); 
    }

    
});




  $("#text").on("keydown", function (e) {
    console.log(e, 'ee');
    if (e.keyCode == 13) { 
      if (e.shiftKey) { 
        newPostRef.push({
          text: $("#text").val(), 
        })
        $("#text").val(""); 
      } else {
        console.log(111);
      }
    } else {
    }
  });

  function initMap() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var myposition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          var maphyouji = {
            zoom : 15,          
            center : myposition  
          };
          var map = new google.maps.Map(
            document.getElementById("map"),
            maphyouji
          );
          var mark = new google.maps.Marker({
            map : map,
            position : myposition
          });
        }

      );
    } 
  };

