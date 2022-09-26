import { Message, EmbedBuilder } from 'discord.js';
import { Config } from '../types';
import { prisma } from '../index.js';

export default {
  name: 'bal',
  description: 'view a users balance',
  execute: async (message: Message, config: Config) => {
    const user = await prisma.user.findUnique({
      where: {
        discordId: message.author.id
      }
    });

    if (!user) {
      message.channel.send('user has not registered');
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(config.color)
      .setTitle('balance')
      .setDescription(`balance of <@${message.author.id}>`)
      .addFields({ name: 'balance', value: `${user.balance} 💵` })
      .addFields({ name: 'requested by', value: `<@${message.author.id}>` });

    message.channel.send({ embeds: [embed] });
  }
};
