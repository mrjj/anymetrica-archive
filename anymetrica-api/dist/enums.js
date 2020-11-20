/**
 * @fileOverview Enums constants
 */


/**
 * @section ContactType
 * .anymetrica.contact.ContactType
 * 
 * Type of Contact information record
 */

/**
 * @const CONTACT_UNSPECIFIED
 */
const CONTACT_UNSPECIFIED = 'CONTACT_UNSPECIFIED';

/**
 * @const CONTACT_OTHER
 */
const CONTACT_OTHER = 'CONTACT_OTHER';

/**
 * @const CONTACT_PHONE
 */
const CONTACT_PHONE = 'CONTACT_PHONE';

/**
 * @const CONTACT_EMAIL
 */
const CONTACT_EMAIL = 'CONTACT_EMAIL';

/**
 * @const CONTACT_FAX
 */
const CONTACT_FAX = 'CONTACT_FAX';

/**
 * @const CONTACT_JABBER
 */
const CONTACT_JABBER = 'CONTACT_JABBER';

/**
 * @const CONTACT_DISCORD
 */
const CONTACT_DISCORD = 'CONTACT_DISCORD';

/**
 * @const CONTACT_SKYPE
 */
const CONTACT_SKYPE = 'CONTACT_SKYPE';

/**
 * @const CONTACT_MSN
 */
const CONTACT_MSN = 'CONTACT_MSN';

/**
 * @const CONTACT_ICQ
 */
const CONTACT_ICQ = 'CONTACT_ICQ';

/**
 * @const CONTACT_FACEBOOK_ID
 */
const CONTACT_FACEBOOK_ID = 'CONTACT_FACEBOOK_ID';

/**
 * @const CONTACT_BADOO_LOGIN
 */
const CONTACT_BADOO_LOGIN = 'CONTACT_BADOO_LOGIN';

/**
 * @const CONTACT_BAIDU_ID
 */
const CONTACT_BAIDU_ID = 'CONTACT_BAIDU_ID';

/**
 * @const CONTACT_VKONTAKTE_ID
 */
const CONTACT_VKONTAKTE_ID = 'CONTACT_VKONTAKTE_ID';


/**
 * @const ContactType
 * 
 * Type of Contact information record
 */
const ContactType = {
  [CONTACT_UNSPECIFIED]: CONTACT_UNSPECIFIED,
  [CONTACT_OTHER]: CONTACT_OTHER,
  [CONTACT_PHONE]: CONTACT_PHONE,
  [CONTACT_EMAIL]: CONTACT_EMAIL,
  [CONTACT_FAX]: CONTACT_FAX,
  [CONTACT_JABBER]: CONTACT_JABBER,
  [CONTACT_DISCORD]: CONTACT_DISCORD,
  [CONTACT_SKYPE]: CONTACT_SKYPE,
  [CONTACT_MSN]: CONTACT_MSN,
  [CONTACT_ICQ]: CONTACT_ICQ,
  [CONTACT_FACEBOOK_ID]: CONTACT_FACEBOOK_ID,
  [CONTACT_BADOO_LOGIN]: CONTACT_BADOO_LOGIN,
  [CONTACT_BAIDU_ID]: CONTACT_BAIDU_ID,
  [CONTACT_VKONTAKTE_ID]: CONTACT_VKONTAKTE_ID,
};

/**
 * @const ContactTypeArr - values array
 */
const ContactTypeArr = [
  CONTACT_UNSPECIFIED,
  CONTACT_OTHER,
  CONTACT_PHONE,
  CONTACT_EMAIL,
  CONTACT_FAX,
  CONTACT_JABBER,
  CONTACT_DISCORD,
  CONTACT_SKYPE,
  CONTACT_MSN,
  CONTACT_ICQ,
  CONTACT_FACEBOOK_ID,
  CONTACT_BADOO_LOGIN,
  CONTACT_BAIDU_ID,
  CONTACT_VKONTAKTE_ID,
];

/**
 * @const ContactTypeValueNumbers values order
 */
const ContactTypeValueNumbers = {
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
  CONTACT_VKONTAKTE_ID: 131,
};


/**
 * @section DeviceType
 * .anymetrica.device.DeviceType
 * 
 * Generic device types options
 * 
 * [Mostly taken from](https://github.com/roscopecoltran/krakend-admin/blob/f27bc4ee41d133f35301ef2fabf606cdce51b47b/shared/public/downloads/v2/specs/amazonaws.com/mgh/2017-05-31/swagger.proto)
 */

/**
 * @const UNSPECIFIED
 * 
 * Type not specified
 */
const UNSPECIFIED = 'UNSPECIFIED';

/**
 * @const OTHER
 * 
 * Non-standard category
 */
const OTHER = 'OTHER';

/**
 * @const POLYMORPHIC
 * 
 * Polymorphic device (e.g. phone emulator)
 */
const POLYMORPHIC = 'POLYMORPHIC';

/**
 * @const PHONE
 * 
 * Mobile phone
 */
const PHONE = 'PHONE';

/**
 * @const TABLET
 * 
 * Tablet
 */
const TABLET = 'TABLET';

/**
 * @const DESKTOP
 * 
 * Desktop/Laptop Computer
 */
const DESKTOP = 'DESKTOP';

/**
 * @const TAG
 * 
 * Electronic tag (incl. passive)
 */
const TAG = 'TAG';

/**
 * @const BADGE
 * 
 * Electronic badge (incl. passive)
 */
const BADGE = 'BADGE';

/**
 * @const SMART_WATCH
 * 
 * Smart Watch
 */
const SMART_WATCH = 'SMART_WATCH';

/**
 * @const FITNESS_DEVICE
 * 
 * Generic fitness Device
 */
const FITNESS_DEVICE = 'FITNESS_DEVICE';

/**
 * @const SOUND_RECORDER
 * 
 * Sound recording device
 */
const SOUND_RECORDER = 'SOUND_RECORDER';

/**
 * @const VIDEO_RECORDER
 * 
 * Video recording device
 */
const VIDEO_RECORDER = 'VIDEO_RECORDER';

/**
 * @const ROBOTIC
 * 
 * Robotic device (non-vehicle)
 */
const ROBOTIC = 'ROBOTIC';


/**
 * @const DeviceType
 * 
 * Generic device types options
 * 
 * [Mostly taken from](https://github.com/roscopecoltran/krakend-admin/blob/f27bc4ee41d133f35301ef2fabf606cdce51b47b/shared/public/downloads/v2/specs/amazonaws.com/mgh/2017-05-31/swagger.proto)
 */
const DeviceType = {
  /**
   * Type not specified
   */
  [UNSPECIFIED]: UNSPECIFIED,
  /**
   * Non-standard category
   */
  [OTHER]: OTHER,
  /**
   * Polymorphic device (e.g. phone emulator)
   */
  [POLYMORPHIC]: POLYMORPHIC,
  /**
   * Mobile phone
   */
  [PHONE]: PHONE,
  /**
   * Tablet
   */
  [TABLET]: TABLET,
  /**
   * Desktop/Laptop Computer
   */
  [DESKTOP]: DESKTOP,
  /**
   * Electronic tag (incl. passive)
   */
  [TAG]: TAG,
  /**
   * Electronic badge (incl. passive)
   */
  [BADGE]: BADGE,
  /**
   * Smart Watch
   */
  [SMART_WATCH]: SMART_WATCH,
  /**
   * Generic fitness Device
   */
  [FITNESS_DEVICE]: FITNESS_DEVICE,
  /**
   * Sound recording device
   */
  [SOUND_RECORDER]: SOUND_RECORDER,
  /**
   * Video recording device
   */
  [VIDEO_RECORDER]: VIDEO_RECORDER,
  /**
   * Robotic device (non-vehicle)
   */
  [ROBOTIC]: ROBOTIC,
};

/**
 * @const DeviceTypeArr - values array
 */
const DeviceTypeArr = [
  UNSPECIFIED,
  OTHER,
  POLYMORPHIC,
  PHONE,
  TABLET,
  DESKTOP,
  TAG,
  BADGE,
  SMART_WATCH,
  FITNESS_DEVICE,
  SOUND_RECORDER,
  VIDEO_RECORDER,
  ROBOTIC,
];

