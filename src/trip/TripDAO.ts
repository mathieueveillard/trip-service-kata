import CollaboratorCallException from "../exception/CollaboratorCallException";
import { TripDAO as DomainTripDAO } from "./TripService";
import Trip from "./Trip";
import User from "../user/User";

export default class TripDAO implements DomainTripDAO {
  public static findTripsByUser(user: User): Trip[] {
    throw new CollaboratorCallException(
      "TripDAO should not be invoked on an unit test."
    );
  }

  public findTripsByUser(user: User): Trip[] {
    return TripDAO.findTripsByUser(user);
  }
}
