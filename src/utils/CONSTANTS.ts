import { createEthWorldConference } from "./createEthWorldConference";


export const CONFERENCE_SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Conference",
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "maxLength": 64
      },
      "description": {
        "type": "string",
        "maxLength": 300
      },
      "image": {
        "$ref": "#/definitions/imageSources"
      },
      "startDate": {
        "type": "string",
        "format": "date",
        "maxLength": 10
      },
      "endDate": {
        "type": "string",
        "format": "date",
        "maxLength": 10
      }
    },
    "definitions": {
      "imageMetadata": {
        "type": "object",
        "properties": {
          "src": {
            "$ref": "#/definitions/IPFSUrl"
          },
          "mimeType": {
            "type": "string",
            "maxLength": 50
          },
          "width": {
            "$ref": "#/definitions/positiveInteger"
          },
          "height": {
            "$ref": "#/definitions/positiveInteger"
          },
          "size": {
            "$ref": "#/definitions/positiveInteger"
          }
        },
        "required": ["src", "mimeType", "width", "height"]
      },
      "imageSources": {
        "type": "object",
        "properties": {
          "original": {
            "$ref": "#/definitions/imageMetadata"
          },
          "alternatives": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/imageMetadata"
            }
          }
        },
        "required": ["original"]
      }
    }
  }

export const ETHWORLD_CONFERENCE = createEthWorldConference()