/**
 * @const DeviceTypeValueNumbers values order
 */
const DeviceTypeValueNumbers = {
  /**
   * Type not specified
   */
  UNSPECIFIED: 0,
  /**
   * Non-standard category
   */
  OTHER: 1,
  /**
   * Polymorphic device (e.g. phone emulator)
   */
  POLYMORPHIC: 2,
  /**
   * Mobile phone
   */
  PHONE: 4,
  /**
   * Tablet
   */
  TABLET: 8,
  /**
   * Desktop/Laptop Computer
   */
  DESKTOP: 12,
  /**
   * Electronic tag (incl. passive)
   */
  TAG: 16,
  /**
   * Electronic badge (incl. passive)
   */
  BADGE: 18,
  /**
   * Smart Watch
   */
  SMART_WATCH: 24,
  /**
   * Generic fitness Device
   */
  FITNESS_DEVICE: 25,
  /**
   * Sound recording device
   */
  SOUND_RECORDER: 32,
  /**
   * Video recording device
   */
  VIDEO_RECORDER: 33,
  /**
   * Robotic device (non-vehicle)
   */
  ROBOTIC: 64,
};


/**
 * @section EntityType
 * .anymetrica.entity.EntityType
 * 
 * @enum EntityType
 * 
 * Entity type names
 */

/**
 * @const EntityUnknown
 */
const EntityUnknown = 'EntityUnknown';

/**
 * @const PostalAddress
 */
const PostalAddress = 'PostalAddress';

/**
 * @const Waveform
 */
const Waveform = 'Waveform';

/**
 * @const Group
 */
const Group = 'Group';

/**
 * @const Relation
 */
const Relation = 'Relation';

/**
 * @const DemoRequestInfo
 */
const DemoRequestInfo = 'DemoRequestInfo';

/**
 * @const File
 */
const File = 'File';

/**
 * @const SessionToken
 */
const SessionToken = 'SessionToken';

/**
 * @const Operation
 */
const Operation = 'Operation';

/**
 * @const Organization
 */
const Organization = 'Organization';

/**
 * @const VadResult
 */
const VadResult = 'VadResult';

/**
 * @const TOTP
 */
const TOTP = 'TOTP';

/**
 * @const Vehicle
 */
const Vehicle = 'Vehicle';

/**
 * @const Device
 */
const Device = 'Device';

/**
 * @const Contact
 */
const Contact = 'Contact';

/**
 * @const Location
 */
const Location = 'Location';

/**
 * @const UsernamePassword
 */
const UsernamePassword = 'UsernamePassword';

/**
 * @const Human
 */
const Human = 'Human';

/**
 * @const OTP
 */
const OTP = 'OTP';


/**
 * @const EntityType
 * 
 * @enum EntityType
 * 
 * Entity type names
 */
const EntityType = {
  [EntityUnknown]: EntityUnknown,
  [PostalAddress]: PostalAddress,
  [Waveform]: Waveform,
  [Group]: Group,
  [Relation]: Relation,
  [DemoRequestInfo]: DemoRequestInfo,
  [File]: File,
  [SessionToken]: SessionToken,
  [Operation]: Operation,
  [Organization]: Organization,
  [VadResult]: VadResult,
  [TOTP]: TOTP,
  [Vehicle]: Vehicle,
  [Device]: Device,
  [Contact]: Contact,
  [Location]: Location,
  [UsernamePassword]: UsernamePassword,
  [Human]: Human,
  [OTP]: OTP,
};

/**
 * @const EntityTypeArr - values array
 */
const EntityTypeArr = [
  EntityUnknown,
  PostalAddress,
  Waveform,
  Group,
  Relation,
  DemoRequestInfo,
  File,
  SessionToken,
  Operation,
  Organization,
  VadResult,
  TOTP,
  Vehicle,
  Device,
  Contact,
  Location,
  UsernamePassword,
  Human,
  OTP,
];

/**
 * @const EntityTypeValueNumbers values order
 */
const EntityTypeValueNumbers = {
  EntityUnknown: 0,
  PostalAddress: 1,
  Waveform: 2,
  Group: 3,
  Relation: 4,
  DemoRequestInfo: 5,
  File: 6,
  SessionToken: 7,
  Operation: 9,
  Organization: 11,
  VadResult: 16,
  TOTP: 18,
  Vehicle: 20,
  Device: 21,
  Contact: 23,
  Location: 27,
  UsernamePassword: 28,
  Human: 29,
  OTP: 32,
};


/**
 * @section EntityTypePlural
 * .anymetrica.entity.EntityTypePlural
 * 
 * @enum EntityTypePlural
 * 
 * Entity plural type names
 */

/**
 * @const EntitiesUnknown
 */
const EntitiesUnknown = 'EntitiesUnknown';

/**
 * @const PostalAddresses
 */
const PostalAddresses = 'PostalAddresses';

/**
 * @const Waveforms
 */
const Waveforms = 'Waveforms';

/**
 * @const Groups
 */
const Groups = 'Groups';

/**
 * @const Files
 */
const Files = 'Files';

/**
 * @const SessionTokens
 */
const SessionTokens = 'SessionTokens';

/**
 * @const Operations
 */
const Operations = 'Operations';

/**
 * @const Organizations
 */
const Organizations = 'Organizations';

/**
 * @const VadResults
 */
const VadResults = 'VadResults';

/**
 * @const TOTPs
 */
const TOTPs = 'TOTPs';

/**
 * @const Vehicles
 */
const Vehicles = 'Vehicles';

/**
 * @const Devices
 */
const Devices = 'Devices';

/**
 * @const Contacts
 */
const Contacts = 'Contacts';

/**
 * @const Locations
 */
const Locations = 'Locations';

/**
 * @const UsernamePasswords
 */
const UsernamePasswords = 'UsernamePasswords';

/**
 * @const Humans
 */
const Humans = 'Humans';

/**
 * @const OTPs
 */
const OTPs = 'OTPs';


/**
 * @const EntityTypePlural
 * 
 * @enum EntityTypePlural
 * 
 * Entity plural type names
 */
const EntityTypePlural = {
  [EntitiesUnknown]: EntitiesUnknown,
  [PostalAddresses]: PostalAddresses,
  [Waveforms]: Waveforms,
  [Groups]: Groups,
  [Files]: Files,
  [SessionTokens]: SessionTokens,
  [Operations]: Operations,
  [Organizations]: Organizations,
  [VadResults]: VadResults,
  [TOTPs]: TOTPs,
  [Vehicles]: Vehicles,
  [Devices]: Devices,
  [Contacts]: Contacts,
  [Locations]: Locations,
  [UsernamePasswords]: UsernamePasswords,
  [Humans]: Humans,
  [OTPs]: OTPs,
};

/**
 * @const EntityTypePluralArr - values array
 */
const EntityTypePluralArr = [
  EntitiesUnknown,
  PostalAddresses,
  Waveforms,
  Groups,
  Files,
  SessionTokens,
  Operations,
  Organizations,
  VadResults,
  TOTPs,
  Vehicles,
  Devices,
  Contacts,
  Locations,
  UsernamePasswords,
  Humans,
  OTPs,
];

/**
 * @const EntityTypePluralValueNumbers values order
 */
const EntityTypePluralValueNumbers = {
  EntitiesUnknown: 0,
  PostalAddresses: 1,
  Waveforms: 2,
  Groups: 3,
  Files: 6,
  SessionTokens: 7,
  Operations: 9,
  Organizations: 11,
  VadResults: 16,
  TOTPs: 18,
  Vehicles: 20,
  Devices: 21,
  Contacts: 23,
  Locations: 27,
  UsernamePasswords: 28,
  Humans: 29,
  OTPs: 32,
};


/**
 * @section ContentType
 * .anymetrica.file.ContentType
 * 
 * [IANA Registered Content Types] https://www.iana.org/assignments/media-types/media-types.xhtml
 * Content Type is big directory containing Media Type
 */

/**
 * @const CONTENT_TYPE_UNSPECIFIED
 * 
 * The Content Type has not been specified
 */
const CONTENT_TYPE_UNSPECIFIED = 'CONTENT_TYPE_UNSPECIFIED';

/**
 * @const application
 */
const application = 'application';

/**
 * @const audio
 */
const audio = 'audio';

