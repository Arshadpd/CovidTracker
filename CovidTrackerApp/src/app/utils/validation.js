// utils/validation.js

export function isValidUsername(username) {
    // Add your validation logic here
    return /^[a-zA-Z0-9!@+-]+$/.test(username);
  }
  
export function isValidPassword(password) {
    // Add your validation logic here
    return password.length >= 8 &&  /^[a-zA-Z0-9!@+-]+$/.test(password);
}

export function isPasswordStrong(password) {
    // Add your validation logic here
    const requirements = [
        // Must be at least 8 characters
        password.length >= 8,
        // Must contain at least 1 uppercase letter
        /[A-Z]/.test(password),
        // Must contain at least 1 lowercase letter
        /[a-z]/.test(password),
        // Must contain at least 1 number
        /\d/.test(password),
        // Must contain at special character 
        /[!@+-]/.test(password)
    ]
   
    // If all requirements are met, password is valid
    const isValid = requirements.every(Boolean)

    return password.length >= 8 &&  isValid;
}
