from django.shortcuts import render
from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse
from django.conf import settings
from .forms import OrderForm

def index(request):
    if request.method == 'POST':
        form = OrderForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            phone_number = form.cleaned_data['phone_number']
            email = form.cleaned_data['email']
            order_count = form.cleaned_data['order_count']
            address = form.cleaned_data['address']
            comment = form.cleaned_data['comment']

            try:
                send_mail('Коллоидное серебро', 
                    f'{username} из {address} // {comment}',
                    settings.DEFAULT_FROM_EMAIL,
                    settings.RECIPIENTS_EMAIL
                )
            except Exception as error:
                return HttpResponse(f'E-mail error - {error}')

            return render(request, 'index.html', context={'form': form})
    else:
        form = OrderForm()
    return render(request, 'index.html', context={'form': form})