/**
 * @const example
 */
const example = 'example';

/**
 * @const font
 */
const font = 'font';

/**
 * @const image
 */
const image = 'image';

/**
 * @const message
 */
const message = 'message';

/**
 * @const model
 */
const model = 'model';

/**
 * @const multipart
 */
const multipart = 'multipart';

/**
 * @const text
 */
const text = 'text';

/**
 * @const video
 */
const video = 'video';


/**
 * @const ContentType
 * 
 * [IANA Registered Content Types] https://www.iana.org/assignments/media-types/media-types.xhtml
 * Content Type is big directory containing Media Type
 */
const ContentType = {
  /**
   * The Content Type has not been specified
   */
  [CONTENT_TYPE_UNSPECIFIED]: CONTENT_TYPE_UNSPECIFIED,
  [application]: application,
  [audio]: audio,
  [example]: example,
  [font]: font,
  [image]: image,
  [message]: message,
  [model]: model,
  [multipart]: multipart,
  [text]: text,
  [video]: video,
};

/**
 * @const ContentTypeArr - values array
 */
const ContentTypeArr = [
  CONTENT_TYPE_UNSPECIFIED,
  application,
  audio,
  example,
  font,
  image,
  message,
  model,
  multipart,
  text,
  video,
];

/**
 * @const ContentTypeValueNumbers values order
 */
const ContentTypeValueNumbers = {
  /**
   * The Content Type has not been specified
   */
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
  video: 1000,
};


/**
 * @section HashType
 * .anymetrica.file.HashType
 * 
 * If known, the hash function used to compute this digest.
 */

/**
 * @const HASH_TYPE_UNSPECIFIED
 * 
 * Unknown
 */
const HASH_TYPE_UNSPECIFIED = 'HASH_TYPE_UNSPECIFIED';

/**
 * @const HASH_TYPE_PLAIN_TEXT
 * 
 * Plain Text
 */
const HASH_TYPE_PLAIN_TEXT = 'HASH_TYPE_PLAIN_TEXT';

/**
 * @const HASH_TYPE_MD5
 * 
 * MD5
 */
const HASH_TYPE_MD5 = 'HASH_TYPE_MD5';

/**
 * @const HASH_TYPE_SHA_0_160
 * 
 * SHA-0
 */
const HASH_TYPE_SHA_0_160 = 'HASH_TYPE_SHA_0_160';

/**
 * @const HASH_TYPE_SHA_1_160
 * 
 * SHA-1
 */
const HASH_TYPE_SHA_1_160 = 'HASH_TYPE_SHA_1_160';

/**
 * @const HASH_TYPE_SHA_2_224
 * 
 * SHA-2
 */
const HASH_TYPE_SHA_2_224 = 'HASH_TYPE_SHA_2_224';

/**
 * @const HASH_TYPE_SHA_2_256
 */
const HASH_TYPE_SHA_2_256 = 'HASH_TYPE_SHA_2_256';

/**
 * @const HASH_TYPE_SHA_2_384
 */
const HASH_TYPE_SHA_2_384 = 'HASH_TYPE_SHA_2_384';

/**
 * @const HASH_TYPE_SHA_2_512
 */
const HASH_TYPE_SHA_2_512 = 'HASH_TYPE_SHA_2_512';

/**
 * @const HASH_TYPE_SHA_2_512_256
 */
const HASH_TYPE_SHA_2_512_256 = 'HASH_TYPE_SHA_2_512_256';

/**
 * @const HASH_TYPE_SHA_2_512_224
 */
const HASH_TYPE_SHA_2_512_224 = 'HASH_TYPE_SHA_2_512_224';

/**
 * @const HASH_TYPE_SIP_HASH_32
 * 
 * SipHash
 */
const HASH_TYPE_SIP_HASH_32 = 'HASH_TYPE_SIP_HASH_32';

/**
 * @const HASH_TYPE_SIP_HASH_64
 */
const HASH_TYPE_SIP_HASH_64 = 'HASH_TYPE_SIP_HASH_64';

/**
 * @const HASH_TYPE_CITY_64
 * 
 * City
 */
const HASH_TYPE_CITY_64 = 'HASH_TYPE_CITY_64';

/**
 * @const HASH_TYPE_CITY_128
 */
const HASH_TYPE_CITY_128 = 'HASH_TYPE_CITY_128';

/**
 * @const HASH_TYPE_CITY128_CRC
 */
const HASH_TYPE_CITY128_CRC = 'HASH_TYPE_CITY128_CRC';

/**
 * @const HASH_TYPE_METRO_32
 * 
 * Metro
 */
const HASH_TYPE_METRO_32 = 'HASH_TYPE_METRO_32';

/**
 * @const HASH_TYPE_METRO_64
 */
const HASH_TYPE_METRO_64 = 'HASH_TYPE_METRO_64';

/**
 * @const HASH_TYPE_METRO_128
 */
const HASH_TYPE_METRO_128 = 'HASH_TYPE_METRO_128';

/**
 * @const HASH_TYPE_METRO_128_CRC
 */
const HASH_TYPE_METRO_128_CRC = 'HASH_TYPE_METRO_128_CRC';


/**
 * @const HashType
 * 
 * If known, the hash function used to compute this digest.
 */
const HashType = {
  /**
   * Unknown
   */
  [HASH_TYPE_UNSPECIFIED]: HASH_TYPE_UNSPECIFIED,
  /**
   * Plain Text
   */
  [HASH_TYPE_PLAIN_TEXT]: HASH_TYPE_PLAIN_TEXT,
  /**
   * MD5
   */
  [HASH_TYPE_MD5]: HASH_TYPE_MD5,
  /**
   * SHA-0
   */
  [HASH_TYPE_SHA_0_160]: HASH_TYPE_SHA_0_160,
  /**
   * SHA-1
   */
  [HASH_TYPE_SHA_1_160]: HASH_TYPE_SHA_1_160,
  /**
   * SHA-2
   */
  [HASH_TYPE_SHA_2_224]: HASH_TYPE_SHA_2_224,
  [HASH_TYPE_SHA_2_256]: HASH_TYPE_SHA_2_256,
  [HASH_TYPE_SHA_2_384]: HASH_TYPE_SHA_2_384,
  [HASH_TYPE_SHA_2_512]: HASH_TYPE_SHA_2_512,
  [HASH_TYPE_SHA_2_512_256]: HASH_TYPE_SHA_2_512_256,
  [HASH_TYPE_SHA_2_512_224]: HASH_TYPE_SHA_2_512_224,
  /**
   * SipHash
   */
  [HASH_TYPE_SIP_HASH_32]: HASH_TYPE_SIP_HASH_32,
  [HASH_TYPE_SIP_HASH_64]: HASH_TYPE_SIP_HASH_64,
  /**
   * City
   */
  [HASH_TYPE_CITY_64]: HASH_TYPE_CITY_64,
  [HASH_TYPE_CITY_128]: HASH_TYPE_CITY_128,
  [HASH_TYPE_CITY128_CRC]: HASH_TYPE_CITY128_CRC,
  /**
   * Metro
   */
  [HASH_TYPE_METRO_32]: HASH_TYPE_METRO_32,
  [HASH_TYPE_METRO_64]: HASH_TYPE_METRO_64,
  [HASH_TYPE_METRO_128]: HASH_TYPE_METRO_128,
  [HASH_TYPE_METRO_128_CRC]: HASH_TYPE_METRO_128_CRC,
};

/**
 * @const HashTypeArr - values array
 */
const HashTypeArr = [
  HASH_TYPE_UNSPECIFIED,
  HASH_TYPE_PLAIN_TEXT,
  HASH_TYPE_MD5,
  HASH_TYPE_SHA_0_160,
  HASH_TYPE_SHA_1_160,
  HASH_TYPE_SHA_2_224,
  HASH_TYPE_SHA_2_256,
  HASH_TYPE_SHA_2_384,
  HASH_TYPE_SHA_2_512,
  HASH_TYPE_SHA_2_512_256,
  HASH_TYPE_SHA_2_512_224,
  HASH_TYPE_SIP_HASH_32,
  HASH_TYPE_SIP_HASH_64,
  HASH_TYPE_CITY_64,
  HASH_TYPE_CITY_128,
  HASH_TYPE_CITY128_CRC,
  HASH_TYPE_METRO_32,
  HASH_TYPE_METRO_64,
  HASH_TYPE_METRO_128,
  HASH_TYPE_METRO_128_CRC,
];

