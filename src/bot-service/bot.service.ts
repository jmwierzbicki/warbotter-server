import { Injectable } from '@nestjs/common';
import {
  Client,
  GatewayIntentBits,
  Routes,
  REST,
  SlashCommandBuilder,
  Webhook,
  RESTPostAPIChannelWebhookJSONBody,
  APIWebhook, WebhookClient
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

  constructor() {}

  getWebhookClient(webhook): WebhookClient {
    return new WebhookClient({ id: webhook.id, token: webhook.token });
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

  async getWebhooksForChannel(channelID): Promise<APIWebhook[]> {
    return (await this.rest.get(
      Routes.channelWebhooks('547839876784062507'),
    )) as APIWebhook[];
  }
  async createWebhookForChannel(
    channelID,
    webhook: RESTPostAPIChannelWebhookJSONBody,
  ): Promise<APIWebhook> {
    return (await this.rest.post(Routes.channelWebhooks(channelID), {
      body: webhook,
    })) as APIWebhook;
  }

  async findOrCreateWebhookForChannel(
    channelId: string,
    webhookBody: RESTPostAPIChannelWebhookJSONBody,
  ): Promise<APIWebhook> {
    const webhook =
      (await this.getWebhooksForChannel(channelId)).find(
        (hook) => hook.user.username === 'Warbotter',
      ) || (await this.createWebhookForChannel(channelId, webhookBody));
    return webhook;
  }
}
