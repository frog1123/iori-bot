import { Message, EmbedBuilder } from 'discord.js';
import { Config } from '../types';
import { prisma } from '../index.js';

export default {
  name: 'register',
  description: 'register to the economy system',
  execute: async (message: Message, config: Config) => {
    const embed = new EmbedBuilder().setColor(config.color).setTitle('success').setDescription(`registered <@${message.author.id}>`).addFields({ name: 'user id', value: message.author.id }).addFields({ name: 'default balance', value: '100 💵' });

    await prisma.user.create({
      data: {
        discordId: message.author.id,
        balance: 100
      }
    });

    message.channel.send({ embeds: [embed] });
  }
};