/**
 * @const HashTypeValueNumbers values order
 */
const HashTypeValueNumbers = {
  /**
   * Unknown
   */
  HASH_TYPE_UNSPECIFIED: 0,
  /**
   * Plain Text
   */
  HASH_TYPE_PLAIN_TEXT: 8,
  /**
   * MD5
   */
  HASH_TYPE_MD5: 12,
  /**
   * SHA-0
   */
  HASH_TYPE_SHA_0_160: 16,
  /**
   * SHA-1
   */
  HASH_TYPE_SHA_1_160: 32,
  /**
   * SHA-2
   */
  HASH_TYPE_SHA_2_224: 48,
  HASH_TYPE_SHA_2_256: 49,
  HASH_TYPE_SHA_2_384: 50,
  HASH_TYPE_SHA_2_512: 51,
  HASH_TYPE_SHA_2_512_256: 52,
  HASH_TYPE_SHA_2_512_224: 53,
  /**
   * SipHash
   */
  HASH_TYPE_SIP_HASH_32: 64,
  HASH_TYPE_SIP_HASH_64: 65,
  /**
   * City
   */
  HASH_TYPE_CITY_64: 80,
  HASH_TYPE_CITY_128: 81,
  HASH_TYPE_CITY128_CRC: 82,
  /**
   * Metro
   */
  HASH_TYPE_METRO_32: 96,
  HASH_TYPE_METRO_64: 97,
  HASH_TYPE_METRO_128: 98,
  HASH_TYPE_METRO_128_CRC: 99,
};


/**
 * @section RelationType
 * .anymetrica.relation.RelationType
 * 
 * Access Level types
 */

/**
 * @const RESTRICTED
 * 
 * No access granted. This type of edges could be purged automatically, but could be preserved for history management purposes.
 */
const RESTRICTED = 'RESTRICTED';

/**
 * @const CAN_RESET
 * 
 * Gives control over read and reset trigger
 */
const CAN_RESET = 'CAN_RESET';

/**
 * @const CAN_READ
 * 
 * Defines ability to read information both metadata and payload about entity and same access to everything it represents.
 */
const CAN_READ = 'CAN_READ';

/**
 * @const CAN_WRITE
 * 
 * Defines permission to update content of entity payload not affecting any of its accessRules (including access accessRules? TBD)
 */
const CAN_WRITE = 'CAN_WRITE';

/**
 * @const CAN_READ_RELATIONS
 * 
 * Gives ability to discover entity.
 */
const CAN_READ_RELATIONS = 'CAN_READ_RELATIONS';

/**
 * @const CAN_WRITE_RELATIONS
 * 
 * Gives ability to re-link entity relations (including access rights).
 */
const CAN_WRITE_RELATIONS = 'CAN_WRITE_RELATIONS';

/**
 * @const OWNS
 * 
 * Entity owner that means all entities related that way should have same lifecycle as user profile.
 * Ownership supposing wide access but with exception if operation may violate core business logic
 * or will create some conflict/integrity situation which not possible to resolve for owner user.
 * E.g. user is owner for his single E-Mail record, but system will reject its deletion request
 * until any alternative email record that resolving conflict will be provided.
 */
const OWNS = 'OWNS';

/**
 * @const ADMINISTRATING
 * 
 * On permissions level it works like Owner but semantically this does not means that target entity is something
 * user manages as his own __private thing__ like his named `Human` profile or `Credential` records
 * so its better for temporary owners or managing public entities.
 * Also there are supposed to be single owner for entity, but many administrators are possible.
 * This difference should be considered at UI client applications level and may affect entities traverse order
 * but `Administrator` = `Owner` at permissions level.
 */
const ADMINISTRATING = 'ADMINISTRATING';

/**
 * @const CREATED
 * 
 * Entity creator, its completely metadata level relation that should not have direct effect on permission level
 * but may affect API discovery priorities and discovery output filtering (mostly for UI needs)
 */
const CREATED = 'CREATED';

/**
 * @const HAVE_PART
 * 
 * Entity acting as separate part of other entity that means access level similar to compound parent
 */
const HAVE_PART = 'HAVE_PART';

/**
 * @const HAVE_MEMBER
 * 
 * Organisations and groups could have members
 */
const HAVE_MEMBER = 'HAVE_MEMBER';

/**
 * @const INPUT
 * 
 * Operation input and other kinds of inputs
 */
const INPUT = 'INPUT';

/**
 * @const OUTPUT
 * 
 * Operation output and other kinds of outputs
 */
const OUTPUT = 'OUTPUT';

/**
 * @const CONTACT_WORK
 * 
 * Work contact
 */
const CONTACT_WORK = 'CONTACT_WORK';

/**
 * @const CONTACT_WORK_GROUP
 * 
 * Work group contact
 */
const CONTACT_WORK_GROUP = 'CONTACT_WORK_GROUP';

/**
 * @const CONTACT_PERSONAL
 * 
 * Personal use contact
 */
const CONTACT_PERSONAL = 'CONTACT_PERSONAL';

/**
 * @const CONTACT_FAMILY
 * 
 * Family contact
 */
const CONTACT_FAMILY = 'CONTACT_FAMILY';

/**
 * @const CONTACT_ORGANISATION
 * 
 * Contact of organisation related to many agents/agents group
 */
const CONTACT_ORGANISATION = 'CONTACT_ORGANISATION';

/**
 * @const CONTACT_NOTICED_USAGE
 * 
 * Family contact
 */
const CONTACT_NOTICED_USAGE = 'CONTACT_NOTICED_USAGE';

/**
 * @const CONTACT_DO_NOT_CALL
 * 
 * Don't use this contact against defined agent for live actions
 */
const CONTACT_DO_NOT_CALL = 'CONTACT_DO_NOT_CALL';


/**
 * @const RelationType
 * 
 * Access Level types
 */
const RelationType = {
  /**
   * No access granted. This type of edges could be purged automatically, but could be preserved for history management purposes.
   */
  [RESTRICTED]: RESTRICTED,
  /**
   * Gives control over read and reset trigger
   */
  [CAN_RESET]: CAN_RESET,
  /**
   * Defines ability to read information both metadata and payload about entity and same access to everything it represents.
   */
  [CAN_READ]: CAN_READ,
  /**
   * Defines permission to update content of entity payload not affecting any of its accessRules (including access accessRules? TBD)
   */
  [CAN_WRITE]: CAN_WRITE,
  /**
   * Gives ability to discover entity.
   */
  [CAN_READ_RELATIONS]: CAN_READ_RELATIONS,
  /**
   * Gives ability to re-link entity relations (including access rights).
   */
  [CAN_WRITE_RELATIONS]: CAN_WRITE_RELATIONS,
  /**
   * Entity owner that means all entities related that way should have same lifecycle as user profile.
   * Ownership supposing wide access but with exception if operation may violate core business logic
   * or will create some conflict/integrity situation which not possible to resolve for owner user.
   * E.g. user is owner for his single E-Mail record, but system will reject its deletion request
   * until any alternative email record that resolving conflict will be provided.
   */
  [OWNS]: OWNS,
  /**
   * On permissions level it works like Owner but semantically this does not means that target entity is something
   * user manages as his own __private thing__ like his named `Human` profile or `Credential` records
   * so its better for temporary owners or managing public entities.
   * Also there are supposed to be single owner for entity, but many administrators are possible.
   * This difference should be considered at UI client applications level and may affect entities traverse order
   * but `Administrator` = `Owner` at permissions level.
   */
  [ADMINISTRATING]: ADMINISTRATING,
  /**
   * Entity creator, its completely metadata level relation that should not have direct effect on permission level
   * but may affect API discovery priorities and discovery output filtering (mostly for UI needs)
   */
  [CREATED]: CREATED,
  /**
   * Entity acting as separate part of other entity that means access level similar to compound parent
   */
  [HAVE_PART]: HAVE_PART,
  /**
   * Organisations and groups could have members
   */
  [HAVE_MEMBER]: HAVE_MEMBER,
  /**
   * Operation input and other kinds of inputs
   */
  [INPUT]: INPUT,
  /**
   * Operation output and other kinds of outputs
   */
  [OUTPUT]: OUTPUT,
  /**
   * Work contact
   */
  [CONTACT_WORK]: CONTACT_WORK,
  /**
   * Work group contact
   */
  [CONTACT_WORK_GROUP]: CONTACT_WORK_GROUP,
  /**
   * Personal use contact
   */
  [CONTACT_PERSONAL]: CONTACT_PERSONAL,
  /**
   * Family contact
   */
  [CONTACT_FAMILY]: CONTACT_FAMILY,
  /**
   * Contact of organisation related to many agents/agents group
   */
  [CONTACT_ORGANISATION]: CONTACT_ORGANISATION,
  /**
   * Family contact
   */
  [CONTACT_NOTICED_USAGE]: CONTACT_NOTICED_USAGE,
  /**
   * Don't use this contact against defined agent for live actions
   */
  [CONTACT_DO_NOT_CALL]: CONTACT_DO_NOT_CALL,
};

