var express = require('express');
var path = require('path');
var router = express.Router();


class customRouter {

  constructor(cache) {
    this.express = express;
    this.path = path;
    this.router = router;
    this.cache = cache;

    this.app = this.express();
    this.app.use(this.express.static("/../public"));
    this.setup(this.cache);
  }

  setup(currentCache) {

    this.router.get('/', function(req, res){
      res.render('status', {
        title: "Status Page",
        currentCache: JSON.stringify(currentCache.get())
      });
    });

  }

}


module.exports = customRouter;
