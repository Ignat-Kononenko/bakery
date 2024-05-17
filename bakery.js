 //Scroll
var lastScrollTop = 0;
 var stickyBlock = document.getElementById("stickyBlock");
var burger = document.getElementById("burger");

window.addEventListener("scroll", function() {
var ScrollTop = window.pageYOffset ;
if(ScrollTop > lastScrollTop){
stickyBlock.style.position = 'relative';
burger.style.position = 'relative';
 if(menu_toggle.checked){
  burger.style.position = 'fixed';
 }
} 
else{
 stickyBlock.style.position = 'sticky';
 burger.style.position = 'fixed';
}
 }) 

