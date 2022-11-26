import api from "../lib/infra/http/api";
import { findUser } from "../lib/domain/user-service";
import MOCK_USER_DATA from "./mocks/mock-user";

describe("API tests", () => {
  test("Get info endpoint", async () => {
    api.getGithubUser = jest
      .fn()
      .mockResolvedValueOnce(MOCK_USER_DATA)
      .mockClear();

    const response = await findUser("iagxferreira");
    expect(response).toHaveProperty("login", "iagxferreira");
    expect(response).toHaveProperty("location", "Barbacena, MG");
    expect(response).toHaveProperty("name", "Iago Ferreira");
    expect(api.getGithubUser).toBeCalled();
  });
});
