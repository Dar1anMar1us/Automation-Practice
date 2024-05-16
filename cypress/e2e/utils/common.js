/**
* Generates a random password based on the length provided.
* @param {number} length - The length of the password. 
*/
export const generateRandomPassword = (length) => {
   const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-';
   const getRandomChar = () => {
       const randomIndex = Math.floor(Math.random() * charset.length);
       return charset[randomIndex]
   }

   const includesLowercase = (password) => {
       return /[a-z]/.test(password)
   }

   const includesUppercase = (password) => {
       return /[A-Z]/.test(password)
   }

   const includesDigit = (password) => {
       return /[0-9]/.test(password)
   }

   const includesSymbol = (password) => {
       return /[^a-zA-Z0-9]/.test(password)
   }

   const generatePasswordRecursive = (password, remainingLength) => {
       if (remainingLength === 0) {
           if (
               includesLowercase(password) &&
               includesUppercase(password) &&
               includesDigit(password) &&
               includesSymbol(password)
           ) {
               return password
           }
           return generatePasswordRecursive('', length)
       }

       const nextChar = getRandomChar()
       const nextPassword = password + nextChar

       return generatePasswordRecursive(nextPassword, remainingLength - 1)
   }
   return generatePasswordRecursive('', length)
}