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

    //Modal window SEND_MSG
	$('#msgbtn').click(function(e){
		e.preventDefault();
		$('#sendMsgModal').arcticmodal();
	});
	$('#answer').click(function(e){
		e.preventDefault();
		$('#sendMsgModal').arcticmodal();
	});

	//Modal window PHONE
	$('#tel-btn').click(function(e){
		e.preventDefault();
		$('#exampleModal').arcticmodal();
	});
	$('.consult__btn').click(function(e){
		e.preventDefault();
		$('#exampleModal').arcticmodal();
	});

    //Modal window AUTHORIZE
	$('#authorization').click(function(e){
		e.preventDefault();
		$('#authorizeModal').arcticmodal();
	});

    //Modal window REGISTRATION
	$('#registration').click(function(e){
		e.preventDefault();
		$('#registrationModal').arcticmodal();
	});

    //Slider
    $('.services-slider').slick({
        dots: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        autoplay: true,
        autoplaySpeed: 2500
    });
});	

var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 0.4;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
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
const inputs = document.querySelectorAll('input[type=number]');
Array.from(inputs).forEach(input => {
    const min = 0;
    const max = 99;

    input.addEventListener('input', (e) => {
        const value = +input.value;
        if (value > max) { input.value = max }
        else if (value < min) { input.value = min }
    })
});

// Order total
var payment_amount = document.getElementById("payment_amount");
payment_amount.oninput = function() {

    var amount = parseInt(payment_amount.value);
    var cost = 225;
    var total = cost * amount;

    var total_output = document.getElementById("payment_total");
    total_output.innerHTML = total;
}
