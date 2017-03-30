

$( document ).ready(function() {
    $(".node-menu").bind('click', function (e) {
         
		 
		 var x = $(this).parent().find('.node-name').html();
		 
		 alert( x );
		 
    });

});