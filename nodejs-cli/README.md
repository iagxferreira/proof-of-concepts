# github-consumer


## Installation

1. Install dependencies
```shell
$ yarn 
## or 
$ npm install
```
2. Run necessary queries localized on [sql](./sql) folder on your database, in order.
3. Copy `.env.example` to `.env` and fill it with your database credentials, or export your credentials as global environment variables
```shell
    $ cp .env.example .env
```

## Usage
```shell
# Show all users saved in database
 $ github-consumer list-all-users
 
# Show a user in database or find him on github and cache it in database 
 $ github-consumer load <username>
```
Run `npm link` inside of the project folder in case of you can't execute `github-consumer`.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Ensure that you are following rules of SEMVER and semantic commits.
Please make sure to update tests as appropriate.
