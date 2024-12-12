require("dotenv").config();
const { Client, Options } = require("discord.js-selfbot-v13");
const client = new Client({ sweepers: { ...Options.defaultSweeperSettings } });

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const channel = await client.channels.fetch(process.env.BUMP_CHANNEL);

  async function fetchLastBumpTime() {
    const messages = await channel.messages.fetch({ limit: 50 }); // Fetch up to 50 messages
    for (const message of messages.values()) {
      if (
        message.interaction && // Ensure it's an interaction message
        message.interaction.commandName === "bump"
      ) {
        return message.createdTimestamp; // Return timestamp of the last bump
      }
    }
    return null; // No previous bump found
  }

  async function calculateNextBumpTime() {
    const lastBumpTime = await fetchLastBumpTime();
    const twoHoursAndFiftyMsInMs = 2 * 60 * 60 * 1000 + 50; // 2 hours and 50 milliseconds

    if (!lastBumpTime) {
      return new Date(Date.now() + twoHoursAndFiftyMsInMs); // First bump, set next bump time
    }

    const nextBumpTime = new Date(lastBumpTime + twoHoursAndFiftyMsInMs);
    return nextBumpTime;
  }

  async function bump() {
    await channel.sendSlash("302050872383242240", "bump");
    console.count("Bumped!");
  }

  async function loop() {
    const nextBumpTime = await calculateNextBumpTime();
    const timeLeft = nextBumpTime - Date.now();

    const hours = nextBumpTime.getHours().toString().padStart(2, "0");
    const minutes = nextBumpTime.getMinutes().toString().padStart(2, "0");
    const seconds = nextBumpTime.getSeconds().toString().padStart(2, "0");

    console.log(
      `Next bump scheduled at: ${hours}:${minutes}:${seconds} (in ${(
        timeLeft /
        1000 /
        60
      ).toFixed(2)} minutes)`
    );

    setTimeout(async () => {
      await bump();
      loop(); // Schedule the next loop
    }, timeLeft || 2 * 60 * 60 * 1000 + 50); // Default to 2 hours and 50 milliseconds if no time left
  }

  loop();
});

client.login(process.env.TOKEN);
