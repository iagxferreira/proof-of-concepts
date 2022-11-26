import { Command } from "commander";
import { init, loadCommands, parse } from "./setup";

export default async () => {
  const program = new Command()
  init(program);
  loadCommands(program);
  parse(program);
};
