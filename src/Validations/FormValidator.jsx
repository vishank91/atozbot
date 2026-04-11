import React from 'react'

export default function FormValidator(e) {
    let value = e.target.value
    switch (e.target.name) {
        case "name":
        case "shortdDescription":
        case "icon":
        case "name":
        case "question":
            if (!value && value.value === 0)
                return name + " Field is Mendatory"
            else
                return ""
            break

        default:
            return ""
    }
}
