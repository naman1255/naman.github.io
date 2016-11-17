$(function() {
    var $backgroundColor = $('li:first').css("background-color");
    $('ul').append('<p>Color was: '+ $backgroundColor+'</p>');
    
    $('li').css({
        'background-color': '#c5a996',
        'border': 'solid white 1px',
        'color': 'black',
        'text-shadow': 'none',
        'font-family': 'Georgia'
    });
});

