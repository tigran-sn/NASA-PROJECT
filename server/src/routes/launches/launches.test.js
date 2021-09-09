const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success and 'Content-Type' to include the word 'json'", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "Uss Enterprice",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
    launchDate: "January 4, 2028",
  };
  const launchDataWithoutDate = {
    mission: "Uss Enterprice",
    rocket: "NCC 1701-D",
    target: "Kepler-186 f",
  };
  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    // Compare completeLaunchData.launchDate with response.body.launchDate
    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    // Check that "response.body" object matches a subset of the properties of a "launchDataWithoutDate"
    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch required properties", () => {});
  test("It should catch invalid dates", () => {});
});
