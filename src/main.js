/**
 * Main entry point for the built Axon dist/library.
 * @module main
 * @exports Allthethings
 */

import ApiError, {
  AuthorizationError,
  InternalError,
  InvalidRequestError,
  ServiceUnavailableError,
} from 'axon/error';
import Logger from 'axon/utils/logger';
import Server from 'axon/server';

import * as codes from 'axon/error/codes';

export default Server;
export {
  ApiError,
  AuthorizationError,
  codes,
  InternalError,
  InvalidRequestError,
  Logger,
  ServiceUnavailableError,
};
