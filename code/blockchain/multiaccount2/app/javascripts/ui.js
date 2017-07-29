
$(function() {

  $("form#data").submit(function(event){

    event.preventDefault();

    var url  = 'http://localhost:8000/get_diamond_hash/';
    var image_file = $('#image_file').get(0).files[0];

    var formData = new FormData();
    formData.append("image_file", image_file);

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      
      success: function (reponse) {
        console.log(reponse.coordinate_hash);
        $("#coordinate_hash" ).html(reponse.coordinate_hash);
        $("#coordinates" ).html(reponse.coordinate_string);

      }
    });

    return false;

  });

});


function readURL(input) {
   if (input.files && input.files[0]) {
       var reader = new FileReader();
       reader.onload = function (e) {
           $('#uploaded_image').attr('src', e.target.result);
       }        reader.readAsDataURL(input.files[0]);
   }
}$("#image_file").change(function(){
   readURL(this);
});