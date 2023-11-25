// utils/validation.js

export function isValidUsername(username) {
    // Add your validation logic here
    return /^[a-zA-Z0-9@]+$/.test(username);
  }
  
  export function isValidPassword(password) {
    // Add your validation logic here
    return password.length === 9 &&  /^[a-zA-Z0-9@!]+$/.test(password);
  }
  