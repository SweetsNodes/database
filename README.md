## SweetsNodes Database
Simple database for NodeJS

## Getting started
```js
const { Database } = require("@sweetsnodes/database");
/* import { Database } from "@sweetsnodes/database"; */

let db = new Database();
/* let db = new Database("mydatabase.json"); */

db.set("hello", "hi");
db.get("hello"); /* hi */
db.has("hello"); /* true */
db.delete("hello");
db.has("hello"); /* false */
db.get("hello"); /* undefined */
```
