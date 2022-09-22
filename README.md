## Cypress io cucumber kurulumu

   

 - *Öncelikle package.json dosyamızı oluşturuyoruz.*
    

> npm -init

 - *Cypress'i indiriyoruz.*

	

    

> npm install cypress —save-dev

   

 - *Package.json dosyasında script bölümünde bulunan "test" scriptimizi  
   güncelliyoruz (Cypress'i açmaya yarar)*

    

>  "test": "cypress open"

 - *Terminalden cypress açılış komutu çalıştırılır. Cypress'i bir
   kere çalıştırarak gerekli dosyaların kurulmasını sağlıyoruz.*

> npx cypress open

 - *Cypress cucumber'i indiriyoruz.*

> npm install —save-dev cypress-cucumber-preprocessor

 - *Cypress esbuild eklentisini indiriyoruz.*

> npm i -D cypress @bahmutov/cypress-esbuild-preprocessor esbuild

 - **.cypress-cucumber-preprocessorrc.json** *adında bir json dosyası
   oluşturuyoruz ve içerisini aşağıdaki şekilde dolduruyoruz. (Format
   hatası çözümü için)*
>
>  {    
>     "json": {     
>     "enabled": true,
>     
>     "output": "jsonlogs/log.json",
>     
>     "formatter": "cucumber-json-formatter.exe"
>     
>     },
>     
>     "messages": {
>     
>     "enabled": true,
>     
>     "output": "jsonlogs/messages.ndjson"
>     
>     },
>     
>     "html": {
>     
>     "enabled": true
>     
>     },
>     
>     "stepDefinitions": [
>     
>     "[filepath]/**/*.{js,ts}",
>     
>     "[filepath].{js,ts}",
>     
>     "cypress/e2e/step_definitions/*.{js,ts}"
>     
>     ]
>     
>     }

 - **Cypress.config.js** *dosyasını aşşağıdaki şekilde değiştiriyoruz;*

>     > const { defineConfig } = require("cypress");
>     > const createBundler =
>     > require("@bahmutov/cypress-esbuild-preprocessor");
>     > const addCucumberPreprocessorPlugin =
>     > require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
>     > const createEsbuildPlugin =
>     > require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
>     > //If using this approach, just call the key "setupNodeEvents" in the
>     > E2E configurations
>     > // async function setupNodeEvents(on, config) {
>     > // await addCucumberPreprocessorPlugin(on, config);
>     > // on(
>     > // "file:preprocessor",
>     > // createBundler({
>     > // plugins: [createEsbuildPlugin(config)],
>     > // })
>     > // );
>     > // return config;
>     > // }
>     > module.exports = defineConfig({
>     > e2e: {
>     > async setupNodeEvents(on, config) {
>     > const bundler = createBundler({
>     > plugins: [createEsbuildPlugin(config)],
>     > });
>     > on("file:preprocessor", bundler);
>     > await addCucumberPreprocessorPlugin(on, config);
>     > return config;
>     > },
>     > specPattern: "cypress/e2e/features/*.feature",
>     > chromeWebSecurity: false,
>     > experimentalWebKitSupport:true
>     > },
>     > });
