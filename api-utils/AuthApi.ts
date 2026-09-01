import { APIRequestContext } from '@playwright/test';

export class AuthApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Generates and returns the token
  async createToken(): Promise<string> {
    const url = 'https://restful-booker.herokuapp.com/auth';
    const headers = {
      'Content-Type': 'application/json',
    };

    const payload = {
      username: 'admin',
      password: 'password123',
    };

    const response = await this.request.post(url, {
      headers: headers,
      data: payload,
    });

    const responseBody = await response.json();
    return responseBody.token; 
  }
}