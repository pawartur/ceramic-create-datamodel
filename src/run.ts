import { CeramicClient } from '@ceramicnetwork/http-client'
import { DataModel } from '@glazed/datamodel'
import { DIDDataStore } from '@glazed/did-datastore'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { getResolver } from 'key-did-resolver'
import { fromString } from 'uint8arrays'
import { ETHWORLD_CONFERENCE } from './utils/CONSTANTS'

// Import the model aliases created during development time
// @ts-ignore
import modelAliases from '../models/model.json'

async function main(){
  // The key must be provided as an environment variable
  const key = fromString(process.env.DID_KEY || "", 'base16')
  // Create and authenticate the DID
  const did = new DID({
    provider: new Ed25519Provider(key),
    resolver: getResolver(),
  })
  await did.authenticate()

  // Create the Ceramic instance and inject the DID
  const ceramic = new CeramicClient('http://0.0.0.0:7007')
  ceramic.did = did

  // Create the model and store
  const model = new DataModel({ ceramic, aliases: modelAliases })
  const store = new DIDDataStore({ ceramic, model })

  const exampleNote = await model.loadTile(ETHWORLD_CONFERENCE.name)
  await store.set(ETHWORLD_CONFERENCE.name, { description: 'Updated description' })
}

main()
