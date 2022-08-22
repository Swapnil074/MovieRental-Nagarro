const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models/user");

describe("/api/returns", () => {
  let server, token;
  let rental, customerId, movie1Id, movie2Id, rentalId, days;

  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId, rentalId });
  };
  beforeEach(() => {
    server = require("../../Api.js");
  });
  afterEach(async () => {
    await server.close();
  });

  it("should return 401 if client is not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if customer Id is not valid", async () => {
    token = new User().generateAuthToken();
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });
});
