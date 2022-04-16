from django import forms


class OrderForm(forms.Form):
    username = forms.CharField(
        required=True,
        label='Your name',
        max_length=100,
        widget=forms.TextInput(attrs={'placeholder': 'ФИО'})
    )
    phone_number = forms.CharField(
        required=True,
        max_length=16,
        widget=forms.TextInput(attrs={
            'placeholder': 'Телефон',
            'type': 'tel'
        }),
    )
    email = forms.EmailField(
        required=True,
        widget=forms.TextInput(attrs={
            'placeholder': 'E-mail',
            'type': 'email'
        })
    )
    order_count = forms.IntegerField(
        required=True,
        min_value=1,
        max_value=3500,
        initial=0,
        widget=forms.TextInput(attrs={
            'class': 'order_count',
            'min': '0',
            'max': '3500',
            'type': 'number',
        })
    )
    address = forms.CharField(
        required=True,
        max_length=255,
        widget=forms.TextInput(attrs={
            'placeholder': 'Адрес',
            'autocomplete': 'off',
        }),
    )
    comment = forms.CharField(
        required=False,
        max_length=1023,
        widget=forms.Textarea(attrs={'placeholder': 'Комментарий'}),
    )
