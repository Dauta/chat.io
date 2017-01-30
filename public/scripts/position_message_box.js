var messageBox = document.getElementById("msg");
var btnMsg = document.getElementById("btnMsg");
var msgBar = document.getElementById("message");

//initial height
var btnH = btnMsg.offsetHeight;

var position = function(){

  if(messageBox.offsetWidth <= 1024){
    btnMsg.style.width = "140px";
    btnMsg.style.height = "80px";
    btnMsg.style.fontSize = "120%";
    btnMsg.style.position = "fixed";
    btnMsg.style.bottom = "0px";
    btnMsg.style.right = "0px";

    msgBar.style.width = messageBox.offsetWidth - 140;
    messageBox.style.left = "0px";
    messageBox.style.right = "";

    messageBox.style.width = "100%";
    messageBox.style.fontSize = "120%";
  }
  if(messageBox.offsetWidth > 1024){
    btnMsg.style.width = "10%";
    btnMsg.style.position = "relative";
    btnMsg.style.height = btnH;
    btnMsg.style.fontSize = "100%";
    msgBar.style.width = "90%";
    messageBox.style.left = "";
    messageBox.style.right = "0px";

    messageBox.style.width = "84%";
    messageBox.style.fontSize = "100%";
  }
};

window.addEventListener("load", position);
window.addEventListener("resize", position);
