const Parser = require("rss-parser");
var express = require("express");
var router = express.Router();
var shuffle = require("../../utilities/shuffle");
let parser = new Parser({
  customFields: {
    feed: ["otherTitle", "extendedDescription"],
    item: ["coAuthor", "subtitle"]
  }
});

const mongoose = require("mongoose");
const rsscontent = require("../../config/rssfeed");
let fetch = require("isomorphic-fetch");

// acquiring actualy feed ursl
let financeurls = rsscontent.Finance;
let economicsurls = rsscontent.Econonmics;
let blogurls = rsscontent.Blogs;
let socialurls = rsscontent.Social;
let filingsurls = rsscontent.MutualFundFilings;
let cryptourls = rsscontent.CryptoCurrencies;
let derivativeurls = rsscontent.Derivatives;

router.get("/markets", (request, response) => {
  Promise.all(
    financeurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    var data = [];
    for (var i = 0; i < texts.length; i++) {
      data.unshift(texts[i].items);
    }
    texts = shuffle(data);
    console.log(texts);
    response.json(texts);
  });
});

router.get("/economy", (request, response) => {
  Promise.all(
    economicsurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    texts = shuffle(texts);
    console.log(texts);
    response.json(texts);
  });
});

router.get("/opinions", (request, response) => {
  Promise.all(
    blogurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    texts = shuffle(texts);
    console.log(texts);
    response.json(texts);
  });
});

router.get("/social", (request, response) => {
  Promise.all(
    socialurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    texts = shuffle(texts);
    console.log(texts[1].items[1].content);
    console.log(texts);
    response.json(texts);
  });
});

router.get("/filings", (request, response) => {
  Promise.all(
    filingsurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    texts = shuffle(texts);
    console.log(texts);
    response.json(texts);
  });
});

router.get("/crypto", (request, response) => {
  Promise.all(
    cryptourls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    var data = [];
    for (var i = 0; i < texts.length; i++) {
      data.unshift(texts[i].items);
    }
    texts = shuffle(data);
    console.log(texts[0].items[0].enclosure.url);
    console.log(texts);
    response.json(texts);
  });
});

router.get("/derivatives", (request, response) => {
  Promise.all(
    derivativeurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  )
    .then(texts => {
      texts = shuffle(texts);
      response.json(texts);
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
});

module.exports = router;
