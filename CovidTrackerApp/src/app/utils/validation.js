// utils/validation.js

export function isValidUsername(username) {
    // Add your validation logic here
    return /^[a-zA-Z0-9@]+$/.test(username);
  }
  
  export function isValidPassword(password) {
    console.log('pl ',password.length === 5);
    // Add your validation logic here
    return password.length === 5 &&  /^[a-zA-Z0-9@!./]+$/.test(password);
  }
  