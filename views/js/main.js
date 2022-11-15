$(document).ready(function (){




  /////      GIF LOADER ///////////////////////////

  $(document).ajaxStart(function(){
    $("body").addClass("loading"); 
  });

  $(document).ajaxStop(function(){
    $("body").removeClass("loading"); 
  });
////////GIF LOADER END///////////////////////////////




  $("#touch").submit(function (event) {
    var formData = {
      email: $("#email").val(),
      category : $("#cat").val(),
      product : $("#pro").val(),
     
    };
  
    $.ajax({
      type: "POST",
      url: "../phpAction/insert.php",  //check the registration table using email entered to match the code inserted there
      data: formData,
      dataType: "json",
      encode: true,
      enctype : true,
    }).done(function (data) {
  
         //validate.php should return 1 on success, 0 on failure, -1 if the code has expired
       
  
          if(data == 1){
            document.getElementById("msg").innerText = "Subscription success"
            document.getElementById("msg").style.marginLeft = "40px";
            document.getElementById("msg").style.color = "green";
            $("#msg").fadeIn();
            setTimeout(function(){
              $("#msg").fadeOut();
            }, 3000)
          }else if(data == 0){
           
  
            document.getElementById("msg").innerText = "Subscription failed. Try again"
            document.getElementById("msg").style.marginLeft = "40px";
            document.getElementById("msg").style.color = "red";
            $("#msg").fadeIn();

            setTimeout(function(){
              $("#msg").fadeOut();
            }, 3000)
          }
   
             
      }).fail(function (data) {
  
        document.getElementById("msg").innerText = "An error occured. Please check your network connectivity";
        document.getElementById("msg").style.color = "red";
        $("#msg").fadeIn();

        setTimeout(function(){
          $("#msg").fadeOut();
        }, 3000)
    });
  
    event.preventDefault();
  });
  
  
  ////////////// end of to validate the code entered on registration ////////////////////
  





  


  $("#touch1").submit(function (event) {
    var formData = {
      email: $("#email1").val(),
      category : $("#cat").val(),
      product : $("#pro").val(),
     
    };
  
    $.ajax({
      type: "POST",
      url: "../phpAction/insert.php",  //check the registration table using email entered to match the code inserted there
      data: formData,
      dataType: "json",
      encode: true,
      enctype : true,
    }).done(function (data) {
  
         //validate.php should return 1 on success, 0 on failure, -1 if the code has expired
       
  
          if(data == 1){
            document.getElementById("msg1").innerText = "Subscription success"
            document.getElementById("msg1").style.marginLeft = "40px";
            document.getElementById("msg1").style.color = "green";
            $("#msg1").fadeIn();


            setTimeout(function(){
              $("#msg1").fadeOut();
            }, 3000)
          }else if(data == 0){
           
  
            document.getElementById("msg1").innerText = "Subscription failed. Try again"
            document.getElementById("msg1").style.marginLeft = "40px";
            document.getElementById("msg1").style.color = "red";
            $("#msg1").fadeIn();

            setTimeout(function(){
              $("#msg1").fadeOut();
            }, 3000)
          }
   
             
      }).fail(function (data) {
  
        document.getElementById("msg1").innerText = "An error occured. Please check your network connectivity";
        document.getElementById("msg1").style.color = "red";
        $("#msg1").fadeIn();

        setTimeout(function(){
          $("#msg1").fadeOut();
        }, 3000)
    });
  
    event.preventDefault();
  });
  
  
  ////////////// end of to validate the code entered on registration ////////////////////






  

  $("#about").submit(function (event) {
    var formData = {
      email: $("#email1").val(),
      category : $("#cat").val(),
      product : $("#pro").val(),
     
    };
  
    $.ajax({
      type: "POST",
      url: "./phpAction/insert.php",  //check the registration table using email entered to match the code inserted there
      data: formData,
      dataType: "json",
      encode: true,
      enctype : true,
    }).done(function (data) {
  
         //validate.php should return 1 on success, 0 on failure, -1 if the code has expired
       
  
          if(data == 1){
            document.getElementById("msg1").innerText = "Subscription success"
            document.getElementById("msg1").style.marginLeft = "40px";
            document.getElementById("msg1").style.color = "green";
            $("#msg1").fadeIn();


            setTimeout(function(){
              $("#msg1").fadeOut();
            }, 3000)
          }else if(data == 0){
           
  
            document.getElementById("msg1").innerText = "Subscription failed. Try again"
            document.getElementById("msg1").style.marginLeft = "40px";
            document.getElementById("msg1").style.color = "red";
            $("#msg1").fadeIn();

            setTimeout(function(){
              $("#msg1").fadeOut();
            }, 3000)
          }
   
             
      }).fail(function (data) {
  
        document.getElementById("msg1").innerText = "An error occured. Please check your network connectivity";
        document.getElementById("msg1").style.color = "red";
        $("#msg1").fadeIn();

        setTimeout(function(){
          $("#msg1").fadeOut();
        }, 3000)
    });
  
    event.preventDefault();
  });

  




})


function proceedEmailSkip(btnId){

  let hash = "#" + btnId
  $("#EnterEmailSkip").offset({ top: $(hash).offset().top - 400});
  document.getElementById("all").style.backgroundColor = "#11182B";
  $("#all").fadeTo(1000, 0.3);
  $("#EnterEmailSkip").fadeIn();
  $('p').css('color', 'white');
  $('li').css('color', 'white');
  $('#page').css('color', 'black');
  $('#page1').css('color', 'black');

}



function proceedEmail(btnId){

  let hash = "#" + btnId
  $("#EnterEmail").offset({ top: $(hash).offset().top - 400});
  document.getElementById("all").style.backgroundColor = "#11182B";
  $("#all").fadeTo(1000, 0.3);
  $("#EnterEmail").fadeIn();
  $('p').css('color', 'white');
  $('li').css('color', 'white');
  $('#page').css('color', 'black');
  $('#page1').css('color', 'black');

}




function proceedOth(btnId){

  let hash = "#" + btnId
  $("#EnterEmail").offset({ top: $(hash).offset().top - 400});
  document.getElementById("all").style.backgroundColor = "#11182B";
  $("#all").fadeTo(1000, 0.3);
  $("#EnterEmail").fadeIn();
  $('p').css('color', 'white');
}



function dismiss(div){

  let hash = "#" + div;
  $(hash).fadeOut();
  document.getElementById("all").style.backgroundColor = "white";
  $("#all").fadeTo(1000, 1);
  $("body").animate({backgroundColor : "white"}, 'slow');
  $('p').css('color', 'black');
  $('li').css('color', 'black');

  $('#p1').css('color', 'white');
  $('#p2').css('color', 'white');
  $('#p3').css('color', 'white');
  $('#p4').css('color', 'white');
  $('#p5').css('color', 'white');
  $('#page').css('color', 'black');
  $('#page1').css('color', 'black');
}


function skip(){

  $("#skip").fadeOut();
  $("#next").fadeIn();

}



function back(){

  $("#skip").fadeIn();
  $("#next").fadeOut();

}