/**
 * @const RelationTypeArr - values array
 */
const RelationTypeArr = [
  RESTRICTED,
  CAN_RESET,
  CAN_READ,
  CAN_WRITE,
  CAN_READ_RELATIONS,
  CAN_WRITE_RELATIONS,
  OWNS,
  ADMINISTRATING,
  CREATED,
  HAVE_PART,
  HAVE_MEMBER,
  INPUT,
  OUTPUT,
  CONTACT_WORK,
  CONTACT_WORK_GROUP,
  CONTACT_PERSONAL,
  CONTACT_FAMILY,
  CONTACT_ORGANISATION,
  CONTACT_NOTICED_USAGE,
  CONTACT_DO_NOT_CALL,
];

/**
 * @const RelationTypeValueNumbers values order
 */
const RelationTypeValueNumbers = {
  /**
   * No access granted. This type of edges could be purged automatically, but could be preserved for history management purposes.
   */
  RESTRICTED: 0,
  /**
   * Gives control over read and reset trigger
   */
  CAN_RESET: 1,
  /**
   * Defines ability to read information both metadata and payload about entity and same access to everything it represents.
   */
  CAN_READ: 3,
  /**
   * Defines permission to update content of entity payload not affecting any of its accessRules (including access accessRules? TBD)
   */
  CAN_WRITE: 7,
  /**
   * Gives ability to discover entity.
   */
  CAN_READ_RELATIONS: 15,
  /**
   * Gives ability to re-link entity relations (including access rights).
   */
  CAN_WRITE_RELATIONS: 31,
  /**
   * Entity owner that means all entities related that way should have same lifecycle as user profile.
   * Ownership supposing wide access but with exception if operation may violate core business logic
   * or will create some conflict/integrity situation which not possible to resolve for owner user.
   * E.g. user is owner for his single E-Mail record, but system will reject its deletion request
   * until any alternative email record that resolving conflict will be provided.
   */
  OWNS: 64,
  /**
   * On permissions level it works like Owner but semantically this does not means that target entity is something
   * user manages as his own __private thing__ like his named `Human` profile or `Credential` records
   * so its better for temporary owners or managing public entities.
   * Also there are supposed to be single owner for entity, but many administrators are possible.
   * This difference should be considered at UI client applications level and may affect entities traverse order
   * but `Administrator` = `Owner` at permissions level.
   */
  ADMINISTRATING: 66,
  /**
   * Entity creator, its completely metadata level relation that should not have direct effect on permission level
   * but may affect API discovery priorities and discovery output filtering (mostly for UI needs)
   */
  CREATED: 68,
  /**
   * Entity acting as separate part of other entity that means access level similar to compound parent
   */
  HAVE_PART: 72,
  /**
   * Organisations and groups could have members
   */
  HAVE_MEMBER: 78,
  /**
   * Operation input and other kinds of inputs
   */
  INPUT: 80,
  /**
   * Operation output and other kinds of outputs
   */
  OUTPUT: 82,
  /**
   * Work contact
   */
  CONTACT_WORK: 104,
  /**
   * Work group contact
   */
  CONTACT_WORK_GROUP: 106,
  /**
   * Personal use contact
   */
  CONTACT_PERSONAL: 110,
  /**
   * Family contact
   */
  CONTACT_FAMILY: 112,
  /**
   * Contact of organisation related to many agents/agents group
   */
  CONTACT_ORGANISATION: 116,
  /**
   * Family contact
   */
  CONTACT_NOTICED_USAGE: 120,
  /**
   * Don't use this contact against defined agent for live actions
   */
  CONTACT_DO_NOT_CALL: 128,
};


/**
 * @section Direction
 * .anymetrica.request.Direction
 * 
 * The sort direction.
 */

/**
 * @const DIRECTION_UNSPECIFIED
 * 
 * Unspecified. This value must not be used.
 */
const DIRECTION_UNSPECIFIED = 'DIRECTION_UNSPECIFIED';

/**
 * @const ASCENDING
 * 
 * Ascending.
 */
const ASCENDING = 'ASCENDING';

/**
 * @const DESCENDING
 * 
 * Descending.
 */
const DESCENDING = 'DESCENDING';


/**
 * @const Direction
 * 
 * The sort direction.
 */
const Direction = {
  /**
   * Unspecified. This value must not be used.
   */
  [DIRECTION_UNSPECIFIED]: DIRECTION_UNSPECIFIED,
  /**
   * Ascending.
   */
  [ASCENDING]: ASCENDING,
  /**
   * Descending.
   */
  [DESCENDING]: DESCENDING,
};

/**
 * @const DirectionArr - values array
 */
const DirectionArr = [
  DIRECTION_UNSPECIFIED,
  ASCENDING,
  DESCENDING,
];

/**
 * @const DirectionValueNumbers values order
 */
const DirectionValueNumbers = {
  /**
   * Unspecified. This value must not be used.
   */
  DIRECTION_UNSPECIFIED: 0,
  /**
   * Ascending.
   */
  ASCENDING: 1,
  /**
   * Descending.
   */
  DESCENDING: 2,
};


/**
 * @section MoreResultsType
 * .anymetrica.request.MoreResultsType
 * 
 * The possible values for the `more_results` field.
 */

/**
 * @const MORE_RESULTS_TYPE_UNSPECIFIED
 * 
 * Unspecified. This value is never used.
 */
const MORE_RESULTS_TYPE_UNSPECIFIED = 'MORE_RESULTS_TYPE_UNSPECIFIED';

/**
 * @const NOT_FINISHED
 * 
 * There may be additional batches to fetch from this query.
 */
const NOT_FINISHED = 'NOT_FINISHED';

/**
 * @const MORE_RESULTS_AFTER_LIMIT
 * 
 * The query is finished, but there may be more results after the limit.
 */
const MORE_RESULTS_AFTER_LIMIT = 'MORE_RESULTS_AFTER_LIMIT';

/**
 * @const NO_MORE_RESULTS
 * 
 * The query is finished, and there are no more results.
 */
const NO_MORE_RESULTS = 'NO_MORE_RESULTS';

/**
 * @const MORE_RESULTS_AFTER_CURSOR
 * 
 * The query is finished, but there may be more results after the end
 * cursor.
 */
const MORE_RESULTS_AFTER_CURSOR = 'MORE_RESULTS_AFTER_CURSOR';


/**
 * @const MoreResultsType
 * 
 * The possible values for the `more_results` field.
 */
const MoreResultsType = {
  /**
   * Unspecified. This value is never used.
   */
  [MORE_RESULTS_TYPE_UNSPECIFIED]: MORE_RESULTS_TYPE_UNSPECIFIED,
  /**
   * There may be additional batches to fetch from this query.
   */
  [NOT_FINISHED]: NOT_FINISHED,
  /**
   * The query is finished, but there may be more results after the limit.
   */
  [MORE_RESULTS_AFTER_LIMIT]: MORE_RESULTS_AFTER_LIMIT,
  /**
   * The query is finished, and there are no more results.
   */
  [NO_MORE_RESULTS]: NO_MORE_RESULTS,
  /**
   * The query is finished, but there may be more results after the end
   * cursor.
   */
  [MORE_RESULTS_AFTER_CURSOR]: MORE_RESULTS_AFTER_CURSOR,
};

