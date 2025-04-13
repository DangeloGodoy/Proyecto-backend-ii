import { json } from "express";
import jsonwebtoken from "jsonwebtoken";

/**
 * @createToken
 * recibe información a tokenizar y genera un token
 * @param {Object} data
 */
export const createToken = (data) => {
  try {
    return jsonwebtoken.sign(data, process.env.JWT_SECRET, {
      expiresIn: 24 * 60 * 60 * 7,
    });
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

/**
 * @verifyToken
 * recibe un token y lo verifica
 * @param {string} token
 */
export const verifyToken = (token) => {
  try {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};
