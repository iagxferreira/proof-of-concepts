import {
  findByUsername,
  insert
} from "../lib/infra/database/repositories/user-repository";

describe.skip("Database tests", () => {
  test("finding in database", async () => {
    await findByUsername("iagxferreira");
  });

  test("inserting in database", async () => {
    await insert({
      name: "Iago Ferreira",
      location: "Barbacena, MG",
      company: "any",
      username: "iagxferreira"
    });
  });
});
