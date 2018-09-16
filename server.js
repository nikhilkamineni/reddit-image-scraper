const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const cors = require('cors');

const PORT = 8000;

const server = express();

server.use(cors());

async function getData(URL) {
  const links = [];

  const response = await axios.get(URL);
  const $ = await cheerio.load(response.data);
  const images = await $('img', 'body').toArray();
  await images.forEach(img => {
    if (img.attribs.class !== undefined)
      if (img.attribs['class'].includes('media-element'))
        links.push(img.attribs.src);
  });

  return links;
}

server.get('/api/:subreddit', async (req, res) => {
  console.log(`Getting "${req.params.subreddit}" subreddit`)
  const URL = `https://www.reddit.com/r/${req.params.subreddit}`;
  try {
    const links = await getData(URL);
    res.status(200);
    res.send(links);
  } catch (err) {
    res.status(500);
    res.send(err);
  }
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
