import database from "../index";
import { User } from "../../../domain/interface/user-interface";

export const findByUsername = (username:string) => database.any(
  `SELECT id, username, name, company, location
    FROM github_users WHERE username = $1`
  , username
);

export const findAll = async () => database.any(
  `SELECT id, username, name, company, location
  FROM github_users
  ORDER BY id ASC
`
);

export const insert = ({
  name,
  username,
  company,
  location
}: User)=> database.none(
  `INSERT INTO github_users( name, username, company, location )
    VALUES( $1, $2, $3, $4 )`,
  [name, username, company, location]);
