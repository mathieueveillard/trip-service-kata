import User from "../src/user/User";
import TripService, { TripDAO } from "../src/trip/TripService";
import Trip from "../src/trip/Trip";
import { UserBuilder } from "../src/user/UserBuilder";

describe("Test of TripService", function () {
  const A_FRIEND = new User();
  const ANOTHER_FRIEND = new User();
  const TO_AMSTERDAM = new Trip();
  const TO_LEIPZIG = new Trip();
  const mockedTripDAO: TripDAO = {
    findTripsByUser(user: User): Trip[] {
      return user.getTrips();
    },
  };

  it("should throw an exception if the current user is not logged in", function () {
    // GIVEN
    const user = new UserBuilder().build();
    const loggedUser = User.GUEST_USER;
    const tripService = new TripService(mockedTripDAO);

    // WHEN
    // THEN
    expect(() => tripService.getTripsByUser(user, loggedUser)).toThrowError();
  });

  it("should return an empty array of trips if users are not friends", function () {
    // GIVEN
    const user = new UserBuilder().build();
    const loggedUser = new UserBuilder()
      .withFriends([A_FRIEND, ANOTHER_FRIEND])
      .build();
    const tripService = new TripService(mockedTripDAO);

    // WHEN
    const actual: Trip[] = tripService.getTripsByUser(user, loggedUser);

    // THEN
    expect(actual).toEqual([]);
  });

  it("should return the users trips if users are friends", function () {
    // GIVEN
    const user = new UserBuilder()
      .withTrips([TO_AMSTERDAM, TO_LEIPZIG])
      .build();
    const loggedUser = new UserBuilder().withFriends([A_FRIEND]).build();
    UserBuilder.declareAsFriends(user, loggedUser);
    const tripService = new TripService(mockedTripDAO);

    // WHEN
    const actual: Trip[] = tripService.getTripsByUser(user, loggedUser);

    // THEN
    const expected: Trip[] = [TO_AMSTERDAM, TO_LEIPZIG];
    expect(actual).toEqual(expected);
  });
});
