var express = require('express');
var React = require('react'); 
var ReactDOMServer = require('react-dom/server'); 
var ReactApp = React.createFactory(require('../app/components/ReactApp.js').ReactApp);

module.exports = function (app) {

  app.get('/', function (req, res) {
    // React.renderToString takes your component and generates the markup 
    var reactHtml = ReactDOMServer.renderToString(ReactApp({})); 
    // output rendered by react 
    res.render('index', { reactOutput: reactHtml });
  });
}

