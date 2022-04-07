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
    const els = document.getElementsByClassName('json_editor_widget');
    for (const el of els) {
        const collection = el.getElementsByClassName('input')
        if (collection.length === 0) {
            continue;
        }
        new JSONEditorWidget(collection[0]);
    }

}