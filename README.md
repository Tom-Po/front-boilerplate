# Front Boilerplate

### Installation

Install by running
``` js
yarn
```
or
``` js
npm install
```

### Generate Icons

To generate icon fonts, run the following command 
``` sh
make generate-icons
```
It will convert all SVGs in src/img/icons/* to EOT, WOFF?2, JSON, TS and an HTML preview.  
Output folder : /src/fonts/icons
More in [icon-font-generator's documentation](https://github.com/Workshape/icon-font-generator/blob/v2.1.2/README.md) by Tancredi Trugenberger.  

You can change command options in package.json
