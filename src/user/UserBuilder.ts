import User from "./User";
import Trip from "../trip/Trip";

export class UserBuilder {
  private user = new User();

  public static declareAsFriends(firstUser: User, secondUser: User): void {
    firstUser.addFriend(secondUser);
    secondUser.addFriend(firstUser);
  }

  withTrips(trips: Trip[]): UserBuilder {
    trips.forEach((trip) => this.user.addTrip(trip));
    return this;
  }

  withFriends(friends: User[]): UserBuilder {
    friends.forEach((friend) => this.user.addFriend(friend));
    return this;
  }

  build(): User {
    return this.user;
  }
}
