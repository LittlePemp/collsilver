from django import forms

class OrderForm(forms.Form):
    username = forms.CharField(label='Your name', max_length=100)
    phone_number = forms.CharField(max_length=16)
    email = forms.EmailField()
    order_count = forms.IntegerField(min_value=1, initial=1)
    address = forms.CharField(max_length=255)
    comment = forms.CharField(max_length=255, required=False)