/**
 * @const MoreResultsTypeArr - values array
 */
const MoreResultsTypeArr = [
  MORE_RESULTS_TYPE_UNSPECIFIED,
  NOT_FINISHED,
  MORE_RESULTS_AFTER_LIMIT,
  NO_MORE_RESULTS,
  MORE_RESULTS_AFTER_CURSOR,
];

/**
 * @const MoreResultsTypeValueNumbers values order
 */
const MoreResultsTypeValueNumbers = {
  /**
   * Unspecified. This value is never used.
   */
  MORE_RESULTS_TYPE_UNSPECIFIED: 0,
  /**
   * There may be additional batches to fetch from this query.
   */
  NOT_FINISHED: 1,
  /**
   * The query is finished, but there may be more results after the limit.
   */
  MORE_RESULTS_AFTER_LIMIT: 2,
  /**
   * The query is finished, and there are no more results.
   */
  NO_MORE_RESULTS: 3,
  /**
   * The query is finished, but there may be more results after the end
   * cursor.
   */
  MORE_RESULTS_AFTER_CURSOR: 4,
};


/**
 * @section AudioEncoding
 * .anymetrica.vad.RecognitionConfig.AudioEncoding
 * 
 * Audio encoding of the data sent in the audio message. All encodings support
 * only 1 channel (mono) audio. Only `FLAC` and `WAV` include a header that
 * describes the bytes of audio that follow the header. The other encodings
 * are raw audio bytes with no header.
 * 
 * For best results, the audio source should be captured and transmitted using
 * a lossless encoding (`FLAC` or `LINEAR16`). Recognition accuracy may be
 * reduced if lossy codecs, which include the other codecs listed in
 * this section, are used to capture or transmit the audio, particularly if
 * background noise is present.
 */

/**
 * @const ENCODING_UNSPECIFIED
 * 
 * Not specified. Will return result [google.rpc.Code.INVALID_ARGUMENT][google.rpc.Code.INVALID_ARGUMENT].
 */
const ENCODING_UNSPECIFIED = 'ENCODING_UNSPECIFIED';

/**
 * @const LINEAR16
 * 
 * Uncompressed 16-bit signed little-endian samples (Linear PCM).
 */
const LINEAR16 = 'LINEAR16';

/**
 * @const FLAC
 * 
 * [`FLAC`](https://xiph.org/flac/documentation.html) (Free Lossless Audio
 * Codec) is the recommended encoding because it is
 * lossless--therefore recognition is not compromised--and
 * requires only about half the bandwidth of `LINEAR16`. `FLAC` stream
 * encoding supports 16-bit and 24-bit samples, however, not all fields in
 * `STREAMINFO` are supported.
 */
const FLAC = 'FLAC';

/**
 * @const MULAW
 * 
 * 8-bit samples that compand 14-bit audio samples using G.711 PCMU/mu-law.
 */
const MULAW = 'MULAW';

/**
 * @const AMR
 * 
 * Adaptive Multi-Rate Narrowband codec. `sample_rate_hertz` must be 8000.
 */
const AMR = 'AMR';

/**
 * @const AMR_WB
 * 
 * Adaptive Multi-Rate Wideband codec. `sample_rate_hertz` must be 16000.
 */
const AMR_WB = 'AMR_WB';

/**
 * @const OGG_OPUS
 * 
 * Opus encoded audio frames in Ogg container
 * ([OggOpus](https://wiki.xiph.org/OggOpus)).
 * `sample_rate_hertz` must be 16000.
 */
const OGG_OPUS = 'OGG_OPUS';

/**
 * @const SPEEX_WITH_HEADER_BYTE
 * 
 * Although the use of lossy encodings is not recommended, if a very low
 * bitrate encoding is required, `OGG_OPUS` is highly preferred over
 * Speex encoding. The [Speex](https://speex.org/)  encoding supported by
 * Cloud Speech API has a header byte in each block, as in MIME type
 * `audio/x-speex-with-header-byte`.
 * It is a variant of the RTP Speex encoding defined in
 * [RFC 5574](https://tools.ietf.org/html/rfc5574).
 * The stream is a sequence of blocks, one block per RTP packet. Each block
 * starts with a byte containing the length of the block, in bytes, followed
 * by one or more frames of Speex data, padded to an integral number of
 * bytes (octets) as specified in RFC 5574. In other words, each RTP header
 * is replaced with a single byte containing the block length. Only Speex
 * wideband is supported. `sample_rate_hertz` must be 16000.
 */
const SPEEX_WITH_HEADER_BYTE = 'SPEEX_WITH_HEADER_BYTE';


/**
 * @const AudioEncoding
 * 
 * Audio encoding of the data sent in the audio message. All encodings support
 * only 1 channel (mono) audio. Only `FLAC` and `WAV` include a header that
 * describes the bytes of audio that follow the header. The other encodings
 * are raw audio bytes with no header.
 * 
 * For best results, the audio source should be captured and transmitted using
 * a lossless encoding (`FLAC` or `LINEAR16`). Recognition accuracy may be
 * reduced if lossy codecs, which include the other codecs listed in
 * this section, are used to capture or transmit the audio, particularly if
 * background noise is present.
 */
const AudioEncoding = {
  /**
   * Not specified. Will return result [google.rpc.Code.INVALID_ARGUMENT][google.rpc.Code.INVALID_ARGUMENT].
   */
  [ENCODING_UNSPECIFIED]: ENCODING_UNSPECIFIED,
  /**
   * Uncompressed 16-bit signed little-endian samples (Linear PCM).
   */
  [LINEAR16]: LINEAR16,
  /**
   * [`FLAC`](https://xiph.org/flac/documentation.html) (Free Lossless Audio
   * Codec) is the recommended encoding because it is
   * lossless--therefore recognition is not compromised--and
   * requires only about half the bandwidth of `LINEAR16`. `FLAC` stream
   * encoding supports 16-bit and 24-bit samples, however, not all fields in
   * `STREAMINFO` are supported.
   */
  [FLAC]: FLAC,
  /**
   * 8-bit samples that compand 14-bit audio samples using G.711 PCMU/mu-law.
   */
  [MULAW]: MULAW,
  /**
   * Adaptive Multi-Rate Narrowband codec. `sample_rate_hertz` must be 8000.
   */
  [AMR]: AMR,
  /**
   * Adaptive Multi-Rate Wideband codec. `sample_rate_hertz` must be 16000.
   */
  [AMR_WB]: AMR_WB,
  /**
   * Opus encoded audio frames in Ogg container
   * ([OggOpus](https://wiki.xiph.org/OggOpus)).
   * `sample_rate_hertz` must be 16000.
   */
  [OGG_OPUS]: OGG_OPUS,
  /**
   * Although the use of lossy encodings is not recommended, if a very low
   * bitrate encoding is required, `OGG_OPUS` is highly preferred over
   * Speex encoding. The [Speex](https://speex.org/)  encoding supported by
   * Cloud Speech API has a header byte in each block, as in MIME type
   * `audio/x-speex-with-header-byte`.
   * It is a variant of the RTP Speex encoding defined in
   * [RFC 5574](https://tools.ietf.org/html/rfc5574).
   * The stream is a sequence of blocks, one block per RTP packet. Each block
   * starts with a byte containing the length of the block, in bytes, followed
   * by one or more frames of Speex data, padded to an integral number of
   * bytes (octets) as specified in RFC 5574. In other words, each RTP header
   * is replaced with a single byte containing the block length. Only Speex
   * wideband is supported. `sample_rate_hertz` must be 16000.
   */
  [SPEEX_WITH_HEADER_BYTE]: SPEEX_WITH_HEADER_BYTE,
};

/**
 * @const AudioEncodingArr - values array
 */
const AudioEncodingArr = [
  ENCODING_UNSPECIFIED,
  LINEAR16,
  FLAC,
  MULAW,
  AMR,
  AMR_WB,
  OGG_OPUS,
  SPEEX_WITH_HEADER_BYTE,
];

/**
 * @const AudioEncodingValueNumbers values order
 */
