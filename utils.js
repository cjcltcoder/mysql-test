const bcrypt = require('bcrypt');

// Function to encrypt passwords using bcrypt
async function encryptPassword(password) {
    // Generate salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    
    // Hash password with salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
}

// Function to transform dates to MM-DD-YY format
function transformDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Format date as YYYY-MM-DD
    const transformedDate = `${year}-${month}-${day}`;
    
    return transformedDate;
}

module.exports = { encryptPassword, transformDate };
