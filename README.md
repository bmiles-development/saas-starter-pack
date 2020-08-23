# SaaS Starter Pack - And More
A fully functioning Static website with AWS Amplify backend and vue.js static html front end with Vuetify.

This App Contains the following features:
* Full Login Flow With AWS Cognito backend including, Signup, Login, Verify Account Code sent via email (based on the excellent tutorials from [codeguru.io](https://www.youtube.com/results?search_query=codeguru.io)
* Basic Admin Console to start midifying
* Full Amplify I18n L12n

## Project setup

1. Set up an AWS account
2. Create an IAM user and associate with a group that has AdministratorAccess Policy
3. amplify init --app git@github.com:bmiles-development/saas-starter-pack
4. npm build
5. npm serve


had these errors at step 5: 

npm ERR! missing script: start

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/bp/.npm/_logs/2020-07-17T02_46_37_723Z-debug.log
An error occurred during the push operation: Command failed: npm start

then when i ran npm build i got this npm WARN build `npm build` called with no arguments. Did you mean to `npm run-script build`?npm WARN build `npm build` called with no arguments. Did you mean to `npm run-script build`?

But it worked.