const AudioEncodingValueNumbers = {
  /**
   * Not specified. Will return result [google.rpc.Code.INVALID_ARGUMENT][google.rpc.Code.INVALID_ARGUMENT].
   */
  ENCODING_UNSPECIFIED: 0,
  /**
   * Uncompressed 16-bit signed little-endian samples (Linear PCM).
   */
  LINEAR16: 1,
  /**
   * [`FLAC`](https://xiph.org/flac/documentation.html) (Free Lossless Audio
   * Codec) is the recommended encoding because it is
   * lossless--therefore recognition is not compromised--and
   * requires only about half the bandwidth of `LINEAR16`. `FLAC` stream
   * encoding supports 16-bit and 24-bit samples, however, not all fields in
   * `STREAMINFO` are supported.
   */
  FLAC: 2,
  /**
   * 8-bit samples that compand 14-bit audio samples using G.711 PCMU/mu-law.
   */
  MULAW: 3,
  /**
   * Adaptive Multi-Rate Narrowband codec. `sample_rate_hertz` must be 8000.
   */
  AMR: 4,
  /**
   * Adaptive Multi-Rate Wideband codec. `sample_rate_hertz` must be 16000.
   */
  AMR_WB: 5,
  /**
   * Opus encoded audio frames in Ogg container
   * ([OggOpus](https://wiki.xiph.org/OggOpus)).
   * `sample_rate_hertz` must be 16000.
   */
  OGG_OPUS: 6,
  /**
   * Although the use of lossy encodings is not recommended, if a very low
   * bitrate encoding is required, `OGG_OPUS` is highly preferred over
   * Speex encoding. The [Speex](https://speex.org/)  encoding supported by
   * Cloud Speech API has a header byte in each block, as in MIME type
   * `audio/x-speex-with-header-byte`.
   * It is a variant of the RTP Speex encoding defined in
   * [RFC 5574](https://tools.ietf.org/html/rfc5574).
   * The stream is a sequence of blocks, one block per RTP packet. Each block
   * starts with a byte containing the length of the block, in bytes, followed
   * by one or more frames of Speex data, padded to an integral number of
   * bytes (octets) as specified in RFC 5574. In other words, each RTP header
   * is replaced with a single byte containing the block length. Only Speex
   * wideband is supported. `sample_rate_hertz` must be 16000.
   */
  SPEEX_WITH_HEADER_BYTE: 7,
};


/**
 * @section VadEventType
 * .anymetrica.vad.VadEventType
 * 
 * Vad events
 * https://www.npmjs.com/package/node-vad
 */

/**
 * @const VAD_EVENT_UNSPECIFIED
 */
const VAD_EVENT_UNSPECIFIED = 'VAD_EVENT_UNSPECIFIED';

/**
 * @const VAD_EVENT_SILENCE
 */
const VAD_EVENT_SILENCE = 'VAD_EVENT_SILENCE';

/**
 * @const VAD_EVENT_NOISE
 */
const VAD_EVENT_NOISE = 'VAD_EVENT_NOISE';

/**
 * @const VAD_EVENT_VOICE
 */
const VAD_EVENT_VOICE = 'VAD_EVENT_VOICE';

/**
 * @const VAD_EVENT_VOICE_MULTI
 */
const VAD_EVENT_VOICE_MULTI = 'VAD_EVENT_VOICE_MULTI';


/**
 * @const VadEventType
 * 
 * Vad events
 * https://www.npmjs.com/package/node-vad
 */
const VadEventType = {
  [VAD_EVENT_UNSPECIFIED]: VAD_EVENT_UNSPECIFIED,
  [VAD_EVENT_SILENCE]: VAD_EVENT_SILENCE,
  [VAD_EVENT_NOISE]: VAD_EVENT_NOISE,
  [VAD_EVENT_VOICE]: VAD_EVENT_VOICE,
  [VAD_EVENT_VOICE_MULTI]: VAD_EVENT_VOICE_MULTI,
};

/**
 * @const VadEventTypeArr - values array
 */
const VadEventTypeArr = [
  VAD_EVENT_UNSPECIFIED,
  VAD_EVENT_SILENCE,
  VAD_EVENT_NOISE,
  VAD_EVENT_VOICE,
  VAD_EVENT_VOICE_MULTI,
];

/**
 * @const VadEventTypeValueNumbers values order
 */
const VadEventTypeValueNumbers = {
  VAD_EVENT_UNSPECIFIED: 0,
  VAD_EVENT_SILENCE: 2,
  VAD_EVENT_NOISE: 4,
  VAD_EVENT_VOICE: 8,
  VAD_EVENT_VOICE_MULTI: 16,
};


/**
 * @section VehicleType
 * .anymetrica.vehicle.VehicleType
 * 
 * Vehicle type
 */

/**
 * @const VEHICLE_UNSPECIFIED
 */
const VEHICLE_UNSPECIFIED = 'VEHICLE_UNSPECIFIED';

/**
 * @const VEHICLE_OTHER
 */
const VEHICLE_OTHER = 'VEHICLE_OTHER';

/**
 * @const VEHICLE_CAR
 * 
 * Wheel
 */
const VEHICLE_CAR = 'VEHICLE_CAR';

/**
 * @const VEHICLE_TRUCK
 */
const VEHICLE_TRUCK = 'VEHICLE_TRUCK';

/**
 * @const VEHICLE_TRAILER
 */
const VEHICLE_TRAILER = 'VEHICLE_TRAILER';

/**
 * @const VEHICLE_MOTORCYCLE
 */
const VEHICLE_MOTORCYCLE = 'VEHICLE_MOTORCYCLE';

/**
 * @const VEHICLE_TRACTOR
 */
const VEHICLE_TRACTOR = 'VEHICLE_TRACTOR';

/**
 * @const VEHICLE_WATERCRAFT_UNSPECIFIED
 * 
 * Watercraft
 */
const VEHICLE_WATERCRAFT_UNSPECIFIED = 'VEHICLE_WATERCRAFT_UNSPECIFIED';

/**
 * @const VEHICLE_WATERCRAFT_OTHER
 */
const VEHICLE_WATERCRAFT_OTHER = 'VEHICLE_WATERCRAFT_OTHER';

/**
 * @const VEHICLE_WATERCRAFT_SHIP
 */
const VEHICLE_WATERCRAFT_SHIP = 'VEHICLE_WATERCRAFT_SHIP';

/**
 * @const VEHICLE_WATERCRAFT_BOAT
 */
const VEHICLE_WATERCRAFT_BOAT = 'VEHICLE_WATERCRAFT_BOAT';

/**
 * @const VEHICLE_AIRCRAFT_UNSPECIFIED
 * 
 * Aircraft
 */
const VEHICLE_AIRCRAFT_UNSPECIFIED = 'VEHICLE_AIRCRAFT_UNSPECIFIED';

/**
 * @const VEHICLE_AIRCRAFT_OTHER
 */
const VEHICLE_AIRCRAFT_OTHER = 'VEHICLE_AIRCRAFT_OTHER';

/**
 * @const VEHICLE_AIRCRAFT_PLANE
 */
const VEHICLE_AIRCRAFT_PLANE = 'VEHICLE_AIRCRAFT_PLANE';


/**
 * @const VehicleType
 * 
 * Vehicle type
 */
const VehicleType = {
  [VEHICLE_UNSPECIFIED]: VEHICLE_UNSPECIFIED,
  [VEHICLE_OTHER]: VEHICLE_OTHER,
  /**
   * Wheel
   */
  [VEHICLE_CAR]: VEHICLE_CAR,
  [VEHICLE_TRUCK]: VEHICLE_TRUCK,
  [VEHICLE_TRAILER]: VEHICLE_TRAILER,
  [VEHICLE_MOTORCYCLE]: VEHICLE_MOTORCYCLE,
  [VEHICLE_TRACTOR]: VEHICLE_TRACTOR,
  /**
   * Watercraft
   */
  [VEHICLE_WATERCRAFT_UNSPECIFIED]: VEHICLE_WATERCRAFT_UNSPECIFIED,
  [VEHICLE_WATERCRAFT_OTHER]: VEHICLE_WATERCRAFT_OTHER,
  [VEHICLE_WATERCRAFT_SHIP]: VEHICLE_WATERCRAFT_SHIP,
  [VEHICLE_WATERCRAFT_BOAT]: VEHICLE_WATERCRAFT_BOAT,
  /**
   * Aircraft
   */
  [VEHICLE_AIRCRAFT_UNSPECIFIED]: VEHICLE_AIRCRAFT_UNSPECIFIED,
  [VEHICLE_AIRCRAFT_OTHER]: VEHICLE_AIRCRAFT_OTHER,
  [VEHICLE_AIRCRAFT_PLANE]: VEHICLE_AIRCRAFT_PLANE,
};

