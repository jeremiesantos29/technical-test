import { test, expect } from '@playwright/test';
import { BookingApi } from '../api-utils/BookingApi';

test.describe('Booking API', () => {
  let bookingApi: BookingApi;
  let createBookingResponse: any;
  let bookingId: string;

  test.beforeAll(async ({ request }) => {
    bookingApi = new BookingApi(request);
    createBookingResponse = await bookingApi.createBooking();
  });

  test('GetBooking', async ({ request }) => {
    bookingId = createBookingResponse.bookingid;
    const url = `https://restful-booker.herokuapp.com/booking/${bookingId}`;

    const response = await request.get(url);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.firstname).toBe(createBookingResponse.booking.firstname);
    expect(responseBody.lastname).toBe(createBookingResponse.booking.lastname);
    expect(responseBody.additionalneeds).toBe(createBookingResponse.booking.additionalneeds);
  });
});