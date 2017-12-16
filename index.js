   $.ajax({
          type: "GET",
          dataType: "json",
          url: "readData.php",
          success: function(hashtags, status) {
            $.each(hashtags, function( index, hashtag ) {
              findElementPosition(hashtag.tag);
            });
          }
      });
function hashTagHandle(text= null){
    
    var hashTagText = $('input[name="hashtag"]').val();
    var is_new = true;

$(".myDiv").each(function(){
  if($(this).html().indexOf(hashTagText) > -1){
     is_new = false;
     $("#error").text("This HashTag already exists ");
  }
});
if(is_new){
    $("#error").text("");
    var myData ="hashtag=" + hashTagText;

            $.ajax({
                type: "POST",
                data: myData,
                dataType: "json",
                url: "insert.php",
                success: function(data, status) {

                }
            });
            findElementPosition(hashTagText);
}
}
function findElementPosition(hashTagText){

    if ($(".hashtags")[0].lastElementChild.className == "even") {
    if ($(".hashtags")[0].lastElementChild.childElementCount < 3) {
      appendDiv(hashTagText);

    }else {
      appendDiv(hashTagText, class_name = "odd");
    }
  }else if ($(".hashtags")[0].lastElementChild.className == "odd")  {
    if ($(".hashtags")[0].lastElementChild.childElementCount < 2) {
      appendDiv(hashTagText);

    }else {
      appendDiv(hashTagText, class_name = "even");
    }
  }

}
function appendDiv(hashtext, class_name = null) {
  if (class_name) {
  $(".hashtags").append('<div class="'+ class_name +'"></div');
}
  if ($(".hashtags")[0].lastElementChild.childElementCount == 0) {
    $(".hashtags div:last").append('<div class="myDiv animated fadeIn" onclick="hashTagPosts(this)"><h5 class="vertical-text">'+ hashtext +'</h5></div>');
  }else {
    $(".hashtags div:last").after('<div class="myDiv animated fadeIn" onclick="hashTagPosts(this)"><h5 class="vertical-text">'+ hashtext +'</h5></div>');
  }


}

function hashTagPosts(obj){
  var obj_text = $(obj).text();
  $("#hashtag_form").hide();
   $('.myDiv').hide();
   $(".posts").show();
   
   $(".posts .myDiv").show();
   $(".posts").append('<div class="myDiv animated fadeIn"><h5 class="vertical-text">'+ $(obj).text() +'</h5></div>');
   $(".posts").append('<button class="button" style="vertical-align:middle"><span>Back </span>');
   $(".posts .myDiv").css("margin-right" ,"100%");
   $(".posts .myDiv").css("margin-left" ,"47%");
   $(".posts .myDiv").css("margin-bottom" ,"10%");
$(".button").click(function(){
    $(".posts").children().remove();
   $(".posts").hide();
   $("#hashtag_form").show();
   $('.myDiv').show();
});

var request = $.ajax({
  url: "https://graph.facebook.com/v2.10/search?q="+ obj_text +"Me&type=page&fields=posts&access_token=144000819588869|3g0SZvbBJGYZhPoWiQmHyXL-NIo",
  method: "GET",
  dataType: "json"
});

request.done(function( posts ) {
  if(posts.data.length > 0){
    $.each(posts.data, function( index, value ) {
      if (value.posts) {
        console.dir( value.posts.data );
        $.each(value.posts.data, function( index, post ) {
                if( post.story ){

                  $(".posts").append('<div><img style="float: left;position: absolute;" src="https://cdn4.iconfinder.com/data/icons/icocentre-free-icons/142/f-facebook_256-16.png" /><span style="padding-left: 20px;">'+ post.story +'</span></div><hr><br>');
                }
            });
      }
    });
  }
});

request.fail(function( jqXHR, textStatus ) {
  console.log( "Request failed: " + textStatus );
});
}
