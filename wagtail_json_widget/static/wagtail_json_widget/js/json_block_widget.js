class JSONBoundWidget {  
    constructor(element, name, idForLabel, initialState) {
        const selector = 'textarea[name="' + name + '"]';
        this.input = element.querySelector(selector);
        this.idForLabel = idForLabel;
        this.setState(initialState);
    }
    getValue() {
        return JSON.parse(this.input.value);
    }
    getState() {
        return this.getValue();
    }
    setState(state) {
        this.input.value = state;
    }
    focus() {
        this.input.focus();
    }
}


class JSONBlockEditorWidget {
    constructor(html, idPattern) {
        this.html = html;
        this.idPattern = idPattern;
    }

    boundWidgetClass = JSONBoundWidget;

    render(placeholder, name, id, initialState) {
        // Create the JSONEditor widget
        const html = this.html.replace(/__NAME__/g, name).replace(/__ID__/g, id);
        const idForLabel = this.idPattern.replace(/__ID__/g, id);
        placeholder.innerHTML = html
        const boundWidget = new this.boundWidgetClass(placeholder, name, idForLabel, initialState);
        const json = boundWidget.getValue();
        this.initEditor(id, placeholder, json)
        return boundWidget;
    }

    initEditor(id, placeholder, json) {
        // Initialize the JSONEditor widget
        const textarea = document.getElementById(`${id}_textarea`);
        const options = {"modes": ["text", "code", "tree", "form", "view"], "mode": "code", "search": true};

        options.onChange = function () {
            var json = editor.get();
            textarea.value=JSON.stringify(json);
        } 
        const editor = new JSONEditor(placeholder, options);
        editor.set(json);
    }
}

window.telepath.register('wagtail_json_widget.json_widget', JSONBlockEditorWidget)