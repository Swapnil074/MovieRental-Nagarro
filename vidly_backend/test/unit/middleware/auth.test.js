const { User } = require("../../../models/user");
const auth = require("../../../Middleware/auth");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  it("should return populate req.user with payload of a valid jwt", () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };

    const res = {};
    const next = jest.fn();

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});
