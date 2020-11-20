/* @flow */
/**
 * @fileOverview RPC handlers
 */
import {
  Contact,
  DemoRequestInfo,
  Device,
  File,
  Group,
  Human,
  Location,
  Organization,
  OTP,
  PostalAddress,
  SessionToken,
  TOTP,
  UsernamePassword,
  VadResult,
  Vehicle,
  Waveform,
} from 'anymetrica-api/dist/enums';
import { MergeHandler } from './MergeHandler';
import { GetHandler } from './GetHandler';
import { DeleteHandler } from './DeleteHandler';
import { HeartbeatHandler } from './HeartbeatHandler';
import { makeHandler } from '../utils/handlers';
import { GetRelationsHandler } from './GetRelationsHandler';
import { MergeRelationsHandler } from './MergeRelationsHandler';
import { RemoveRelationsHandler } from './RemoveRelationsHandler';
import { ReplaceRelationsHandler } from './ReplaceRelationsHandler';
import { GetCredentialHandler } from './GetCredentialHandler';
import { TransferOwnershipsHandler } from './TransferOwnershipsHandler';
import { RequestDemoHandler } from './RequestDemoHandler';

export const RPC_HANDLERS = {

  // Heartbeat
  Heartbeat: makeHandler(HeartbeatHandler),

  // Entities common
  Delete: makeHandler(DeleteHandler),
  GetMetadata: makeHandler(GetHandler),

  // Relations
  Discover: makeHandler(GetRelationsHandler),
  GetRelations: makeHandler(GetRelationsHandler),
  MergeRelations: makeHandler(MergeRelationsHandler),
  RemoveRelations: makeHandler(RemoveRelationsHandler),
  // TODO: Implement ReplaceRelationsHandler
  ReplaceRelations: makeHandler(ReplaceRelationsHandler),
  // TODO: Implement TransferOwnershipsHandler
  TransferOwnerships: makeHandler(TransferOwnershipsHandler),

  // TOTP
  MergeTOTPs: makeHandler(MergeHandler, TOTP),
  GetTOTPs: makeHandler(GetCredentialHandler, TOTP),

  // OTP
  MergeOTPs: makeHandler(MergeHandler, OTP),
  GetOTPs: makeHandler(GetCredentialHandler, OTP),

  // SessionToken
  MergeSessionTokens: makeHandler(MergeHandler, SessionToken),
  GetSessionTokens: makeHandler(GetCredentialHandler, SessionToken),

  // UsernamePassword
  MergeUsernamePasswords: makeHandler(MergeHandler, UsernamePassword),
  GetUsernamePasswords: makeHandler(GetCredentialHandler, UsernamePassword),

  // Human
  MergeHumans: makeHandler(MergeHandler, Human),
  GetHumans: makeHandler(GetHandler, Human),

  // Device
  MergeDevices: makeHandler(MergeHandler, Device),
  GetDevices: makeHandler(GetHandler, Device),

  // Contact
  MergeContacts: makeHandler(MergeHandler, Contact),
  GetContacts: makeHandler(GetHandler, Contact),

  // Group
  MergeGroups: makeHandler(MergeHandler, Group),
  GetGroups: makeHandler(GetHandler, Group),

  // Vehicle
  MergeVehicles: makeHandler(MergeHandler, Vehicle),
  GetVehicles: makeHandler(GetHandler, Vehicle),

  // File
  MergeFiles: makeHandler(MergeHandler, File),
  GetFiles: makeHandler(GetHandler, File),

  // Organization
  MergeOrganizations: makeHandler(MergeHandler, Organization),
  GetOrganizations: makeHandler(GetHandler, Organization),

  // Location
  MergeLocations: makeHandler(MergeHandler, Location),
  GetLocations: makeHandler(GetHandler, Location),

  // PostalAddress
  MergePostalAddresses: makeHandler(MergeHandler, PostalAddress),
  GetPostalAddresses: makeHandler(GetHandler, PostalAddress),

  // VadResults
  MergeVadResults: makeHandler(MergeHandler, VadResult),
  GetVadResults: makeHandler(GetHandler, VadResult),

  // Waveforms
  MergeWaveforms: makeHandler(MergeHandler, Waveform),
  GetWaveforms: makeHandler(GetHandler, Waveform),

  RequestDemo: makeHandler(RequestDemoHandler, DemoRequestInfo),
};
