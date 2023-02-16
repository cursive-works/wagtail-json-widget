import json

from django import forms
from django.core.exceptions import ValidationError

from wagtail import blocks

from .widgets import JSONEditorWidget

class JSONBlock(blocks.FieldBlock):
    """
    JSON StreamField block.
    """
    def __init__(self, required=True, help_text=None, max_length=None, min_length=None, validators=(), **kwargs):
        self.field = forms.CharField(
            widget=JSONEditorWidget,
            required=required,
            help_text=help_text,
            max_length=max_length,
            min_length=min_length,
            validators=validators,
        )

        if 'default' not in kwargs:
            kwargs['default'] = 'null'

        super().__init__(**kwargs)

    def clean(self, value):
        try:
            json.loads(value)
        except json.decoder.JSONDecodeError as e:
            raise ValidationError(f'Invalid JSON: {e}')
        return super().clean(value)
