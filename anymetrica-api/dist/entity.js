/**
 * @fileOverview RPC Entities constants
 */


/**
 * @const EntityUnknown
 */
const EntityUnknown = 'EntityUnknown';

/**
 * @const Contact
 */
const Contact = 'Contact';

/**
 * @const DemoRequestInfo
 */
const DemoRequestInfo = 'DemoRequestInfo';

/**
 * @const Device
 */
const Device = 'Device';

/**
 * @const File
 */
const File = 'File';

/**
 * @const Group
 */
const Group = 'Group';

/**
 * @const Human
 */
const Human = 'Human';

/**
 * @const Location
 */
const Location = 'Location';

/**
 * @const OTP
 */
const OTP = 'OTP';

/**
 * @const Operation
 */
const Operation = 'Operation';

/**
 * @const Organization
 */
const Organization = 'Organization';

/**
 * @const PostalAddress
 */
const PostalAddress = 'PostalAddress';

/**
 * @const Relation
 */
const Relation = 'Relation';

/**
 * @const SessionToken
 */
const SessionToken = 'SessionToken';

/**
 * @const TOTP
 */
const TOTP = 'TOTP';

/**
 * @const UsernamePassword
 */
const UsernamePassword = 'UsernamePassword';

/**
 * @const VadResult
 */
const VadResult = 'VadResult';

/**
 * @const Vehicle
 */
const Vehicle = 'Vehicle';

/**
 * @const Waveform
 */
const Waveform = 'Waveform';

/**
 * @const ENTITY_TYPE
 * 
 * Entity type names
 */
const ENTITY_TYPE = {
  EntityUnknown: EntityUnknown,
  Contact: Contact,
  DemoRequestInfo: DemoRequestInfo,
  Device: Device,
  File: File,
  Group: Group,
  Human: Human,
  Location: Location,
  OTP: OTP,
  Operation: Operation,
  Organization: Organization,
  PostalAddress: PostalAddress,
  Relation: Relation,
  SessionToken: SessionToken,
  TOTP: TOTP,
  UsernamePassword: UsernamePassword,
  VadResult: VadResult,
  Vehicle: Vehicle,
  Waveform: Waveform,
};


/**
 * @const EntitiesUnknown
 */
const EntitiesUnknown = 'EntitiesUnknown';

/**
 * @const Contacts
 */
const Contacts = 'Contacts';

/**
 * @const Devices
 */
const Devices = 'Devices';

/**
 * @const Files
 */
const Files = 'Files';

/**
 * @const Groups
 */
const Groups = 'Groups';

/**
 * @const Humans
 */
const Humans = 'Humans';

/**
 * @const Locations
 */
const Locations = 'Locations';

/**
 * @const OTPs
 */
const OTPs = 'OTPs';

/**
 * @const Operations
 */
const Operations = 'Operations';

/**
 * @const Organizations
 */
const Organizations = 'Organizations';

/**
 * @const PostalAddresses
 */
const PostalAddresses = 'PostalAddresses';

/**
 * @const SessionTokens
 */
const SessionTokens = 'SessionTokens';

/**
 * @const TOTPs
 */
const TOTPs = 'TOTPs';

/**
 * @const UsernamePasswords
 */
const UsernamePasswords = 'UsernamePasswords';

/**
 * @const VadResults
 */
const VadResults = 'VadResults';

/**
 * @const Vehicles
 */
const Vehicles = 'Vehicles';

/**
 * @const Waveforms
 */
const Waveforms = 'Waveforms';

/**
 * @const ENTITY_TYPE_PLURAL
 * 
 * Entity plural type names
 */
const ENTITY_TYPE_PLURAL = {
  EntitiesUnknown: EntitiesUnknown,
  Contacts: Contacts,
  Devices: Devices,
  Files: Files,
  Groups: Groups,
  Humans: Humans,
  Locations: Locations,
  OTPs: OTPs,
  Operations: Operations,
  Organizations: Organizations,
  PostalAddresses: PostalAddresses,
  SessionTokens: SessionTokens,
  TOTPs: TOTPs,
  UsernamePasswords: UsernamePasswords,
  VadResults: VadResults,
  Vehicles: Vehicles,
  Waveforms: Waveforms,
};

/**
 * @const ENTITY_TYPE_TO_PLURAL
 * 
 * Entity names to plural
 */
const ENTITY_TYPE_TO_PLURAL = {
  EntityUnknown: EntitiesUnknown,
  Contact: Contacts,
  Device: Devices,
  File: Files,
  Group: Groups,
  Human: Humans,
  Location: Locations,
  OTP: OTPs,
  Operation: Operations,
  Organization: Organizations,
  PostalAddress: PostalAddresses,
  SessionToken: SessionTokens,
  TOTP: TOTPs,
  UsernamePassword: UsernamePasswords,
  VadResult: VadResults,
  Vehicle: Vehicles,
  Waveform: Waveforms,
};

module.exports = {
  ENTITY_TYPE,
  ENTITY_TYPE_PLURAL,
  ENTITY_TYPE_TO_PLURAL,

  // Entity types
  EntityUnknown,
  Contact,
  DemoRequestInfo,
  Device,
  File,
  Group,
  Human,
  Location,
  OTP,
  Operation,
  Organization,
  PostalAddress,
  Relation,
  SessionToken,
  TOTP,
  UsernamePassword,
  VadResult,
  Vehicle,
  Waveform,

  // Entity types plural
  EntitiesUnknown,
  Contacts,
  Devices,
  Files,
  Groups,
  Humans,
  Locations,
  OTPs,
  Operations,
  Organizations,
  PostalAddresses,
  SessionTokens,
  TOTPs,
  UsernamePasswords,
  VadResults,
  Vehicles,
  Waveforms,
};
