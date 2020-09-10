'use strict';

function validateEmail(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

function validateMobile(mobile) {
    let regInternational = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    let phoneno =  /^\+?((84))\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;
    return ( regInternational.test(mobile) || phoneno.test(mobile) );
}

function validatePassword(password) {
    let pass = /\s/;
    return (pass.test(password));
}

function validateSlugs(slug) {
    let regSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return regSlug.test(slug);
}

module.exports = { validateEmail, validateMobile, validateSlugs ,validatePassword};