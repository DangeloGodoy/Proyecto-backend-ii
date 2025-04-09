import { genSaltSync, hashSync, compareSync } from "bcrypt";

/**
 * @createHash
 * recibe una contraseña proveniente del formulario y la contraseña almacenada en bdd
 * genera la contraseña encriptada y la devuelve
 * @param {string} password - contraseña a encriptar
 */
export function createHash(password) {
    const salt = genSaltSync(10);
    const hashPass = hashSync(password, salt);
    return hashPass;
};

/**
 * @verifyHash
 * recibe una contraseña proveniente del formulario y la contraseña almacenada en bdd
 * genera la compración y devuelve true o false según corresponda
 * @param {string} password - contraseña a comparar
 * @param {string} mongoPassword - contraseña almacenada en bdd
 */
export function verifyHash(password, mongoPassword) {
    const verify = compareSync(password, mongoPassword);
    return verify;
}