import { writeFile } from 'node:fs/promises'
import { CeramicClient } from '@ceramicnetwork/http-client'
import { ModelManager } from '@glazed/devtools'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'
import { 
  ETHWORLD_CONFERENCE,
  CONFERENCE_SCHEMA
 } from './utils/CONSTANTS'

async function main() {
  // The key must be provided as an environment variable
  const key = fromString(process.env.DID_KEY || "", 'base16')
  // Create and authenticate the DID
  const did = new DID({
    provider: new Ed25519Provider(key),
    resolver: getResolver(),
  })
  await did.authenticate()

  // Connect to the local Ceramic node
  const ceramic = new CeramicClient('http://0.0.0.0:7007')
  ceramic.did = did

  // Create a manager for the model
  const manager = new ModelManager({ ceramic })

  // @ts-ignore
  const conferencegSchemaID = await manager.createSchema('Conference', CONFERENCE_SCHEMA)

  const myConferenceOriginalImage = {
    src: '',
    mimeType: 'jpeg/png',
    width: 640,
    height: 320,
  }

  // Create the definition using the created schema ID
  await manager.createDefinition('myConference', {
    name: 'Conference Definition',
    description: 'A definition that I\'ll use to create Conference streams',
    schema: manager.getSchemaURL(conferencegSchemaID) || "",
  })

  // Create a tile using the created schema ID
  await manager.createTile(
    ETHWORLD_CONFERENCE.name,
    ETHWORLD_CONFERENCE,
    { schema: manager.getSchemaURL(conferencegSchemaID) || ""},
  )

  // Deploy model to Ceramic node
  const model = await manager.deploy()

  // Write deployed model aliases to JSON file
  await writeFile('../models/model.json', JSON.stringify(model))
}

main()
