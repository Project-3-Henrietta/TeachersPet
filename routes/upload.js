var AWS = require('aws-sdk');
// var fs = require('fs'); 
var fileUpload = require('express-fileupload');
var path = require('path');
var pathToJson = path.resolve(__dirname, '../awsConfig.json');

//look into the npm package formidable 

module.exports = function (app) {
  app.use(fileUpload());

  AWS.config.loadFromPath(pathToJson);

  function sendFileToAmazon(file) {
    var s3bucket = new AWS.S3({
      params: {
        Bucket: 'eyadtestbucket123'
      }
    });

    var params = {
      Key: file.name,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'public-read'
    };

    s3bucket.putObject(params, function (errBucket, dataBucket) {
      if (errBucket) {
        console.log("Error uploading data: ", errBucket);
      } else {
        console.log(dataBucket);
      }
    });
  }

  app.post('/api/upload', function (req, res) {
    console.log(req.files);
    /* img/pdf must be sent from client with associated "img" key 
    example: {
          img: 'img-file' 
      }
    */
    sendFileToAmazon(req.files.pdf);
    res.status(200).send('Image was successfully sent to AWS');
  });

  app.get('/api/upload', function (req, res) {
    var s3 = new AWS.S3({
      apiVersion: '2006-03-01'
    });
    var params = {
      Bucket: 'eyadtestbucket123'
    };

    s3.listObjects(params, function (err, data) {
      var bucketContents = data.Contents;
      for (var i = 0; i < bucketContents.length; i++) {
        var urlParams = {
          Bucket: 'eyadtestbucket123',
          Key: bucketContents[i].Key
        };
        s3.getSignedUrl('getObject', urlParams, function (err, url) {
          console.log('the url of the image is', url);
          // store urls as variables and send back to client as object to store in hyperlinks to allow for access on page 
        });
      }
    });
  })
}

