const request = require("supertest");
const { Genre } = require("../../models/genres");
const { User } = require("../../models/user");
let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../Api");
  });
  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /", () => {
    it("should return genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");

      expect(res.status).toBe(404);
    });
  });

  let token, name;

  const exec = async () => {
    return await request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: name });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
    name = "genre1";
  });

  describe("POST /", () => {
    it("return 401 if not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });
  });

  it("return 400 if genre is invalid", async () => {
    name = "124";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should save the genre if genre is valid", async () => {
    await exec();
    const genre = await Genre.find({ name: "genre1" });
    expect(genre).not.toBeNull();
  });

  it("should return the genre if genre is valid", async () => {
    const res = await exec();
    expect(res.body).toHaveProperty("_id");
    expect(res.body).toHaveProperty("name", "genre1");
  });
});
