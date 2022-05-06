# Wagtail JSON Widget

JSON editing for Wagtail Admin with [josdejong / jsoneditor](https://github.com/josdejong/jsoneditor). Provides widgets for Page and StreamField.

![Screenshot](https://github.com/cursive-works/wagtail-json-widget/raw/master/docs/img/wjw-menu.png)

## Installation

Install from [PyPI](https://pypi.org/project/wagtail-json-widget/):

```
pip install wagtail-json-widget
```

Then add the following to your project's `INSTALLED_APPS`.

```
'wagtail_json_widget',
```

## Usage

As a field:
```python
from django.db import models
from django import forms
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.admin.forms import WagtailAdminPageForm

from wagtail.core.models import Page

from .blocks import MyStreamBlock
from wagtail_json_widget.widgets import JSONEditorWidget


class MyPageForm(WagtailAdminPageForm):
    myjson = forms.JSONField(widget=JSONEditorWidget, required=False)


class MyPage(Page):

    myjson = models.JSONField(null=True)

    content_panels = Page.content_panels + [
        FieldPanel('myjson'),
    ]
    base_form_class = MyPageForm
```

As a StreamField block:

```python
from wagtail.core import blocks
from wagtail_json_widget.blocks import JsonBlock

class MyBlock(blocks.StructBlock):
    my_json_block = JsonBlock()
    ...
    
```