
const emailValidation = /^[^@]+@[^@]+\.[^@\.]{2,}$/
const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}/;
export const phoneNumberReg =  /^\d+$/;

export const formFeilds = {
    EMAIL: 'email',
    NAME: 'name',
    PASSWORD: 'password',
    ACCEPT_TERMS: 'acceptTerms',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    PHONE_NUMBER: 'phoneNumber'
}

export const formValidator = (values) => {
    let errors = {}

    if (values.hasOwnProperty(formFeilds.EMAIL)) {
        console.log("email",values.email.trim())
        if (values.email.trim() === '') {
            errors.email = "Email is required"
        } else if (!emailValidation.test(values.email.trim())) {
            errors.email = "Email is not valid"
        }
    }

    if (values.hasOwnProperty(formFeilds.FIRST_NAME)) {
        if (values.firstName.trim() === '') {
            errors.firstName = "First Name is required"
        }
    }

    if (values.hasOwnProperty(formFeilds.LAST_NAME)) {
        if (values.lastName.trim() === '') {
            errors.lastName = "Last Name is required"
        }
    }

    if (values.hasOwnProperty(formFeilds.PHONE_NUMBER)) {
        if (values.phoneNumber.trim() === '') {
            errors.phoneNumber = "Phone Number is required"
        }else if(values.phoneNumber.trim().length < 7){
            errors.phoneNumber = "Invalid Phone Number"
        }
    }

    if (values.hasOwnProperty(formFeilds.PASSWORD)) {
        if (values.password.trim() === '') {
            errors.password = "Password is required"
        }/*  else if (!passwordReg.test(values.password.trim())) {
            errors.password = 'Password must contain at least one number, uppercase and lowercase letters';
        } */ else if (values.password.trim().length < 6) {
            errors.password = 'Password must be 6 characters long'
        }
    }

    if (values.hasOwnProperty(formFeilds.ACCEPT_TERMS)) {
        if (!values.acceptTerms) {
            errors.acceptTerms = "Accept Terms";
        }
    }

    return errors
}

//allow users to add + to their phone number
export const isValidPhoneNumber = (value) => {

    let isValid = false
    let newValue  = value

    if(value.length > 1 ){
        newValue = value.split('').slice(1, value.length).join('')
    }

    if(value === '' || (value.length < 2 && value === '+') || phoneNumberReg.test(newValue)){
        isValid = true
    }

    return isValid
}