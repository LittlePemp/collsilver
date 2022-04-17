$(function(){
    // on start up
    $(document).ready(function(){
        // Post checking
        if ($("#open_form_after_post").length > 0) {
            $('#succes-post-modal').arcticmodal();
        }

        // Browser for input autocomplete off
        var ua = navigator.userAgent;    
        if (ua.search(/YaBrowser/) > 0) {
            $('#id_address').attr('autocomplete', 'autocomplete-off');
        }
    });

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

    //Modal window DELIVERY
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
            autoplaySpeed: 5000,
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

    var token = "68bfce99e0f09fa7334daa046f92c090f8f5a900";
    $('#id_address').keyup(function(e){
        var promise = suggest(e.target.value);
        promise
            .done(function(response) {
                var MAX = 5;
                var res_html = "<div id=\"myDropdown\" class=\"dropdown-content\">";
                for (var key in response) {
                    var value = response[key];
                    for (var i = 0; i < MAX; ++i) {
                        res_html += ("<a href=\"#\">" + (JSON.stringify(value[i].unrestricted_value).replace(/^.|.$/g,"")) + "</a>");
                    }
                }
                res_html += "</div>";
                $("#result-dadata").html(res_html);           

                // show dropdown list
                document.getElementById("myDropdown")
                    .classList.toggle("show");
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
            });
    });

    function suggest(query) {
        var serviceUrl = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        var request = {
            "query": query
        };
        var params = {
            type: "POST",
            contentType: "application/json",
            headers: {
            "Authorization": "Token " + token
            },
            data: JSON.stringify(request)
        }
        return $.ajax(serviceUrl, params);
    }


    // Dropdown list click
    $('#result-dadata').click(function (event) {
        var html_var = event.target;
        var html_content = html_var.innerHTML;
        $('#id_address').val(html_content);
    });
}); 



// Scroll system
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
const DELIVERY_PRICE = 300;
const FREE_DELIVERY_BORDER = 2000;

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
    
    var cost = CURRENT_COST;
    var total = cost * count;
    // Delivery
    if (total < FREE_DELIVERY_BORDER) {
        total = total + DELIVERY_PRICE;
    }
    var total_output = document.getElementById("payment_total");
    total_output.innerHTML = total;
}



// Counter
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
    payment_amount.value = count;

    var cost = CURRENT_COST;
    var total = cost * count;
    // Delivery
    var html_deliver_price = document.querySelector('.delivery-price');
    if (total < FREE_DELIVERY_BORDER) {
        total = total + DELIVERY_PRICE;
        html_deliver_price.classList.remove('line-through-red');
    }
    else {
        html_deliver_price.classList.add('line-through-red');
    }
    var total_output = document.getElementById("payment_total");
    total_output.innerHTML = total;
};



// discount timer
var countDownDate = new Date("April 27, 2022 12:00:00").getTime();
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
  document.getElementById("discount-date").innerHTML = days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("discount-date").innerHTML = "EXPIRED";
  }
}, 1000);

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
