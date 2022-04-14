from django.conf import settings
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse
from django.shortcuts import render
from datetime import datetime as dt

from .forms import OrderForm


spams = dict()

def index(request):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            user_ip = request.META['HTTP_X_REAL_IP']  # IP юзера, check nginx
            if spams.get(user_ip):
                waiting_time = dt.now() - spams.get(user_ip)
                if waiting_time.seconds < 300:
                    return HttpResponse(
                        'Вы уже отправляли заявку. '    
                        'Подожите 5 минут с момента успешного заполнения для'
                        ' повторного заполнения.')
                else:
                    spams.pop(user_ip, None)


            username = form.cleaned_data['username']
            phone_number = form.cleaned_data['phone_number']
            email = form.cleaned_data['email']
            order_count = form.cleaned_data['order_count']
            address = form.cleaned_data['address']
            comment = form.cleaned_data['comment']

            try:
                mail = send_mail(
                    'Коллоидное серебро',
                    f'{username} из {address} // {comment}',
                    settings.EMAIL_HOST_USER,
                    [settings.EMAIL_RECIPIENT],
                    fail_silently = False,
                )
                if mail:
                    spams[user_ip] = dt.now()
                    return HttpResponse(
                        'Сообщение успешно отправлено. Спасибо а заявку!')
                else:
                    return HttpResponse(
                        'Извините! Что-то пошло не так...')
            except Exception as error:
                return HttpResponse(
                        'Извините! Что-то пошло не так...')

            return render(request, 'index.html', context={'form': form})
    else:
        form = OrderForm()
    return render(request, 'index.html', context={'form': form})
