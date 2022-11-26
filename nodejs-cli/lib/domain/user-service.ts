import api from "../infra/http/api";
import { User } from "./interface/user-interface";
import logger from "../infra/logger";
import {
  findAll as findAllUsers,
  findByUsername,
  insert
} from "../infra/database/repositories/user-repository";

export const insertUser = ({ username,company,location,name }: User) =>
  insert({ username, company, location, name })

export const findUser = async (username: string) => {
  const [user] = await findByUsername(username)
  if(!user){
    const { company, location, name } = await api.getGithubUser(username);
    const document = { username, company, location, name }
    await insertUser(document)
    return document
  }
  return user;
};

export const load = async (username: string) => {
  const response = await findUser(username)
  console.table([response])
}

export const listAllUsers = async () => {
  const users = await findAllUsers()
  if(Array.isArray(users) && users.length > 0) {
    console.table(users)
    return
  }
  logger.info("There are no users in database.");
};
