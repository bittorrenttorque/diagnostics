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
            $('.container').append('<p>' + JSON.stringify(arguments) + '</p>');
        });
    });
});