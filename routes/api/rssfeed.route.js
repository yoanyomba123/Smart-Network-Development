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
let crediturls = rsscontent.Credit_Derivatives;
let commodityurls = rsscontent.Commodity_Derivatives;
let currencyurls = rsscontent.Currency_Derivatives;
let equityurls = rsscontent.Equity_Derivatives;
let interesturls = rsscontent.Interest_Rate_Derivatives;
let structuredurls = rsscontent.Structured_Products;

router.get("/markets", (request, response) => {
  Promise.all(
    financeurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    var data = [];
    for (var i = 0; i < texts.length; i++) {
      data.unshift(texts[i].items);
    }
    texts = shuffle(data);
    response.json(texts);
  });
});

router.get("/economy", (request, response) => {
  Promise.all(
    economicsurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    var data = [];
    for (var i = 0; i < texts.length; i++) {
      data.unshift(texts[i].items);
    }
    texts = shuffle(data);
    response.json(texts);
  });
});

router.get("/opinions", (request, response) => {
  Promise.all(
    blogurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    var data = [];
    for (var i = 0; i < texts.length; i++) {
      data.unshift(texts[i].items);
    }
    texts = shuffle(data);
    response.json(texts);
  });
});

router.get("/social", (request, response) => {
  Promise.all(
    socialurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    var data = [];
    for (var i = 0; i < texts.length; i++) {
      data.unshift(texts[i].items);
    }
    texts = shuffle(data);
    response.json(texts);
  });
});

router.get("/filings", (request, response) => {
  Promise.all(
    filingsurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  ).then(texts => {
    var data = [];
    for (var i = 0; i < texts.length; i++) {
      data.unshift(texts[i].items);
    }
    texts = shuffle(data);
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
    response.json(texts);
  });
});

router.get("/derivatives", (request, response) => {
  Promise.all(
    derivativeurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  )
    .then(texts => {
      var data = [];
      for (var i = 0; i < texts.length; i++) {
        data.unshift(texts[i].items);
      }
      texts = shuffle(data);
      response.json(texts);
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
});

router.get("/credit-derivatives", (request, response) => {
  Promise.all(
    crediturls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  )
    .then(texts => {
      var data = [];
      for (var i = 0; i < texts.length; i++) {
        data.unshift(texts[i].items);
      }
      texts = shuffle(data);
      response.json(texts);
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
});

router.get("/commodity-derivatives", (request, response) => {
  Promise.all(
    commodityurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  )
    .then(texts => {
      var data = [];
      for (var i = 0; i < texts.length; i++) {
        data.unshift(texts[i].items);
      }
      texts = shuffle(data);
      response.json(texts);
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
});

router.get("/currency-derivatives", (request, response) => {
  Promise.all(
    currencyurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  )
    .then(texts => {
      var data = [];
      for (var i = 0; i < texts.length; i++) {
        data.unshift(texts[i].items);
      }
      texts = shuffle(data);
      response.json(texts);
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
});

router.get("/equity-derivatives", (request, response) => {
  Promise.all(
    equityurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  )
    .then(texts => {
      var data = [];
      for (var i = 0; i < texts.length; i++) {
        data.unshift(texts[i].items);
      }
      texts = shuffle(data);
      response.json(texts);
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
});

router.get("/interest-rate-derivatives", (request, response) => {
  Promise.all(
    interesturls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  )
    .then(texts => {
      var data = [];
      for (var i = 0; i < texts.length; i++) {
        data.unshift(texts[i].items);
      }
      texts = shuffle(data);
      response.json(texts);
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
});

router.get("/structured-derivatives", (request, response) => {
  Promise.all(
    structuredurls.map(url => fetch(url).then(resp => parser.parseURL(url)))
  )
    .then(texts => {
      var data = [];
      for (var i = 0; i < texts.length; i++) {
        data.unshift(texts[i].items);
      }
      texts = shuffle(data);
      response.json(texts);
    })
    .catch(error => {
      console.log(error);
      response.status(400).json(error);
    });
});

module.exports = router;
