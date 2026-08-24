import { test, expect } from '@playwright/test';
import { BookingApi } from '../pages/api/BookingApi';
import { AuthApi } from '../pages/api/AuthApi';

test.describe('Booking API', () => {
  let bookingApi: BookingApi;
  let authApi: AuthApi;

  let createBookingResponse: any;

  let authToken: string;
  let bookingId: string;

  test.beforeAll(async ({ request }) => {
    authApi = new AuthApi(request);
    bookingApi = new BookingApi(request);
    createBookingResponse = await bookingApi.createBooking();
    authToken = await authApi.createToken();
  });

  test('DeleteBooking', async ({ request }) => {
    bookingId = createBookingResponse.bookingid;
    const url = `https://restful-booker.herokuapp.com/booking/${bookingId}`;
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `token=${authToken}`
    };

    const response = await request.delete(url, {
      headers: headers
    });

    expect(response.status()).toBe(201);
    const responseBody = await response.text();
    expect(responseBody).toBe('Created');
  });
});