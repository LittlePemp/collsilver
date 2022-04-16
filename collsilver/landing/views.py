from datetime import datetime as dt

from django.conf import settings
from django.contrib import messages
from django.core.mail import send_mail
from django.shortcuts import render

from .forms import OrderForm


spams = dict()


def index(request):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        user_ip = request.META.get('HTTP_X_REAL_IP')

        if form.is_valid():
            # Spam check
            clean_spams(spams)
            if user_ip in spams:
                messages.add_message(request, messages.ERROR, 'Подождите...')
                return render(request, 'index.html', context={'form': form})

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
                messages.add_message(request, messages.INFO, 'Спасибо!')
            else:
                messages.add_message(request, messages.ERROR, 'Почта упала')
    else:
        form = OrderForm()
    return render(request, 'index.html', context={'form': form})


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
