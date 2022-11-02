## SweetsNodes Database
Simple database for NodeJS

## Getting started
```js
const SweetsDB = require("@sweetsnodes/database").default;
/* import SweetsDB from "@sweetsnodes/database"; */

let Database = new SweetsDB();

Database.set("hello", "hi");
Database.get("hello"); /* hi */
Database.has("hello"); /* true */
Database.delete("hello");
Database.has("hello"); /* false */
Database.get("hello"); /* undefined */
```
