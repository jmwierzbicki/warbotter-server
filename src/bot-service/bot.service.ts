import { Injectable } from '@nestjs/common';
import {
  Client,
  GatewayIntentBits,
  Routes,
  REST,
  SlashCommandBuilder,
} from 'discord.js';

@Injectable()
export class BotService {
  public client = new Client({ intents: [GatewayIntentBits.Guilds] });
  public connection;
  public rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  public commands = [
    new SlashCommandBuilder()
      .setName('invite')
      .setDescription('Invite your character to this channel'),
  ].map((command) => command.toJSON());

  constructor() {
    this.registerListeners();
    this.enableBot();
  }

  async registerListeners() {
    console.log('registering listeners')
    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === 'invite') {
        await interaction.reply('Pong!', );
        await interaction.editReply('Pong again!');
      }
    });
  }

  async enableBot() {
    console.log('logging in to discord')
    this.client.login(process.env.DISCORD_TOKEN);
  }

  async registerCommands() {
    console.log('a');
    await this.deleteCommands();
    console.log('a');

    const data = (await this.rest.put(
      Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      { body: this.commands },
    )) as any[];
    console.log(data);
    console.log(`Successfully registered ${data.length} application commands.`);
  }

  async deleteCommands() {
    return new Promise(async (resolve) => {
      const cmds = (await this.rest.get(
        Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
      )) as any[];

      for (const cmd of cmds) {
        await this.rest.delete(
          Routes.applicationCommand(process.env.DISCORD_CLIENT_ID, cmd.id),
        );
      }
      resolve(true);
    });
  }
}
