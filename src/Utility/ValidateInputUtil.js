export const validatePhoneNumberUtil = (phoneNumber) => {
    return phoneNumber && (/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phoneNumber));
}

export const validatePriceUtil = (pricePerKm) => {
    return pricePerKm && (/^[0-9]*$/.test(pricePerKm))
}
