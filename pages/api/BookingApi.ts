import { APIRequestContext } from '@playwright/test';

export class BookingApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Generates and returns a new booking
  async createBooking(): Promise<string> {
    const url = 'https://restful-booker.herokuapp.com/booking';
    const headers = {
      'Content-Type': 'application/json',
    };

    const payload = {
      firstname: 'Jim',
      lastname: 'Brown',
      totalprice: 111,
      depositpaid: true,
      bookingdates: {
        checkin: '2018-01-01',
        checkout: '2019-01-01'
      },
      additionalneeds: 'Breakfast'
    };

    const response = await this.request.post(url, {
      headers: headers,
      data: payload,
    });

    const responseBody = await response.json();
    return responseBody; 
  }
}