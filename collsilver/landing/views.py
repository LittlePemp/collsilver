from django.shortcuts import render
from django.core.mail import send_mail
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
            print(
                f'{username}'
                f' / {phone_number}'
                f' / {email}'
                f' / {order_count}'
                f' / {address}'
                f' / {comment}')
            return render(request, 'index.html', context={'form': form})
    else:
        form = OrderForm()
    return render(request, 'index.html', context={'form': form})
