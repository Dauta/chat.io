var responsive = function(){

  var form = document.getElementById("sign_in");
  if(form.offsetWidth < 768){
    form.style.width = "100%";
    form.style.fontSize = "140%";
  }
  window.addEventListener("resize", function(event){
    if(form.offsetWidth < 768){

      form.style.width = "100%";
      form.style.fontSize = "140%";
    }
    if(form.offsetWidth*6/10 > 768){

      form.style.fontSize = "100%";
      form.style.width = "60%";
    }
  });
};

responsive();
