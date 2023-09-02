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
