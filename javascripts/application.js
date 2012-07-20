function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

jQuery(function() {
    $('form').submit(function(event) {
        event.preventDefault();
        var product = $('input').val();
        var btapp = new Btapp;
        btapp.connect({
            product: product,
            plugin: false
        });
        btapp.on('all', function() {
            $('.container').append('<pre>' + syntaxHighlight(JSON.stringify(arguments, undefined, 4)) + '</pre>');
        });
    });
});