/**
 * @const VehicleTypeArr - values array
 */
const VehicleTypeArr = [
  VEHICLE_UNSPECIFIED,
  VEHICLE_OTHER,
  VEHICLE_CAR,
  VEHICLE_TRUCK,
  VEHICLE_TRAILER,
  VEHICLE_MOTORCYCLE,
  VEHICLE_TRACTOR,
  VEHICLE_WATERCRAFT_UNSPECIFIED,
  VEHICLE_WATERCRAFT_OTHER,
  VEHICLE_WATERCRAFT_SHIP,
  VEHICLE_WATERCRAFT_BOAT,
  VEHICLE_AIRCRAFT_UNSPECIFIED,
  VEHICLE_AIRCRAFT_OTHER,
  VEHICLE_AIRCRAFT_PLANE,
];

/**
 * @const VehicleTypeValueNumbers values order
 */
const VehicleTypeValueNumbers = {
  VEHICLE_UNSPECIFIED: 0,
  VEHICLE_OTHER: 1,
  /**
   * Wheel
   */
  VEHICLE_CAR: 8,
  VEHICLE_TRUCK: 9,
  VEHICLE_TRAILER: 10,
  VEHICLE_MOTORCYCLE: 32,
  VEHICLE_TRACTOR: 64,
  /**
   * Watercraft
   */
  VEHICLE_WATERCRAFT_UNSPECIFIED: 128,
  VEHICLE_WATERCRAFT_OTHER: 129,
  VEHICLE_WATERCRAFT_SHIP: 140,
  VEHICLE_WATERCRAFT_BOAT: 141,
  /**
   * Aircraft
   */
  VEHICLE_AIRCRAFT_UNSPECIFIED: 192,
  VEHICLE_AIRCRAFT_OTHER: 193,
  VEHICLE_AIRCRAFT_PLANE: 224,
};



module.exports = {

  // ContactType
  ContactType,
  ContactTypeArr,
  ContactTypeValueNumbers,

  CONTACT_UNSPECIFIED,
  CONTACT_OTHER,
  CONTACT_PHONE,
  CONTACT_EMAIL,
  CONTACT_FAX,
  CONTACT_JABBER,
  CONTACT_DISCORD,
  CONTACT_SKYPE,
  CONTACT_MSN,
  CONTACT_ICQ,
  CONTACT_FACEBOOK_ID,
  CONTACT_BADOO_LOGIN,
  CONTACT_BAIDU_ID,
  CONTACT_VKONTAKTE_ID,

  // DeviceType
  DeviceType,
  DeviceTypeArr,
  DeviceTypeValueNumbers,

  UNSPECIFIED,
  OTHER,
  POLYMORPHIC,
  PHONE,
  TABLET,
  DESKTOP,
  TAG,
  BADGE,
  SMART_WATCH,
  FITNESS_DEVICE,
  SOUND_RECORDER,
  VIDEO_RECORDER,
  ROBOTIC,

  // EntityType
  EntityType,
  EntityTypeArr,
  EntityTypeValueNumbers,

  EntityUnknown,
  PostalAddress,
  Waveform,
  Group,
  Relation,
  DemoRequestInfo,
  File,
  SessionToken,
  Operation,
  Organization,
  VadResult,
  TOTP,
  Vehicle,
  Device,
  Contact,
  Location,
  UsernamePassword,
  Human,
  OTP,

  // EntityTypePlural
  EntityTypePlural,
  EntityTypePluralArr,
  EntityTypePluralValueNumbers,

  EntitiesUnknown,
  PostalAddresses,
  Waveforms,
  Groups,
  Files,
  SessionTokens,
  Operations,
  Organizations,
  VadResults,
  TOTPs,
  Vehicles,
  Devices,
  Contacts,
  Locations,
  UsernamePasswords,
  Humans,
  OTPs,

  // ContentType
  ContentType,
  ContentTypeArr,
  ContentTypeValueNumbers,

  CONTENT_TYPE_UNSPECIFIED,
  application,
  audio,
  example,
  font,
  image,
  message,
  model,
  multipart,
  text,
  video,

  // HashType
  HashType,
  HashTypeArr,
  HashTypeValueNumbers,

  HASH_TYPE_UNSPECIFIED,
  HASH_TYPE_PLAIN_TEXT,
  HASH_TYPE_MD5,
  HASH_TYPE_SHA_0_160,
  HASH_TYPE_SHA_1_160,
  HASH_TYPE_SHA_2_224,
  HASH_TYPE_SHA_2_256,
  HASH_TYPE_SHA_2_384,
  HASH_TYPE_SHA_2_512,
  HASH_TYPE_SHA_2_512_256,
  HASH_TYPE_SHA_2_512_224,
  HASH_TYPE_SIP_HASH_32,
  HASH_TYPE_SIP_HASH_64,
  HASH_TYPE_CITY_64,
  HASH_TYPE_CITY_128,
  HASH_TYPE_CITY128_CRC,
  HASH_TYPE_METRO_32,
  HASH_TYPE_METRO_64,
  HASH_TYPE_METRO_128,
  HASH_TYPE_METRO_128_CRC,

  // RelationType
  RelationType,
  RelationTypeArr,
  RelationTypeValueNumbers,

  RESTRICTED,
  CAN_RESET,
  CAN_READ,
  CAN_WRITE,
  CAN_READ_RELATIONS,
  CAN_WRITE_RELATIONS,
  OWNS,
  ADMINISTRATING,
  CREATED,
  HAVE_PART,
  HAVE_MEMBER,
  INPUT,
  OUTPUT,
  CONTACT_WORK,
  CONTACT_WORK_GROUP,
  CONTACT_PERSONAL,
  CONTACT_FAMILY,
  CONTACT_ORGANISATION,
  CONTACT_NOTICED_USAGE,
  CONTACT_DO_NOT_CALL,

  // Direction
  Direction,
  DirectionArr,
  DirectionValueNumbers,

  DIRECTION_UNSPECIFIED,
  ASCENDING,
  DESCENDING,

  // MoreResultsType
  MoreResultsType,
  MoreResultsTypeArr,
  MoreResultsTypeValueNumbers,

  MORE_RESULTS_TYPE_UNSPECIFIED,
  NOT_FINISHED,
  MORE_RESULTS_AFTER_LIMIT,
  NO_MORE_RESULTS,
  MORE_RESULTS_AFTER_CURSOR,

  // AudioEncoding
  AudioEncoding,
  AudioEncodingArr,
  AudioEncodingValueNumbers,

  ENCODING_UNSPECIFIED,
  LINEAR16,
  FLAC,
  MULAW,
  AMR,
  AMR_WB,
  OGG_OPUS,
  SPEEX_WITH_HEADER_BYTE,

  // VadEventType
  VadEventType,
  VadEventTypeArr,
  VadEventTypeValueNumbers,

  VAD_EVENT_UNSPECIFIED,
  VAD_EVENT_SILENCE,
  VAD_EVENT_NOISE,
  VAD_EVENT_VOICE,
  VAD_EVENT_VOICE_MULTI,

  // VehicleType
  VehicleType,
  VehicleTypeArr,
  VehicleTypeValueNumbers,

  VEHICLE_UNSPECIFIED,
  VEHICLE_OTHER,
  VEHICLE_CAR,
  VEHICLE_TRUCK,
  VEHICLE_TRAILER,
  VEHICLE_MOTORCYCLE,
  VEHICLE_TRACTOR,
  VEHICLE_WATERCRAFT_UNSPECIFIED,
  VEHICLE_WATERCRAFT_OTHER,
  VEHICLE_WATERCRAFT_SHIP,
  VEHICLE_WATERCRAFT_BOAT,
  VEHICLE_AIRCRAFT_UNSPECIFIED,
  VEHICLE_AIRCRAFT_OTHER,
  VEHICLE_AIRCRAFT_PLANE,
};
