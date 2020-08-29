import Trip from "../trip/Trip";

export default class User {
  private trips: Trip[] = [];
  private friends: User[] = [];

  public static GUEST_USER: User = null;

  public static areFriends(firstUser: User, secondUser: User): boolean {
    return (
      firstUser.considersAsFriend(secondUser) &&
      secondUser.considersAsFriend(firstUser)
    );
  }

  public addFriend(user: User): void {
    this.friends.push(user);
  }

  public getFriends(): User[] {
    return this.friends;
  }

  public addTrip(trip: Trip): void {
    this.trips.push(trip);
  }

  public getTrips(): Trip[] {
    return this.trips;
  }

  public considersAsFriend(user: User): boolean {
    return this.friends.findIndex((friend) => friend === user) > -1;
  }
}
