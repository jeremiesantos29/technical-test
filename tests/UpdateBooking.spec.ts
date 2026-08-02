import { test, expect } from '@playwright/test';
import { AuthApi } from '../pages/api/AuthApi.js';

test.describe('Booking API', () => {
  let authApi: AuthApi;
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
    authToken = await authApi.createToken();
  });

  test('UpdateBooking', async ({ request }) => {
    const bookingId = 1012;
    const url = `https://restful-booker.herokuapp.com/booking/${bookingId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${authToken}`
    };
    
    const payload = {
      "firstname" : "James",
      "lastname" : "White",
      "totalprice" : 111,
      "depositpaid" : true,
      "bookingdates" : {
          "checkin" : "2018-01-01",
          "checkout" : "2019-01-01"
      },
      "additionalneeds" : "Lunch"
    };

    const response = await request.put(url, {
      headers: headers,
      data: payload,
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.firstname).toBe('James');
    expect(responseBody.lastname).toBe('White');
    expect(responseBody.additionalneeds).toBe('Lunch');
  });
});