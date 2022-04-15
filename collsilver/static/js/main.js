$(function(){
	//Preloader
	 var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(300).fadeOut('slow');

	//Hamburger menu
	$('.hamburger').click(function(){
		$('.menu-collapse').toggleClass('d-none').css('order', '1');
		$('.nav__list').toggleClass('nav__list_opened');
		$('.hamburger').toggleClass('white');
	});
	$('.nav__link').click(function(){
		$('.menu-collapse').toggleClass('d-none').css('order', '1');
		$('.nav__list').removeClass('nav__list_opened');
		$('.hamburger').removeClass('white');
	});

	//Modal window PHONE
	$('#order-btn').click(function(e){
		e.preventDefault();
		$('#order-modal').arcticmodal();
	});
	$('#desc-order-btn').click(function(e){
		e.preventDefault();
		$('#order-modal').arcticmodal();
	});

    // slick slider
    $(document).ready(function(){
        $('.offer').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: false
        });
    });

    // hat while scrolling
    $(window).scroll(function() { 
        var scroll = $(window).scrollTop();
        if (scroll > 630) {
           $(".hat").addClass("hat-scrolled");
        }
        else {
            $(".hat").removeClass("hat-scrolled");
        }
     });
});	

var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 0.15;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        var w = window.pageYOffset,  // производим прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}



// Border for input
const MIN_INPUT_COUNTER = 1;
const MAX_INPUT_COUNTER = 3500;
const CURRENT_COST = 225;

const inputs = document.querySelectorAll('input[type=number]');
Array.from(inputs).forEach(input => {
    input.addEventListener('input', (e) => {
        const value = +input.value;
        if (value > MAX_INPUT_COUNTER) { input.value = MAX_INPUT_COUNTER }
        else if (value < MIN_INPUT_COUNTER) { input.value = MIN_INPUT_COUNTER }
    })
});

// Order total
var payment_amount = document.getElementById("id_order_count");
payment_amount.onchange = function() {

    var amount = parseInt(payment_amount.value);
    var cost = CURRENT_COST;
    var total = cost * amount;
    var total_output = document.getElementById("payment_total");
    total_output.innerHTML = total;
}



// Counter
var counterDisplayElem = document.querySelector('.counter-display');
var counterMinusElem = document.querySelector('.counter-minus');
var counterPlusElem = document.querySelector('.counter-plus');
var count = MIN_INPUT_COUNTER;
updateDisplay();
counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
});
counterMinusElem.addEventListener("click",()=>{
    count--;
    updateDisplay();
});
function updateDisplay(){
    if (count > MAX_INPUT_COUNTER) { count = MAX_INPUT_COUNTER }
    if (count < MIN_INPUT_COUNTER) { count = MIN_INPUT_COUNTER }
    counterDisplayElem.innerHTML = count;
    payment_amount.value = count;

    var cost = CURRENT_COST;
    var total = cost * count;
    var total_output = document.getElementById("payment_total");
    total_output.innerHTML = total;
};



// discount timer
var countDownDate = new Date("May 31, 2022 12:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="discount-date"
  document.getElementById("discount-date").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("discount-date").innerHTML = "EXPIRED";
  }
}, 1000);