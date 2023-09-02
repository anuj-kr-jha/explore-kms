import 'dotenv/config';
import { KMSManager } from './kms.mjs';

async function main() {
  const kmsManager = new KMSManager();
  console.time('encryption_took');
  const cipherText = await kmsManager.encrypt('password123');
  console.timeEnd('encryption_took');
  console.log('cipherText: ', cipherText, '\n');

  console.time('decryption_took');
  const plainText = await kmsManager.decrypt(cipherText);
  console.timeEnd('decryption_took');
  console.log('plainText: ', plainText);

  kmsManager.closeClient();
}

main();

/*
 user registration and login flow
  1. user registration
    - user enters email and password
    - password is encrypted via kms and then stored in db
  2. user login
    - user enters email and password
    - encrypted password fetched from db
    - encrypted password is decrypted via kms
    - decrypted password is compared with user input
    - if match, user should be logged in
    - jwt_token is generated and sent to user
    - user can use jwt_token to access protected routes
*/
