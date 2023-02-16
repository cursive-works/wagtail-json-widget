class JSONEditorWidget {

    constructor(element) {
        this.initEditor(element);
    }

    initEditor(element) {
        // Initialize the JSONEditor widget
        const textarea = element.querySelector('textarea');
        const options = {"modes": ["text", "code", "tree", "form", "view"], "mode": "code", "search": true};

        options.onChange = function () {
            var json = editor.get();
            textarea.value=JSON.stringify(json);
        }
        const editor = new JSONEditor(element, options);
        editor.set(JSON.parse(textarea.value));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    createJSONFieldEditors();
});

function createJSONFieldEditors() {

    const els = document.getElementsByClassName('w-field--json_editor_widget');
    for (const el of els) {
        const collection = el.getElementsByClassName('w-field__input')
        if (collection.length === 0) {
            continue;
        }

        // So we don't duplicate editor widgets if we have JSONBlock in streamfields
        // and model field elements on the same page.
        if (collection[0].firstElementChild.nodeName.toUpperCase() == 'TEXTAREA') {
            new JSONEditorWidget(collection[0]);
        }
    }
}