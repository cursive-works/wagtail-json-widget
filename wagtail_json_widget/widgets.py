import json

from django import forms
from django.conf import settings

from wagtail.core.telepath import register
from wagtail.core.widget_adapters import WidgetAdapter


class JSONWidgetAdapter(WidgetAdapter):
    js_constructor = 'wagtail_json_widget.json_widget'

    def js_args(self, widget):
        return [
            widget.render('__NAME__', None, attrs={'id': '__ID__'}),
            widget.id_for_label('__ID__'),
            # widget.extra_options, 
        ]
    class Media:
        js = ['wagtail_json_widget/js/json_block_widget.js']


class JSONEditorWidget(forms.Widget):
    template_name = 'wagtail_json_widget.html'
    
    def __init__(self, attrs=None, mode='code', options=None):
        default_options = {
            'modes': ['text', 'code', 'tree', 'form', 'view'],
            'mode': mode,
            'search': True,
        }
        if options:
            default_options.update(options)

        self.options = default_options

        super().__init__(attrs=attrs)

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        context['widget']['options'] = json.dumps(self.options)
        print(context)
        return context

    class Media:
        js = (
            getattr(settings, "JSON_EDITOR_JS", 'dist/jsoneditor.min.js'),
            'wagtail_json_widget/js/json_widget.js'
        )
        css = {
            'all': (
                getattr(settings, "JSON_EDITOR_CSS", 'dist/jsoneditor.min.css'),
            )
        }

register(JSONWidgetAdapter(), JSONEditorWidget)
