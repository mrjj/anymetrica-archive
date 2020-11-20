/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/light"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/light"));

})(this, function($protobuf) {
    "use strict";

    var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
    .addJSON({
      anymetrica: {
        nested: {
          registry: {
            options: {
              java_package: "com.anymetrica.registry",
              java_outer_classname: "AnymetricaRegistry"
            },
            nested: {
              RegistryService: {
                methods: {
                  Heartbeat: {
                    requestType: "anymetrica.heartbeat.Heartbeat",
                    responseType: "anymetrica.heartbeat.Heartbeat"
                  },
                  GetMetadata: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.request.ShallowEntities"
                  },
                  Delete: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.request.ShallowEntities"
                  },
                  Discover: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.relation.Relations"
                  },
                  MergeRelations: {
                    requestType: "anymetrica.relation.Relations",
                    responseType: "anymetrica.relation.Relations"
                  },
                  RemoveRelations: {
                    requestType: "anymetrica.relation.Relations",
                    responseType: "anymetrica.relation.Relations"
                  },
                  ReplaceRelations: {
                    requestType: "anymetrica.relation.Relations",
                    responseType: "anymetrica.relation.Relations"
                  },
                  TransferOwnership: {
                    requestType: "anymetrica.request.TransferOwnerships",
                    responseType: "anymetrica.request.TransferOwnerships"
                  },
                  MergeOTPs: {
                    requestType: "anymetrica.credential.OTPs",
                    responseType: "anymetrica.credential.OTPs"
                  },
                  GetOTPs: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.credential.OTPs"
                  },
                  MergeTOTPs: {
                    requestType: "anymetrica.credential.TOTPs",
                    responseType: "anymetrica.credential.TOTPs"
                  },
                  GetTOTPs: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.credential.TOTPs"
                  },
                  MergeSessionTokens: {
                    requestType: "anymetrica.credential.SessionTokens",
                    responseType: "anymetrica.credential.SessionTokens"
                  },
                  GetSessionTokens: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.credential.SessionTokens"
                  },
                  MergeUsernamePasswords: {
                    requestType: "anymetrica.credential.UsernamePasswords",
                    responseType: "anymetrica.credential.UsernamePasswords"
                  },
                  GetUsernamePasswords: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.credential.UsernamePasswords"
                  },
                  MergeOrganizations: {
                    requestType: "anymetrica.organization.Organizations",
                    responseType: "anymetrica.organization.Organizations"
                  },
                  GetOrganizations: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.organization.Organizations"
                  },
                  MergeHumans: {
                    requestType: "anymetrica.human.Humans",
                    responseType: "anymetrica.human.Humans"
                  },
                  GetHumans: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.human.Humans"
                  },
                  MergeDevices: {
                    requestType: "anymetrica.device.Devices",
                    responseType: "anymetrica.device.Devices"
                  },
                  GetDevices: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.device.Devices"
                  },
                  MergeVehicles: {
                    requestType: "anymetrica.vehicle.Vehicles",
                    responseType: "anymetrica.vehicle.Vehicles"
                  },
                  GetVehicles: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.vehicle.Vehicles"
                  },
                  MergeContacts: {
                    requestType: "anymetrica.contact.Contacts",
                    responseType: "anymetrica.contact.Contacts"
                  },
                  GetContacts: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.contact.Contacts"
                  },
                  MergeGroups: {
                    requestType: "anymetrica.group.Groups",
                    responseType: "anymetrica.group.Groups"
                  },
                  GetGroups: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.group.Groups"
                  },
                  MergeLocations: {
                    requestType: "anymetrica.group.Groups",
                    responseType: "anymetrica.location.Locations"
                  },
                  GetLocations: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.location.Locations"
                  },
                  MergePostalAddresses: {
                    requestType: "anymetrica.group.Groups",
                    responseType: "anymetrica.postal_address.PostalAddresses"
                  },
                  GetPostalAddresses: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.postal_address.PostalAddresses"
                  },
                  MergeFiles: {
                    requestType: "anymetrica.file.Files",
                    responseType: "anymetrica.file.Files"
                  },
                  GetFiles: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.file.Files"
                  },
                  MergeWaveforms: {
                    requestType: "anymetrica.waveform.Waveforms",
                    responseType: "anymetrica.waveform.Waveforms"
                  },
                  GetWaveforms: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.waveform.Waveforms"
                  },
                  MergeVadResults: {
                    requestType: "anymetrica.vad.VadResults",
                    responseType: "anymetrica.vad.VadResults"
                  },
                  GetVadResults: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.vad.VadResults"
                  },
                  MergeOperations: {
                    requestType: "anymetrica.operation.Operations",
                    responseType: "anymetrica.operation.Operations"
                  },
                  GetOperations: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.operation.Operations"
                  },
                  CancelOperations: {
                    requestType: "anymetrica.request.ListRequest",
                    responseType: "anymetrica.operation.Operations"
                  },
                  RequestDemo: {
                    requestType: "anymetrica.demo_request.DemoRequest",
                    responseType: "anymetrica.request.EmptyResponse"
                  }
                }
              }
            }
          },
          heartbeat: {
            options: {
              java_package: "com.anymetrica.heartbeat"
            },
            nested: {
              Heartbeat: {
                fields: {
                  request_id: {
                    type: "uint64",
                    id: 1
                  },
                  client_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  },
                  server_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 6
                  },
                  server_message: {
                    type: "string",
                    id: 16
                  }
                }
              }
            }
          },
          relation: {
            options: {
              java_package: "com.anymetrica.relation"
            },
            nested: {
              RelationType: {
                values: {
                  RESTRICTED: 0,
                  CAN_RESET: 1,
                  CAN_READ: 3,
                  CAN_WRITE: 7,
                  CAN_READ_RELATIONS: 15,
                  CAN_WRITE_RELATIONS: 31,
                  OWNS: 64,
                  ADMINISTRATING: 66,
                  CREATED: 68,
                  HAVE_PART: 72,
                  HAVE_MEMBER: 78,
                  INPUT: 80,
                  OUTPUT: 82,
                  CONTACT_WORK: 104,
                  CONTACT_WORK_GROUP: 106,
                  CONTACT_PERSONAL: 110,
                  CONTACT_FAMILY: 112,
                  CONTACT_ORGANISATION: 116,
                  CONTACT_NOTICED_USAGE: 120,
                  CONTACT_DO_NOT_CALL: 128
                }
              },
              Relation: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  from_id: {
                    type: "string",
                    id: 4
                  },
                  from_depth: {
                    type: "int32",
                    id: 8
                  },
                  from_depth_absolute: {
                    type: "int32",
                    id: 10
                  },
                  relation_type: {
                    type: "RelationType",
                    id: 32,
                    options: {
                      deprecated: true
                    }
                  },
                  relation_types: {
                    rule: "repeated",
                    type: "RelationType",
                    id: 34
                  },
                  to_id: {
                    type: "string",
                    id: 64
                  },
                  to_depth: {
                    type: "int32",
                    id: 66
                  },
                  to_depth_absolute: {
                    type: "int32",
                    id: 68
                  }
                }
              },
              Relations: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  relations: {
                    rule: "repeated",
                    type: "Relation",
                    id: 6
                  },
                  entities: {
                    rule: "repeated",
                    type: "anymetrica.metadata.ShallowEntity",
                    id: 8
                  }
                }
              }
            }
          },
          metadata: {
            options: {
              java_package: "com.anymetrica.metadata"
            },
            nested: {
              ValidationMetadata: {
                fields: {
                  is_valid: {
                    type: "bool",
                    id: 1
                  },
                  validation_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 4
                  },
                  valid_till_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 8
                  },
                  next_validation_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 12
                  },
                  validation_notes: {
                    type: "string",
                    id: 16
                  }
                }
              },
              Metadata: {
                fields: {
                  type: {
                    type: "anymetrica.entity.EntityType",
                    id: 8
                  },
                  is_deleted: {
                    type: "bool",
                    id: 12
                  },
                  label: {
                    type: "string",
                    id: 14
                  },
                  created_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 16
                  },
                  updated_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 18
                  },
                  deleted_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 20
                  },
                  validations: {
                    rule: "repeated",
                    type: "ValidationMetadata",
                    id: 32
                  }
                }
              },
              ShallowEntity: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "Metadata",
                    id: 2
                  }
                }
              }
            }
          },
          entity: {
            options: {
              java_package: "com.anymetrica.entity"
            },
            nested: {
              EntityType: {
                values: {
                  EntityUnknown: 0,
                  Contact: 23,
                  DemoRequestInfo: 5,
                  Device: 21,
                  File: 6,
                  Group: 3,
                  Human: 29,
                  Location: 27,
                  OTP: 32,
                  Operation: 9,
                  Organization: 11,
                  PostalAddress: 1,
                  Relation: 4,
                  SessionToken: 7,
                  TOTP: 18,
                  UsernamePassword: 28,
                  VadResult: 16,
                  Vehicle: 20,
                  Waveform: 2
                }
              },
              EntityTypePlural: {
                values: {
                  EntitiesUnknown: 0,
                  Contacts: 23,
                  Devices: 21,
                  Files: 6,
                  Groups: 3,
                  Humans: 29,
                  Locations: 27,
                  OTPs: 32,
                  Operations: 9,
                  Organizations: 11,
                  PostalAddresses: 1,
                  SessionTokens: 7,
                  TOTPs: 18,
                  UsernamePasswords: 28,
                  VadResults: 16,
                  Vehicles: 20,
                  Waveforms: 2
                }
              }
            }
          },
          request: {
            options: {
              java_package: "com.anymetrica.request"
            },
            nested: {
              MoreResultsType: {
                values: {
                  MORE_RESULTS_TYPE_UNSPECIFIED: 0,
                  NOT_FINISHED: 1,
                  MORE_RESULTS_AFTER_LIMIT: 2,
                  MORE_RESULTS_AFTER_CURSOR: 4,
                  NO_MORE_RESULTS: 3
                }
              },
              Direction: {
                values: {
                  DIRECTION_UNSPECIFIED: 0,
                  ASCENDING: 1,
                  DESCENDING: 2
                }
              },
              PropertyOrder: {
                fields: {
                  property: {
                    type: "string",
                    id: 1
                  },
                  direction: {
                    type: "Direction",
                    id: 2
                  }
                }
              },
              RequestMetadata: {
                fields: {
                  credential: {
                    type: "anymetrica.credential.Credential",
                    id: 2
                  },
                  order: {
                    rule: "repeated",
                    type: "PropertyOrder",
                    id: 4
                  },
                  offset: {
                    type: "uint32",
                    id: 6
                  },
                  limit: {
                    type: "uint32",
                    id: 8
                  },
                  types: {
                    rule: "repeated",
                    type: "anymetrica.entity.EntityType",
                    id: 14
                  },
                  traverse_depth: {
                    type: "uint32",
                    id: 32
                  },
                  two_way_discovery: {
                    type: "bool",
                    id: 34
                  },
                  relation_types: {
                    rule: "repeated",
                    type: "anymetrica.relation.RelationType",
                    id: 38
                  }
                }
              },
              ResponseMetadata: {
                fields: {
                  credential: {
                    type: "anymetrica.credential.Credential",
                    id: 2
                  },
                  skipped_results: {
                    type: "int32",
                    id: 16
                  },
                  more_results: {
                    type: "MoreResultsType",
                    id: 18
                  },
                  read_time: {
                    type: "google.protobuf.Timestamp",
                    id: 20
                  },
                  used_traverse_depth: {
                    type: "uint32",
                    id: 10
                  }
                }
              },
              ListRequest: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "anymetrica.metadata.ShallowEntity",
                    id: 8
                  },
                  ids: {
                    rule: "repeated",
                    type: "string",
                    id: 12
                  },
                  types: {
                    rule: "repeated",
                    type: "anymetrica.entity.EntityType",
                    id: 14,
                    options: {
                      deprecated: true
                    }
                  }
                }
              },
              EmptyResponse: {
                fields: {}
              },
              TransferOwnership: {
                fields: {
                  entity_id: {
                    type: "string",
                    id: 1
                  },
                  new_owner_id: {
                    type: "string",
                    id: 2
                  }
                }
              },
              TransferOwnerships: {
                fields: {
                  request: {
                    type: "RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "ResponseMetadata",
                    id: 4
                  },
                  transfer_ownerships: {
                    rule: "repeated",
                    type: "TransferOwnership",
                    id: 1
                  }
                }
              },
              ShallowEntities: {
                fields: {
                  request: {
                    type: "RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "anymetrica.metadata.ShallowEntity",
                    id: 8
                  }
                }
              }
            }
          },
          credential: {
            options: {
              java_package: "com.anymetrica.credential"
            },
            nested: {
              UsernamePassword: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  username: {
                    type: "string",
                    id: 8
                  },
                  namespace: {
                    type: "string",
                    id: 9
                  },
                  password: {
                    type: "string",
                    id: 10
                  },
                  is_not_set: {
                    type: "bool",
                    id: 16
                  },
                  is_revoked: {
                    type: "bool",
                    id: 20
                  },
                  expires_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 64
                  }
                }
              },
              UsernamePasswords: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "UsernamePassword",
                    id: 8
                  }
                }
              },
              SessionToken: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  token: {
                    type: "string",
                    id: 10,
                    options: {
                      deprecated: true
                    }
                  },
                  session_token: {
                    type: "string",
                    id: 11
                  },
                  is_not_set: {
                    type: "bool",
                    id: 16
                  },
                  is_revoked: {
                    type: "bool",
                    id: 20
                  },
                  expires_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 64
                  }
                }
              },
              SessionTokens: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "SessionToken",
                    id: 8
                  }
                }
              },
              OTP: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  otp: {
                    type: "string",
                    id: 10
                  },
                  is_not_set: {
                    type: "bool",
                    id: 16
                  },
                  is_revoked: {
                    type: "bool",
                    id: 20
                  },
                  expires_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 64
                  }
                }
              },
              OTPs: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  is_not_set: {
                    type: "bool",
                    id: 16
                  },
                  is_revoked: {
                    type: "bool",
                    id: 20
                  },
                  entities: {
                    rule: "repeated",
                    type: "OTP",
                    id: 8
                  }
                }
              },
              TOTP: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  totp: {
                    type: "string",
                    id: 10
                  },
                  is_revoked: {
                    type: "bool",
                    id: 20
                  },
                  expires_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 64
                  }
                }
              },
              TOTPs: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "TOTP",
                    id: 8
                  }
                }
              },
              Credential: {
                oneofs: {
                  credential: {
                    oneof: [
                      "otp",
                      "totp",
                      "session_token",
                      "username_password"
                    ]
                  }
                },
                fields: {
                  otp: {
                    type: "OTP",
                    id: 8
                  },
                  totp: {
                    type: "TOTP",
                    id: 9
                  },
                  session_token: {
                    type: "SessionToken",
                    id: 16
                  },
                  username_password: {
                    type: "UsernamePassword",
                    id: 17
                  }
                }
              }
            }
          },
          contact: {
            options: {
              java_package: "com.anymetrica.contact"
            },
            nested: {
              ContactType: {
                values: {
                  CONTACT_UNSPECIFIED: 0,
                  CONTACT_OTHER: 1,
                  CONTACT_PHONE: 16,
                  CONTACT_EMAIL: 17,
                  CONTACT_FAX: 18,
                  CONTACT_JABBER: 32,
                  CONTACT_DISCORD: 33,
                  CONTACT_SKYPE: 34,
                  CONTACT_MSN: 35,
                  CONTACT_ICQ: 36,
                  CONTACT_FACEBOOK_ID: 128,
                  CONTACT_BADOO_LOGIN: 129,
                  CONTACT_BAIDU_ID: 130,
                  CONTACT_VKONTAKTE_ID: 131
                }
              },
              Contact: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  contact_type: {
                    type: "ContactType",
                    id: 8
                  },
                  data: {
                    type: "string",
                    id: 64
                  },
                  location: {
                    type: "string",
                    id: 11
                  },
                  comment: {
                    type: "string",
                    id: 12
                  },
                  do_not_call: {
                    type: "bool",
                    id: 17
                  }
                }
              },
              Contacts: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "Contact",
                    id: 8
                  }
                }
              }
            }
          },
          organization: {
            options: {
              java_package: "com.anymetrica.organization"
            },
            nested: {
              Organization: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  name: {
                    type: "string",
                    id: 8
                  },
                  domain: {
                    type: "string",
                    id: 16
                  }
                }
              },
              Organizations: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "Organization",
                    id: 8
                  }
                }
              }
            }
          },
          device: {
            options: {
              java_package: "com.anymetrica.device"
            },
            nested: {
              DeviceType: {
                values: {
                  UNSPECIFIED: 0,
                  OTHER: 1,
                  POLYMORPHIC: 2,
                  PHONE: 4,
                  TABLET: 8,
                  DESKTOP: 12,
                  TAG: 16,
                  BADGE: 18,
                  SMART_WATCH: 24,
                  FITNESS_DEVICE: 25,
                  SOUND_RECORDER: 32,
                  VIDEO_RECORDER: 33,
                  ROBOTIC: 64
                }
              },
              Device: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  device_type: {
                    type: "DeviceType",
                    id: 8
                  },
                  for_testing: {
                    type: "bool",
                    id: 9
                  },
                  is_portable: {
                    type: "bool",
                    id: 16
                  },
                  is_wearable: {
                    type: "bool",
                    id: 17
                  },
                  config: {
                    keyType: "string",
                    type: "string",
                    id: 24
                  },
                  supported_audio_codecs: {
                    rule: "repeated",
                    type: "string",
                    id: 32
                  },
                  supported_video_codecs: {
                    rule: "repeated",
                    type: "string",
                    id: 33
                  },
                  support_audio_recording: {
                    type: "bool",
                    id: 40
                  },
                  support_video_recording: {
                    type: "bool",
                    id: 41
                  },
                  mac_addresses: {
                    rule: "repeated",
                    type: "string",
                    id: 64
                  },
                  ipv4_addresses: {
                    rule: "repeated",
                    type: "string",
                    id: 65
                  },
                  ipv6_addresses: {
                    rule: "repeated",
                    type: "string",
                    id: 66
                  },
                  fqdns: {
                    rule: "repeated",
                    type: "string",
                    id: 67
                  },
                  manufacturer: {
                    type: "string",
                    id: 128
                  },
                  model: {
                    type: "string",
                    id: 129
                  },
                  sub_model: {
                    type: "string",
                    id: 130
                  },
                  revision: {
                    type: "string",
                    id: 131
                  },
                  manufacturer_site_uri: {
                    type: "string",
                    id: 140
                  },
                  amazon_uri: {
                    type: "string",
                    id: 141
                  },
                  aliexpress_uri: {
                    type: "string",
                    id: 142
                  },
                  alibaba_uri: {
                    type: "string",
                    id: 143
                  },
                  ebay_uri: {
                    type: "string",
                    id: 144
                  },
                  yandex_market_uri: {
                    type: "string",
                    id: 145
                  },
                  bios_id: {
                    type: "string",
                    id: 160
                  },
                  motherboard_serial_number: {
                    type: "string",
                    id: 161
                  },
                  audio_channels_count: {
                    type: "uint32",
                    id: 200
                  },
                  audio_inputs_count: {
                    type: "uint32",
                    id: 201
                  },
                  video_channels_count: {
                    type: "uint32",
                    id: 220
                  },
                  video_inputs_count: {
                    type: "uint32",
                    id: 221
                  },
                  udid: {
                    type: "string",
                    id: 256
                  },
                  idfv: {
                    type: "string",
                    id: 257
                  },
                  imei: {
                    type: "string",
                    id: 258
                  },
                  aid: {
                    type: "string",
                    id: 287
                  },
                  idfa: {
                    type: "string",
                    id: 288
                  },
                  waid: {
                    type: "string",
                    id: 289
                  },
                  aaid: {
                    type: "string",
                    id: 290
                  }
                }
              },
              Devices: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "Device",
                    id: 8
                  }
                }
              }
            }
          },
          file: {
            options: {
              java_package: "com.anymetrica.file"
            },
            nested: {
              HashType: {
                values: {
                  HASH_TYPE_UNSPECIFIED: 0,
                  HASH_TYPE_PLAIN_TEXT: 8,
                  HASH_TYPE_MD5: 12,
                  HASH_TYPE_SHA_0_160: 16,
                  HASH_TYPE_SHA_1_160: 32,
                  HASH_TYPE_SHA_2_224: 48,
                  HASH_TYPE_SHA_2_256: 49,
                  HASH_TYPE_SHA_2_384: 50,
                  HASH_TYPE_SHA_2_512: 51,
                  HASH_TYPE_SHA_2_512_256: 52,
                  HASH_TYPE_SHA_2_512_224: 53,
                  HASH_TYPE_SIP_HASH_32: 64,
                  HASH_TYPE_SIP_HASH_64: 65,
                  HASH_TYPE_CITY_64: 80,
                  HASH_TYPE_CITY_128: 81,
                  HASH_TYPE_CITY128_CRC: 82,
                  HASH_TYPE_METRO_32: 96,
                  HASH_TYPE_METRO_64: 97,
                  HASH_TYPE_METRO_128: 98,
                  HASH_TYPE_METRO_128_CRC: 99
                }
              },
              Hash: {
                fields: {
                  type: {
                    type: "HashType",
                    id: 8
                  },
                  value: {
                    type: "bytes",
                    id: 16
                  }
                }
              },
              ContentType: {
                values: {
                  CONTENT_TYPE_UNSPECIFIED: 0,
                  application: 100,
                  audio: 200,
                  example: 300,
                  font: 400,
                  image: 500,
                  message: 600,
                  model: 700,
                  multipart: 800,
                  text: 900,
                  video: 1000
                }
              },
              File: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  content: {
                    type: "bytes",
                    id: 8
                  },
                  size_bytes: {
                    type: "int64",
                    id: 16
                  },
                  hashes: {
                    rule: "repeated",
                    type: "Hash",
                    id: 32
                  },
                  name: {
                    type: "string",
                    id: 64
                  },
                  content_type: {
                    type: "ContentType",
                    id: 68
                  },
                  media_type: {
                    type: "string",
                    id: 70
                  },
                  media_start_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 84
                  },
                  media_end_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 86
                  },
                  media_width_px: {
                    type: "int32",
                    id: 128
                  },
                  media_height_px: {
                    type: "int32",
                    id: 132
                  },
                  is_archive: {
                    type: "bool",
                    id: 168
                  }
                }
              },
              Files: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "File",
                    id: 8
                  }
                }
              }
            }
          },
          vad: {
            options: {
              java_package: "com.anymetrica.vad"
            },
            nested: {
              RecognitionConfig: {
                fields: {
                  encoding: {
                    type: "AudioEncoding",
                    id: 1
                  },
                  sample_rate_hertz: {
                    type: "int32",
                    id: 2
                  },
                  language_code: {
                    type: "string",
                    id: 3
                  },
                  max_alternatives: {
                    type: "int32",
                    id: 4
                  },
                  profanity_filter: {
                    type: "bool",
                    id: 5
                  },
                  speech_contexts: {
                    rule: "repeated",
                    type: "SpeechContext",
                    id: 6
                  },
                  enable_word_time_offsets: {
                    type: "bool",
                    id: 8
                  }
                },
                nested: {
                  AudioEncoding: {
                    values: {
                      ENCODING_UNSPECIFIED: 0,
                      LINEAR16: 1,
                      FLAC: 2,
                      MULAW: 3,
                      AMR: 4,
                      AMR_WB: 5,
                      OGG_OPUS: 6,
                      SPEEX_WITH_HEADER_BYTE: 7
                    }
                  }
                }
              },
              SpeechContext: {
                fields: {
                  phrases: {
                    rule: "repeated",
                    type: "string",
                    id: 1
                  }
                }
              },
              RecognitionAudio: {
                oneofs: {
                  audio_source: {
                    oneof: [
                      "content",
                      "uri"
                    ]
                  }
                },
                fields: {
                  content: {
                    type: "bytes",
                    id: 1
                  },
                  uri: {
                    type: "string",
                    id: 2
                  }
                }
              },
              RecognizeResponse: {
                fields: {
                  results: {
                    rule: "repeated",
                    type: "SpeechRecognitionResult",
                    id: 2
                  }
                }
              },
              LongRunningRecognizeResponse: {
                fields: {
                  results: {
                    rule: "repeated",
                    type: "SpeechRecognitionResult",
                    id: 2
                  }
                }
              },
              LongRunningRecognizeMetadata: {
                fields: {
                  progress_percent: {
                    type: "int32",
                    id: 1
                  },
                  start_time: {
                    type: "google.protobuf.Timestamp",
                    id: 2
                  },
                  last_update_time: {
                    type: "google.protobuf.Timestamp",
                    id: 3
                  }
                }
              },
              SpeechRecognitionResult: {
                fields: {
                  alternatives: {
                    rule: "repeated",
                    type: "SpeechRecognitionAlternative",
                    id: 1
                  }
                }
              },
              SpeechRecognitionAlternative: {
                fields: {
                  transcript: {
                    type: "string",
                    id: 1
                  },
                  confidence: {
                    type: "float",
                    id: 2
                  },
                  words: {
                    rule: "repeated",
                    type: "WordInfo",
                    id: 3
                  }
                }
              },
              WordInfo: {
                fields: {
                  start_time: {
                    type: "google.protobuf.Duration",
                    id: 1
                  },
                  end_time: {
                    type: "google.protobuf.Duration",
                    id: 2
                  },
                  word: {
                    type: "string",
                    id: 3
                  }
                }
              },
              RecognizeRequest: {
                fields: {
                  config: {
                    type: "RecognitionConfig",
                    id: 1
                  },
                  audio: {
                    type: "RecognitionAudio",
                    id: 2
                  },
                  file: {
                    type: "RecognitionAudio",
                    id: 3
                  }
                }
              },
              VadEventType: {
                values: {
                  VAD_EVENT_UNSPECIFIED: 0,
                  VAD_EVENT_SILENCE: 2,
                  VAD_EVENT_NOISE: 4,
                  VAD_EVENT_VOICE: 8,
                  VAD_EVENT_VOICE_MULTI: 16
                }
              },
              VadRequest: {
                fields: {
                  config: {
                    type: "RecognitionConfig",
                    id: 1
                  },
                  audio: {
                    type: "RecognitionAudio",
                    id: 2
                  },
                  file: {
                    type: "anymetrica.file.File",
                    id: 4
                  },
                  frame_duration: {
                    type: "google.protobuf.Duration",
                    id: 16
                  },
                  padding_duration: {
                    type: "google.protobuf.Duration",
                    id: 18
                  }
                }
              },
              VadEvent: {
                fields: {
                  event_type: {
                    type: "VadEventType",
                    id: 4
                  },
                  detection_confidence: {
                    type: "float",
                    id: 16
                  },
                  start_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 84
                  },
                  end_ts: {
                    type: "google.protobuf.Timestamp",
                    id: 86
                  }
                }
              },
              VadResult: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  events: {
                    rule: "repeated",
                    type: "VadEvent",
                    id: 4
                  },
                  frame_duration: {
                    type: "google.protobuf.Duration",
                    id: 16
                  },
                  padding_duration: {
                    type: "google.protobuf.Duration",
                    id: 18
                  }
                }
              },
              VadResults: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "VadResult",
                    id: 8
                  },
                  speech_recognition_result: {
                    rule: "repeated",
                    type: "SpeechRecognitionResult",
                    id: 16
                  }
                }
              }
            }
          },
          group: {
            options: {
              java_package: "com.anymetrica.group"
            },
            nested: {
              Group: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  name: {
                    type: "string",
                    id: 8
                  }
                }
              },
              Groups: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "Group",
                    id: 8
                  }
                }
              }
            }
          },
          human: {
            options: {
              java_package: "com.anymetrica.human"
            },
            nested: {
              Human: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  for_testing: {
                    type: "bool",
                    id: 9
                  },
                  full_name: {
                    type: "string",
                    id: 16
                  },
                  title: {
                    type: "string",
                    id: 31
                  },
                  first_name: {
                    type: "string",
                    id: 32
                  },
                  middle_name: {
                    type: "string",
                    id: 33
                  },
                  last_name: {
                    type: "string",
                    id: 34
                  },
                  suffix: {
                    type: "string",
                    id: 35
                  },
                  date_of_birth: {
                    type: "google.type.Date",
                    id: 64
                  }
                }
              },
              Humans: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "Human",
                    id: 8
                  }
                }
              }
            }
          },
          vehicle: {
            options: {
              java_package: "com.anymetrica.vehicle"
            },
            nested: {
              VehicleType: {
                values: {
                  VEHICLE_UNSPECIFIED: 0,
                  VEHICLE_OTHER: 1,
                  VEHICLE_CAR: 8,
                  VEHICLE_TRUCK: 9,
                  VEHICLE_TRAILER: 10,
                  VEHICLE_MOTORCYCLE: 32,
                  VEHICLE_TRACTOR: 64,
                  VEHICLE_WATERCRAFT_UNSPECIFIED: 128,
                  VEHICLE_WATERCRAFT_OTHER: 129,
                  VEHICLE_WATERCRAFT_SHIP: 140,
                  VEHICLE_WATERCRAFT_BOAT: 141,
                  VEHICLE_AIRCRAFT_UNSPECIFIED: 192,
                  VEHICLE_AIRCRAFT_OTHER: 193,
                  VEHICLE_AIRCRAFT_PLANE: 224
                }
              },
              Vehicle: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  vehicle_type: {
                    type: "VehicleType",
                    id: 8
                  },
                  for_testing: {
                    type: "bool",
                    id: 9
                  }
                }
              },
              Vehicles: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "Vehicle",
                    id: 8
                  }
                }
              }
            }
          },
          location: {
            options: {
              java_package: "com.anymetrica.location"
            },
            nested: {
              Location: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  geo_point_coordinates: {
                    type: "google.type.LatLng",
                    id: 8
                  },
                  geo_rect_width_meters: {
                    type: "double",
                    id: 16
                  },
                  geo_rect_height_meters: {
                    type: "double",
                    id: 17
                  },
                  geo_circle_radius_meters: {
                    type: "double",
                    id: 18
                  },
                  geo_poly_coordinates: {
                    rule: "repeated",
                    type: "google.type.LatLng",
                    id: 20
                  }
                }
              },
              Locations: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "Location",
                    id: 8
                  }
                }
              }
            }
          },
          postal_address: {
            options: {
              java_package: "com.anymetrica.postal_address"
            },
            nested: {
              PostalAddress: {
                fields: {
                  id: {
                    type: "string",
                    id: 101
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 102
                  },
                  revision: {
                    type: "int32",
                    id: 132
                  },
                  region_code: {
                    type: "string",
                    id: 2
                  },
                  language_code: {
                    type: "string",
                    id: 3
                  },
                  postal_code: {
                    type: "string",
                    id: 4
                  },
                  minor_postal_code: {
                    type: "string",
                    id: 12
                  },
                  sorting_code: {
                    type: "string",
                    id: 5
                  },
                  administrative_area: {
                    type: "string",
                    id: 6
                  },
                  locality: {
                    type: "string",
                    id: 7
                  },
                  sublocality: {
                    type: "string",
                    id: 8
                  },
                  address_lines: {
                    rule: "repeated",
                    type: "string",
                    id: 9
                  }
                }
              },
              PostalAddresses: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "PostalAddress",
                    id: 8
                  }
                }
              }
            }
          },
          operation: {
            options: {
              java_package: "com.anymetrica.operation"
            },
            nested: {
              Operation: {
                oneofs: {
                  result: {
                    oneof: [
                      "error",
                      "response"
                    ]
                  }
                },
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  done: {
                    type: "bool",
                    id: 3
                  },
                  error: {
                    type: "google.rpc.Status",
                    id: 4
                  },
                  response: {
                    type: "google.protobuf.Any",
                    id: 5
                  }
                }
              },
              Operations: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "Operation",
                    id: 8
                  }
                }
              }
            }
          },
          waveform: {
            options: {
              java_package: "com.anymetrica.waveform"
            },
            nested: {
              Waveform: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  version: {
                    type: "int32",
                    id: 16
                  },
                  flags: {
                    type: "uint32",
                    id: 17
                  },
                  sample_rate: {
                    type: "int32",
                    id: 18
                  },
                  samples_per_pixel: {
                    type: "int32",
                    id: 19
                  },
                  length: {
                    type: "uint32",
                    id: 20
                  },
                  channels: {
                    type: "uint32",
                    id: 21
                  },
                  data: {
                    type: "bytes",
                    id: 32
                  }
                }
              },
              Waveforms: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  response: {
                    type: "anymetrica.request.ResponseMetadata",
                    id: 4
                  },
                  entities: {
                    rule: "repeated",
                    type: "Waveform",
                    id: 8
                  }
                }
              }
            }
          },
          demo_request: {
            options: {
              java_package: "com.anymetrica.demo_request"
            },
            nested: {
              DemoRequestInfo: {
                fields: {
                  id: {
                    type: "string",
                    id: 1
                  },
                  metadata: {
                    type: "anymetrica.metadata.Metadata",
                    id: 2
                  },
                  company: {
                    type: "string",
                    id: 8
                  },
                  email: {
                    type: "string",
                    id: 16
                  },
                  phone: {
                    type: "string",
                    id: 18
                  },
                  whoami: {
                    type: "string",
                    id: 32
                  }
                }
              },
              DemoRequest: {
                fields: {
                  request: {
                    type: "anymetrica.request.RequestMetadata",
                    id: 2
                  },
                  request_info: {
                    type: "DemoRequestInfo",
                    id: 8
                  }
                }
              }
            }
          }
        }
      },
      google: {
        nested: {
          protobuf: {
            nested: {
              Timestamp: {
                fields: {
                  seconds: {
                    type: "int64",
                    id: 1
                  },
                  nanos: {
                    type: "int32",
                    id: 2
                  }
                }
              },
              Duration: {
                fields: {
                  seconds: {
                    type: "int64",
                    id: 1
                  },
                  nanos: {
                    type: "int32",
                    id: 2
                  }
                }
              },
              Any: {
                fields: {
                  type_url: {
                    type: "string",
                    id: 1
                  },
                  value: {
                    type: "bytes",
                    id: 2
                  }
                }
              }
            }
          },
          rpc: {
            options: {
              go_package: "google.golang.org/genproto/googleapis/rpc/status;status",
              java_multiple_files: true,
              java_outer_classname: "StatusProto",
              java_package: "com.google.rpc",
              objc_class_prefix: "RPC"
            },
            nested: {
              Status: {
                fields: {
                  code: {
                    type: "int32",
                    id: 1
                  },
                  message: {
                    type: "string",
                    id: 2
                  },
                  details: {
                    rule: "repeated",
                    type: "google.protobuf.Any",
                    id: 3
                  }
                }
              }
            }
          },
          type: {
            options: {
              cc_enable_arenas: true,
              go_package: "google.golang.org/genproto/googleapis/type/postaladdress;postaladdress",
              java_multiple_files: true,
              java_outer_classname: "PostalAddressProto",
              java_package: "com.google.type",
              objc_class_prefix: "GTP"
            },
            nested: {
              Date: {
                fields: {
                  year: {
                    type: "int32",
                    id: 1
                  },
                  month: {
                    type: "int32",
                    id: 2
                  },
                  day: {
                    type: "int32",
                    id: 3
                  }
                }
              },
              LatLng: {
                fields: {
                  latitude: {
                    type: "double",
                    id: 1
                  },
                  longitude: {
                    type: "double",
                    id: 2
                  }
                }
              },
              PostalAddress: {
                fields: {
                  revision: {
                    type: "int32",
                    id: 1
                  },
                  region_code: {
                    type: "string",
                    id: 2
                  },
                  language_code: {
                    type: "string",
                    id: 3
                  },
                  postal_code: {
                    type: "string",
                    id: 4
                  },
                  sorting_code: {
                    type: "string",
                    id: 5
                  },
                  administrative_area: {
                    type: "string",
                    id: 6
                  },
                  locality: {
                    type: "string",
                    id: 7
                  },
                  sublocality: {
                    type: "string",
                    id: 8
                  },
                  address_lines: {
                    rule: "repeated",
                    type: "string",
                    id: 9
                  },
                  recipients: {
                    rule: "repeated",
                    type: "string",
                    id: 10
                  },
                  organization: {
                    type: "string",
                    id: 11
                  }
                }
              }
            }
          }
        }
      }
    });

    return $root;
});
