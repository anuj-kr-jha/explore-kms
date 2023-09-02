import { KMSClient, EncryptCommand, DecryptCommand } from '@aws-sdk/client-kms';

export class KMSManager {
  constructor() {
    this.client = new KMSClient({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
      },
    });
  }

  /**
   * @typedef {Object} EncryptCommandOutput
   * @property {string} CiphertextBlob - The encrypted data as binary data.
   * @property {string} EncryptionAlgorithm - The encryption algorithm used.
   * @property {string} KeyId - The ARN of the KMS key used for encryption.
   */

  /**
   * It will encrypt the plain text and return the cipher text
   * @returns {Promise<string>}
   */
  async encrypt(plainText = '') {
    const command = new EncryptCommand({
      KeyId: process.env.ARN,
      Plaintext: Buffer.from(plainText),
    });

    try {
      /** @type {EncryptCommandOutput} */
      const { CiphertextBlob } = await this.client.send(command);
      return Buffer.from(CiphertextBlob).toString('base64');
    } catch (err) {
      console.error('Error: ', err.message, '\n', 'Stack: ', err.stack);
      // throw err;
    }
  }

  /**
   * @typedef {Object} DecryptCommandOutput
   * @property {string} PlaintextBlob - The decrypted data as binary data.
   * @property {string} EncryptionAlgorithm - The encryption algorithm used.
   * @property {string} KeyId - The ARN of the KMS key used for encryption.
   */

  /**
   * It will decrypt the cipher text and return the plain text
   * @returns {Promise<string>}
   */
  async decrypt(base64CipherText = '') {
    const command = new DecryptCommand({
      KeyId: process.env.ARN,
      CiphertextBlob: Uint8Array.from(Buffer.from(base64CipherText, 'base64')),
    });

    try {
      /** @type {DecryptCommandOutput} */
      const { Plaintext } = await this.client.send(command);
      const textDecoder = new TextDecoder('utf-8');
      return textDecoder.decode(Plaintext);
    } catch (err) {
      console.error('Error: ', err.message, '\n', 'Stack: ', err.stack);
      // throw err;
    }
  }

  closeClient() {
    this.client.destroy();
    console.log('Client closed');
  }
}
