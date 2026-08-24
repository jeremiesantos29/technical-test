import { test, expect } from '../fixtures/BaseTest';

test.describe('Search Flights', () => {

  test('Validate required fields', async ({ flightsPage }) => {
    await flightsPage.removeFlightOrigin();
    await flightsPage.searchButton.click();
    await flightsPage.verifyFlightSearchDialogMessage(`Please enter a 'From' airport.`);
    await flightsPage.verifyFlightSearchDialogMessage(`Please enter a 'To' airport.`);
    await flightsPage.verifyFlightSearchDialogMessage(`Please enter a valid 'Depart' date`);
    await flightsPage.verifyFlightSearchDialogMessage(`Please enter a valid 'Return' date.`);
  });
  
  test('Validate successful search flight from Cebu to Singapore', async ({ flightsPage, flightSearchPage }) => {
    const flightOrigin = 'Cebu';
    const flightDestination = 'Singapore';

    // Clear existing value in the flight origin input field
    await flightsPage.removeFlightOrigin();

    // Select Flight Origin and Destination
    const originAirportCode = await flightsPage.selectFlightOrigin(flightOrigin);
    const destinationAirportCode = await flightsPage.selectFlightDestination(flightDestination);

    // Select Departure and Return Dates
    await flightsPage.selectDepartureAndReturnDate();

    // Click Search Button and Switch to the New Tab if needed
    await flightsPage.searchButton.click();
    await flightSearchPage.switchToLatestTab();

    // Verify Flight Search Result
    await flightSearchPage.verifyFlightOrigin(flightOrigin);
    await flightSearchPage.verifyFlightDestination(flightDestination);
    await flightSearchPage.verifyFlightOriginSearchResult(flightOrigin, originAirportCode);
    await flightSearchPage.verifyFlightDestinationSearchResult(flightDestination, destinationAirportCode);
  });
});