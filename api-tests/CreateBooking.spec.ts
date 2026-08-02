import { test, expect } from '@playwright/test';

test.describe('Booking API', () => {
  
  test('CreateBooking', async ({ request }) => {
    const url = 'https://restful-booker.herokuapp.com/booking';
    const headers = {
      'Content-Type': 'application/json',
    };

    const firstname = 'Jim';
    const lastname = 'Brown';
    const totalprice = 111;
    const additionalNeeds = 'Breakfast';
    
    const payload = {
      firstname: firstname,
      lastname: lastname,
      totalprice: totalprice,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: additionalNeeds
    };

    const response = await request.post(url, {
      headers: headers,
      data: payload,
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(Number.isInteger(responseBody.bookingid)).toBe(true);
    expect(responseBody.booking.firstname).toBe(firstname);
    expect(responseBody.booking.lastname).toBe(lastname);
    expect(responseBody.booking.additionalneeds).toBe(additionalNeeds);
  });
});