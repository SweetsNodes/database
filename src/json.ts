import * as fs from "fs";

export class Database {
  public path: string = null;
  public storage: any = {};

  public constructor(path?: string) {
    if (path) {
      this.path = path;
    } else this.path = "sweets.db.json";

    let stats;
    try {
      stats = fs.statSync(this.path);
    } catch (e) {
      if (e.code === "ENOENT") return;
      throw e;
    }

    try {
      fs.accessSync(this.path, fs.constants.R_OK | fs.constants.W_OK);
    } catch (e) {
      throw e;
    }

    if (stats.size > 0) {
      let data;
      try {
        data = fs.readFileSync(this.path);
      } catch (e) {
        throw e;
      }

      if (validate.bind(this)(data)) this.storage = JSON.parse(data);
    }
  }

  public set(key: string, value: any): boolean {
    this.storage[key] = value;
    this.sync();
    return true;
  }

  public get(key: string): any {
    return this.storage.hasOwnProperty(key) ? this.storage[key] : undefined;
  }

  public has(key: string): Promise<boolean> {
    return this.storage.hasOwnProperty(key);
  }

  public delete(key: string): boolean {
    let retVal = this.storage.hasOwnProperty(key)
      ? delete this.storage[key]
      : undefined;
    this.sync();
    return true;
  }

  public deleteAll(): any {
    for (let key in this.storage) {
      this.delete(key);
    }

    return this;
  }

  public getAll(): any[] {
    let data = [];

    for (let key in this.storage) {
      data.push({
        key: key,
        value: this.get(key),
      });
    }

    return data;
  }

  public sync(): boolean {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.storage, null, 2));
      return true;
    } catch (e) {
      throw e;
    }
  }
}

function validate(content: string): boolean {
  try {
    JSON.parse(content);
  } catch (e) {
    throw e;
  }

  return true;
}
