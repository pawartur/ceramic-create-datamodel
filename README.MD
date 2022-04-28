Followed https://developers.ceramic.network/tools/glaze/example/ with the goal of writing ceramic datamodel creation scripts that I could use with tools I usually use to build web apps: yarn + typescript

**WARNING** this code doesn't work. I need to fix some ts-related issues

How to clone and urn
1. `git clone git@github.com:pawartur/ceramic-create-datamodel.git`
2. `cd ceramic-create-datamodel`
3. `yarn install`
4. `ceramic daemon`
5. Open another terminal
6. `glaze did:create`
7. Create the `.env` file and put the `seed` hash from the output of 6 as `DID_KEY` var
8. `yarn tsc`
9. `node ./bin/create-model.js`
10. `node ./bin/run.js`
