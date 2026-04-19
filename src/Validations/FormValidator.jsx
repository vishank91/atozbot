import React from 'react'
import PasswordValidator from "password-validator"

var schema = new PasswordValidator();

// Add properties to it
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have at least 1 uppercase letter
    .has().lowercase(1)                             // Must have at least 1 lowercase letter
    .has().digits(1)                                // Must have at least 1 digit
    .has().symbols(1)                               // Must have at least 1 special character
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Admin@123']); // Blacklist these values


export default function FormValidator(e) {
    let value = e.target.value
    switch (e.target.name) {
        case "name":
        case "shortdDescription":
        case "icon":
        case "name":
        case "question":
        case "username":
        case "email":
            if (!value && value.value === 0)
                return name + " Field is Mendatory"
            else
                return ""
            break

        case "password":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (!(schema.validate(value)))
                return (schema.validate(value, { details: true })).map(x => x.message).join()
            else
                return ""

        case "phone":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 10 || value.length > 10)
                return name + " Field Length Must Be 10 Digits"
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9")))
                return name + " Field Must Start With 6,7,8 or 9"
            else
                return ""

        default:
            return ""
    }
}
