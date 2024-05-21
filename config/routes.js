const routes = {
  'POST /customers': 'Customer.createCustomer',
  'GET /customers': 'Customer.getAllCustomers',
  'GET /customers-id': 'Customer.getCustomerById',
  'PUT /customers': 'Customer.updateCustomer',
  'DELETE /customers': 'Customer.deleteCustomer',

  'POST /booking': 'Booking.createBooking',
  'GET /booking': 'Booking.getAllBookings',
  'GET /booking-id': 'Booking.getBookingById',
  'PUT /booking': 'Booking.updateBooking',
  'DELETE /booking': 'Booking.deleteBooking',

  'POST /excursions': 'Excursions.createExcursion',
  'GET /excursions': 'Excursions.getAllExcursions',
  'GET /excursions-id': 'Excursions.getExcursionById',
  'PUT /excursions': 'Excursions.updateExcursion',
  'DELETE /excursions': 'Excursions.deleteExcursion',

  'POST /hotels': 'Hotels.createHotel',
  'GET /hotels': 'Hotels.getAllHotels',
  'GET /hotels-id': 'Hotels.getHotelById',
  'PUT /hotels': 'Hotels.updateHotel',
  'DELETE /hotels': 'Hotels.deleteHotel',

  'POST /booking-item': 'Booking_Items.addBookingItem',
  'GET /booking-item': 'Booking_Items.getBookingItemsByBookingId',
  'DELETE /booking-item': 'Booking_Items.removeBookingItem',

  'GET /booking-details': 'Booking.getBookingDetails',
  'GET /count-bookings-by-month': 'Booking.countBookingsByMonth',

};

module.exports = routes;
