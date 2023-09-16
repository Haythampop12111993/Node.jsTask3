let fs = require("fs")
class DelWithJson {
  static readFromJson(fileName = "models/Products.json") {
      let res
      try {
          res = JSON.parse(fs.readFileSync((fileName)));
          if(!Array.isArray(res)) res = []
      } catch (e) {
        res = []
      }
      return res
  }
  static writeFromJson(data, fileName = "models/Products.json") {
    fs.writeFileSync(fileName, JSON.stringify(data));
  }
}
module.exports= DelWithJson