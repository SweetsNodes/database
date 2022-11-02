import fs from "fs";

class SweetsDB {
  public storage = {};

  public constructor() {
    let stats;
    try {
      stats = fs.statSync("sweets.db.json");
    } catch (e) {
      if (e.code === "ENOENT") return;
      throw e;
    }

    try {
      fs.accessSync("sweets.db.json", fs.constants.R_OK | fs.constants.W_OK);
    } catch (e) {
      throw e;
    }

    if (stats.size > 0) {
      let data;
      try {
        data = fs.readFileSync("sweets.db.json");
      } catch (e) {
        throw e;
      }

      if (validate.bind(this)(data)) this.storage = JSON.parse(data);
    }
  }

  public set(key, value) {
    this.storage[key] = value;
    this.sync();
  }

  public get(key) {
    return this.storage.hasOwnProperty(key) ? this.storage[key] : undefined;
  }

  public has(key) {
    return this.storage.hasOwnProperty(key);
  }

  public delete(key) {
    let retVal = this.storage.hasOwnProperty(key)
      ? delete this.storage[key]
      : undefined;
    this.sync();
  }

  public deleteAll() {
    for (let key in this.storage) {
      this.delete(key);
    }

    return this;
  }

  public sync() {
    try {
      fs.writeFileSync("sweets.db.json", JSON.stringify(this.storage, null, 0));
    } catch (e) {
      throw e;
    }
  }
}

function validate(content) {
  try {
    JSON.parse(content);
  } catch (e) {
    throw e;
  }

  return true;
}

export default SweetsDB;
