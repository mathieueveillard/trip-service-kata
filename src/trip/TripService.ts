import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import Trip from "./Trip";

export interface TripDAO {
  findTripsByUser(user: User): Trip[];
}

export default class TripService {
  constructor(private tripDAO: TripDAO) {}

  public getTripsByUser(user: User, currentUser: User): Trip[] {
    if (currentUser === User.GUEST_USER) {
      throw new UserNotLoggedInException();
    }

    if (User.areFriends(currentUser, user)) {
      return this.tripDAO.findTripsByUser(user);
    }

    return [];
  }
}
