<div align="center">
  <img src="public/icon-128.png" alt="logo"/>
  <h1> Social media blocker</h1>
</div>


![Extension preview](/.images/extension.png "Extension preview")



## Usage <a name="usage"></a>

### Setup <a name="setup"></a>
1. Clone this repository.
2. Change `name` and `description` in package.json => **Auto synchronize with manifest** 
3. Run `yarn` or `npm i` (check your node version >= 16)
4. Run `yarn dev` or `npm run dev`
5. Load Extension on Chrome
   1. Open - Chrome browser
   2. Access - chrome://extensions
   3. Check - Developer mode
   4. Find - Load unpacked extension
   5. Select - `dist` folder in this project (after dev or build)
6. If you want to build in production, Just run `yarn build` or `npm run build`.
