import { 
    Conference,
    ImageMetadata,
    ImageSources
 } from '../../types/Conference'

export function createEthWorldConference(): Conference {
    const ethWorldImageMetadata: ImageMetadata = {
        src:"",
        mimeType:"jpeg/png",
        width:640,
        height:160
    }

    const ethWorldImageSources: ImageSources = {
        original: ethWorldImageMetadata
    }

    const ethWorld: Conference = {
        name:"EthWorld",
        description:"The online Eth Hackaton for the ages!",
        startDate:"25-10-2022",
        endDate:"30-10-2022"
    }

    return ethWorld
}
