
/**
 * @class GrpcError - gRPC Error class
 */
export class GrpcError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
