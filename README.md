# Discord Selfbot Community

## Description

This bot uses the `discord.js-selfbot-v13` library to automate bump commands on a Discord server. The objective is to monitor the last bump and automate the command every two hours, respecting the rules of the bot's bump partner.

**Important note:** Self-bots are prohibited by Discord's Terms of Service. Using this script may result in your account being banned. Use at your own risk.

## Features

- Automatically retrieves the time of the last bump in the specified channel.
- Calculates the time remaining before the next authorised bump.
- Automatically performs the bump when the time has elapsed.
- Displays the time remaining before the next bump in the console.

## Prerequisites

### Tools required

- [Node.js](https://nodejs.org/) (version 16.6.0 or higher)
- [npm](https://www.npmjs.com/) (usually included with Node.js)

### Node.js dependencies

- `discord.js-selfbot-v13`
- `dotenv`

To install these dependencies, run the following command:

```bash
npm install discord.js-selfbot-v13 dotenv
```

## Configuration

### `.env` file

Create an `.env` file in the project root directory and configure the following variables:

```env
TOKEN=YourTokenHere
BUMP_CHANNEL=IDChannelHere
```

- **TOKEN** : Your Discord account token (Self-Bot).
- **BUMP_CHANNEL**: The ID of the channel where the bump command is executed.

To get the channel ID, activate developer mode in Discord, right-click on the channel and select "Copy ID".

## Usage

### Launch the bot

1. Make sure that the `.env` file is correctly configured.
2. Run the script with Node.js :

```bash
node index.js
```

### How it works

- The bot connects to your Discord account.
- It searches for the last 50 messages in the specified channel and identifies the last bump made.
- It calculates the time remaining before the next authorised bump (2 hours).
- It performs the bump automatically when the time has elapsed.

### Logs in the console

- Next bump scheduled for : HH:MM:SS (in XX.XX minutes)": displays the time of the next bump.
- Bumped! confirms that the bump command has been executed.

## Code features

### Main modules

1. **dotenv**: Loads environment variables from the `.env` file.
2. **discord.js-selfbot-v13** : To interact with the Discord API as a Self-Bot.

### Key features

#### `fetchLastBumpTime()`

- Retrieves the last 50 messages in the specified channel.
- Identifies the last message related to the `bump` command.

#### `calculateNextBumpTime()`

- Calculates the time of the next bump by adding 2 hours (plus 50 milliseconds) to the time of the last bump found.
- If no previous bump is found, schedules an immediate bump.

#### `bump()`

- Executes the `bump` slash command in the specified channel.
- Displays a counter in the console for each bump performed.

#### `loop()`

- Schedules the next bump according to the calculated time.
- Displays the expected time of the next bump in the console.

## Warnings

1. **Discord prohibits the use of self-bots**. Their use may result in sanctions (such as banning).
2. **Discord Token:** Never share your token, as it allows full access to your account.

## Useful resources

- [Official Discord documentation.js-selfbot-v13](https://github.com/aiko-chan-ai/discord.js-selfbot-v13)
- [Official Discord Rules and Policies Guide](https://discord.com/terms)

## Contribution

Contributions are welcome. For suggestions or improvements, open an "issue" or submit a "pull request" in the GitHub repository.

## License

This project is licensed under the MIT license. See the LICENSE file for more details.
