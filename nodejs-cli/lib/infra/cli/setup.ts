import { Command } from "commander";
import { listAllUsers, load } from "../../domain/user-service";

export const parse = (commander: Command) => commander.parse();

export const init = (commander: Command) =>
  commander
    .name("github-consumer-cli")
    .description(
      "Consume your user infos from Github API and cache it into a database"
    )
    .version("1.0.0");

export const handleExecution =
  async (cb: any, program: Command, args?: any) => {
    try{
      await cb(args)
    }catch(error: any) {
      program.error(error.message ||
      "Sorry, something wrong happens, report this problem here: " +
      "https://github.com/iagxferreira/github-api-consumer-cli/issues"
      )
    }
  }

export const loadCommands = (commander: Command) => {
  commander
    .command("list-all-users")
    .description("list all cached users")
    .action(async () => {
      await handleExecution(listAllUsers, commander)
    })

  commander
    .command("load <username>")
    .description("load infos from required user")
    .action(async (username) => {
      await handleExecution(load, commander, username.toLowerCase())
    })
}
