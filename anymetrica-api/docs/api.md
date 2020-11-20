# anymetrica-api v0.16.17

Protocol Buffers API Documentation

<a name="top"></a>

## Build info

<a name="package-info"></a>

|          |          |
| -------- | -------- |
| __Name__ | anymetrica-api |
| __Version__ | 0.16.17 |
| __Description__ | AnyMetrica API package - gRPC API Protocol Buffers schemas and documentation |
| __License__ | UNLICENSED |
| __Repository__ | (<a href="https://bitbucket.org/anymetrics/anymetrica-api/">https://bitbucket.org/anymetrics/anymetrica-api/</a> |


<code><pre>
├- anymetrica
| ├- <a href="#index-anymetrica/contact.proto">contact.proto</a>
| ├- <a href="#index-anymetrica/credential.proto">credential.proto</a>
| ├- <a href="#index-anymetrica/demo_request.proto">demo_request.proto</a>
| ├- <a href="#index-anymetrica/device.proto">device.proto</a>
| ├- <a href="#index-anymetrica/entity.proto">entity.proto</a>
| ├- <a href="#index-anymetrica/file.proto">file.proto</a>
| ├- <a href="#index-anymetrica/group.proto">group.proto</a>
| ├- <a href="#index-anymetrica/heartbeat.proto">heartbeat.proto</a>
| ├- <a href="#index-anymetrica/human.proto">human.proto</a>
| ├- <a href="#index-anymetrica/location.proto">location.proto</a>
| ├- <a href="#index-anymetrica/metadata.proto">metadata.proto</a>
| ├- <a href="#index-anymetrica/operation.proto">operation.proto</a>
| ├- <a href="#index-anymetrica/organization.proto">organization.proto</a>
| ├- <a href="#index-anymetrica/postal_address.proto">postal_address.proto</a>
| ├- <a href="#index-anymetrica/registry.proto">registry.proto</a>
| ├- <a href="#index-anymetrica/relation.proto">relation.proto</a>
| ├- <a href="#index-anymetrica/request.proto">request.proto</a>
| ├- <a href="#index-anymetrica/vad.proto">vad.proto</a>
| ├- <a href="#index-anymetrica/vehicle.proto">vehicle.proto</a>
| ├- <a href="#index-anymetrica/waveform.proto">waveform.proto</a>
| └ google
|   ├- rpc
|   | └ <a href="#index-anymetrica/google/rpc/status.proto">status.proto</a>
|   └ type
|     ├- <a href="#index-anymetrica/google/type/date.proto">date.proto</a>
|     ├- <a href="#index-anymetrica/google/type/latlng.proto">latlng.proto</a>
|     └ <a href="#index-anymetrica/google/type/postal_address.proto">postal_address.proto</a>
└ google
  └ protobuf
    ├- <a href="#index-google/protobuf/any.proto">any.proto</a>
    ├- <a href="#index-google/protobuf/duration.proto">duration.proto</a>
    └ <a href="#index-google/protobuf/timestamp.proto">timestamp.proto</a></pre></code>

## Table of Contents

- [__anymetrica/contact.proto__](#anymetrica/contact.proto) <a name="index-anymetrica/contact.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.contact.Contact_](#.anymetrica.contact.Contact)
    - [_.anymetrica.contact.Contacts_](#.anymetrica.contact.Contacts)
  - [Enums](#-Enums)
    - [_.anymetrica.contact.ContactType_](#.anymetrica.contact.ContactType)
- [__anymetrica/credential.proto__](#anymetrica/credential.proto) <a name="index-anymetrica/credential.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.credential.Credential_](#.anymetrica.credential.Credential)
    - [_.anymetrica.credential.OTP_](#.anymetrica.credential.OTP)
    - [_.anymetrica.credential.OTPs_](#.anymetrica.credential.OTPs)
    - [_.anymetrica.credential.SessionToken_](#.anymetrica.credential.SessionToken)
    - [_.anymetrica.credential.SessionTokens_](#.anymetrica.credential.SessionTokens)
    - [_.anymetrica.credential.TOTP_](#.anymetrica.credential.TOTP)
    - [_.anymetrica.credential.TOTPs_](#.anymetrica.credential.TOTPs)
    - [_.anymetrica.credential.UsernamePassword_](#.anymetrica.credential.UsernamePassword)
    - [_.anymetrica.credential.UsernamePasswords_](#.anymetrica.credential.UsernamePasswords)
- [__anymetrica/demo_request.proto__](#anymetrica/demo_request.proto) <a name="index-anymetrica/demo_request.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.demo_request.DemoRequest_](#.anymetrica.demo_request.DemoRequest)
    - [_.anymetrica.demo_request.DemoRequestInfo_](#.anymetrica.demo_request.DemoRequestInfo)
- [__anymetrica/device.proto__](#anymetrica/device.proto) <a name="index-anymetrica/device.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.device.Device_](#.anymetrica.device.Device)
    - [_.anymetrica.device.Devices_](#.anymetrica.device.Devices)
  - [Enums](#-Enums)
    - [_.anymetrica.device.DeviceType_](#.anymetrica.device.DeviceType)
- [__anymetrica/entity.proto__](#anymetrica/entity.proto) <a name="index-anymetrica/entity.proto"></a>
  - [Enums](#-Enums)
    - [_.anymetrica.entity.EntityType_](#.anymetrica.entity.EntityType)
    - [_.anymetrica.entity.EntityTypePlural_](#.anymetrica.entity.EntityTypePlural)
- [__anymetrica/file.proto__](#anymetrica/file.proto) <a name="index-anymetrica/file.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.file.File_](#.anymetrica.file.File)
    - [_.anymetrica.file.Files_](#.anymetrica.file.Files)
    - [_.anymetrica.file.Hash_](#.anymetrica.file.Hash)
  - [Enums](#-Enums)
    - [_.anymetrica.file.ContentType_](#.anymetrica.file.ContentType)
    - [_.anymetrica.file.HashType_](#.anymetrica.file.HashType)
- [__anymetrica/google/rpc/status.proto__](#anymetrica/google/rpc/status.proto) <a name="index-anymetrica/google/rpc/status.proto"></a>
  - [Messages](#-Messages)
    - [_.google.rpc.Status_](#.google.rpc.Status)
- [__anymetrica/google/type/date.proto__](#anymetrica/google/type/date.proto) <a name="index-anymetrica/google/type/date.proto"></a>
  - [Messages](#-Messages)
    - [_.google.type.Date_](#.google.type.Date)
- [__anymetrica/google/type/latlng.proto__](#anymetrica/google/type/latlng.proto) <a name="index-anymetrica/google/type/latlng.proto"></a>
  - [Messages](#-Messages)
    - [_.google.type.LatLng_](#.google.type.LatLng)
- [__anymetrica/google/type/postal_address.proto__](#anymetrica/google/type/postal_address.proto) <a name="index-anymetrica/google/type/postal_address.proto"></a>
  - [Messages](#-Messages)
    - [_.google.type.PostalAddress_](#.google.type.PostalAddress)
- [__anymetrica/group.proto__](#anymetrica/group.proto) <a name="index-anymetrica/group.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.group.Group_](#.anymetrica.group.Group)
    - [_.anymetrica.group.Groups_](#.anymetrica.group.Groups)
- [__anymetrica/heartbeat.proto__](#anymetrica/heartbeat.proto) <a name="index-anymetrica/heartbeat.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.heartbeat.Heartbeat_](#.anymetrica.heartbeat.Heartbeat)
- [__anymetrica/human.proto__](#anymetrica/human.proto) <a name="index-anymetrica/human.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.human.Human_](#.anymetrica.human.Human)
    - [_.anymetrica.human.Humans_](#.anymetrica.human.Humans)
- [__anymetrica/location.proto__](#anymetrica/location.proto) <a name="index-anymetrica/location.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.location.Location_](#.anymetrica.location.Location)
    - [_.anymetrica.location.Locations_](#.anymetrica.location.Locations)
- [__anymetrica/metadata.proto__](#anymetrica/metadata.proto) <a name="index-anymetrica/metadata.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.metadata.Metadata_](#.anymetrica.metadata.Metadata)
    - [_.anymetrica.metadata.ShallowEntity_](#.anymetrica.metadata.ShallowEntity)
    - [_.anymetrica.metadata.ValidationMetadata_](#.anymetrica.metadata.ValidationMetadata)
- [__anymetrica/operation.proto__](#anymetrica/operation.proto) <a name="index-anymetrica/operation.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.operation.Operation_](#.anymetrica.operation.Operation)
    - [_.anymetrica.operation.Operations_](#.anymetrica.operation.Operations)
- [__anymetrica/organization.proto__](#anymetrica/organization.proto) <a name="index-anymetrica/organization.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.organization.Organization_](#.anymetrica.organization.Organization)
    - [_.anymetrica.organization.Organizations_](#.anymetrica.organization.Organizations)
- [__anymetrica/postal_address.proto__](#anymetrica/postal_address.proto) <a name="index-anymetrica/postal_address.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.postal_address.PostalAddress_](#.anymetrica.postal_address.PostalAddress)
    - [_.anymetrica.postal_address.PostalAddresses_](#.anymetrica.postal_address.PostalAddresses)
- [__anymetrica/registry.proto__](#anymetrica/registry.proto) <a name="index-anymetrica/registry.proto"></a>
  - [Services](#-Services)
    - [_.anymetrica.registry.RegistryService_](#.anymetrica.registry.RegistryService)
- [__anymetrica/relation.proto__](#anymetrica/relation.proto) <a name="index-anymetrica/relation.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.relation.Relation_](#.anymetrica.relation.Relation)
    - [_.anymetrica.relation.Relations_](#.anymetrica.relation.Relations)
  - [Enums](#-Enums)
    - [_.anymetrica.relation.RelationType_](#.anymetrica.relation.RelationType)
- [__anymetrica/request.proto__](#anymetrica/request.proto) <a name="index-anymetrica/request.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.request.EmptyResponse_](#.anymetrica.request.EmptyResponse)
    - [_.anymetrica.request.ListRequest_](#.anymetrica.request.ListRequest)
    - [_.anymetrica.request.PropertyOrder_](#.anymetrica.request.PropertyOrder)
    - [_.anymetrica.request.RequestMetadata_](#.anymetrica.request.RequestMetadata)
    - [_.anymetrica.request.ResponseMetadata_](#.anymetrica.request.ResponseMetadata)
    - [_.anymetrica.request.ShallowEntities_](#.anymetrica.request.ShallowEntities)
    - [_.anymetrica.request.TransferOwnership_](#.anymetrica.request.TransferOwnership)
    - [_.anymetrica.request.TransferOwnerships_](#.anymetrica.request.TransferOwnerships)
  - [Enums](#-Enums)
    - [_.anymetrica.request.Direction_](#.anymetrica.request.Direction)
    - [_.anymetrica.request.MoreResultsType_](#.anymetrica.request.MoreResultsType)
- [__anymetrica/vad.proto__](#anymetrica/vad.proto) <a name="index-anymetrica/vad.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.vad.LongRunningRecognizeMetadata_](#.anymetrica.vad.LongRunningRecognizeMetadata)
    - [_.anymetrica.vad.LongRunningRecognizeResponse_](#.anymetrica.vad.LongRunningRecognizeResponse)
    - [_.anymetrica.vad.RecognitionAudio_](#.anymetrica.vad.RecognitionAudio)
    - [_.anymetrica.vad.RecognitionConfig_](#.anymetrica.vad.RecognitionConfig)
    - [_.anymetrica.vad.RecognizeRequest_](#.anymetrica.vad.RecognizeRequest)
    - [_.anymetrica.vad.RecognizeResponse_](#.anymetrica.vad.RecognizeResponse)
    - [_.anymetrica.vad.SpeechContext_](#.anymetrica.vad.SpeechContext)
    - [_.anymetrica.vad.SpeechRecognitionAlternative_](#.anymetrica.vad.SpeechRecognitionAlternative)
    - [_.anymetrica.vad.SpeechRecognitionResult_](#.anymetrica.vad.SpeechRecognitionResult)
    - [_.anymetrica.vad.VadEvent_](#.anymetrica.vad.VadEvent)
    - [_.anymetrica.vad.VadRequest_](#.anymetrica.vad.VadRequest)
    - [_.anymetrica.vad.VadResult_](#.anymetrica.vad.VadResult)
    - [_.anymetrica.vad.VadResults_](#.anymetrica.vad.VadResults)
    - [_.anymetrica.vad.WordInfo_](#.anymetrica.vad.WordInfo)
  - [Enums](#-Enums)
    - [_.anymetrica.vad.RecognitionConfig.AudioEncoding_](#.anymetrica.vad.RecognitionConfig.AudioEncoding)
    - [_.anymetrica.vad.VadEventType_](#.anymetrica.vad.VadEventType)
- [__anymetrica/vehicle.proto__](#anymetrica/vehicle.proto) <a name="index-anymetrica/vehicle.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.vehicle.Vehicle_](#.anymetrica.vehicle.Vehicle)
    - [_.anymetrica.vehicle.Vehicles_](#.anymetrica.vehicle.Vehicles)
  - [Enums](#-Enums)
    - [_.anymetrica.vehicle.VehicleType_](#.anymetrica.vehicle.VehicleType)
- [__anymetrica/waveform.proto__](#anymetrica/waveform.proto) <a name="index-anymetrica/waveform.proto"></a>
  - [Messages](#-Messages)
    - [_.anymetrica.waveform.Waveform_](#.anymetrica.waveform.Waveform)
    - [_.anymetrica.waveform.Waveforms_](#.anymetrica.waveform.Waveforms)
- [__google/protobuf/any.proto__](#google/protobuf/any.proto) <a name="index-google/protobuf/any.proto"></a>
- [__google/protobuf/duration.proto__](#google/protobuf/duration.proto) <a name="index-google/protobuf/duration.proto"></a>
- [__google/protobuf/timestamp.proto__](#google/protobuf/timestamp.proto) <a name="index-google/protobuf/timestamp.proto"></a>
- [__Scalar Value Types__](#scalar-value-types)

## anymetrica/contact.proto

<a name="anymetrica/contact.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.contact.Contact](#.anymetrica.contact.Contact)

<a name=".anymetrica.contact.Contact"></a>

 ↑ [anymetrica/contact.proto](#index-anymetrica/contact.proto)

Contact information record

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.contact.Contact.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.contact.Contact.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.contact.Contact.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.contact.Contact.metadata"></a> |
| [ContactType](#ContactType) | [contact_type](#.anymetrica.contact.Contact.contact_type.contact_type) | 8 |  |  <a name=".anymetrica.contact.Contact.contact_type"></a> |
| [string](#string) | [data](#.anymetrica.contact.Contact.data.data) | 64 |  | Contacts data <a name=".anymetrica.contact.Contact.data"></a> |
| [string](#string) | [location](#.anymetrica.contact.Contact.location.location) | 11 |  |  <a name=".anymetrica.contact.Contact.location"></a> |
| [string](#string) | [comment](#.anymetrica.contact.Contact.comment.comment) | 12 |  |  <a name=".anymetrica.contact.Contact.comment"></a> |
| [bool](#bool) | [do_not_call](#.anymetrica.contact.Contact.do_not_call.do_not_call) | 17 |  | Do not use this contact at all <a name=".anymetrica.contact.Contact.do_not_call"></a> |

#### message [.anymetrica.contact.Contacts](#.anymetrica.contact.Contacts)

<a name=".anymetrica.contact.Contacts"></a>

 ↑ [anymetrica/contact.proto](#index-anymetrica/contact.proto)

List of Contact information record

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.contact.Contacts.request.request) | 2 |  | Request metadata <a name=".anymetrica.contact.Contacts.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.contact.Contacts.response.response) | 4 |  | Response metadata <a name=".anymetrica.contact.Contacts.response"></a> |
| repeated [Contact](#Contact) | [entities](#.anymetrica.contact.Contacts.entities.entities) | 8 |  | Resulting entities <a name=".anymetrica.contact.Contacts.entities"></a> |

### Enums

<a name="-Enums"></a>

#### enum [.anymetrica.contact.ContactType](#.anymetrica.contact.ContactType)

<a name=".anymetrica.contact.ContactType"></a>

 ↑ [anymetrica/contact.proto](#index-anymetrica/contact.proto)

Type of Contact information record

##### Values

| value | num | comment |
| ----- | --- | ------- |
| CONTACT_UNSPECIFIED | 0 | [default]  |
| CONTACT_OTHER | 1 |   |
| CONTACT_PHONE | 16 |   |
| CONTACT_EMAIL | 17 |   |
| CONTACT_FAX | 18 |   |
| CONTACT_JABBER | 32 |   |
| CONTACT_DISCORD | 33 |   |
| CONTACT_SKYPE | 34 |   |
| CONTACT_MSN | 35 |   |
| CONTACT_ICQ | 36 |   |
| CONTACT_FACEBOOK_ID | 128 |   |
| CONTACT_BADOO_LOGIN | 129 |   |
| CONTACT_BAIDU_ID | 130 |   |
| CONTACT_VKONTAKTE_ID | 131 |   |

## anymetrica/credential.proto

<a name="anymetrica/credential.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.credential.Credential](#.anymetrica.credential.Credential)

<a name=".anymetrica.credential.Credential"></a>

 ↑ [anymetrica/credential.proto](#index-anymetrica/credential.proto)

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [OTP](#OTP) | [otp](#.anymetrica.credential.Credential.otp.otp) | 8 |  |  <a name=".anymetrica.credential.Credential.otp"></a> |
| [TOTP](#TOTP) | [totp](#.anymetrica.credential.Credential.totp.totp) | 9 |  |  <a name=".anymetrica.credential.Credential.totp"></a> |
| [SessionToken](#SessionToken) | [session_token](#.anymetrica.credential.Credential.session_token.session_token) | 16 |  |  <a name=".anymetrica.credential.Credential.session_token"></a> |
| [UsernamePassword](#UsernamePassword) | [username_password](#.anymetrica.credential.Credential.username_password.username_password) | 17 |  |  <a name=".anymetrica.credential.Credential.username_password"></a> |

###### oneof `Credential`

<a name=".anymetrica.credential.Credential.Credential"></a>


| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [OTP](#OTP) | [otp](#.anymetrica.credential.Credential.otp.otp) | 8 |  |  <a name=".anymetrica.credential.Credential.otp"></a> |
| [TOTP](#TOTP) | [totp](#.anymetrica.credential.Credential.totp.totp) | 9 |  |  <a name=".anymetrica.credential.Credential.totp"></a> |
| [SessionToken](#SessionToken) | [session_token](#.anymetrica.credential.Credential.session_token.session_token) | 16 |  |  <a name=".anymetrica.credential.Credential.session_token"></a> |
| [UsernamePassword](#UsernamePassword) | [username_password](#.anymetrica.credential.Credential.username_password.username_password) | 17 |  |  <a name=".anymetrica.credential.Credential.username_password"></a> |

#### message [.anymetrica.credential.OTP](#.anymetrica.credential.OTP)

<a name=".anymetrica.credential.OTP"></a>

 ↑ [anymetrica/credential.proto](#index-anymetrica/credential.proto)

[One-Time Password (OTP)](https://en.wikipedia.org/wiki/One-time_password) credential<br><br>This credential don't have private part and will go revoked after any kind of `Merge*` or `*Reset` RPC call<br>will be executed successful against any non-zero number of Entities<br>to which this credential have `CAN_WRITE` and/or `CAN_WRITE_RELATIONS` relation defined.<br>For this Credential type `private` field` is ignored and only `public` field is required.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.credential.OTP.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.credential.OTP.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.credential.OTP.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.credential.OTP.metadata"></a> |
| [string](#string) | [otp](#.anymetrica.credential.OTP.otp.otp) | 10 |  | Private part of credentials <a name=".anymetrica.credential.OTP.otp"></a> |
| [bool](#bool) | [is_not_set](#.anymetrica.credential.OTP.is_not_set.is_not_set) | 16 |  | Flag that supposed to enable automatic credential regeneration (like session token) or will not allow credential<br>to be used before they was defined. <a name=".anymetrica.credential.OTP.is_not_set"></a> |
| [bool](#bool) | [is_revoked](#.anymetrica.credential.OTP.is_revoked.is_revoked) | 20 |  | Credential could not be used any more and will not auto regenerate or change other way. User should get message<br>about this different than for deleted record that supposed to be transparent to API user completely. <a name=".anymetrica.credential.OTP.is_revoked"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [expires_ts](#.anymetrica.credential.OTP.expires_ts.expires_ts) | 64 |  | UTC TimeStamp from which credentials are supposed to be auto-revoked.<br>be restricted to avoid conflict when key that no one read before is currently used. <a name=".anymetrica.credential.OTP.expires_ts"></a> |

#### message [.anymetrica.credential.OTPs](#.anymetrica.credential.OTPs)

<a name=".anymetrica.credential.OTPs"></a>

 ↑ [anymetrica/credential.proto](#index-anymetrica/credential.proto)

`OTP` list container

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.credential.OTPs.request.request) | 2 |  | Request metadata <a name=".anymetrica.credential.OTPs.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.credential.OTPs.response.response) | 4 |  | Response metadata <a name=".anymetrica.credential.OTPs.response"></a> |
| [bool](#bool) | [is_not_set](#.anymetrica.credential.OTPs.is_not_set.is_not_set) | 16 |  | Flag that supposed to enable automatic credential regeneration (like session token) or will not allow credential<br>to be used before they was defined. <a name=".anymetrica.credential.OTPs.is_not_set"></a> |
| [bool](#bool) | [is_revoked](#.anymetrica.credential.OTPs.is_revoked.is_revoked) | 20 |  | Credential could not be used any more and will not auto regenerate or change other way. User should get message<br>about this different than for deleted record that supposed to be transparent to API user completely. <a name=".anymetrica.credential.OTPs.is_revoked"></a> |
| repeated [OTP](#OTP) | [entities](#.anymetrica.credential.OTPs.entities.entities) | 8 |  | Result entities <a name=".anymetrica.credential.OTPs.entities"></a> |

#### message [.anymetrica.credential.SessionToken](#.anymetrica.credential.SessionToken)

<a name=".anymetrica.credential.SessionToken"></a>

 ↑ [anymetrica/credential.proto](#index-anymetrica/credential.proto)

Session token credential that supposed to have limited lifetime

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.credential.SessionToken.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.credential.SessionToken.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.credential.SessionToken.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.credential.SessionToken.metadata"></a> |
| [string](#string) | [token](#.anymetrica.credential.SessionToken.token.token) | 10 | `deprecated: true` | Public part of credentials <a name=".anymetrica.credential.SessionToken.token"></a> |
| [string](#string) | [session_token](#.anymetrica.credential.SessionToken.session_token.session_token) | 11 |  |  <a name=".anymetrica.credential.SessionToken.session_token"></a> |
| [bool](#bool) | [is_not_set](#.anymetrica.credential.SessionToken.is_not_set.is_not_set) | 16 |  | Flag that supposed to enable automatic credential regeneration (like session token) or will not allow credential<br>to be used before they was defined. <a name=".anymetrica.credential.SessionToken.is_not_set"></a> |
| [bool](#bool) | [is_revoked](#.anymetrica.credential.SessionToken.is_revoked.is_revoked) | 20 |  | Credential could not be used any more and will not auto regenerate or change other way. User should get message<br>about this different than for deleted record that supposed to be transparent to API user completely. <a name=".anymetrica.credential.SessionToken.is_revoked"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [expires_ts](#.anymetrica.credential.SessionToken.expires_ts.expires_ts) | 64 |  | UTC TimeStamp from which credentials are supposed to be auto-revoked.<br>be restricted to avoid conflict when key that no one read before is currently used. <a name=".anymetrica.credential.SessionToken.expires_ts"></a> |

#### message [.anymetrica.credential.SessionTokens](#.anymetrica.credential.SessionTokens)

<a name=".anymetrica.credential.SessionTokens"></a>

 ↑ [anymetrica/credential.proto](#index-anymetrica/credential.proto)

`SessionToken` list container

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.credential.SessionTokens.request.request) | 2 |  | Request metadata <a name=".anymetrica.credential.SessionTokens.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.credential.SessionTokens.response.response) | 4 |  | Response metadata <a name=".anymetrica.credential.SessionTokens.response"></a> |
| repeated [SessionToken](#SessionToken) | [entities](#.anymetrica.credential.SessionTokens.entities.entities) | 8 |  | Result entities <a name=".anymetrica.credential.SessionTokens.entities"></a> |

#### message [.anymetrica.credential.TOTP](#.anymetrica.credential.TOTP)

<a name=".anymetrica.credential.TOTP"></a>

 ↑ [anymetrica/credential.proto](#index-anymetrica/credential.proto)

[Limited lifetime one time password (TOTP)](https://tools.ietf.org/html/rfc6238)

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.credential.TOTP.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.credential.TOTP.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.credential.TOTP.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.credential.TOTP.metadata"></a> |
| [string](#string) | [totp](#.anymetrica.credential.TOTP.totp.totp) | 10 |  | TOTP Password <a name=".anymetrica.credential.TOTP.totp"></a> |
| [bool](#bool) | [is_revoked](#.anymetrica.credential.TOTP.is_revoked.is_revoked) | 20 |  | Credential could not be used any more and will not auto regenerate or change other way. User should get message<br>about this different than for deleted record that supposed to be transparent to API user completely. <a name=".anymetrica.credential.TOTP.is_revoked"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [expires_ts](#.anymetrica.credential.TOTP.expires_ts.expires_ts) | 64 |  | UTC TimeStamp from which credentials are supposed to be auto-revoked.<br>be restricted to avoid conflict when key that no one read before is currently used. <a name=".anymetrica.credential.TOTP.expires_ts"></a> |

#### message [.anymetrica.credential.TOTPs](#.anymetrica.credential.TOTPs)

<a name=".anymetrica.credential.TOTPs"></a>

 ↑ [anymetrica/credential.proto](#index-anymetrica/credential.proto)

`TOTP` list container

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.credential.TOTPs.request.request) | 2 |  | Request metadata <a name=".anymetrica.credential.TOTPs.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.credential.TOTPs.response.response) | 4 |  | Response metadata <a name=".anymetrica.credential.TOTPs.response"></a> |
| repeated [TOTP](#TOTP) | [entities](#.anymetrica.credential.TOTPs.entities.entities) | 8 |  | Result entities <a name=".anymetrica.credential.TOTPs.entities"></a> |

#### message [.anymetrica.credential.UsernamePassword](#.anymetrica.credential.UsernamePassword)

<a name=".anymetrica.credential.UsernamePassword"></a>

 ↑ [anymetrica/credential.proto](#index-anymetrica/credential.proto)

Username and password credential

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.credential.UsernamePassword.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.credential.UsernamePassword.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.credential.UsernamePassword.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.credential.UsernamePassword.metadata"></a> |
| [string](#string) | [username](#.anymetrica.credential.UsernamePassword.username.username) | 8 |  | Public part of credentials <a name=".anymetrica.credential.UsernamePassword.username"></a> |
| [string](#string) | [namespace](#.anymetrica.credential.UsernamePassword.namespace.namespace) | 9 |  | Namespace part of username to define e.g. organisation accounts scope<br>TODO: currently just ignored by business logic <a name=".anymetrica.credential.UsernamePassword.namespace"></a> |
| [string](#string) | [password](#.anymetrica.credential.UsernamePassword.password.password) | 10 |  | Private part of credentials <a name=".anymetrica.credential.UsernamePassword.password"></a> |
| [bool](#bool) | [is_not_set](#.anymetrica.credential.UsernamePassword.is_not_set.is_not_set) | 16 |  | Flag that supposed to enable automatic credential regeneration (like session token) or will not allow credential<br>to be used before they was defined. <a name=".anymetrica.credential.UsernamePassword.is_not_set"></a> |
| [bool](#bool) | [is_revoked](#.anymetrica.credential.UsernamePassword.is_revoked.is_revoked) | 20 |  | Credential could not be used any more and will not auto regenerate or change other way. User should get message<br>about this different than for deleted record that supposed to be transparent to API user completely. <a name=".anymetrica.credential.UsernamePassword.is_revoked"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [expires_ts](#.anymetrica.credential.UsernamePassword.expires_ts.expires_ts) | 64 |  | UTC TimeStamp from which credentials are supposed to be auto-revoked.<br>be restricted to avoid conflict when key that no one read before is currently used. <a name=".anymetrica.credential.UsernamePassword.expires_ts"></a> |

#### message [.anymetrica.credential.UsernamePasswords](#.anymetrica.credential.UsernamePasswords)

<a name=".anymetrica.credential.UsernamePasswords"></a>

 ↑ [anymetrica/credential.proto](#index-anymetrica/credential.proto)

`UsernamePassword` list container

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.credential.UsernamePasswords.request.request) | 2 |  | Request metadata <a name=".anymetrica.credential.UsernamePasswords.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.credential.UsernamePasswords.response.response) | 4 |  | Response metadata <a name=".anymetrica.credential.UsernamePasswords.response"></a> |
| repeated [UsernamePassword](#UsernamePassword) | [entities](#.anymetrica.credential.UsernamePasswords.entities.entities) | 8 |  | Result entities <a name=".anymetrica.credential.UsernamePasswords.entities"></a> |

## anymetrica/demo_request.proto

<a name="anymetrica/demo_request.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.demo_request.DemoRequest](#.anymetrica.demo_request.DemoRequest)

<a name=".anymetrica.demo_request.DemoRequest"></a>

 ↑ [anymetrica/demo_request.proto](#index-anymetrica/demo_request.proto)

Device entity List

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.demo_request.DemoRequest.request.request) | 2 |  | Request metadata <a name=".anymetrica.demo_request.DemoRequest.request"></a> |
| [DemoRequestInfo](#DemoRequestInfo) | [request_info](#.anymetrica.demo_request.DemoRequest.request_info.request_info) | 8 |  | Result entities <a name=".anymetrica.demo_request.DemoRequest.request_info"></a> |

#### message [.anymetrica.demo_request.DemoRequestInfo](#.anymetrica.demo_request.DemoRequestInfo)

<a name=".anymetrica.demo_request.DemoRequestInfo"></a>

 ↑ [anymetrica/demo_request.proto](#index-anymetrica/demo_request.proto)

Demo request information

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.demo_request.DemoRequestInfo.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.demo_request.DemoRequestInfo.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.demo_request.DemoRequestInfo.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.demo_request.DemoRequestInfo.metadata"></a> |
| [string](#string) | [company](#.anymetrica.demo_request.DemoRequestInfo.company.company) | 8 |  | Company name <a name=".anymetrica.demo_request.DemoRequestInfo.company"></a> |
| [string](#string) | [email](#.anymetrica.demo_request.DemoRequestInfo.email.email) | 16 |  | Contact email <a name=".anymetrica.demo_request.DemoRequestInfo.email"></a> |
| [string](#string) | [phone](#.anymetrica.demo_request.DemoRequestInfo.phone.phone) | 18 |  | Contact phone <a name=".anymetrica.demo_request.DemoRequestInfo.phone"></a> |
| [string](#string) | [whoami](#.anymetrica.demo_request.DemoRequestInfo.whoami.whoami) | 32 |  | Open form customer description <a name=".anymetrica.demo_request.DemoRequestInfo.whoami"></a> |

## anymetrica/device.proto

<a name="anymetrica/device.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.device.Device](#.anymetrica.device.Device)

<a name=".anymetrica.device.Device"></a>

 ↑ [anymetrica/device.proto](#index-anymetrica/device.proto)

Device

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.device.Device.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.device.Device.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.device.Device.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.device.Device.metadata"></a> |
| [DeviceType](#DeviceType) | [device_type](#.anymetrica.device.Device.device_type.device_type) | 8 |  | Device type <a name=".anymetrica.device.Device.device_type"></a> |
| [bool](#bool) | [for_testing](#.anymetrica.device.Device.for_testing.for_testing) | 9 |  | Is used for test purposes <a name=".anymetrica.device.Device.for_testing"></a> |
| [bool](#bool) | [is_portable](#.anymetrica.device.Device.is_portable.is_portable) | 16 |  | Is portable <a name=".anymetrica.device.Device.is_portable"></a> |
| [bool](#bool) | [is_wearable](#.anymetrica.device.Device.is_wearable.is_wearable) | 17 |  | Possible to wear <a name=".anymetrica.device.Device.is_wearable"></a> |
| map<[string](#string), [string](#string)> | [config](#.anymetrica.device.Device.config.config) | 24 |  | Device configuration arbitrary fields with open text values <a name=".anymetrica.device.Device.config"></a> |
| repeated [string](#string) | [supported_audio_codecs](#.anymetrica.device.Device.supported_audio_codecs.supported_audio_codecs) | 32 |  | List of supported audio codecs<br>TODO: Convert to relations <a name=".anymetrica.device.Device.supported_audio_codecs"></a> |
| repeated [string](#string) | [supported_video_codecs](#.anymetrica.device.Device.supported_video_codecs.supported_video_codecs) | 33 |  | List of supported video codecs and digital container formats supported<br><br>- [Reference video codecs names list](https://en.wikipedia.org/wiki/Video_file_format)<br>- [Reference video container formats list](https://en.wikipedia.org/wiki/Comparison_of_video_container_formats)<br>TODO: Convert to relations <a name=".anymetrica.device.Device.supported_video_codecs"></a> |
| [bool](#bool) | [support_audio_recording](#.anymetrica.device.Device.support_audio_recording.support_audio_recording) | 40 |  | Device is supporting audio recording <a name=".anymetrica.device.Device.support_audio_recording"></a> |
| [bool](#bool) | [support_video_recording](#.anymetrica.device.Device.support_video_recording.support_video_recording) | 41 |  | Device is supporting video recording <a name=".anymetrica.device.Device.support_video_recording"></a> |
| repeated [string](#string) | [mac_addresses](#.anymetrica.device.Device.mac_addresses.mac_addresses) | 64 |  | MAC Address of NICs<br>TODO: Convert to relations <a name=".anymetrica.device.Device.mac_addresses"></a> |
| repeated [string](#string) | [ipv4_addresses](#.anymetrica.device.Device.ipv4_addresses.ipv4_addresses) | 65 |  | Temporary or leased IPv4 Addresses device is using<br>TODO: Convert to relations <a name=".anymetrica.device.Device.ipv4_addresses"></a> |
| repeated [string](#string) | [ipv6_addresses](#.anymetrica.device.Device.ipv6_addresses.ipv6_addresses) | 66 |  | Temporary or leased IPv6 Addresses device is using<br>TODO: Convert to relations <a name=".anymetrica.device.Device.ipv6_addresses"></a> |
| repeated [string](#string) | [fqdns](#.anymetrica.device.Device.fqdns.fqdns) | 67 |  | Temporary or leased FQDN related to the device<br>TODO: Convert to relations <a name=".anymetrica.device.Device.fqdns"></a> |
| [string](#string) | [manufacturer](#.anymetrica.device.Device.manufacturer.manufacturer) | 128 |  |  <a name=".anymetrica.device.Device.manufacturer"></a> |
| [string](#string) | [model](#.anymetrica.device.Device.model.model) | 129 |  |  <a name=".anymetrica.device.Device.model"></a> |
| [string](#string) | [sub_model](#.anymetrica.device.Device.sub_model.sub_model) | 130 |  |  <a name=".anymetrica.device.Device.sub_model"></a> |
| [string](#string) | [revision](#.anymetrica.device.Device.revision.revision) | 131 |  |  <a name=".anymetrica.device.Device.revision"></a> |
| [string](#string) | [manufacturer_site_uri](#.anymetrica.device.Device.manufacturer_site_uri.manufacturer_site_uri) | 140 |  |  <a name=".anymetrica.device.Device.manufacturer_site_uri"></a> |
| [string](#string) | [amazon_uri](#.anymetrica.device.Device.amazon_uri.amazon_uri) | 141 |  |  <a name=".anymetrica.device.Device.amazon_uri"></a> |
| [string](#string) | [aliexpress_uri](#.anymetrica.device.Device.aliexpress_uri.aliexpress_uri) | 142 |  |  <a name=".anymetrica.device.Device.aliexpress_uri"></a> |
| [string](#string) | [alibaba_uri](#.anymetrica.device.Device.alibaba_uri.alibaba_uri) | 143 |  |  <a name=".anymetrica.device.Device.alibaba_uri"></a> |
| [string](#string) | [ebay_uri](#.anymetrica.device.Device.ebay_uri.ebay_uri) | 144 |  |  <a name=".anymetrica.device.Device.ebay_uri"></a> |
| [string](#string) | [yandex_market_uri](#.anymetrica.device.Device.yandex_market_uri.yandex_market_uri) | 145 |  |  <a name=".anymetrica.device.Device.yandex_market_uri"></a> |
| [string](#string) | [bios_id](#.anymetrica.device.Device.bios_id.bios_id) | 160 |  |  <a name=".anymetrica.device.Device.bios_id"></a> |
| [string](#string) | [motherboard_serial_number](#.anymetrica.device.Device.motherboard_serial_number.motherboard_serial_number) | 161 |  |  <a name=".anymetrica.device.Device.motherboard_serial_number"></a> |
| [uint32](#uint32) | [audio_channels_count](#.anymetrica.device.Device.audio_channels_count.audio_channels_count) | 200 |  |  <a name=".anymetrica.device.Device.audio_channels_count"></a> |
| [uint32](#uint32) | [audio_inputs_count](#.anymetrica.device.Device.audio_inputs_count.audio_inputs_count) | 201 |  |  <a name=".anymetrica.device.Device.audio_inputs_count"></a> |
| [uint32](#uint32) | [video_channels_count](#.anymetrica.device.Device.video_channels_count.video_channels_count) | 220 |  |  <a name=".anymetrica.device.Device.video_channels_count"></a> |
| [uint32](#uint32) | [video_inputs_count](#.anymetrica.device.Device.video_inputs_count.video_inputs_count) | 221 |  |  <a name=".anymetrica.device.Device.video_inputs_count"></a> |
| [string](#string) | [udid](#.anymetrica.device.Device.udid.udid) | 256 |  | Universal Device ID <a name=".anymetrica.device.Device.udid"></a> |
| [string](#string) | [idfv](#.anymetrica.device.Device.idfv.idfv) | 257 |  | Universal Device ID <a name=".anymetrica.device.Device.idfv"></a> |
| [string](#string) | [imei](#.anymetrica.device.Device.imei.imei) | 258 |  | Identifier For Vendor <a name=".anymetrica.device.Device.imei"></a> |
| [string](#string) | [aid](#.anymetrica.device.Device.aid.aid) | 287 |  | Identifier For Advertising <a name=".anymetrica.device.Device.aid"></a> |
| [string](#string) | [idfa](#.anymetrica.device.Device.idfa.idfa) | 288 |  | Identifier For Advertising <a name=".anymetrica.device.Device.idfa"></a> |
| [string](#string) | [waid](#.anymetrica.device.Device.waid.waid) | 289 |  | Identifier For Advertising <a name=".anymetrica.device.Device.waid"></a> |
| [string](#string) | [aaid](#.anymetrica.device.Device.aaid.aaid) | 290 |  | Windows Advertising ID <a name=".anymetrica.device.Device.aaid"></a> |

#### message [.anymetrica.device.Devices](#.anymetrica.device.Devices)

<a name=".anymetrica.device.Devices"></a>

 ↑ [anymetrica/device.proto](#index-anymetrica/device.proto)

Device entity List

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.device.Devices.request.request) | 2 |  | Request metadata <a name=".anymetrica.device.Devices.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.device.Devices.response.response) | 4 |  | Response metadata <a name=".anymetrica.device.Devices.response"></a> |
| repeated [Device](#Device) | [entities](#.anymetrica.device.Devices.entities.entities) | 8 |  | Result entities <a name=".anymetrica.device.Devices.entities"></a> |

### Enums

<a name="-Enums"></a>

#### enum [.anymetrica.device.DeviceType](#.anymetrica.device.DeviceType)

<a name=".anymetrica.device.DeviceType"></a>

 ↑ [anymetrica/device.proto](#index-anymetrica/device.proto)

Generic device types options<br><br>[Mostly taken from](https://github.com/roscopecoltran/krakend-admin/blob/f27bc4ee41d133f35301ef2fabf606cdce51b47b/shared/public/downloads/v2/specs/amazonaws.com/mgh/2017-05-31/swagger.proto)

##### Values

| value | num | comment |
| ----- | --- | ------- |
| UNSPECIFIED | 0 | [default] Type not specified |
| OTHER | 1 |  Non-standard category |
| POLYMORPHIC | 2 |  Polymorphic device (e.g. phone emulator) |
| PHONE | 4 |  Mobile phone |
| TABLET | 8 |  Tablet |
| DESKTOP | 12 |  Desktop/Laptop Computer |
| TAG | 16 |  Electronic tag (incl. passive) |
| BADGE | 18 |  Electronic badge (incl. passive) |
| SMART_WATCH | 24 |  Smart Watch |
| FITNESS_DEVICE | 25 |  Generic fitness Device |
| SOUND_RECORDER | 32 |  Sound recording device |
| VIDEO_RECORDER | 33 |  Video recording device |
| ROBOTIC | 64 |  Robotic device (non-vehicle) |

## anymetrica/entity.proto

<a name="anymetrica/entity.proto"></a>

### Enums

<a name="-Enums"></a>

#### enum [.anymetrica.entity.EntityType](#.anymetrica.entity.EntityType)

<a name=".anymetrica.entity.EntityType"></a>

 ↑ [anymetrica/entity.proto](#index-anymetrica/entity.proto)

@enum EntityType<br><br>Entity type names

##### Values

| value | num | comment |
| ----- | --- | ------- |
| EntityUnknown | 0 | [default]  |
| PostalAddress | 1 |   |
| Waveform | 2 |   |
| Group | 3 |   |
| Relation | 4 |   |
| DemoRequestInfo | 5 |   |
| File | 6 |   |
| SessionToken | 7 |   |
| Operation | 9 |   |
| Organization | 11 |   |
| VadResult | 16 |   |
| TOTP | 18 |   |
| Vehicle | 20 |   |
| Device | 21 |   |
| Contact | 23 |   |
| Location | 27 |   |
| UsernamePassword | 28 |   |
| Human | 29 |   |
| OTP | 32 |   |

#### enum [.anymetrica.entity.EntityTypePlural](#.anymetrica.entity.EntityTypePlural)

<a name=".anymetrica.entity.EntityTypePlural"></a>

 ↑ [anymetrica/entity.proto](#index-anymetrica/entity.proto)

@enum EntityTypePlural<br><br>Entity plural type names

##### Values

| value | num | comment |
| ----- | --- | ------- |
| EntitiesUnknown | 0 | [default]  |
| PostalAddresses | 1 |   |
| Waveforms | 2 |   |
| Groups | 3 |   |
| Files | 6 |   |
| SessionTokens | 7 |   |
| Operations | 9 |   |
| Organizations | 11 |   |
| VadResults | 16 |   |
| TOTPs | 18 |   |
| Vehicles | 20 |   |
| Devices | 21 |   |
| Contacts | 23 |   |
| Locations | 27 |   |
| UsernamePasswords | 28 |   |
| Humans | 29 |   |
| OTPs | 32 |   |

## anymetrica/file.proto

<a name="anymetrica/file.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.file.File](#.anymetrica.file.File)

<a name=".anymetrica.file.File"></a>

 ↑ [anymetrica/file.proto](#index-anymetrica/file.proto)

File record

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.file.File.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.file.File.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.file.File.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.file.File.metadata"></a> |
| [bytes](#bytes) | [content](#.anymetrica.file.File.content.content) | 8 |  | File could self-contain chunks or be composed from chunks entities binary data <a name=".anymetrica.file.File.content"></a> |
| [int64](#int64) | [size_bytes](#.anymetrica.file.File.size_bytes.size_bytes) | 16 |  | Content size in bytes <a name=".anymetrica.file.File.size_bytes"></a> |
| repeated [Hash](#Hash) | [hashes](#.anymetrica.file.File.hashes.hashes) | 32 |  | Known hashes values <a name=".anymetrica.file.File.hashes"></a> |
| [string](#string) | [name](#.anymetrica.file.File.name.name) | 64 |  | File name <a name=".anymetrica.file.File.name"></a> |
| [ContentType](#ContentType) | [content_type](#.anymetrica.file.File.content_type.content_type) | 68 |  | IANA registered Content Type<br>@example: for `audio/ogg` it will be `audio` <a name=".anymetrica.file.File.content_type"></a> |
| [string](#string) | [media_type](#.anymetrica.file.File.media_type.media_type) | 70 |  | IANA registered Media Type string<br>@example: for `audio/ogg` it will be `ogg` <a name=".anymetrica.file.File.media_type"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [media_start_ts](#.anymetrica.file.File.media_start_ts.media_start_ts) | 84 |  | Media start ts <a name=".anymetrica.file.File.media_start_ts"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [media_end_ts](#.anymetrica.file.File.media_end_ts.media_end_ts) | 86 |  | Media end ts <a name=".anymetrica.file.File.media_end_ts"></a> |
| [int32](#int32) | [media_width_px](#.anymetrica.file.File.media_width_px.media_width_px) | 128 |  | `picture` or `video` media width in pixels <a name=".anymetrica.file.File.media_width_px"></a> |
| [int32](#int32) | [media_height_px](#.anymetrica.file.File.media_height_px.media_height_px) | 132 |  | `picture` or `video` media height in pixels <a name=".anymetrica.file.File.media_height_px"></a> |
| [bool](#bool) | [is_archive](#.anymetrica.file.File.is_archive.is_archive) | 168 |  | Is content archived <a name=".anymetrica.file.File.is_archive"></a> |

#### message [.anymetrica.file.Files](#.anymetrica.file.Files)

<a name=".anymetrica.file.Files"></a>

 ↑ [anymetrica/file.proto](#index-anymetrica/file.proto)

List of File entities

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.file.Files.request.request) | 2 |  | Request metadata <a name=".anymetrica.file.Files.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.file.Files.response.response) | 4 |  | Response metadata <a name=".anymetrica.file.Files.response"></a> |
| repeated [File](#File) | [entities](#.anymetrica.file.Files.entities.entities) | 8 |  | Result entities <a name=".anymetrica.file.Files.entities"></a> |

#### message [.anymetrica.file.Hash](#.anymetrica.file.Hash)

<a name=".anymetrica.file.Hash"></a>

 ↑ [anymetrica/file.proto](#index-anymetrica/file.proto)

Container message for hash values.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [HashType](#HashType) | [type](#.anymetrica.file.Hash.type.type) | 8 |  | The type of hash that was performed. <a name=".anymetrica.file.Hash.type"></a> |
| [bytes](#bytes) | [value](#.anymetrica.file.Hash.value.value) | 16 |  | The hash value. <a name=".anymetrica.file.Hash.value"></a> |

### Enums

<a name="-Enums"></a>

#### enum [.anymetrica.file.ContentType](#.anymetrica.file.ContentType)

<a name=".anymetrica.file.ContentType"></a>

 ↑ [anymetrica/file.proto](#index-anymetrica/file.proto)

[IANA Registered Content Types] https://www.iana.org/assignments/media-types/media-types.xhtml<br>Content Type is big directory containing Media Type

##### Values

| value | num | comment |
| ----- | --- | ------- |
| CONTENT_TYPE_UNSPECIFIED | 0 | [default] The Content Type has not been specified |
| application | 100 |   |
| audio | 200 |   |
| example | 300 |   |
| font | 400 |   |
| image | 500 |   |
| message | 600 |   |
| model | 700 |   |
| multipart | 800 |   |
| text | 900 |   |
| video | 1000 |   |

#### enum [.anymetrica.file.HashType](#.anymetrica.file.HashType)

<a name=".anymetrica.file.HashType"></a>

 ↑ [anymetrica/file.proto](#index-anymetrica/file.proto)

If known, the hash function used to compute this digest.

##### Values

| value | num | comment |
| ----- | --- | ------- |
| HASH_TYPE_UNSPECIFIED | 0 | [default] Unknown |
| HASH_TYPE_PLAIN_TEXT | 8 |  Plain Text |
| HASH_TYPE_MD5 | 12 |  MD5 |
| HASH_TYPE_SHA_0_160 | 16 |  SHA-0 |
| HASH_TYPE_SHA_1_160 | 32 |  SHA-1 |
| HASH_TYPE_SHA_2_224 | 48 |  SHA-2 |
| HASH_TYPE_SHA_2_256 | 49 |   |
| HASH_TYPE_SHA_2_384 | 50 |   |
| HASH_TYPE_SHA_2_512 | 51 |   |
| HASH_TYPE_SHA_2_512_256 | 52 |   |
| HASH_TYPE_SHA_2_512_224 | 53 |   |
| HASH_TYPE_SIP_HASH_32 | 64 |  SipHash |
| HASH_TYPE_SIP_HASH_64 | 65 |   |
| HASH_TYPE_CITY_64 | 80 |  City |
| HASH_TYPE_CITY_128 | 81 |   |
| HASH_TYPE_CITY128_CRC | 82 |   |
| HASH_TYPE_METRO_32 | 96 |  Metro |
| HASH_TYPE_METRO_64 | 97 |   |
| HASH_TYPE_METRO_128 | 98 |   |
| HASH_TYPE_METRO_128_CRC | 99 |   |

## anymetrica/google/rpc/status.proto

<a name="anymetrica/google/rpc/status.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.google.rpc.Status](#.google.rpc.Status)

<a name=".google.rpc.Status"></a>

 ↑ [anymetrica/google/rpc/status.proto](#index-anymetrica/google/rpc/status.proto)

The `Status` type defines a logical error model that is suitable for different<br>programming environments, including REST APIs and RPC APIs. It is used by<br>[gRPC](https://github.com/grpc). The error model is designed to be:<br><br>- Simple to use and understand for most users<br>- Flexible enough to meet unexpected needs<br><br># Overview<br><br>The `Status` message contains three pieces of data: error code, error message,<br>and error details. The error code should be an enum value of<br>[google.rpc.Code][google.rpc.Code], but it may accept additional error codes if needed.  The<br>error message should be a developer-facing English message that helps<br>developers *understand* and *resolve* the error. If a localized user-facing<br>error message is needed, put the localized message in the error details or<br>localize it in the client. The optional error details may contain arbitrary<br>information about the error. There is a predefined set of error detail types<br>in the package `google.rpc` that can be used for common error conditions.<br><br># Language mapping<br><br>The `Status` message is the logical representation of the error model, but it<br>is not necessarily the actual wire format. When the `Status` message is<br>exposed in different client libraries and different wire protocols, it can be<br>mapped differently. For example, it will likely be mapped to some exceptions<br>in Java, but more likely mapped to some error codes in C.<br><br># Other uses<br><br>The error model and the `Status` message can be used in a variety of<br>environments, either with or without APIs, to provide a<br>consistent developer experience across different environments.<br><br>Example uses of this error model include:<br><br>- Partial errors. If a service needs to return partial errors to the client,<br>it may embed the `Status` in the normal response to indicate the partial<br>errors.<br><br>- Workflow errors. A typical workflow has multiple steps. Each step may<br>have a `Status` message for error reporting.<br><br>- Batch operations. If a client uses batch request and batch response, the<br>`Status` message should be used directly inside batch response, one for<br>each error sub-response.<br><br>- Asynchronous operations. If an API call embeds asynchronous operation<br>results in its response, the status of those operations should be<br>represented directly using the `Status` message.<br><br>- Logging. If some API errors are stored in logs, the message `Status` could<br>be used directly after any stripping needed for security/privacy reasons.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [int32](#int32) | [code](#.google.rpc.Status.code.code) | 1 |  | The status code, which should be an enum value of [google.rpc.Code][google.rpc.Code]. <a name=".google.rpc.Status.code"></a> |
| [string](#string) | [message](#.google.rpc.Status.message.message) | 2 |  | A developer-facing error message, which should be in English. Any<br>user-facing error message should be localized and sent in the<br>[google.rpc.Status.details][google.rpc.Status.details] field, or localized by the client. <a name=".google.rpc.Status.message"></a> |
| repeated [google.protobuf.Any](#google.protobuf.Any) | [details](#.google.rpc.Status.details.details) | 3 |  | A list of messages that carry the error details.  There is a common set of<br>message types for APIs to use. <a name=".google.rpc.Status.details"></a> |

## anymetrica/google/type/date.proto

<a name="anymetrica/google/type/date.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.google.type.Date](#.google.type.Date)

<a name=".google.type.Date"></a>

 ↑ [anymetrica/google/type/date.proto](#index-anymetrica/google/type/date.proto)

Represents a whole calendar date, e.g. date of birth. The time of day and<br>time zone are either specified elsewhere or are not significant. The date<br>is relative to the Proleptic Gregorian Calendar. The day may be 0 to<br>represent a year and month where the day is not significant, e.g. credit card<br>expiration date. The year may be 0 to represent a month and day independent<br>of year, e.g. anniversary date. Related types are [google.type.TimeOfDay][google.type.TimeOfDay]<br>and `google.protobuf.Timestamp`.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [int32](#int32) | [year](#.google.type.Date.year.year) | 1 |  | Year of date. Must be from 1 to 9999, or 0 if specifying a date without<br>a year. <a name=".google.type.Date.year"></a> |
| [int32](#int32) | [month](#.google.type.Date.month.month) | 2 |  | Month of year. Must be from 1 to 12. <a name=".google.type.Date.month"></a> |
| [int32](#int32) | [day](#.google.type.Date.day.day) | 3 |  | Day of month. Must be from 1 to 31 and valid for the year and month, or 0<br>if specifying a year/month where the day is not significant. <a name=".google.type.Date.day"></a> |

## anymetrica/google/type/latlng.proto

<a name="anymetrica/google/type/latlng.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.google.type.LatLng](#.google.type.LatLng)

<a name=".google.type.LatLng"></a>

 ↑ [anymetrica/google/type/latlng.proto](#index-anymetrica/google/type/latlng.proto)

An object representing a latitude/longitude pair. This is expressed as a pair<br>of doubles representing degrees latitude and degrees longitude. Unless<br>specified otherwise, this must conform to the<br><a href="http://www.unoosa.org/pdf/icg/2012/template/WGS_84.pdf">WGS84<br>standard</a>. Values must be within normalized ranges.<br><br>Example of normalization code in Python:<br><br>def NormalizeLongitude(longitude):<br>"""Wraps decimal degrees longitude to [-180.0, 180.0]."""<br>q, r = divmod(longitude, 360.0)<br>if r > 180.0 or (r == 180.0 and q <= -1.0):<br>return r - 360.0<br>return r<br><br>def NormalizeLatLng(latitude, longitude):<br>"""Wraps decimal degrees latitude and longitude to<br>[-90.0, 90.0] and [-180.0, 180.0], respectively."""<br>r = latitude % 360.0<br>if r <= 90.0:<br>return r, NormalizeLongitude(longitude)<br>elif r >= 270.0:<br>return r - 360, NormalizeLongitude(longitude)<br>else:<br>return 180 - r, NormalizeLongitude(longitude + 180.0)<br><br>assert 180.0 == NormalizeLongitude(180.0)<br>assert -180.0 == NormalizeLongitude(-180.0)<br>assert -179.0 == NormalizeLongitude(181.0)<br>assert (0.0, 0.0) == NormalizeLatLng(360.0, 0.0)<br>assert (0.0, 0.0) == NormalizeLatLng(-360.0, 0.0)<br>assert (85.0, 180.0) == NormalizeLatLng(95.0, 0.0)<br>assert (-85.0, -170.0) == NormalizeLatLng(-95.0, 10.0)<br>assert (90.0, 10.0) == NormalizeLatLng(90.0, 10.0)<br>assert (-90.0, -10.0) == NormalizeLatLng(-90.0, -10.0)<br>assert (0.0, -170.0) == NormalizeLatLng(-180.0, 10.0)<br>assert (0.0, -170.0) == NormalizeLatLng(180.0, 10.0)<br>assert (-90.0, 10.0) == NormalizeLatLng(270.0, 10.0)<br>assert (90.0, 10.0) == NormalizeLatLng(-270.0, 10.0)

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [double](#double) | [latitude](#.google.type.LatLng.latitude.latitude) | 1 |  | The latitude in degrees. It must be in the range [-90.0, +90.0]. <a name=".google.type.LatLng.latitude"></a> |
| [double](#double) | [longitude](#.google.type.LatLng.longitude.longitude) | 2 |  | The longitude in degrees. It must be in the range [-180.0, +180.0]. <a name=".google.type.LatLng.longitude"></a> |

## anymetrica/google/type/postal_address.proto

<a name="anymetrica/google/type/postal_address.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.google.type.PostalAddress](#.google.type.PostalAddress)

<a name=".google.type.PostalAddress"></a>

 ↑ [anymetrica/google/type/postal_address.proto](#index-anymetrica/google/type/postal_address.proto)

Represents a postal address, e.g. for postal delivery or payments addresses.<br>Given a postal address, a postal service can deliver items to a premise, P.O.<br>Box or similar.<br>It is not intended to model geographical locations (roads, towns,<br>mountains).<br><br>In typical usage an address would be created via user input or from importing<br>existing data, depending on the type of process.<br><br>Advice on address input / editing:<br>- Use an i18n-ready address widget such as<br>https://github.com/googlei18n/libaddressinput)<br>- UsersPage should not be presented with UI elements for input or editing of<br>fields outside countries where that field is used.<br><br>For more guidance on how to use this schema, please see:<br>https://support.google.com/business/answer/6397478

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [int32](#int32) | [revision](#.google.type.PostalAddress.revision.revision) | 1 |  | The schema revision of the `PostalAddress`.<br>All new revisions **must** be backward compatible with old revisions. <a name=".google.type.PostalAddress.revision"></a> |
| [string](#string) | [region_code](#.google.type.PostalAddress.region_code.region_code) | 2 |  | Required. CLDR region code of the country/region of the address. This<br>is never inferred and it is up to the user to ensure the value is<br>correct. See http://cldr.unicode.org/ and<br>http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html<br>for details. Example: "CH" for Switzerland. <a name=".google.type.PostalAddress.region_code"></a> |
| [string](#string) | [language_code](#.google.type.PostalAddress.language_code.language_code) | 3 |  | Optional. BCP-47 language code of the contents of this address (if<br>known). This is often the UI language of the input form or is expected<br>to match one of the languages used in the address' country/region, or their<br>transliterated equivalents.<br>This can affect formatting in certain countries, but is not critical<br>to the correctness of the data and will never affect any validation or<br>other non-formatting related operations.<br><br>If this value is not known, it should be omitted (rather than specifying a<br>possibly incorrect default).<br><br>Examples: "zh-Hant", "ja", "ja-Latn", "en". <a name=".google.type.PostalAddress.language_code"></a> |
| [string](#string) | [postal_code](#.google.type.PostalAddress.postal_code.postal_code) | 4 |  | Optional. Postal code of the address. Not all countries use or require<br>postal codes to be present, but where they are used, they may trigger<br>additional validation with other parts of the address (e.g. state/zip<br>validation in the U.S.A.). <a name=".google.type.PostalAddress.postal_code"></a> |
| [string](#string) | [sorting_code](#.google.type.PostalAddress.sorting_code.sorting_code) | 5 |  | Optional. Additional, country-specific, sorting code. This is not used<br>in most regions. Where it is used, the value is either a string like<br>"CEDEX", optionally followed by a number (e.g. "CEDEX 7"), or just a number<br>alone, representing the "sector code" (Jamaica), "delivery area indicator"<br>(Malawi) or "post office indicator" (e.g. Côte d'Ivoire). <a name=".google.type.PostalAddress.sorting_code"></a> |
| [string](#string) | [administrative_area](#.google.type.PostalAddress.administrative_area.administrative_area) | 6 |  | Optional. Highest administrative subdivision which is used for postal<br>addresses of a country or region.<br>For example, this can be a state, a province, an oblast, or a prefecture.<br>Specifically, for Spain this is the province and not the autonomous<br>community (e.g. "Barcelona" and not "Catalonia").<br>Many countries don't use an administrative area in postal addresses. E.g.<br>in Switzerland this should be left unpopulated. <a name=".google.type.PostalAddress.administrative_area"></a> |
| [string](#string) | [locality](#.google.type.PostalAddress.locality.locality) | 7 |  | Optional. Generally refers to the city/town portion of the address.<br>Examples: US city, IT comune, UK post town.<br>In regions of the world where localities are not well defined or do not fit<br>into this structure well, leave locality empty and use address_lines. <a name=".google.type.PostalAddress.locality"></a> |
| [string](#string) | [sublocality](#.google.type.PostalAddress.sublocality.sublocality) | 8 |  | Optional. Sublocality of the address.<br>For example, this can be neighborhoods, boroughs, districts. <a name=".google.type.PostalAddress.sublocality"></a> |
| repeated [string](#string) | [address_lines](#.google.type.PostalAddress.address_lines.address_lines) | 9 |  | Unstructured address lines describing the lower levels of an address.<br><br>Because values in address_lines do not have type information and may<br>sometimes contain multiple values in a single field (e.g.<br>"Austin, TX"), it is important that the line order is clear. The order of<br>address lines should be "envelope order" for the country/region of the<br>address. In places where this can vary (e.g. Japan), address_language is<br>used to make it explicit (e.g. "ja" for large-to-small ordering and<br>"ja-Latn" or "en" for small-to-large). This way, the most specific line of<br>an address can be selected based on the language.<br><br>The minimum permitted structural representation of an address consists<br>of a region_code with all remaining information placed in the<br>address_lines. It would be possible to format such an address very<br>approximately without geocoding, but no semantic reasoning could be<br>made about any of the address components until it was at least<br>partially resolved.<br><br>Creating an address only containing a region_code and address_lines, and<br>then geocoding is the recommended way to handle completely unstructured<br>addresses (as opposed to guessing which parts of the address should be<br>localities or administrative areas). <a name=".google.type.PostalAddress.address_lines"></a> |
| repeated [string](#string) | [recipients](#.google.type.PostalAddress.recipients.recipients) | 10 |  | Optional. The recipient at the address.<br>This field may, under certain circumstances, contain multiline information.<br>For example, it might contain "care of" information. <a name=".google.type.PostalAddress.recipients"></a> |
| [string](#string) | [organization](#.google.type.PostalAddress.organization.organization) | 11 |  | Optional. The name of the organization at the address. <a name=".google.type.PostalAddress.organization"></a> |

## anymetrica/group.proto

<a name="anymetrica/group.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.group.Group](#.anymetrica.group.Group)

<a name=".anymetrica.group.Group"></a>

 ↑ [anymetrica/group.proto](#index-anymetrica/group.proto)

Group

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.group.Group.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.group.Group.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.group.Group.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.group.Group.metadata"></a> |
| [string](#string) | [name](#.anymetrica.group.Group.name.name) | 8 |  | Group name <a name=".anymetrica.group.Group.name"></a> |

#### message [.anymetrica.group.Groups](#.anymetrica.group.Groups)

<a name=".anymetrica.group.Groups"></a>

 ↑ [anymetrica/group.proto](#index-anymetrica/group.proto)

List of Group Entity

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.group.Groups.request.request) | 2 |  | Request metadata <a name=".anymetrica.group.Groups.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.group.Groups.response.response) | 4 |  | Response metadata <a name=".anymetrica.group.Groups.response"></a> |
| repeated [Group](#Group) | [entities](#.anymetrica.group.Groups.entities.entities) | 8 |  | Result entities <a name=".anymetrica.group.Groups.entities"></a> |

## anymetrica/heartbeat.proto

<a name="anymetrica/heartbeat.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.heartbeat.Heartbeat](#.anymetrica.heartbeat.Heartbeat)

<a name=".anymetrica.heartbeat.Heartbeat"></a>

 ↑ [anymetrica/heartbeat.proto](#index-anymetrica/heartbeat.proto)

Heartbeat message

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [uint64](#uint64) | [request_id](#.anymetrica.heartbeat.Heartbeat.request_id.request_id) | 1 |  | Client defined request ID number (uint64) <a name=".anymetrica.heartbeat.Heartbeat.request_id"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [client_ts](#.anymetrica.heartbeat.Heartbeat.client_ts.client_ts) | 4 |  | Client defined request timestamp <a name=".anymetrica.heartbeat.Heartbeat.client_ts"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [server_ts](#.anymetrica.heartbeat.Heartbeat.server_ts.server_ts) | 6 |  | Server defined response timestamp <a name=".anymetrica.heartbeat.Heartbeat.server_ts"></a> |
| [string](#string) | [server_message](#.anymetrica.heartbeat.Heartbeat.server_message.server_message) | 16 |  | Server message (optional) <a name=".anymetrica.heartbeat.Heartbeat.server_message"></a> |

## anymetrica/human.proto

<a name="anymetrica/human.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.human.Human](#.anymetrica.human.Human)

<a name=".anymetrica.human.Human"></a>

 ↑ [anymetrica/human.proto](#index-anymetrica/human.proto)

Human

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.human.Human.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.human.Human.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.human.Human.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.human.Human.metadata"></a> |
| [bool](#bool) | [for_testing](#.anymetrica.human.Human.for_testing.for_testing) | 9 |  | For testing purposes <a name=".anymetrica.human.Human.for_testing"></a> |
| [string](#string) | [full_name](#.anymetrica.human.Human.full_name.full_name) | 16 |  | Full name [deprecated] <a name=".anymetrica.human.Human.full_name"></a> |
| [string](#string) | [title](#.anymetrica.human.Human.title.title) | 31 |  | Title <a name=".anymetrica.human.Human.title"></a> |
| [string](#string) | [first_name](#.anymetrica.human.Human.first_name.first_name) | 32 |  | First name <a name=".anymetrica.human.Human.first_name"></a> |
| [string](#string) | [middle_name](#.anymetrica.human.Human.middle_name.middle_name) | 33 |  | Middle name <a name=".anymetrica.human.Human.middle_name"></a> |
| [string](#string) | [last_name](#.anymetrica.human.Human.last_name.last_name) | 34 |  | Last name <a name=".anymetrica.human.Human.last_name"></a> |
| [string](#string) | [suffix](#.anymetrica.human.Human.suffix.suffix) | 35 |  | Name suffix <a name=".anymetrica.human.Human.suffix"></a> |
| [google.type.Date](#google.type.Date) | [date_of_birth](#.anymetrica.human.Human.date_of_birth.date_of_birth) | 64 |  | Date of birth <a name=".anymetrica.human.Human.date_of_birth"></a> |

#### message [.anymetrica.human.Humans](#.anymetrica.human.Humans)

<a name=".anymetrica.human.Humans"></a>

 ↑ [anymetrica/human.proto](#index-anymetrica/human.proto)

List of Human entities

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.human.Humans.request.request) | 2 |  | Request metadata <a name=".anymetrica.human.Humans.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.human.Humans.response.response) | 4 |  | Response metadata <a name=".anymetrica.human.Humans.response"></a> |
| repeated [Human](#Human) | [entities](#.anymetrica.human.Humans.entities.entities) | 8 |  | Result entities <a name=".anymetrica.human.Humans.entities"></a> |

## anymetrica/location.proto

<a name="anymetrica/location.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.location.Location](#.anymetrica.location.Location)

<a name=".anymetrica.location.Location"></a>

 ↑ [anymetrica/location.proto](#index-anymetrica/location.proto)

Location information record

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.location.Location.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.location.Location.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.location.Location.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.location.Location.metadata"></a> |
| [google.type.LatLng](#google.type.LatLng) | [geo_point_coordinates](#.anymetrica.location.Location.geo_point_coordinates.geo_point_coordinates) | 8 |  | Single coordinates records <a name=".anymetrica.location.Location.geo_point_coordinates"></a> |
| [double](#double) | [geo_rect_width_meters](#.anymetrica.location.Location.geo_rect_width_meters.geo_rect_width_meters) | 16 |  | Width of geo rect in meters<br>If width is defined without height then height supposed to be equal width <a name=".anymetrica.location.Location.geo_rect_width_meters"></a> |
| [double](#double) | [geo_rect_height_meters](#.anymetrica.location.Location.geo_rect_height_meters.geo_rect_height_meters) | 17 |  | Height of geo rect in meters<br>If height is defined without width then width supposed to be equal height <a name=".anymetrica.location.Location.geo_rect_height_meters"></a> |
| [double](#double) | [geo_circle_radius_meters](#.anymetrica.location.Location.geo_circle_radius_meters.geo_circle_radius_meters) | 18 |  | Geo zone circle radius in meters <a name=".anymetrica.location.Location.geo_circle_radius_meters"></a> |
| repeated [google.type.LatLng](#google.type.LatLng) | [geo_poly_coordinates](#.anymetrica.location.Location.geo_poly_coordinates.geo_poly_coordinates) | 20 |  | Geo polygon coordinates list <a name=".anymetrica.location.Location.geo_poly_coordinates"></a> |

#### message [.anymetrica.location.Locations](#.anymetrica.location.Locations)

<a name=".anymetrica.location.Locations"></a>

 ↑ [anymetrica/location.proto](#index-anymetrica/location.proto)

List of Location information record

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.location.Locations.request.request) | 2 |  | Request metadata <a name=".anymetrica.location.Locations.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.location.Locations.response.response) | 4 |  | Response metadata <a name=".anymetrica.location.Locations.response"></a> |
| repeated [Location](#Location) | [entities](#.anymetrica.location.Locations.entities.entities) | 8 |  | Result entities <a name=".anymetrica.location.Locations.entities"></a> |

## anymetrica/metadata.proto

<a name="anymetrica/metadata.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.metadata.Metadata](#.anymetrica.metadata.Metadata)

<a name=".anymetrica.metadata.Metadata"></a>

 ↑ [anymetrica/metadata.proto](#index-anymetrica/metadata.proto)

Entity Metadata

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.entity.EntityType](#anymetrica.entity.EntityType) | [type](#.anymetrica.metadata.Metadata.type.type) | 8 |  | Entity type. Its supporting field because type info is usually defined at<br>container level for both - RPC and DB store levels. <a name=".anymetrica.metadata.Metadata.type"></a> |
| [bool](#bool) | [is_deleted](#.anymetrica.metadata.Metadata.is_deleted.is_deleted) | 12 |  | Surrogate deletion flag <a name=".anymetrica.metadata.Metadata.is_deleted"></a> |
| [string](#string) | [label](#.anymetrica.metadata.Metadata.label.label) | 14 |  | Text label <a name=".anymetrica.metadata.Metadata.label"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [created_ts](#.anymetrica.metadata.Metadata.created_ts.created_ts) | 16 |  | UTC0 Unix creation timestamp<br>Relying on [ISO-8601](https://www.iso.org/iso-8601-date-and-time-format.html) and Google external Timestamp standard. <a name=".anymetrica.metadata.Metadata.created_ts"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [updated_ts](#.anymetrica.metadata.Metadata.updated_ts.updated_ts) | 18 |  | UTC0 Unix last modification timestamp (including creation) <a name=".anymetrica.metadata.Metadata.updated_ts"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [deleted_ts](#.anymetrica.metadata.Metadata.deleted_ts.deleted_ts) | 20 |  | UTC0 Unix surrogate deletion time <a name=".anymetrica.metadata.Metadata.deleted_ts"></a> |
| repeated [ValidationMetadata](#ValidationMetadata) | [validations](#.anymetrica.metadata.Metadata.validations.validations) | 32 |  | Entity or relation validation metadata <a name=".anymetrica.metadata.Metadata.validations"></a> |

#### message [.anymetrica.metadata.ShallowEntity](#.anymetrica.metadata.ShallowEntity)

<a name=".anymetrica.metadata.ShallowEntity"></a>

 ↑ [anymetrica/metadata.proto](#index-anymetrica/metadata.proto)

Entity with metadata only

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.metadata.ShallowEntity.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.metadata.ShallowEntity.id"></a> |
| [Metadata](#Metadata) | [metadata](#.anymetrica.metadata.ShallowEntity.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.metadata.ShallowEntity.metadata"></a> |

#### message [.anymetrica.metadata.ValidationMetadata](#.anymetrica.metadata.ValidationMetadata)

<a name=".anymetrica.metadata.ValidationMetadata"></a>

 ↑ [anymetrica/metadata.proto](#index-anymetrica/metadata.proto)

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [bool](#bool) | [is_valid](#.anymetrica.metadata.ValidationMetadata.is_valid.is_valid) | 1 |  | Validation result <a name=".anymetrica.metadata.ValidationMetadata.is_valid"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [validation_ts](#.anymetrica.metadata.ValidationMetadata.validation_ts.validation_ts) | 4 |  | When entity validity status was defined <a name=".anymetrica.metadata.ValidationMetadata.validation_ts"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [valid_till_ts](#.anymetrica.metadata.ValidationMetadata.valid_till_ts.valid_till_ts) | 8 |  | At which time entity expected to go invalid <a name=".anymetrica.metadata.ValidationMetadata.valid_till_ts"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [next_validation_ts](#.anymetrica.metadata.ValidationMetadata.next_validation_ts.next_validation_ts) | 12 |  | Next scheduled or prescribed validation time <a name=".anymetrica.metadata.ValidationMetadata.next_validation_ts"></a> |
| [string](#string) | [validation_notes](#.anymetrica.metadata.ValidationMetadata.validation_notes.validation_notes) | 16 |  |  <a name=".anymetrica.metadata.ValidationMetadata.validation_notes"></a> |

## anymetrica/operation.proto

<a name="anymetrica/operation.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.operation.Operation](#.anymetrica.operation.Operation)

<a name=".anymetrica.operation.Operation"></a>

 ↑ [anymetrica/operation.proto](#index-anymetrica/operation.proto)

This resource represents a long-running operation that is the result of a<br>network API call.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.operation.Operation.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.operation.Operation.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.operation.Operation.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.operation.Operation.metadata"></a> |
| [bool](#bool) | [done](#.anymetrica.operation.Operation.done.done) | 3 |  | If the value is `false`, it means the operation is still in progress.<br>If true, the operation is completed, and either `error` or `response` is<br>available. <a name=".anymetrica.operation.Operation.done"></a> |
| [google.rpc.Status](#google.rpc.Status) | [error](#.anymetrica.operation.Operation.error.error) | 4 |  | The error result of the operation in case of failure or cancellation. <a name=".anymetrica.operation.Operation.error"></a> |
| [google.protobuf.Any](#google.protobuf.Any) | [response](#.anymetrica.operation.Operation.response.response) | 5 |  | The normal response of the operation in case of success.  If the original<br>method returns no data on success, such as `Delete`, the response is<br>`google.protobuf.Empty`.  If the original method is standard<br>`Get`/`Create`/`Update`, the response should be the resource.  For other<br>methods, the response should have the type `XxxResponse`, where `Xxx`<br>is the original method name.  For example, if the original method name<br>is `TakeSnapshot()`, the inferred response type is<br>`TakeSnapshotResponse`. <a name=".anymetrica.operation.Operation.response"></a> |

###### oneof `Operation`

<a name=".anymetrica.operation.Operation.Operation"></a>


| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [google.rpc.Status](#google.rpc.Status) | [error](#.anymetrica.operation.Operation.error.error) | 4 |  | The error result of the operation in case of failure or cancellation. <a name=".anymetrica.operation.Operation.error"></a> |
| [google.protobuf.Any](#google.protobuf.Any) | [response](#.anymetrica.operation.Operation.response.response) | 5 |  | The normal response of the operation in case of success.  If the original<br>method returns no data on success, such as `Delete`, the response is<br>`google.protobuf.Empty`.  If the original method is standard<br>`Get`/`Create`/`Update`, the response should be the resource.  For other<br>methods, the response should have the type `XxxResponse`, where `Xxx`<br>is the original method name.  For example, if the original method name<br>is `TakeSnapshot()`, the inferred response type is<br>`TakeSnapshotResponse`. <a name=".anymetrica.operation.Operation.response"></a> |

#### message [.anymetrica.operation.Operations](#.anymetrica.operation.Operations)

<a name=".anymetrica.operation.Operations"></a>

 ↑ [anymetrica/operation.proto](#index-anymetrica/operation.proto)

List of `Operation` entities

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.operation.Operations.request.request) | 2 |  | Request metadata <a name=".anymetrica.operation.Operations.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.operation.Operations.response.response) | 4 |  | Response metadata <a name=".anymetrica.operation.Operations.response"></a> |
| repeated [Operation](#Operation) | [entities](#.anymetrica.operation.Operations.entities.entities) | 8 |  | Result entities <a name=".anymetrica.operation.Operations.entities"></a> |

## anymetrica/organization.proto

<a name="anymetrica/organization.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.organization.Organization](#.anymetrica.organization.Organization)

<a name=".anymetrica.organization.Organization"></a>

 ↑ [anymetrica/organization.proto](#index-anymetrica/organization.proto)

Organization record

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.organization.Organization.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.organization.Organization.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.organization.Organization.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.organization.Organization.metadata"></a> |
| [string](#string) | [name](#.anymetrica.organization.Organization.name.name) | 8 |  | Name <a name=".anymetrica.organization.Organization.name"></a> |
| [string](#string) | [domain](#.anymetrica.organization.Organization.domain.domain) | 16 |  | Domain (FQDN-like record <a name=".anymetrica.organization.Organization.domain"></a> |

#### message [.anymetrica.organization.Organizations](#.anymetrica.organization.Organizations)

<a name=".anymetrica.organization.Organizations"></a>

 ↑ [anymetrica/organization.proto](#index-anymetrica/organization.proto)

List of `Organization` entities

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.organization.Organizations.request.request) | 2 |  | Request metadata <a name=".anymetrica.organization.Organizations.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.organization.Organizations.response.response) | 4 |  | Response metadata <a name=".anymetrica.organization.Organizations.response"></a> |
| repeated [Organization](#Organization) | [entities](#.anymetrica.organization.Organizations.entities.entities) | 8 |  | Result entities <a name=".anymetrica.organization.Organizations.entities"></a> |

## anymetrica/postal_address.proto

<a name="anymetrica/postal_address.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.postal_address.PostalAddress](#.anymetrica.postal_address.PostalAddress)

<a name=".anymetrica.postal_address.PostalAddress"></a>

 ↑ [anymetrica/postal_address.proto](#index-anymetrica/postal_address.proto)

Represents a postal address, e.g. for postal delivery or payments addresses.<br>Given a postal address, a postal service can deliver items to a premise, P.O.<br>Box or similar.<br>It is not intended to model geographical locations (roads, towns,<br>mountains).<br><br>In typical usage an address would be created via user input or from importing<br>existing data, depending on the type of process.<br><br>Advice on address input / editing:<br>- Use an i18n-ready address widget such as<br>https://github.com/googlei18n/libaddressinput)<br>- Users should not be presented with UI elements for input or editing of<br>fields outside countries where that field is used.<br><br>For more guidance on how to use this schema, please see:<br>https://support.google.com/business/answer/6397478

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.postal_address.PostalAddress.id.id) | 101 |  | Unique Entity identifier <a name=".anymetrica.postal_address.PostalAddress.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.postal_address.PostalAddress.metadata.metadata) | 102 |  | Entity Metadata <a name=".anymetrica.postal_address.PostalAddress.metadata"></a> |
| [int32](#int32) | [revision](#.anymetrica.postal_address.PostalAddress.revision.revision) | 132 |  | The schema revision of the `PostalAddress`.<br>All new revisions **must** be backward compatible with old revisions.<br>(Current 1132 is home-maintained revision by AnyMetrica) <a name=".anymetrica.postal_address.PostalAddress.revision"></a> |
| [string](#string) | [region_code](#.anymetrica.postal_address.PostalAddress.region_code.region_code) | 2 |  | Required. CLDR region code of the country/region of the address. This<br>is never inferred and it is up to the user to ensure the value is<br>correct. See http://cldr.unicode.org/ and<br>http://www.unicode.org/cldr/charts/30/supplemental/territory_information.html<br>for details. Example: "CH" for Switzerland. <a name=".anymetrica.postal_address.PostalAddress.region_code"></a> |
| [string](#string) | [language_code](#.anymetrica.postal_address.PostalAddress.language_code.language_code) | 3 |  | Optional. BCP-47 language code of the contents of this address (if<br>known). This is often the UI language of the input form or is expected<br>to match one of the languages used in the address' country/region, or their<br>transliterated equivalents.<br>This can affect formatting in certain countries, but is not critical<br>to the correctness of the data and will never affect any validation or<br>other non-formatting related operations.<br><br>If this value is not known, it should be omitted (rather than specifying a<br>possibly incorrect default).<br><br>Examples: "zh-Hant", "ja", "ja-Latn", "en". <a name=".anymetrica.postal_address.PostalAddress.language_code"></a> |
| [string](#string) | [postal_code](#.anymetrica.postal_address.PostalAddress.postal_code.postal_code) | 4 |  | Optional. Postal code of the address. Not all countries use or require<br>postal codes to be present, but where they are used, they may trigger<br>additional validation with other parts of the address (e.g. state/zip<br>validation in the U.S.A.). <a name=".anymetrica.postal_address.PostalAddress.postal_code"></a> |
| [string](#string) | [minor_postal_code](#.anymetrica.postal_address.PostalAddress.minor_postal_code.minor_postal_code) | 12 |  | Optional. Postal code of the address. Not all countries use or require<br>postal codes to be present, but where they are used, they may trigger<br>additional validation with other parts of the address (e.g. state/zip<br>validation in the U.S.A.). <a name=".anymetrica.postal_address.PostalAddress.minor_postal_code"></a> |
| [string](#string) | [sorting_code](#.anymetrica.postal_address.PostalAddress.sorting_code.sorting_code) | 5 |  | Optional. Additional, country-specific, sorting code. This is not used<br>in most regions. Where it is used, the value is either a string like<br>"CEDEX", optionally followed by a number (e.g. "CEDEX 7"), or just a number<br>alone, representing the "sector code" (Jamaica), "delivery area indicator"<br>(Malawi) or "post office indicator" (e.g. Côte d'Ivoire). <a name=".anymetrica.postal_address.PostalAddress.sorting_code"></a> |
| [string](#string) | [administrative_area](#.anymetrica.postal_address.PostalAddress.administrative_area.administrative_area) | 6 |  | Optional. Highest administrative subdivision which is used for postal<br>addresses of a country or region.<br>For example, this can be a state, a province, an oblast, or a prefecture.<br>Specifically, for Spain this is the province and not the autonomous<br>community (e.g. "Barcelona" and not "Catalonia").<br>Many countries don't use an administrative area in postal addresses. E.g.<br>in Switzerland this should be left unpopulated. <a name=".anymetrica.postal_address.PostalAddress.administrative_area"></a> |
| [string](#string) | [locality](#.anymetrica.postal_address.PostalAddress.locality.locality) | 7 |  | Optional. Generally refers to the city/town portion of the address.<br>Examples: US city, IT comune, UK post town.<br>In regions of the world where localities are not well defined or do not fit<br>into this structure well, leave locality empty and use address_lines. <a name=".anymetrica.postal_address.PostalAddress.locality"></a> |
| [string](#string) | [sublocality](#.anymetrica.postal_address.PostalAddress.sublocality.sublocality) | 8 |  | Optional. Sublocality of the address.<br>For example, this can be neighborhoods, boroughs, districts. <a name=".anymetrica.postal_address.PostalAddress.sublocality"></a> |
| repeated [string](#string) | [address_lines](#.anymetrica.postal_address.PostalAddress.address_lines.address_lines) | 9 |  | Unstructured address lines describing the lower levels of an address.<br><br>Because values in address_lines do not have type information and may<br>sometimes contain multiple values in a single field (e.g.<br>"Austin, TX"), it is important that the line order is clear. The order of<br>address lines should be "envelope order" for the country/region of the<br>address. In places where this can vary (e.g. Japan), address_language is<br>used to make it explicit (e.g. "ja" for large-to-small ordering and<br>"ja-Latn" or "en" for small-to-large). This way, the most specific line of<br>an address can be selected based on the language.<br><br>The minimum permitted structural representation of an address consists<br>of a region_code with all remaining information placed in the<br>address_lines. It would be possible to format such an address very<br>approximately without geocoding, but no semantic reasoning could be<br>made about any of the address components until it was at least<br>partially resolved.<br><br>Creating an address only containing a region_code and address_lines, and<br>then geocoding is the recommended way to handle completely unstructured<br>addresses (as opposed to guessing which parts of the address should be<br>localities or administrative areas). <a name=".anymetrica.postal_address.PostalAddress.address_lines"></a> |

#### message [.anymetrica.postal_address.PostalAddresses](#.anymetrica.postal_address.PostalAddresses)

<a name=".anymetrica.postal_address.PostalAddresses"></a>

 ↑ [anymetrica/postal_address.proto](#index-anymetrica/postal_address.proto)

List of PostalAddress information record

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.postal_address.PostalAddresses.request.request) | 2 |  | Request metadata <a name=".anymetrica.postal_address.PostalAddresses.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.postal_address.PostalAddresses.response.response) | 4 |  | Response metadata <a name=".anymetrica.postal_address.PostalAddresses.response"></a> |
| repeated [PostalAddress](#PostalAddress) | [entities](#.anymetrica.postal_address.PostalAddresses.entities.entities) | 8 |  | Result entities <a name=".anymetrica.postal_address.PostalAddresses.entities"></a> |

## anymetrica/registry.proto

<a name="anymetrica/registry.proto"></a>

### Services

<a name="-Services"></a>

#### service [.anymetrica.registry.RegistryService](#.anymetrica.registry.RegistryService)

<a name=".anymetrica.registry.RegistryService"></a>

 ↑ [anymetrica/registry.proto](#index-anymetrica/registry.proto)

Registry service - core business logic of AnyMetrica

##### Methods
  
| type | name | request type | response type | options | comment |
| ---- | ---- | ------------ | ------------- | ------- | ------- |
| rpc  | [Heartbeat](#.anymetrica.registry.RegistryService.Heartbeat) | [anymetrica.heartbeat.Heartbeat](#anymetrica.heartbeat.Heartbeat) | [anymetrica.heartbeat.Heartbeat](#anymetrica.heartbeat.Heartbeat) |  | Make Heartbeat request for health check or determine RPC requests delay<br>Could be executed by non-authenticated party <a name=".anymetrica.registry.RegistryService.Heartbeat"></a> |
| rpc  | [GetMetadata](#.anymetrica.registry.RegistryService.GetMetadata) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.request.ShallowEntities](#anymetrica.request.ShallowEntities) |  | Get Entities metadata <a name=".anymetrica.registry.RegistryService.GetMetadata"></a> |
| rpc  | [Delete](#.anymetrica.registry.RegistryService.Delete) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.request.ShallowEntities](#anymetrica.request.ShallowEntities) |  | Delete entities <a name=".anymetrica.registry.RegistryService.Delete"></a> |
| rpc  | [Discover](#.anymetrica.registry.RegistryService.Discover) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.relation.Relations](#anymetrica.relation.Relations) |  | Discover related entities <a name=".anymetrica.registry.RegistryService.Discover"></a> |
| rpc  | [MergeRelations](#.anymetrica.registry.RegistryService.MergeRelations) | [anymetrica.relation.Relations](#anymetrica.relation.Relations) | [anymetrica.relation.Relations](#anymetrica.relation.Relations) |  | Merge entities relations <a name=".anymetrica.registry.RegistryService.MergeRelations"></a> |
| rpc  | [RemoveRelations](#.anymetrica.registry.RegistryService.RemoveRelations) | [anymetrica.relation.Relations](#anymetrica.relation.Relations) | [anymetrica.relation.Relations](#anymetrica.relation.Relations) |  | Remove entities relations <a name=".anymetrica.registry.RegistryService.RemoveRelations"></a> |
| rpc  | [ReplaceRelations](#.anymetrica.registry.RegistryService.ReplaceRelations) | [anymetrica.relation.Relations](#anymetrica.relation.Relations) | [anymetrica.relation.Relations](#anymetrica.relation.Relations) |  | Set entities relations (replace all existing) <a name=".anymetrica.registry.RegistryService.ReplaceRelations"></a> |
| rpc  | [TransferOwnership](#.anymetrica.registry.RegistryService.TransferOwnership) | [anymetrica.request.TransferOwnerships](#anymetrica.request.TransferOwnerships) | [anymetrica.request.TransferOwnerships](#anymetrica.request.TransferOwnerships) |  | Transfer ownership of entities <a name=".anymetrica.registry.RegistryService.TransferOwnership"></a> |
| rpc  | [MergeOTPs](#.anymetrica.registry.RegistryService.MergeOTPs) | [anymetrica.credential.OTPs](#anymetrica.credential.OTPs) | [anymetrica.credential.OTPs](#anymetrica.credential.OTPs) |  | Create/Update OTP records <a name=".anymetrica.registry.RegistryService.MergeOTPs"></a> |
| rpc  | [GetOTPs](#.anymetrica.registry.RegistryService.GetOTPs) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.credential.OTPs](#anymetrica.credential.OTPs) |  | Get OTP records by their IDs <a name=".anymetrica.registry.RegistryService.GetOTPs"></a> |
| rpc  | [MergeTOTPs](#.anymetrica.registry.RegistryService.MergeTOTPs) | [anymetrica.credential.TOTPs](#anymetrica.credential.TOTPs) | [anymetrica.credential.TOTPs](#anymetrica.credential.TOTPs) |  | Create/Update TOTP records <a name=".anymetrica.registry.RegistryService.MergeTOTPs"></a> |
| rpc  | [GetTOTPs](#.anymetrica.registry.RegistryService.GetTOTPs) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.credential.TOTPs](#anymetrica.credential.TOTPs) |  | Get TOTP records by their IDs <a name=".anymetrica.registry.RegistryService.GetTOTPs"></a> |
| rpc  | [MergeSessionTokens](#.anymetrica.registry.RegistryService.MergeSessionTokens) | [anymetrica.credential.SessionTokens](#anymetrica.credential.SessionTokens) | [anymetrica.credential.SessionTokens](#anymetrica.credential.SessionTokens) |  | Create/Update SessionToken records <a name=".anymetrica.registry.RegistryService.MergeSessionTokens"></a> |
| rpc  | [GetSessionTokens](#.anymetrica.registry.RegistryService.GetSessionTokens) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.credential.SessionTokens](#anymetrica.credential.SessionTokens) |  | Get SessionToken records by their IDs <a name=".anymetrica.registry.RegistryService.GetSessionTokens"></a> |
| rpc  | [MergeUsernamePasswords](#.anymetrica.registry.RegistryService.MergeUsernamePasswords) | [anymetrica.credential.UsernamePasswords](#anymetrica.credential.UsernamePasswords) | [anymetrica.credential.UsernamePasswords](#anymetrica.credential.UsernamePasswords) |  | Create/Update UsernamePassword records <a name=".anymetrica.registry.RegistryService.MergeUsernamePasswords"></a> |
| rpc  | [GetUsernamePasswords](#.anymetrica.registry.RegistryService.GetUsernamePasswords) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.credential.UsernamePasswords](#anymetrica.credential.UsernamePasswords) |  | Get UsernamePassword records by their IDs <a name=".anymetrica.registry.RegistryService.GetUsernamePasswords"></a> |
| rpc  | [MergeOrganizations](#.anymetrica.registry.RegistryService.MergeOrganizations) | [anymetrica.organization.Organizations](#anymetrica.organization.Organizations) | [anymetrica.organization.Organizations](#anymetrica.organization.Organizations) |  | Create/Update Organization records <a name=".anymetrica.registry.RegistryService.MergeOrganizations"></a> |
| rpc  | [GetOrganizations](#.anymetrica.registry.RegistryService.GetOrganizations) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.organization.Organizations](#anymetrica.organization.Organizations) |  | Get Organization records by their IDs <a name=".anymetrica.registry.RegistryService.GetOrganizations"></a> |
| rpc  | [MergeHumans](#.anymetrica.registry.RegistryService.MergeHumans) | [anymetrica.human.Humans](#anymetrica.human.Humans) | [anymetrica.human.Humans](#anymetrica.human.Humans) |  | Create/Update Human records <a name=".anymetrica.registry.RegistryService.MergeHumans"></a> |
| rpc  | [GetHumans](#.anymetrica.registry.RegistryService.GetHumans) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.human.Humans](#anymetrica.human.Humans) |  | Get Human records by their IDs <a name=".anymetrica.registry.RegistryService.GetHumans"></a> |
| rpc  | [MergeDevices](#.anymetrica.registry.RegistryService.MergeDevices) | [anymetrica.device.Devices](#anymetrica.device.Devices) | [anymetrica.device.Devices](#anymetrica.device.Devices) |  | Create/Update Device records <a name=".anymetrica.registry.RegistryService.MergeDevices"></a> |
| rpc  | [GetDevices](#.anymetrica.registry.RegistryService.GetDevices) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.device.Devices](#anymetrica.device.Devices) |  | Get Device records by their IDs <a name=".anymetrica.registry.RegistryService.GetDevices"></a> |
| rpc  | [MergeVehicles](#.anymetrica.registry.RegistryService.MergeVehicles) | [anymetrica.vehicle.Vehicles](#anymetrica.vehicle.Vehicles) | [anymetrica.vehicle.Vehicles](#anymetrica.vehicle.Vehicles) |  | Create/Update Vehicle records <a name=".anymetrica.registry.RegistryService.MergeVehicles"></a> |
| rpc  | [GetVehicles](#.anymetrica.registry.RegistryService.GetVehicles) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.vehicle.Vehicles](#anymetrica.vehicle.Vehicles) |  | Get Vehicle records by their IDs <a name=".anymetrica.registry.RegistryService.GetVehicles"></a> |
| rpc  | [MergeContacts](#.anymetrica.registry.RegistryService.MergeContacts) | [anymetrica.contact.Contacts](#anymetrica.contact.Contacts) | [anymetrica.contact.Contacts](#anymetrica.contact.Contacts) |  | Create/Update Contact records <a name=".anymetrica.registry.RegistryService.MergeContacts"></a> |
| rpc  | [GetContacts](#.anymetrica.registry.RegistryService.GetContacts) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.contact.Contacts](#anymetrica.contact.Contacts) |  | Get Contact records by their IDs <a name=".anymetrica.registry.RegistryService.GetContacts"></a> |
| rpc  | [MergeGroups](#.anymetrica.registry.RegistryService.MergeGroups) | [anymetrica.group.Groups](#anymetrica.group.Groups) | [anymetrica.group.Groups](#anymetrica.group.Groups) |  | Create/Update Group records <a name=".anymetrica.registry.RegistryService.MergeGroups"></a> |
| rpc  | [GetGroups](#.anymetrica.registry.RegistryService.GetGroups) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.group.Groups](#anymetrica.group.Groups) |  | Get Group records by their IDs <a name=".anymetrica.registry.RegistryService.GetGroups"></a> |
| rpc  | [MergeLocations](#.anymetrica.registry.RegistryService.MergeLocations) | [anymetrica.group.Groups](#anymetrica.group.Groups) | [anymetrica.location.Locations](#anymetrica.location.Locations) |  | Create/Update Location records <a name=".anymetrica.registry.RegistryService.MergeLocations"></a> |
| rpc  | [GetLocations](#.anymetrica.registry.RegistryService.GetLocations) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.location.Locations](#anymetrica.location.Locations) |  | Get Location records by their IDs <a name=".anymetrica.registry.RegistryService.GetLocations"></a> |
| rpc  | [MergePostalAddresses](#.anymetrica.registry.RegistryService.MergePostalAddresses) | [anymetrica.group.Groups](#anymetrica.group.Groups) | [anymetrica.postal_address.PostalAddresses](#anymetrica.postal_address.PostalAddresses) |  | Create/Update Postal Address records <a name=".anymetrica.registry.RegistryService.MergePostalAddresses"></a> |
| rpc  | [GetPostalAddresses](#.anymetrica.registry.RegistryService.GetPostalAddresses) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.postal_address.PostalAddresses](#anymetrica.postal_address.PostalAddresses) |  | Get Postal Address records by their IDs <a name=".anymetrica.registry.RegistryService.GetPostalAddresses"></a> |
| rpc  | [MergeFiles](#.anymetrica.registry.RegistryService.MergeFiles) | [anymetrica.file.Files](#anymetrica.file.Files) | [anymetrica.file.Files](#anymetrica.file.Files) |  | Create/Update File records <a name=".anymetrica.registry.RegistryService.MergeFiles"></a> |
| rpc  | [GetFiles](#.anymetrica.registry.RegistryService.GetFiles) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.file.Files](#anymetrica.file.Files) |  | Get File records by their IDs <a name=".anymetrica.registry.RegistryService.GetFiles"></a> |
| rpc  | [MergeWaveforms](#.anymetrica.registry.RegistryService.MergeWaveforms) | [anymetrica.waveform.Waveforms](#anymetrica.waveform.Waveforms) | [anymetrica.waveform.Waveforms](#anymetrica.waveform.Waveforms) |  | Create/Update Waveforms records <a name=".anymetrica.registry.RegistryService.MergeWaveforms"></a> |
| rpc  | [GetWaveforms](#.anymetrica.registry.RegistryService.GetWaveforms) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.waveform.Waveforms](#anymetrica.waveform.Waveforms) |  | Get Waveforms records by their IDs <a name=".anymetrica.registry.RegistryService.GetWaveforms"></a> |
| rpc  | [MergeVadResults](#.anymetrica.registry.RegistryService.MergeVadResults) | [anymetrica.vad.VadResults](#anymetrica.vad.VadResults) | [anymetrica.vad.VadResults](#anymetrica.vad.VadResults) |  | Create/Update Vad Result records <a name=".anymetrica.registry.RegistryService.MergeVadResults"></a> |
| rpc  | [GetVadResults](#.anymetrica.registry.RegistryService.GetVadResults) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.vad.VadResults](#anymetrica.vad.VadResults) |  | Get Vad Result records <a name=".anymetrica.registry.RegistryService.GetVadResults"></a> |
| rpc  | [MergeOperations](#.anymetrica.registry.RegistryService.MergeOperations) | [anymetrica.operation.Operations](#anymetrica.operation.Operations) | [anymetrica.operation.Operations](#anymetrica.operation.Operations) |  | Create/Update Operation records <a name=".anymetrica.registry.RegistryService.MergeOperations"></a> |
| rpc  | [GetOperations](#.anymetrica.registry.RegistryService.GetOperations) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.operation.Operations](#anymetrica.operation.Operations) |  | Get Operation records <a name=".anymetrica.registry.RegistryService.GetOperations"></a> |
| rpc  | [CancelOperations](#.anymetrica.registry.RegistryService.CancelOperations) | [anymetrica.request.ListRequest](#anymetrica.request.ListRequest) | [anymetrica.operation.Operations](#anymetrica.operation.Operations) |  | Cancel Operations <a name=".anymetrica.registry.RegistryService.CancelOperations"></a> |
| rpc  | [RequestDemo](#.anymetrica.registry.RegistryService.RequestDemo) | [anymetrica.demo_request.DemoRequest](#anymetrica.demo_request.DemoRequest) | [anymetrica.request.EmptyResponse](#anymetrica.request.EmptyResponse) |  | Request Demo <a name=".anymetrica.registry.RegistryService.RequestDemo"></a> |

## anymetrica/relation.proto

<a name="anymetrica/relation.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.relation.Relation](#.anymetrica.relation.Relation)

<a name=".anymetrica.relation.Relation"></a>

 ↑ [anymetrica/relation.proto](#index-anymetrica/relation.proto)

Relation is defined for __subject__ (__from_id__) against any other entity as __object__ (__to_id__)

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.relation.Relation.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.relation.Relation.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.relation.Relation.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.relation.Relation.metadata"></a> |
| [string](#string) | [from_id](#.anymetrica.relation.Relation.from_id.from_id) | 4 |  | Active __subject__ Id <a name=".anymetrica.relation.Relation.from_id"></a> |
| [int32](#int32) | [from_depth](#.anymetrica.relation.Relation.from_depth.from_depth) | 8 |  | Hops over DAG edges from current discovery start point (or current credential entity if none is defined)<br>till this relation `from` entity being made over the shortest path found, could be considered as something<br>like e.g. "Tree depth" but on graph structure. <a name=".anymetrica.relation.Relation.from_depth"></a> |
| [int32](#int32) | [from_depth_absolute](#.anymetrica.relation.Relation.from_depth_absolute.from_depth_absolute) | 10 |  | Hops over DAG edges from current credential entity (Usually the session token)<br>till this relation `from` entity being made over the shortest path found, could be considered as something<br>like e.g. "Tree depth" but on graph structure. <a name=".anymetrica.relation.Relation.from_depth_absolute"></a> |
| [RelationType](#RelationType) | [relation_type](#.anymetrica.relation.Relation.relation_type.relation_type) | 32 | `deprecated: true` | Relation type<br>@deprecated <a name=".anymetrica.relation.Relation.relation_type"></a> |
| repeated [RelationType](#RelationType) | [relation_types](#.anymetrica.relation.Relation.relation_types.relation_types) | 34 |  | Relation types (multiple at once) <a name=".anymetrica.relation.Relation.relation_types"></a> |
| [string](#string) | [to_id](#.anymetrica.relation.Relation.to_id.to_id) | 64 |  | Passive __object__ Id <a name=".anymetrica.relation.Relation.to_id"></a> |
| [int32](#int32) | [to_depth](#.anymetrica.relation.Relation.to_depth.to_depth) | 66 |  | Hops over DAG edges from current discovery start point (or current credential entity if none is defined)<br>till this relation `to` entity being made over the shortest path found, could be considered as something<br>like e.g. "Tree depth" but on graph structure.<br>It may be equal or smaller than `from_depth` depending on current entities DAG topology. <a name=".anymetrica.relation.Relation.to_depth"></a> |
| [int32](#int32) | [to_depth_absolute](#.anymetrica.relation.Relation.to_depth_absolute.to_depth_absolute) | 68 |  | Hops over DAG edges from current credential entity (Usually the session token)<br>till this relation `to` entity being made over the shortest path found, could be considered as something<br>like e.g. "Tree depth" but on graph structure.<br>It may be equal or smaller than `from_depth_absolute` depending on current entities DAG topology. <a name=".anymetrica.relation.Relation.to_depth_absolute"></a> |

#### message [.anymetrica.relation.Relations](#.anymetrica.relation.Relations)

<a name=".anymetrica.relation.Relations"></a>

 ↑ [anymetrica/relation.proto](#index-anymetrica/relation.proto)

List of `Relation` entities

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.relation.Relations.request.request) | 2 |  | Request metadata <a name=".anymetrica.relation.Relations.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.relation.Relations.response.response) | 4 |  | Response metadata <a name=".anymetrica.relation.Relations.response"></a> |
| repeated [Relation](#Relation) | [relations](#.anymetrica.relation.Relations.relations.relations) | 6 |  | Result relations <a name=".anymetrica.relation.Relations.relations"></a> |
| repeated [anymetrica.metadata.ShallowEntity](#anymetrica.metadata.ShallowEntity) | [entities](#.anymetrica.relation.Relations.entities.entities) | 8 |  | Result entities <a name=".anymetrica.relation.Relations.entities"></a> |

### Enums

<a name="-Enums"></a>

#### enum [.anymetrica.relation.RelationType](#.anymetrica.relation.RelationType)

<a name=".anymetrica.relation.RelationType"></a>

 ↑ [anymetrica/relation.proto](#index-anymetrica/relation.proto)

Access Level types

##### Values

| value | num | comment |
| ----- | --- | ------- |
| RESTRICTED | 0 | [default] No access granted. This type of edges could be purged automatically, but could be preserved for history management purposes. |
| CAN_RESET | 1 |  Gives control over read and reset trigger |
| CAN_READ | 3 |  Defines ability to read information both metadata and payload about entity and same access to everything it represents. |
| CAN_WRITE | 7 |  Defines permission to update content of entity payload not affecting any of its accessRules (including access accessRules? TBD) |
| CAN_READ_RELATIONS | 15 |  Gives ability to discover entity. |
| CAN_WRITE_RELATIONS | 31 |  Gives ability to re-link entity relations (including access rights). |
| OWNS | 64 |  Entity owner that means all entities related that way should have same lifecycle as user profile.<br>Ownership supposing wide access but with exception if operation may violate core business logic<br>or will create some conflict/integrity situation which not possible to resolve for owner user.<br>E.g. user is owner for his single E-Mail record, but system will reject its deletion request<br>until any alternative email record that resolving conflict will be provided. |
| ADMINISTRATING | 66 |  On permissions level it works like Owner but semantically this does not means that target entity is something<br>user manages as his own __private thing__ like his named `Human` profile or `Credential` records<br>so its better for temporary owners or managing public entities.<br>Also there are supposed to be single owner for entity, but many administrators are possible.<br>This difference should be considered at UI client applications level and may affect entities traverse order<br>but `Administrator` = `Owner` at permissions level. |
| CREATED | 68 |  Entity creator, its completely metadata level relation that should not have direct effect on permission level<br>but may affect API discovery priorities and discovery output filtering (mostly for UI needs) |
| HAVE_PART | 72 |  Entity acting as separate part of other entity that means access level similar to compound parent |
| HAVE_MEMBER | 78 |  Organisations and groups could have members |
| INPUT | 80 |  Operation input and other kinds of inputs |
| OUTPUT | 82 |  Operation output and other kinds of outputs |
| CONTACT_WORK | 104 |  Work contact |
| CONTACT_WORK_GROUP | 106 |  Work group contact |
| CONTACT_PERSONAL | 110 |  Personal use contact |
| CONTACT_FAMILY | 112 |  Family contact |
| CONTACT_ORGANISATION | 116 |  Contact of organisation related to many agents/agents group |
| CONTACT_NOTICED_USAGE | 120 |  Family contact |
| CONTACT_DO_NOT_CALL | 128 |  Don't use this contact against defined agent for live actions |

## anymetrica/request.proto

<a name="anymetrica/request.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.request.EmptyResponse](#.anymetrica.request.EmptyResponse)

<a name=".anymetrica.request.EmptyResponse"></a>

 ↑ [anymetrica/request.proto](#index-anymetrica/request.proto)

Empty RPC response

#### message [.anymetrica.request.ListRequest](#.anymetrica.request.ListRequest)

<a name=".anymetrica.request.ListRequest"></a>

 ↑ [anymetrica/request.proto](#index-anymetrica/request.proto)

Shallow Entities (metadata only) or IDs list request

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.request.ListRequest.request.request) | 2 |  | Request metadata <a name=".anymetrica.request.ListRequest.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.request.ListRequest.response.response) | 4 |  | Response metadata <a name=".anymetrica.request.ListRequest.response"></a> |
| repeated [anymetrica.metadata.ShallowEntity](#anymetrica.metadata.ShallowEntity) | [entities](#.anymetrica.request.ListRequest.entities.entities) | 8 |  | Entity Metadata <a name=".anymetrica.request.ListRequest.entities"></a> |
| repeated [string](#string) | [ids](#.anymetrica.request.ListRequest.ids.ids) | 12 |  | Array of entity ID which to retrieve or from which start discover search <a name=".anymetrica.request.ListRequest.ids"></a> |
| repeated [anymetrica.entity.EntityType](#anymetrica.entity.EntityType) | [types](#.anymetrica.request.ListRequest.types.types) | 14 | `deprecated: true` | Limit request scope and response to this entity kinds <a name=".anymetrica.request.ListRequest.types"></a> |

#### message [.anymetrica.request.PropertyOrder](#.anymetrica.request.PropertyOrder)

<a name=".anymetrica.request.PropertyOrder"></a>

 ↑ [anymetrica/request.proto](#index-anymetrica/request.proto)

The desired order for a specific property.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [property](#.anymetrica.request.PropertyOrder.property.property) | 1 |  | The property to order by. <a name=".anymetrica.request.PropertyOrder.property"></a> |
| [Direction](#Direction) | [direction](#.anymetrica.request.PropertyOrder.direction.direction) | 2 |  | The direction to order by. Defaults to `ASCENDING`. <a name=".anymetrica.request.PropertyOrder.direction"></a> |

#### message [.anymetrica.request.RequestMetadata](#.anymetrica.request.RequestMetadata)

<a name=".anymetrica.request.RequestMetadata"></a>

 ↑ [anymetrica/request.proto](#index-anymetrica/request.proto)

Request metadata

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.credential.Credential](#anymetrica.credential.Credential) | [credential](#.anymetrica.request.RequestMetadata.credential.credential) | 2 |  | Credential <a name=".anymetrica.request.RequestMetadata.credential"></a> |
| repeated [PropertyOrder](#PropertyOrder) | [order](#.anymetrica.request.RequestMetadata.order.order) | 4 |  | Result entities <a name=".anymetrica.request.RequestMetadata.order"></a> |
| [uint32](#uint32) | [offset](#.anymetrica.request.RequestMetadata.offset.offset) | 6 |  | The number of results to skip.<br><br>Applies before limit, but after all other constraints. Must be >= 0 if<br>specified. <a name=".anymetrica.request.RequestMetadata.offset"></a> |
| [uint32](#uint32) | [limit](#.anymetrica.request.RequestMetadata.limit.limit) | 8 |  | The maximum number of results to return.<br><br>Applies after all other constraints.<br>Must be >= 0 if specified. <a name=".anymetrica.request.RequestMetadata.limit"></a> |
| repeated [anymetrica.entity.EntityType](#anymetrica.entity.EntityType) | [types](#.anymetrica.request.RequestMetadata.types.types) | 14 |  | Discovery parameter<br>Moved from list request<br>Limit request scope and response to this entity kinds <a name=".anymetrica.request.RequestMetadata.types"></a> |
| [uint32](#uint32) | [traverse_depth](#.anymetrica.request.RequestMetadata.traverse_depth.traverse_depth) | 32 |  | Discovery parameter<br>Graph traverse depth<br>16 by default <a name=".anymetrica.request.RequestMetadata.traverse_depth"></a> |
| [bool](#bool) | [two_way_discovery](#.anymetrica.request.RequestMetadata.two_way_discovery.two_way_discovery) | 34 |  | Discovery parameter<br>Discovery will go against DAG edges direction as well if reverse edges are granting such permission <a name=".anymetrica.request.RequestMetadata.two_way_discovery"></a> |
| repeated [anymetrica.relation.RelationType](#anymetrica.relation.RelationType) | [relation_types](#.anymetrica.request.RequestMetadata.relation_types.relation_types) | 38 |  | Discovery parameter<br>Limit discovery to entities that reachable by path containing only defined relation types list <a name=".anymetrica.request.RequestMetadata.relation_types"></a> |

#### message [.anymetrica.request.ResponseMetadata](#.anymetrica.request.ResponseMetadata)

<a name=".anymetrica.request.ResponseMetadata"></a>

 ↑ [anymetrica/request.proto](#index-anymetrica/request.proto)

Response metadata

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.credential.Credential](#anymetrica.credential.Credential) | [credential](#.anymetrica.request.ResponseMetadata.credential.credential) | 2 |  | Credential <a name=".anymetrica.request.ResponseMetadata.credential"></a> |
| [int32](#int32) | [skipped_results](#.anymetrica.request.ResponseMetadata.skipped_results.skipped_results) | 16 |  | The number of results skipped, typically because of an offset. <a name=".anymetrica.request.ResponseMetadata.skipped_results"></a> |
| [MoreResultsType](#MoreResultsType) | [more_results](#.anymetrica.request.ResponseMetadata.more_results.more_results) | 18 |  | The state of the query after the current batch. <a name=".anymetrica.request.ResponseMetadata.more_results"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [read_time](#.anymetrica.request.ResponseMetadata.read_time.read_time) | 20 |  | Reads the version of the document at the given time.<br>This may not be older than 60 seconds. <a name=".anymetrica.request.ResponseMetadata.read_time"></a> |
| [uint32](#uint32) | [used_traverse_depth](#.anymetrica.request.ResponseMetadata.used_traverse_depth.used_traverse_depth) | 10 |  | Graph traverse depth<br>16 by default <a name=".anymetrica.request.ResponseMetadata.used_traverse_depth"></a> |

#### message [.anymetrica.request.ShallowEntities](#.anymetrica.request.ShallowEntities)

<a name=".anymetrica.request.ShallowEntities"></a>

 ↑ [anymetrica/request.proto](#index-anymetrica/request.proto)

List of Metadata

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [RequestMetadata](#RequestMetadata) | [request](#.anymetrica.request.ShallowEntities.request.request) | 2 |  | Request metadata <a name=".anymetrica.request.ShallowEntities.request"></a> |
| [ResponseMetadata](#ResponseMetadata) | [response](#.anymetrica.request.ShallowEntities.response.response) | 4 |  | Response metadata <a name=".anymetrica.request.ShallowEntities.response"></a> |
| repeated [anymetrica.metadata.ShallowEntity](#anymetrica.metadata.ShallowEntity) | [entities](#.anymetrica.request.ShallowEntities.entities.entities) | 8 |  | Entities list <a name=".anymetrica.request.ShallowEntities.entities"></a> |

#### message [.anymetrica.request.TransferOwnership](#.anymetrica.request.TransferOwnership)

<a name=".anymetrica.request.TransferOwnership"></a>

 ↑ [anymetrica/request.proto](#index-anymetrica/request.proto)

Transfer ownership operation message

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [entity_id](#.anymetrica.request.TransferOwnership.entity_id.entity_id) | 1 |  | Owned entity <a name=".anymetrica.request.TransferOwnership.entity_id"></a> |
| [string](#string) | [new_owner_id](#.anymetrica.request.TransferOwnership.new_owner_id.new_owner_id) | 2 |  | New owner ID <a name=".anymetrica.request.TransferOwnership.new_owner_id"></a> |

#### message [.anymetrica.request.TransferOwnerships](#.anymetrica.request.TransferOwnerships)

<a name=".anymetrica.request.TransferOwnerships"></a>

 ↑ [anymetrica/request.proto](#index-anymetrica/request.proto)

Transfer ownership operation messages

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [RequestMetadata](#RequestMetadata) | [request](#.anymetrica.request.TransferOwnerships.request.request) | 2 |  | Request metadata <a name=".anymetrica.request.TransferOwnerships.request"></a> |
| [ResponseMetadata](#ResponseMetadata) | [response](#.anymetrica.request.TransferOwnerships.response.response) | 4 |  | Response metadata <a name=".anymetrica.request.TransferOwnerships.response"></a> |
| repeated [TransferOwnership](#TransferOwnership) | [transfer_ownerships](#.anymetrica.request.TransferOwnerships.transfer_ownerships.transfer_ownerships) | 1 |  | Ownership transfer requests <a name=".anymetrica.request.TransferOwnerships.transfer_ownerships"></a> |

### Enums

<a name="-Enums"></a>

#### enum [.anymetrica.request.Direction](#.anymetrica.request.Direction)

<a name=".anymetrica.request.Direction"></a>

 ↑ [anymetrica/request.proto](#index-anymetrica/request.proto)

The sort direction.

##### Values

| value | num | comment |
| ----- | --- | ------- |
| DIRECTION_UNSPECIFIED | 0 | [default] Unspecified. This value must not be used. |
| ASCENDING | 1 |  Ascending. |
| DESCENDING | 2 |  Descending. |

#### enum [.anymetrica.request.MoreResultsType](#.anymetrica.request.MoreResultsType)

<a name=".anymetrica.request.MoreResultsType"></a>

 ↑ [anymetrica/request.proto](#index-anymetrica/request.proto)

The possible values for the `more_results` field.

##### Values

| value | num | comment |
| ----- | --- | ------- |
| MORE_RESULTS_TYPE_UNSPECIFIED | 0 | [default] Unspecified. This value is never used. |
| NOT_FINISHED | 1 |  There may be additional batches to fetch from this query. |
| MORE_RESULTS_AFTER_LIMIT | 2 |  The query is finished, but there may be more results after the limit. |
| NO_MORE_RESULTS | 3 |  The query is finished, and there are no more results. |
| MORE_RESULTS_AFTER_CURSOR | 4 |  The query is finished, but there may be more results after the end<br>cursor. |

## anymetrica/vad.proto

<a name="anymetrica/vad.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.vad.LongRunningRecognizeMetadata](#.anymetrica.vad.LongRunningRecognizeMetadata)

<a name=".anymetrica.vad.LongRunningRecognizeMetadata"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

Describes the progress of a long-running `LongRunningRecognize` call. It is<br>included in the `metadata` field of the `Operation` returned by the<br>`GetOperation` call of the `google::longrunning::Operations` service.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [int32](#int32) | [progress_percent](#.anymetrica.vad.LongRunningRecognizeMetadata.progress_percent.progress_percent) | 1 |  | Approximate percentage of audio processed thus far. Guaranteed to be 100<br>when the audio is fully processed and the results are available. <a name=".anymetrica.vad.LongRunningRecognizeMetadata.progress_percent"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [start_time](#.anymetrica.vad.LongRunningRecognizeMetadata.start_time.start_time) | 2 |  | Time when the request was received. <a name=".anymetrica.vad.LongRunningRecognizeMetadata.start_time"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [last_update_time](#.anymetrica.vad.LongRunningRecognizeMetadata.last_update_time.last_update_time) | 3 |  | Time of the most recent processing update. <a name=".anymetrica.vad.LongRunningRecognizeMetadata.last_update_time"></a> |

#### message [.anymetrica.vad.LongRunningRecognizeResponse](#.anymetrica.vad.LongRunningRecognizeResponse)

<a name=".anymetrica.vad.LongRunningRecognizeResponse"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

The only message returned to the client by the `LongRunningRecognize` method.<br>It contains the result as zero or more sequential `SpeechRecognitionResult`<br>messages. It is included in the `result.response` field of the `Operation`<br>returned by the `GetOperation` call of the `google::longrunning::Operations`<br>service.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| repeated [SpeechRecognitionResult](#SpeechRecognitionResult) | [results](#.anymetrica.vad.LongRunningRecognizeResponse.results.results) | 2 |  | Output-only* Sequential list of transcription results corresponding to<br>sequential portions of audio. <a name=".anymetrica.vad.LongRunningRecognizeResponse.results"></a> |

#### message [.anymetrica.vad.RecognitionAudio](#.anymetrica.vad.RecognitionAudio)

<a name=".anymetrica.vad.RecognitionAudio"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

Contains audio data in the encoding specified in the `RecognitionConfig`.<br>Either `content` or `uri` must be supplied. Supplying both or neither<br>returns [google.rpc.Code.INVALID_ARGUMENT][google.rpc.Code.INVALID_ARGUMENT]. See<br>[audio limits](https://cloud.google.com/speech/limits#content).

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [bytes](#bytes) | [content](#.anymetrica.vad.RecognitionAudio.content.content) | 1 |  | The audio data bytes encoded as specified in<br>`RecognitionConfig`. Note: as with all bytes fields, protobuffers use a<br>pure binary representation, whereas JSON representations use base64. <a name=".anymetrica.vad.RecognitionAudio.content"></a> |
| [string](#string) | [uri](#.anymetrica.vad.RecognitionAudio.uri.uri) | 2 |  | URI that points to a file that contains audio data bytes as specified in<br>`RecognitionConfig`. Currently, only Google Cloud Storage URIs are<br>supported, which must be specified in the following format:<br>`gs://bucket_name/object_name` (other URI formats return<br>[google.rpc.Code.INVALID_ARGUMENT][google.rpc.Code.INVALID_ARGUMENT]). For more information, see<br>[Request URIs](https://cloud.google.com/storage/docs/reference-uris). <a name=".anymetrica.vad.RecognitionAudio.uri"></a> |

###### oneof `RecognitionAudio`

<a name=".anymetrica.vad.RecognitionAudio.RecognitionAudio"></a>


| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [bytes](#bytes) | [content](#.anymetrica.vad.RecognitionAudio.content.content) | 1 |  | The audio data bytes encoded as specified in<br>`RecognitionConfig`. Note: as with all bytes fields, protobuffers use a<br>pure binary representation, whereas JSON representations use base64. <a name=".anymetrica.vad.RecognitionAudio.content"></a> |
| [string](#string) | [uri](#.anymetrica.vad.RecognitionAudio.uri.uri) | 2 |  | URI that points to a file that contains audio data bytes as specified in<br>`RecognitionConfig`. Currently, only Google Cloud Storage URIs are<br>supported, which must be specified in the following format:<br>`gs://bucket_name/object_name` (other URI formats return<br>[google.rpc.Code.INVALID_ARGUMENT][google.rpc.Code.INVALID_ARGUMENT]). For more information, see<br>[Request URIs](https://cloud.google.com/storage/docs/reference-uris). <a name=".anymetrica.vad.RecognitionAudio.uri"></a> |

#### message [.anymetrica.vad.RecognitionConfig](#.anymetrica.vad.RecognitionConfig)

<a name=".anymetrica.vad.RecognitionConfig"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

Provides information to the recognizer that specifies how to process the<br>request.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [AudioEncoding](#AudioEncoding) | [encoding](#.anymetrica.vad.RecognitionConfig.encoding.encoding) | 1 |  | Required* Encoding of audio data sent in all `RecognitionAudio` messages. <a name=".anymetrica.vad.RecognitionConfig.encoding"></a> |
| [int32](#int32) | [sample_rate_hertz](#.anymetrica.vad.RecognitionConfig.sample_rate_hertz.sample_rate_hertz) | 2 |  | Required* Sample rate in Hertz of the audio data sent in all<br>`RecognitionAudio` messages. Valid values are: 8000-48000.<br>16000 is optimal. For best results, set the sampling rate of the audio<br>source to 16000 Hz. If that's not possible, use the native sample rate of<br>the audio source (instead of re-sampling). <a name=".anymetrica.vad.RecognitionConfig.sample_rate_hertz"></a> |
| [string](#string) | [language_code](#.anymetrica.vad.RecognitionConfig.language_code.language_code) | 3 |  | Required* The language of the supplied audio as a<br>[BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag.<br>Example: "en-US".<br>See [Language Support](https://cloud.google.com/speech/docs/languages)<br>for a list of the currently supported language codes. <a name=".anymetrica.vad.RecognitionConfig.language_code"></a> |
| [int32](#int32) | [max_alternatives](#.anymetrica.vad.RecognitionConfig.max_alternatives.max_alternatives) | 4 |  | Optional* Maximum number of recognition hypotheses to be returned.<br>Specifically, the maximum number of `SpeechRecognitionAlternative` messages<br>within each `SpeechRecognitionResult`.<br>The server may return fewer than `max_alternatives`.<br>Valid values are `0`-`30`. A value of `0` or `1` will return a maximum of<br>one. If omitted, will return a maximum of one. <a name=".anymetrica.vad.RecognitionConfig.max_alternatives"></a> |
| [bool](#bool) | [profanity_filter](#.anymetrica.vad.RecognitionConfig.profanity_filter.profanity_filter) | 5 |  | Optional* If set to `true`, the server will attempt to filter out<br>profanities, replacing all but the initial character in each filtered word<br>with asterisks, e.g. "f***". If set to `false` or omitted, profanities<br>won't be filtered out. <a name=".anymetrica.vad.RecognitionConfig.profanity_filter"></a> |
| repeated [SpeechContext](#SpeechContext) | [speech_contexts](#.anymetrica.vad.RecognitionConfig.speech_contexts.speech_contexts) | 6 |  | Optional* A means to provide context to assist the speech recognition. <a name=".anymetrica.vad.RecognitionConfig.speech_contexts"></a> |
| [bool](#bool) | [enable_word_time_offsets](#.anymetrica.vad.RecognitionConfig.enable_word_time_offsets.enable_word_time_offsets) | 8 |  | Optional* If `true`, the top result includes a list of words and<br>the start and end time offsets (timestamps) for those words. If<br>`false`, no word-level time offset information is returned. The default is<br>`false`. <a name=".anymetrica.vad.RecognitionConfig.enable_word_time_offsets"></a> |

#### message [.anymetrica.vad.RecognizeRequest](#.anymetrica.vad.RecognizeRequest)

<a name=".anymetrica.vad.RecognizeRequest"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

The top-level message sent by the client for the `Recognize` method.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [RecognitionConfig](#RecognitionConfig) | [config](#.anymetrica.vad.RecognizeRequest.config.config) | 1 |  | Required* Provides information to the recognizer that specifies how to<br>process the request. <a name=".anymetrica.vad.RecognizeRequest.config"></a> |
| [RecognitionAudio](#RecognitionAudio) | [audio](#.anymetrica.vad.RecognizeRequest.audio.audio) | 2 |  | Required* The audio data to be recognized. <a name=".anymetrica.vad.RecognizeRequest.audio"></a> |
| [RecognitionAudio](#RecognitionAudio) | [file](#.anymetrica.vad.RecognizeRequest.file.file) | 3 |  | Anymetrica native file format <a name=".anymetrica.vad.RecognizeRequest.file"></a> |

#### message [.anymetrica.vad.RecognizeResponse](#.anymetrica.vad.RecognizeResponse)

<a name=".anymetrica.vad.RecognizeResponse"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

The only message returned to the client by the `Recognize` method. It<br>contains the result as zero or more sequential `SpeechRecognitionResult`<br>messages.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| repeated [SpeechRecognitionResult](#SpeechRecognitionResult) | [results](#.anymetrica.vad.RecognizeResponse.results.results) | 2 |  | Output-only* Sequential list of transcription results corresponding to<br>sequential portions of audio. <a name=".anymetrica.vad.RecognizeResponse.results"></a> |

#### message [.anymetrica.vad.SpeechContext](#.anymetrica.vad.SpeechContext)

<a name=".anymetrica.vad.SpeechContext"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

Provides "hints" to the speech recognizer to favor specific words and phrases<br>in the results.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| repeated [string](#string) | [phrases](#.anymetrica.vad.SpeechContext.phrases.phrases) | 1 |  | Optional* A list of strings containing words and phrases "hints" so that<br>the speech recognition is more likely to recognize them. This can be used<br>to improve the accuracy for specific words and phrases, for example, if<br>specific commands are typically spoken by the user. This can also be used<br>to add additional words to the vocabulary of the recognizer. See<br>[usage limits](https://cloud.google.com/speech/limits#content). <a name=".anymetrica.vad.SpeechContext.phrases"></a> |

#### message [.anymetrica.vad.SpeechRecognitionAlternative](#.anymetrica.vad.SpeechRecognitionAlternative)

<a name=".anymetrica.vad.SpeechRecognitionAlternative"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

Alternative hypotheses (a.k.a. n-best list).

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [transcript](#.anymetrica.vad.SpeechRecognitionAlternative.transcript.transcript) | 1 |  | Output-only* Transcript text representing the words that the user spoke. <a name=".anymetrica.vad.SpeechRecognitionAlternative.transcript"></a> |
| [float](#float) | [confidence](#.anymetrica.vad.SpeechRecognitionAlternative.confidence.confidence) | 2 |  | Output-only* The confidence estimate between 0.0 and 1.0. A higher number<br>indicates an estimated greater likelihood that the recognized words are<br>correct. This field is typically provided only for the top hypothesis, and<br>only for `is_final=true` results. Clients should not rely on the<br>`confidence` field as it is not guaranteed to be accurate or consistent.<br>The default of 0.0 is a sentinel value indicating `confidence` was not set. <a name=".anymetrica.vad.SpeechRecognitionAlternative.confidence"></a> |
| repeated [WordInfo](#WordInfo) | [words](#.anymetrica.vad.SpeechRecognitionAlternative.words.words) | 3 |  | Output-only* A list of word-specific information for each recognized word. <a name=".anymetrica.vad.SpeechRecognitionAlternative.words"></a> |

#### message [.anymetrica.vad.SpeechRecognitionResult](#.anymetrica.vad.SpeechRecognitionResult)

<a name=".anymetrica.vad.SpeechRecognitionResult"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

A speech recognition result corresponding to a portion of the audio.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| repeated [SpeechRecognitionAlternative](#SpeechRecognitionAlternative) | [alternatives](#.anymetrica.vad.SpeechRecognitionResult.alternatives.alternatives) | 1 |  | Output-only* May contain one or more recognition hypotheses (up to the<br>maximum specified in `max_alternatives`).<br>These alternatives are ordered in terms of accuracy, with the top (first)<br>alternative being the most probable, as ranked by the recognizer. <a name=".anymetrica.vad.SpeechRecognitionResult.alternatives"></a> |

#### message [.anymetrica.vad.VadEvent](#.anymetrica.vad.VadEvent)

<a name=".anymetrica.vad.VadEvent"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

VAD Event

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [VadEventType](#VadEventType) | [event_type](#.anymetrica.vad.VadEvent.event_type.event_type) | 4 |  | Vad event type <a name=".anymetrica.vad.VadEvent.event_type"></a> |
| [float](#float) | [detection_confidence](#.anymetrica.vad.VadEvent.detection_confidence.detection_confidence) | 16 |  | Event detection confidence. Values range from 0.0<br>(completely uncertain) to 1.0 (completely certain). <a name=".anymetrica.vad.VadEvent.detection_confidence"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [start_ts](#.anymetrica.vad.VadEvent.start_ts.start_ts) | 84 |  | Event start ts <a name=".anymetrica.vad.VadEvent.start_ts"></a> |
| [google.protobuf.Timestamp](#google.protobuf.Timestamp) | [end_ts](#.anymetrica.vad.VadEvent.end_ts.end_ts) | 86 |  | Event end ts <a name=".anymetrica.vad.VadEvent.end_ts"></a> |

#### message [.anymetrica.vad.VadRequest](#.anymetrica.vad.VadRequest)

<a name=".anymetrica.vad.VadRequest"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

VAD Request

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [RecognitionConfig](#RecognitionConfig) | [config](#.anymetrica.vad.VadRequest.config.config) | 1 |  | Required* Provides information to the recognizer that specifies how to<br>process the request. <a name=".anymetrica.vad.VadRequest.config"></a> |
| [RecognitionAudio](#RecognitionAudio) | [audio](#.anymetrica.vad.VadRequest.audio.audio) | 2 |  | Required* The audio data to be recognized. <a name=".anymetrica.vad.VadRequest.audio"></a> |
| [anymetrica.file.File](#anymetrica.file.File) | [file](#.anymetrica.vad.VadRequest.file.file) | 4 |  | Anymetrica native format <a name=".anymetrica.vad.VadRequest.file"></a> |
| [google.protobuf.Duration](#google.protobuf.Duration) | [frame_duration](#.anymetrica.vad.VadRequest.frame_duration.frame_duration) | 16 |  | Recognition frame duration <a name=".anymetrica.vad.VadRequest.frame_duration"></a> |
| [google.protobuf.Duration](#google.protobuf.Duration) | [padding_duration](#.anymetrica.vad.VadRequest.padding_duration.padding_duration) | 18 |  | Recognition padding duration <a name=".anymetrica.vad.VadRequest.padding_duration"></a> |

#### message [.anymetrica.vad.VadResult](#.anymetrica.vad.VadResult)

<a name=".anymetrica.vad.VadResult"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

VAD Result

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.vad.VadResult.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.vad.VadResult.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.vad.VadResult.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.vad.VadResult.metadata"></a> |
| repeated [VadEvent](#VadEvent) | [events](#.anymetrica.vad.VadResult.events.events) | 4 |  | VAD Events <a name=".anymetrica.vad.VadResult.events"></a> |
| [google.protobuf.Duration](#google.protobuf.Duration) | [frame_duration](#.anymetrica.vad.VadResult.frame_duration.frame_duration) | 16 |  | Recognition frame duration <a name=".anymetrica.vad.VadResult.frame_duration"></a> |
| [google.protobuf.Duration](#google.protobuf.Duration) | [padding_duration](#.anymetrica.vad.VadResult.padding_duration.padding_duration) | 18 |  | Recognition padding duration <a name=".anymetrica.vad.VadResult.padding_duration"></a> |

#### message [.anymetrica.vad.VadResults](#.anymetrica.vad.VadResults)

<a name=".anymetrica.vad.VadResults"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

List of VAD Result entities

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.vad.VadResults.request.request) | 2 |  | Request metadata <a name=".anymetrica.vad.VadResults.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.vad.VadResults.response.response) | 4 |  | Response metadata <a name=".anymetrica.vad.VadResults.response"></a> |
| repeated [VadResult](#VadResult) | [entities](#.anymetrica.vad.VadResults.entities.entities) | 8 |  | Result entities <a name=".anymetrica.vad.VadResults.entities"></a> |
| repeated [SpeechRecognitionResult](#SpeechRecognitionResult) | [speech_recognition_result](#.anymetrica.vad.VadResults.speech_recognition_result.speech_recognition_result) | 16 |  | Google speech recognition result <a name=".anymetrica.vad.VadResults.speech_recognition_result"></a> |

#### message [.anymetrica.vad.WordInfo](#.anymetrica.vad.WordInfo)

<a name=".anymetrica.vad.WordInfo"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

Word-specific information for recognized words. Word information is only<br>included in the response when certain request parameters are set, such<br>as `enable_word_time_offsets`.

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [google.protobuf.Duration](#google.protobuf.Duration) | [start_time](#.anymetrica.vad.WordInfo.start_time.start_time) | 1 |  | Output-only* Time offset relative to the beginning of the audio,<br>and corresponding to the start of the spoken word.<br>This field is only set if `enable_word_time_offsets=true` and only<br>in the top hypothesis.<br>This is an experimental feature and the accuracy of the time offset can<br>vary. <a name=".anymetrica.vad.WordInfo.start_time"></a> |
| [google.protobuf.Duration](#google.protobuf.Duration) | [end_time](#.anymetrica.vad.WordInfo.end_time.end_time) | 2 |  | Output-only* Time offset relative to the beginning of the audio,<br>and corresponding to the end of the spoken word.<br>This field is only set if `enable_word_time_offsets=true` and only<br>in the top hypothesis.<br>This is an experimental feature and the accuracy of the time offset can<br>vary. <a name=".anymetrica.vad.WordInfo.end_time"></a> |
| [string](#string) | [word](#.anymetrica.vad.WordInfo.word.word) | 3 |  | Output-only* The word corresponding to this set of information. <a name=".anymetrica.vad.WordInfo.word"></a> |

### Enums

<a name="-Enums"></a>

#### enum [.anymetrica.vad.RecognitionConfig.AudioEncoding](#.anymetrica.vad.RecognitionConfig.AudioEncoding)

<a name=".anymetrica.vad.RecognitionConfig.AudioEncoding"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

Audio encoding of the data sent in the audio message. All encodings support<br>only 1 channel (mono) audio. Only `FLAC` and `WAV` include a header that<br>describes the bytes of audio that follow the header. The other encodings<br>are raw audio bytes with no header.<br><br>For best results, the audio source should be captured and transmitted using<br>a lossless encoding (`FLAC` or `LINEAR16`). Recognition accuracy may be<br>reduced if lossy codecs, which include the other codecs listed in<br>this section, are used to capture or transmit the audio, particularly if<br>background noise is present.

##### Values

| value | num | comment |
| ----- | --- | ------- |
| ENCODING_UNSPECIFIED | 0 | [default] Not specified. Will return result [google.rpc.Code.INVALID_ARGUMENT][google.rpc.Code.INVALID_ARGUMENT]. |
| LINEAR16 | 1 |  Uncompressed 16-bit signed little-endian samples (Linear PCM). |
| FLAC | 2 |  [`FLAC`](https://xiph.org/flac/documentation.html) (Free Lossless Audio<br>Codec) is the recommended encoding because it is<br>lossless--therefore recognition is not compromised--and<br>requires only about half the bandwidth of `LINEAR16`. `FLAC` stream<br>encoding supports 16-bit and 24-bit samples, however, not all fields in<br>`STREAMINFO` are supported. |
| MULAW | 3 |  8-bit samples that compand 14-bit audio samples using G.711 PCMU/mu-law. |
| AMR | 4 |  Adaptive Multi-Rate Narrowband codec. `sample_rate_hertz` must be 8000. |
| AMR_WB | 5 |  Adaptive Multi-Rate Wideband codec. `sample_rate_hertz` must be 16000. |
| OGG_OPUS | 6 |  Opus encoded audio frames in Ogg container<br>([OggOpus](https://wiki.xiph.org/OggOpus)).<br>`sample_rate_hertz` must be 16000. |
| SPEEX_WITH_HEADER_BYTE | 7 |  Although the use of lossy encodings is not recommended, if a very low<br>bitrate encoding is required, `OGG_OPUS` is highly preferred over<br>Speex encoding. The [Speex](https://speex.org/)  encoding supported by<br>Cloud Speech API has a header byte in each block, as in MIME type<br>`audio/x-speex-with-header-byte`.<br>It is a variant of the RTP Speex encoding defined in<br>[RFC 5574](https://tools.ietf.org/html/rfc5574).<br>The stream is a sequence of blocks, one block per RTP packet. Each block<br>starts with a byte containing the length of the block, in bytes, followed<br>by one or more frames of Speex data, padded to an integral number of<br>bytes (octets) as specified in RFC 5574. In other words, each RTP header<br>is replaced with a single byte containing the block length. Only Speex<br>wideband is supported. `sample_rate_hertz` must be 16000. |

#### enum [.anymetrica.vad.VadEventType](#.anymetrica.vad.VadEventType)

<a name=".anymetrica.vad.VadEventType"></a>

 ↑ [anymetrica/vad.proto](#index-anymetrica/vad.proto)

Vad events<br>https://www.npmjs.com/package/node-vad

##### Values

| value | num | comment |
| ----- | --- | ------- |
| VAD_EVENT_UNSPECIFIED | 0 | [default]  |
| VAD_EVENT_SILENCE | 2 |   |
| VAD_EVENT_NOISE | 4 |   |
| VAD_EVENT_VOICE | 8 |   |
| VAD_EVENT_VOICE_MULTI | 16 |   |

## anymetrica/vehicle.proto

<a name="anymetrica/vehicle.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.vehicle.Vehicle](#.anymetrica.vehicle.Vehicle)

<a name=".anymetrica.vehicle.Vehicle"></a>

 ↑ [anymetrica/vehicle.proto](#index-anymetrica/vehicle.proto)

Vehicle

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.vehicle.Vehicle.id.id) | 1 |  | Unique Entity identifier <a name=".anymetrica.vehicle.Vehicle.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.vehicle.Vehicle.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.vehicle.Vehicle.metadata"></a> |
| [VehicleType](#VehicleType) | [vehicle_type](#.anymetrica.vehicle.Vehicle.vehicle_type.vehicle_type) | 8 |  | Vehicle type <a name=".anymetrica.vehicle.Vehicle.vehicle_type"></a> |
| [bool](#bool) | [for_testing](#.anymetrica.vehicle.Vehicle.for_testing.for_testing) | 9 |  | For testing purposes <a name=".anymetrica.vehicle.Vehicle.for_testing"></a> |

#### message [.anymetrica.vehicle.Vehicles](#.anymetrica.vehicle.Vehicles)

<a name=".anymetrica.vehicle.Vehicles"></a>

 ↑ [anymetrica/vehicle.proto](#index-anymetrica/vehicle.proto)

List of `Vehicle` entities

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.vehicle.Vehicles.request.request) | 2 |  | Request metadata <a name=".anymetrica.vehicle.Vehicles.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.vehicle.Vehicles.response.response) | 4 |  | Response metadata <a name=".anymetrica.vehicle.Vehicles.response"></a> |
| repeated [Vehicle](#Vehicle) | [entities](#.anymetrica.vehicle.Vehicles.entities.entities) | 8 |  |  <a name=".anymetrica.vehicle.Vehicles.entities"></a> |

### Enums

<a name="-Enums"></a>

#### enum [.anymetrica.vehicle.VehicleType](#.anymetrica.vehicle.VehicleType)

<a name=".anymetrica.vehicle.VehicleType"></a>

 ↑ [anymetrica/vehicle.proto](#index-anymetrica/vehicle.proto)

Vehicle type

##### Values

| value | num | comment |
| ----- | --- | ------- |
| VEHICLE_UNSPECIFIED | 0 | [default]  |
| VEHICLE_OTHER | 1 |   |
| VEHICLE_CAR | 8 |  Wheel |
| VEHICLE_TRUCK | 9 |   |
| VEHICLE_TRAILER | 10 |   |
| VEHICLE_MOTORCYCLE | 32 |   |
| VEHICLE_TRACTOR | 64 |   |
| VEHICLE_WATERCRAFT_UNSPECIFIED | 128 |  Watercraft |
| VEHICLE_WATERCRAFT_OTHER | 129 |   |
| VEHICLE_WATERCRAFT_SHIP | 140 |   |
| VEHICLE_WATERCRAFT_BOAT | 141 |   |
| VEHICLE_AIRCRAFT_UNSPECIFIED | 192 |  Aircraft |
| VEHICLE_AIRCRAFT_OTHER | 193 |   |
| VEHICLE_AIRCRAFT_PLANE | 224 |   |

## anymetrica/waveform.proto

<a name="anymetrica/waveform.proto"></a>

### Messages

<a name="-Messages"></a>

#### message [.anymetrica.waveform.Waveform](#.anymetrica.waveform.Waveform)

<a name=".anymetrica.waveform.Waveform"></a>

 ↑ [anymetrica/waveform.proto](#index-anymetrica/waveform.proto)

Waveform data file (V1/V2)<br>[format details](https://github.com/bbc/audiowaveform/blob/master/doc/DataFormat.md)

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [string](#string) | [id](#.anymetrica.waveform.Waveform.id.id) | 1 |  | Unique identifier <a name=".anymetrica.waveform.Waveform.id"></a> |
| [anymetrica.metadata.Metadata](#anymetrica.metadata.Metadata) | [metadata](#.anymetrica.waveform.Waveform.metadata.metadata) | 2 |  | Entity Metadata <a name=".anymetrica.waveform.Waveform.metadata"></a> |
| [int32](#int32) | [version](#.anymetrica.waveform.Waveform.version.version) | 16 |  | Version<br><br>This field indicates the version number of the waveform data format.<br>The version 1 and 2 data formats are described here.<br>If the format changes in future, the Version field will be incremented. <a name=".anymetrica.waveform.Waveform.version"></a> |
| [uint32](#uint32) | [flags](#.anymetrica.waveform.Waveform.flags.flags) | 17 |  | Flags<br><br>The Flags field describes the format of the waveform data that follows the header.<br><br>|     bit     |              description                  |<br>| ----------- | ------------------------------------------|<br>| 0 (lsb)     | 0: 16-bit resolution, 1: 8-bit resolution |<br>| 1-31 Unused |                                           | <a name=".anymetrica.waveform.Waveform.flags"></a> |
| [int32](#int32) | [sample_rate](#.anymetrica.waveform.Waveform.sample_rate.sample_rate) | 18 |  | Sample rate<br><br>Sample rate of original audio file (Hz). <a name=".anymetrica.waveform.Waveform.sample_rate"></a> |
| [int32](#int32) | [samples_per_pixel](#.anymetrica.waveform.Waveform.samples_per_pixel.samples_per_pixel) | 19 |  | Samples per pixel<br><br>Number of audio samples per waveform minimum/maximum pair. <a name=".anymetrica.waveform.Waveform.samples_per_pixel"></a> |
| [uint32](#uint32) | [length](#.anymetrica.waveform.Waveform.length.length) | 20 |  | Length<br><br>Length of waveform data (number of minimum and maximum value pairs per channel). <a name=".anymetrica.waveform.Waveform.length"></a> |
| [uint32](#uint32) | [channels](#.anymetrica.waveform.Waveform.channels.channels) | 21 |  | Channels<br><br>The number of waveform channels present (version 2 only). <a name=".anymetrica.waveform.Waveform.channels"></a> |
| [bytes](#bytes) | [data](#.anymetrica.waveform.Waveform.data.data) | 32 |  | Waveform data<br><br>Waveform data follows the header block and consists of pairs of minimum and maximum values that each<br>represent a range of samples of the original audio (the "samples per pixel" header field).<br><br>The version 1 data format supports only a single audio channel; the audiowaveform program converts stereo audio<br>to mono when generating waveform data. The version 2 data format supports multiple channels,<br>where the data from each channel is interleaved.<br><br>For 8-bit data, the waveform data is represented as follows. Each value lies in the range -128 to +127.<br>For examples and more details visit<br>[waveform .dat format documentation](https://github.com/bbc/audiowaveform/blob/master/doc/DataFormat.md#waveform-data) <a name=".anymetrica.waveform.Waveform.data"></a> |

#### message [.anymetrica.waveform.Waveforms](#.anymetrica.waveform.Waveforms)

<a name=".anymetrica.waveform.Waveforms"></a>

 ↑ [anymetrica/waveform.proto](#index-anymetrica/waveform.proto)

List of Waveform entities

##### Fields

| type | name | num | options | comment |
| ---- | ---- | --- | ------- | ------- |
| [anymetrica.request.RequestMetadata](#anymetrica.request.RequestMetadata) | [request](#.anymetrica.waveform.Waveforms.request.request) | 2 |  | Request metadata <a name=".anymetrica.waveform.Waveforms.request"></a> |
| [anymetrica.request.ResponseMetadata](#anymetrica.request.ResponseMetadata) | [response](#.anymetrica.waveform.Waveforms.response.response) | 4 |  | Response metadata <a name=".anymetrica.waveform.Waveforms.response"></a> |
| repeated [Waveform](#Waveform) | [entities](#.anymetrica.waveform.Waveforms.entities.entities) | 8 |  | Result entities <a name=".anymetrica.waveform.Waveforms.entities"></a> |

## google/protobuf/any.proto

<a name="google/protobuf/any.proto"></a>

## google/protobuf/duration.proto

<a name="google/protobuf/duration.proto"></a>

## google/protobuf/timestamp.proto

<a name="google/protobuf/timestamp.proto"></a>

## [Scalar Value Types](#scalar-value-types)

[proto3 scalars Google Documentation](https://developers.google.com/protocol-buffers/docs/proto3#scalar)

<a name="scalar-value-types"></a>

| __.proto__  | __C++__  | __Java__  | __Python__  | __Go__  | __Ruby__  | __C#__  | __PHP__  | __Dart__  | Comment |
| ---  | ---  | ---  | ---  | ---  | ---  | ---  | ---  | ---  | --- |
| __[double](#double)__  | `double`  | `double`  | `float`  | `float64`  | `Float`  | `double`  | `float`  | `double`  |  <a name="double"></a> |
| __[float](#float)__  | `float`  | `float`  | `float`  | `float32`  | `Float`  | `float`  | `float`  | `double`  |  <a name="float"></a> |
| __[int32](#int32)__  | `int32`  | `int`  | `int`  | `int32`  | `Fixnum or Bignum (as required)`  | `int`  | `integer`  | `int`  | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. <a name="int32"></a> |
| __[int64](#int64)__  | `int64`  | `long`  | `int/long[3]`  | `int64`  | `Bignum`  | `long`  | `integer/string[5]`  | `Int64`  | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. <a name="int64"></a> |
| __[uint32](#uint32)__  | `uint32`  | `int[1]`  | `int/long[3]`  | `uint32`  | `Fixnum or Bignum (as required)`  | `uint`  | `integer`  | `int`  | Uses variable-length encoding. <a name="uint32"></a> |
| __[uint64](#uint64)__  | `uint64`  | `long[1]`  | `int/long[3]`  | `uint64`  | `Bignum`  | `ulong`  | `integer/string[5]`  | `Int64`  | Uses variable-length encoding. <a name="uint64"></a> |
| __[sint32](#sint32)__  | `int32`  | `int`  | `int`  | `int32`  | `Fixnum or Bignum (as required)`  | `int`  | `integer`  | `int`  | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. <a name="sint32"></a> |
| __[sint64](#sint64)__  | `int64`  | `long`  | `int/long[3]`  | `int64`  | `Bignum`  | `long`  | `integer/string[5]`  | `Int64`  | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. <a name="sint64"></a> |
| __[fixed32](#fixed32)__  | `uint32`  | `int[1]`  | `int/long[3]`  | `uint32`  | `Fixnum or Bignum (as required)`  | `uint`  | `integer`  | `int`  | Always four bytes. More efficient than uint32 if values are often greater than 228. <a name="fixed32"></a> |
| __[fixed64](#fixed64)__  | `uint64`  | `long[1]`  | `int/long[3]`  | `uint64`  | `Bignum`  | `ulong`  | `integer/string[5]`  | `Int64`  | Always eight bytes. More efficient than uint64 if values are often greater than 256. <a name="fixed64"></a> |
| __[sfixed32](#sfixed32)__  | `int32`  | `int`  | `int`  | `int32`  | `Fixnum or Bignum (as required)`  | `int`  | `integer`  | `int`  | Always four bytes. <a name="sfixed32"></a> |
| __[sfixed64](#sfixed64)__  | `int64`  | `long`  | `int/long[3]`  | `int64`  | `Bignum`  | `long`  | `integer/string[5]`  | `Int64`  | Always eight bytes. <a name="sfixed64"></a> |
| __[bool](#bool)__  | `bool`  | `boolean`  | `bool`  | `bool`  | `TrueClass/FalseClass`  | `bool`  | `boolean`  | `bool`  |  <a name="bool"></a> |
| __[string](#string)__  | `string`  | `String`  | `str/unicode[4]`  | `string`  | `String (UTF-8)`  | `string`  | `string`  | `String`  | A string must always contain UTF-8 encoded or 7-bit ASCII text. <a name="string"></a> |
| __[bytes](#bytes)__  | `string`  | `ByteString`  | `str`  | `[]byte`  | `String (ASCII-8BIT)`  | `ByteString`  | `string`  | `List<int>`  | May contain any arbitrary sequence of bytes. <a name="bytes"></a> |

