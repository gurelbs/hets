<h1 align="center">Welcome to hets 👋</h1>
<h4><code>* Currently this is just a beta version</code></h4>
<p>
  <a href="https://www.npmjs.com/package/hets" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/hets.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> open-source engine with API for Real-time questions In Hebrew.

## Install

```sh
npm i hets
```
## import 

```sh

import { news } from "hets";

```
## Usage

```sh

# news
let חדשות_אחרונות = await news();
console.log(חדשות_אחרונות) // 100 top news

let חדשות_על_קורונה = await news('קורונה');
console.log(חדשות_על_קורונה) // recent news about 'קורונה' 

getNews('פוליטיקה','בחירות') // recent news about 'פוליטיקה' & 'בחירות' 
getNews('donald trump','en') // 100 recent news about 'donald trump' - english language & source 
```
 
## Author

👤 **Gurel Ben Shabat**

* Website: https://github.com/gurelbs
* Github: [@gurelbs](https://github.com/gurelbs)
* LinkedIn: [@gurelbs](https://linkedin.com/in/gurelbs)

## Show your support

Give a ⭐️ if this project helped you!