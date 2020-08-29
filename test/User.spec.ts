import { UserBuilder } from "../src/user/UserBuilder";
import User from "../src/user/User";

describe("Test of User#considersAsFriend()", function () {
  it("should return false if the user considers the other one not to be their friend", function () {
    // GIVEN
    const Jules = new UserBuilder().build();
    const Jim = new UserBuilder().build();

    // WHEN
    // THEN
    expect(Jim.considersAsFriend(Jules)).toEqual(false);
  });

  it("should return true if users are friends", function () {
    // GIVEN
    const Jules = new UserBuilder().build();
    const Jim = new UserBuilder().withFriends([Jules]).build();

    // WHEN
    // THEN
    expect(Jim.considersAsFriend(Jules)).toEqual(true);
  });
});

describe("Test of User#areFriends()", function () {
  it("should return false if one of the users does not consider the other one as a friend", function () {
    // GIVEN
    const Jules = new UserBuilder().build();
    const Jim = new UserBuilder().withFriends([Jules]).build();

    // WHEN
    // THEN
    expect(User.areFriends(Jules, Jim)).toEqual(false);
  });

  it("should return true if both users consider the other one as a friend", function () {
    // GIVEN
    const Jules = new UserBuilder().build();
    const Jim = new UserBuilder().build();
    UserBuilder.declareAsFriends(Jules, Jim);

    // WHEN
    // THEN
    expect(User.areFriends(Jules, Jim)).toEqual(true);
  });
});
