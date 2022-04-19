from datetime import datetime as dt

from django.conf import settings
from django.contrib import messages
from django.core.mail import EmailMultiAlternatives
from django.shortcuts import render

from .forms import OrderForm

ITEM_PRICE = 225
DELIVERY_PRICE = 300
EMAIL_MANUFACTURER_FORM = 'static/email.html'
EMAIL_CUSTOMER_FORM = 'static/feedback.html'


spams = dict()


def index(request):
    open_form = 'clear'  # For NOT open after POST in front
    user_ip = request.META.get('HTTP_X_REAL_IP')
    msg_log_level = messages.WARNING
    msg = 'GET request'

    if request.method == 'POST':
        open_form = 'open_form_after_post'  # For OPEN after POST in front
        form = OrderForm(request.POST)

        if form.is_valid():
            # Spam check
            clean_spams(spams)
            if user_ip in spams:
                msg_log_level = messages.ERROR
                msg = (
                    'Вы уже отправляли данную форму... '
                    'Подождите, пожалуйста, '
                    '5 минут с момента успешной отправки')
                messages.add_message(request, messages.ERROR, msg)
                return render(request, 'index.html', context={'form': form})

            # Send mail exeptions
            try:
                mailing(form)  # Send to manufacturer and customer

                spams[user_ip] = dt.now()
                msg_log_level = messages.SUCCESS
                msg = 'Спасибо! Мы в скором времени свяжемся с Вами!'

            except Exception as error:
                msg_log_level = messages.ERROR
                msg = (
                    'Ой... Пошло что-то не так... '
                    'Свяжите с нами напрямую и сообщите об ошибке')

        else:
            msg_log_level = messages.ERROR
            msg = 'Ошибка заполнения формы. Обновите страницу и попробуйте еще.'            

        messages.add_message(request, msg_log_level, msg)

    else:
        form = OrderForm()
    return render(request, 'index.html', context={'form': form})


def send_mail(html_content, recipient):
    mail = EmailMultiAlternatives(
        'Коллоидное серебро',
        html_content,
        settings.EMAIL_HOST_USER,
        [recipient],
    )
    mail.attach_alternative(html_content, "text/html")
    mail.send()


def mailing(form):
    # Send mail to manufacturer
    html_content = get_html_content(form, EMAIL_MANUFACTURER_FORM)
    recipient = settings.EMAIL_RECIPIENT
    send_mail(html_content, recipient)

    # Send mail to customer
    html_content = get_html_content(form, EMAIL_CUSTOMER_FORM)
    recipient = form.cleaned_data.get('email')
    send_mail(html_content, recipient)


def get_html_content(form, form_template):
    with open(form_template, 'r') as f:
        html_content = f.read()

    if form.cleaned_data.get('comment') == '':
        form.cleaned_data['comment'] = 'Отсутствует'

    form.cleaned_data['total_sum'] = get_total_sum(
        form.cleaned_data.get('order_count')
    )

    for key, value in form.cleaned_data.items():
        html_content = html_content.replace(f'/{key}/', str(value))

    return html_content


def get_total_sum(order_count):
    total_sum = order_count * ITEM_PRICE
    if total_sum >= 2000:
        return total_sum
    total_sum += DELIVERY_PRICE
    return total_sum


def clean_spams(spams):
    """ Clean spam dict """
    ips = list(spams)
    for spamer in ips:
        no_spam_time = dt.now() - spams[spamer]
        if no_spam_time.seconds > settings.SPAM_TIME:
            try:
                del spams[spamer]
            except Exception as er:
                return f'Error - clean_spams / {er}'
