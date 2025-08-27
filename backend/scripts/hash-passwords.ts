import * as bcrypt from 'bcryptjs';

async function hashPasswords() {
  const passwords = [
    'admin123',
    'demo123',
    'password123'
  ];

  console.log('🔐 Generando hashes de contraseñas...\n');

  for (const password of passwords) {
    const hash = await bcrypt.hash(password, 10);
    console.log(`Contraseña: "${password}"`);
    console.log(`Hash: "${hash}"`);
    console.log('---');
  }
}

hashPasswords();
