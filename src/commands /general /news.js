const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { response } = require("express");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI('c579fc377cf54eaf9388d536a1f89d84');

module.exports = {
  name: "news",
  category: "general",
  description: "Gives the invite links of the bots.",
  owner: false,
  wl : true,
  execute: async (message, args, client, prefix) => {

    newsapi.v2.topHeadlines({
      sources: 'bbc-news,the-verge',
      q: 'bitcoin',
      category: 'business',
      language: 'en',
      country: 'us'
    }).then(response => {
      console.log(response);
      /*
        {
          status: "ok",
          articles: [...]
        }
      */
    });
    // To query /v2/everything
    // You must include at least one q, source, or domain
    newsapi.v2.everything({
      q: 'bitcoin',
      sources: 'bbc-news,the-verge',
      domains: 'bbc.co.uk, techcrunch.com',
      from: '2017-12-01',
      to: '2017-12-12',
      language: 'en',
      sortBy: 'relevancy',
      page: 2
    }).then(response => {
      console.log(response);
      /*
        {
          status: "ok",
          articles: [...]
        }
      */
    });
    // To query sources
    // All options are optional
    newsapi.v2.sources({
      category: 'technology',
      language: 'en',
      country: 'us'
    }).then(response => {
      console.log(response);
      /*
        {
          status: "ok",
          sources: [...]
        }
      */
    });
   
            const embed = new MessageEmbed()
            
           .setDescription(response)
                .setColor(client.embedColor)
message.channel.send({embeds : [embed]})
    }

}