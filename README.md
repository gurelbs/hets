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

### news
```sh

news().then(console.log) 
// 100 top news

news('קורונה').then(console.log) 
// recent news about 'קורונה'

news(['הייטק','ביטקוין']).then(console.log) 
// recent news about 'הייטק' & 'ביטקוין' 

news('donald trump','en').then(console.log) 
// 100 recent news about 'donald trump' in English 

```
 
## Author

👤 **Gurel Ben Shabat**

* Website: https://github.com/gurelbs
* Github: [@gurelbs](https://github.com/gurelbs)
* LinkedIn: [@gurelbs](https://linkedin.com/in/gurelbs)

## Show your support

Give a ⭐️ if this project helped you!