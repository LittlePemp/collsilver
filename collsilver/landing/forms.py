from django import forms

class OrderForm(forms.Form):
    username = forms.CharField(
        label='Your name',
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'ФИО'})
    )
    phone_number = forms.CharField(
        max_length=16,
        widget=forms.TextInput(attrs={'placeholder': 'Телефон'}),
    )
    email = forms.EmailField(
        widget=forms.TextInput(attrs={'placeholder': 'E-mail'})
    )
    order_count = forms.IntegerField(
        min_value=1,
        initial=1,
        widget=forms.TextInput(attrs={
            'class': 'order_count',
            'min': '1',
            'max': '99',
            'type': 'number'})
    )
    address = forms.CharField(
        max_length=255,
        widget=forms.TextInput(attrs={'placeholder': 'Адрес'}),
    )
    comment = forms.CharField(
        max_length=255,
        required=False,
        widget=forms.TextInput(attrs={'placeholder': 'Комментарий'}),
    )
