import bcrypt from 'bcrypt';

function comparePasswordsSync(
  plainTextPassword: string,
  hashedPassword: string,
): boolean {
  try {
    const match = bcrypt.compareSync(plainTextPassword, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    return false;
  }
}

// Example usage
function exampleUsage() {
  const plainText = 'password123';
  const hashed = bcrypt.hashSync(plainText, 10); // Hash the password
  console.log('Hashed password:', hashed);

  const isMatch = comparePasswordsSync(plainText, hashed);
  console.log('Passwords match:', isMatch); // Should output true

  const wrongPassword = 'wrongpassword';
  const isWrongMatch = comparePasswordsSync(wrongPassword, hashed);
  console.log('Incorrect password match:', isWrongMatch); // Should output false
}

exampleUsage();
