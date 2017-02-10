// Initialize Firebase
var config = {
  apiKey: "AIzaSyBOEPgdO57IlJMXi55fBC6pjSsHq6ms_x0",
  authDomain: "reservation-site-7f678.firebaseapp.com",
  databaseURL: "https://reservation-site-7f678.firebaseio.com",
  storageBucket: "reservation-site-7f678.appspot.com",
  messagingSenderId: "34096984748"
};

firebase.initializeApp(config);

var database = firebase.database();

var reservationData = {};

$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
});

$('.reservation-form').on('submit', function(e) {
  e.preventDefault();
  
  reservationData.name = $('.reservation-name').val();
  
  var reservationsReference = database.ref('reservations');
  
  reservationsReference.push(reservationData);
});

function getReservations() {
  database.ref('reservations').on('value', function(results) {
    var allReservations = results.val();
    
    $('.reservations').empty();

  	for (var reservation in allReservations) {
      var context = {
      	name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };
      
	  var source = $('#reservation-template').html();
      
      var template = Handlebars.compile(source);
      
      var reservationListItem = template(context);
      
      $('.reservations').append(reservationListItem);
    }
  });
}

getReservations();
