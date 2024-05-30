/**
 * @typedef {import('express').Errback} ExpressError
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 * @typedef {import('express').NextFunction} ExpressNext
 */

/**
 * @typedef {function(ExpressRequest, ExpressResponse): void} ControllerFunction
 * @typedef {function(ExpressRequest, ExpressResponse, ExpressNext): void} MiddlewareFunction
 * @typedef {function(ExpressError, ExpressRequest, ExpressResponse, ExpressNext): void} ErrorhandlerFunction
 */
