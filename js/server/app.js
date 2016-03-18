var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('./mongo_express_config');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/housing');
var app = express();

// parse post data
app.use(bodyParser.json());

// remove the following on production server
app.use("/res", express.static(__dirname + '/res'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));

app.use('/mongo_express', mongo_express(mongo_express_config));

var Bid = mongoose.model('Bid', {
  netid: String,
  bid: Number,
  email: String,
  note: String
});

app.post('/bid-submit', function(req, res) {
  var bid = (req.body.bid || "").toString().trim();
  var netid = (req.body.netid || "").toString().trim();
  var note = (req.body.note || "").toString().trim();

  if (!bid.match(/^[0-9]+$/) || !netid.match(/^[a-z]{2,3}[0-9]{2,3}$/)) {
    // Handle errors
    console.log("Post data invalid");
    res.end("invalid input");
    return -1;
  }

  var bid_amount = parseInt(bid, 10);

  Bid.findOne({
    netid: netid
  }, (err, saved_bid) => {
    if (err) {
      res.end("internal error");
      return -1;
    } else if (bid_amount > 1600 || bid_amount < 0) {
      res.end("i won't fail before you do");
      return -1;
    }

    if (!saved_bid) {
      // nothing found, create new bid
      var new_bid = new Bid({
        netid: netid,
        email: `${netid}@cornell.edu`,
        bid: bid_amount,
        note: note
      });
      new_bid.save((err) => {
        if (err) {
          console.log(err);
          res.end("bid cannot be created");
          return -1;
        } else {
          console.log('success');
          res.end("bid created");
          return 0;
        }
      });
      return 1;
    }

    if (saved_bid.bid < bid_amount) {
      // update bid amount
      var all_notes = `${saved_bid.note.toString()} \n ${note}`;
      Bid.findOneAndUpdate({
        netid: netid
      }, {
        bid: bid_amount,
        note: all_notes
      }, {}, (err) => {
        if (err) {
          console.log(err);
          res.end("bid cannot be updated");
          return -1;
        } else {
          console.log('success');
          res.end("bid updated");
          return 0;
        }
      });
      return 0;
    } else {
      res.end("bid cannot be lower than the previous one");
      return -1;
    }
  });
});

app.get('/*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/index.html'), {}, function(err) {});
});

app.listen(27942);
