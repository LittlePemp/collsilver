from datetime import datetime as dt

from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from django.shortcuts import render

from .forms import OrderForm


spams = dict()


def index(request):
    open_form = 'clear'  # For NOT open after POST
    user_ip = request.META.get('HTTP_X_REAL_IP')
    if user_ip not in spams:
        msg_log_level = messages.INFO
        msg = 'Заполните форму и мы в скором времени свяжемся с Вами!'
    else:
        msg_log_level = messages.ERROR
        msg = 'Спасибо! Мы в скором времени свяжемся с Вами!'

    if request.method == 'POST':
        open_form = 'open_form_after_post'
        form = OrderForm(request.POST)

        if form.is_valid():
            # Spam check
            clean_spams(spams)
            if user_ip in spams:
                msg_log_level = messages.WARNING
                msg = (
                    'Вы уже отправляли данную форму... '
                    'Подождите, пожалуйста, '
                    '5 минут с момента успешной отправки')
                messages.add_message(request, messages.ERROR, msg)
                return render(request, 'index.html', context={
                    'form': form,
                    'open_form': open_form})

            # Take FORM attributes
            username = form.cleaned_data['username']
            phone_number = form.cleaned_data['phone_number']
            email = form.cleaned_data['email']
            order_count = form.cleaned_data['order_count']
            address = form.cleaned_data['address']
            comment = form.cleaned_data['comment']

            # Send message
            mail = send_mail(
                'Коллоидное серебро',
                f'{username} из {address} // {comment}',
                settings.EMAIL_HOST_USER,
                [settings.EMAIL_RECIPIENT],
                fail_silently=True,
            )

            # Exceptions
            if mail:
                spams[user_ip] = dt.now()
                form = OrderForm()
                msg = 'Спасибо! Мы в скором времени свяжемся с Вами!'
            else:
                msg_log_level = messages.WARNING
                msg = (
                    'Ой... Пошло что-то не так... '
                    'Свяжите с нами напрямую и сообщите об ошибке')
    else:
        form = OrderForm()
    messages.add_message(request, msg_log_level, msg)
    return render(request, 'index.html', context={
        'form': form,
        'open_form': open_form})


def clean_spams(spams):
    """ Clean spam dict """
    ips = list(spams)
    for spamer in ips:
        no_spam_time = dt.now() - spams[spamer]
        if no_spam_time.seconds > 300:
            try:
                del spams[spamer]
            except Exception as er:
                return f'Error - clean_spams / {er}'
