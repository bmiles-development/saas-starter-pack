# SaaS Starter Pack - And More
The goal of the SaaS Starter Pack is to have an out of the box generic Website wuth Authentication/Aithorization, I18n/L12n, Subscriptons and payment methods, basic admin pages so that you can start building your dream SaaS application without having to worry about all of this preliminary work.

AfA fully functioning static website with AWS Amplify backend and vue.js static html front end with Vuetify.

This App Contains the following features:
* Full Login Flow With AWS Cognito backend including, Signup, Login, Verify Account Code sent via email (based on the excellent tutorials from [codeguru.io](https://www.youtube.com/watch?v=HgpVgFdBS2E&list=PLAl8os33KyOVD4asd0Sf7BcuE41fu7i6c))
* Basic Admin Console to start midifying
* Full Amplify I18n L12n

## Project setup

1. Set up an AWS account
2. Create an IAM user and associate with a group that has AdministratorAccess Policy
3. create an AWS profile on your machine (makes the Amplify CLI much easier to use if you do) https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html
4. amplify init --app git@github.com:bmiles-development/saas-starter-pack
5. npm build
6. npm serve

