var json = require('jsonfile');

class statusCache {

  constructor() {
    this.json = {
      "bolopo": {
        "status":"offline",
        "last":"｢(ﾟﾍﾟ)",
        "desc":"Haiku Generator",
      },
      "cuckwatch":{
        "status":"offline",
        "last":"(^～^;)ゞ",
        "desc":"Cuck Retweeter.",
      },
      "jordan": {
        "status":"offline",
        "last":"( ?´_ゝ｀)",
        "desc":"Jordan.",
      },
      "frogeye": {
        "status":"offline",
        "last":"σ(´し_｀〃)ゞ",
        "desc":"Crystal Ball for the Ultimate Socialite.",
      },
      "emoji":{
        "status":"offline",
        "last":"ヽ(。ヘ°)ノ",
        "desc":"Overnight Tracking",
      }
    };
  };

  get() {
    return(this.json);
  };

  push(x) {
    Object.assign(this.json, x);  
  };

  write(name, obj) {
    json.writeFile(`./src/storage/prod-${name}`, obj, function(err) {
      if(err) console.log(err);
      console.log('Fridge Moving done.')
    });
  };

  read(name) {
    return json.readFileSync(`./src/storage/${name}`)
  }
}

module.exports = statusCache;
