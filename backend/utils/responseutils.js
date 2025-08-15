/**
 * @file responseUtils.js
 * @description A utility function to standardize API responses.
 */

/**
 * Sends a standardized API response.
 *
 * @param {Object} res - The Express response object.
 * @param {number} statusCode - The HTTP status code (e.g., 200, 201, 400, 500).
 * @param {string} message - A descriptive message for the response.
 * @param {Object} [data=null] - Optional. The data payload to send with the response.
 */
exports.sendResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    message,
    data, // Data will be null if not provided, or the actual data object
    success: statusCode >= 200 && statusCode <= 500
  });
};
