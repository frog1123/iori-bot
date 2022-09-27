import { Message, EmbedBuilder } from 'discord.js';
import { Config } from '../types';
import { prisma } from '../index.js';
import { randomNumBetween } from '../utils/random.js';

export default {
  name: 'search',
  description: 'search for items',
  execute: async (message: Message, config: Config) => {
    const amount = randomNumBetween(1, 10);

    const user = await prisma.user.findUnique({
      where: {
        discordId: message.author.id
      }
    });

    if (!user) {
      message.channel.send('user has not registered');
      return;
    }

    await prisma.user.update({
      where: {
        discordId: message.author.id
      },
      data: {
        balance: user.balance + amount
      }
    });

    const embed = new EmbedBuilder().setColor(config.color).setTitle('success').setDescription(`you searched and found ${amount} 💵`);
    message.channel.send({ embeds: [embed] });
  }
};
