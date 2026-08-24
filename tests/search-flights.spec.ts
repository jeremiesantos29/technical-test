import { test } from '@playwright/test';
import { FlightsPage } from '../pages/FlightsPage';
import { FlightSearchPage } from '../pages/FlightSearchPage';

test.describe('Search Flights', () => {
  let flightsPage: FlightsPage;

  test.beforeEach(async ({ page, context }) => {
    flightsPage = new FlightsPage(page);
    await flightsPage.navigateToCheapFlights();
  });

  test('Validate required fields', async () => {
    await flightsPage.removeFlightOrigin();
    await flightsPage.searchButton.click();
    await flightsPage.verifyFlightSearchDialogMessage(`Please enter a 'From' airport.`);
    await flightsPage.verifyFlightSearchDialogMessage(`Please enter a 'To' airport.`);
    await flightsPage.verifyFlightSearchDialogMessage(`Please enter a valid 'Depart' date`);
    await flightsPage.verifyFlightSearchDialogMessage(`Please enter a valid 'Return' date.`);
  });
  
  test('Validate successful search flight from Cebu to Singapore', async () => {
    const flightOrigin = 'Cebu';
    const flightDestination = 'Singapore';

    // Clear existing value in the flight origin input field
    await flightsPage.removeFlightOrigin();

    // Select Flight Origin and Destination
    const originAirportCode = await flightsPage.selectFlightOrigin(flightOrigin);
    const destinationAirportCode = await flightsPage.selectFlightDestination(flightDestination);

    // Select Departure and Return Dates
    await flightsPage.selectDepartureAndReturnDate();

    const flightSearchTab = await flightsPage.clickSearchButton();
    // const [flightSearchTab] = await Promise.all([
    //   context.waitForEvent('page'),
    //   flightsPage.searchButton.click(),
    // ])

    // await flightSearchTab.waitForLoadState();
    // await flightSearchTab.bringToFront();

    // Verify Flight Search Result
    const flightSearchPage = new FlightSearchPage(flightSearchTab);
    await flightSearchPage.verifyFlightOrigin(flightOrigin);
    await flightSearchPage.verifyFlightDestination(flightDestination);
    await flightSearchPage.verifyFlightOriginSearchResult(flightOrigin, originAirportCode);
    await flightSearchPage.verifyFlightDestinationSearchResult(flightDestination, destinationAirportCode);
  });
});