var $ = function (id) { return document.getElementById(id); }

// we define here all the fields, testing methods and error message
var newsletterForm = function () {
    this.fields = [];
    this.fields["first_name"] = {};
    this.fields["last_name"] = {};
	this.fields["birth"] = {};
	this.fields["email"] = {};
    this.fields["password"] = {};
    this.fields["verify"] = {};
    this.fields["address"] = {};
    this.fields["city"] = {};
    this.fields["state"] = {};
    this.fields["zip"] = {};
    this.fields["phone"] = {};

    // Default field messages
    this.fields["birth"].message = "Use mm/dd/yyyy format.";
	this.fields["email"].message = "Must be a valid email address.";
    this.fields["password"].message = "Must be at least 6 characters.";
    this.fields["state"].message = "Use 2 letter abbreviation.";
    this.fields["zip"].message = "Use 5 or 9 digit ZIP code.";
    this.fields["phone"].message = "Use 999-999-9999 format.";

    // Field error messages
    this.fields["first_name"].required = "First name is required.";
    this.fields["last_name"].required = "Last name is required.";
	this.fields["birth"].required = "Birthday is required.";
    this.fields["birth"].isBirth = "Birthday is not valid.";
	this.fields["email"].required = "Email is required.";
    this.fields["email"].isEmail = "Email is not valid.";
    this.fields["password"].required = "Password is required.";
    this.fields["password"].tooShort = ["Password is too short.", 6];
    this.fields["verify"].required = "Please retype your password.";
    this.fields["verify"].noMatch = ["Passwords do not match.", "password"];
    this.fields["address"].required = "Address is required.";
    this.fields["city"].required = "City is required.";
    this.fields["state"].required = "State is required.";
    this.fields["state"].isState = "State is not valid.";
    this.fields["zip"].required = "ZIP Code is required.";
    this.fields["zip"].isZip = "ZIP Code is not valid.";
    this.fields["phone"].required = "Phone number is required.";
    this.fields["phone"].isPhone = "Phone number is not valid.";
}

// Validation methods
newsletterForm.prototype.tooShort = function (text, length) {
    return (text.length < length);
}

newsletterForm.prototype.matches = function (text1, text2) {
    return (text1 == text2);
}

// standard email checking regular expression
newsletterForm.prototype.isEmail = function (text) {
    if (text.length == 0) return false;
    var parts = text.split("@");
    if (parts.length != 2 ) return false;
    if (parts[0].length > 64) return false;
    if (parts[1].length > 255) return false;
    var address =
        "(^[\\w!#$%&'*+/=?^`{|}~-]+(\\.[\\w!#$%&'*+/=?^`{|}~-]+)*$)";
    var quotedText = "(^\"(([^\\\\\"])|(\\\\[\\\\\"]))+\"$)";
    var localPart = new RegExp( address + "|" + quotedText );
    if ( !parts[0].match(localPart) ) return false;
    var hostnames =
        "(([a-zA-Z0-9]\\.)|([a-zA-Z0-9][-a-zA-Z0-9]{0,62}[a-zA-Z0-9]\\.))+";
    var tld = "[a-zA-Z0-9]{2,6}";
    var domainPart = new RegExp("^" + hostnames + tld + "$");
    if ( !parts[1].match(domainPart) ) return false;
    return true;
}

// compare the code entered to the list of states
newsletterForm.prototype.isState = function (text) {
    var states = new Array(
        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
        "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
        "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
        "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
        "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY");
    for( var i in states ) {
        if ( text == states[i] ) {
            return true;
        }
    }
    return false;
}

// regular expressions to check input formats based on field type
newsletterForm.prototype.isZip = function (text) {
    return /^\d{5}(-\d{4})?$/.test(text);               // 99999 or 99999-9999
}

newsletterForm.prototype.isPhone = function (text) {
    return /^\d{3}-\d{3}-\d{4}$/.test(text);            // 999-999-9999
}

newsletterForm.prototype.isBirth = function (text) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(text);          // 99/99/9999
}


// we are validating all the fields here
// And throwing errors for the fields we don't like
newsletterForm.prototype.validateField = function (fieldName, text) {
    var field = this.fields[fieldName];
    if (field.required) {
        if ( this.tooShort(text,1) ) {
            throw new Error(field.required);
        }
    }
    if (field.tooShort) {
        if ( this.tooShort(text, field.tooShort[1]) ) {
            throw new Error(field.tooShort[0]);
        }
    }
    if (field.noMatch) {
        if ( ! this.matches(text, $(field.noMatch[1]).value ) ) {
            throw new Error(field.noMatch[0]);
        }
    }
    if (field.isEmail) {
        if ( ! this.isEmail(text) ) {
            throw new Error(field.isEmail);
        }
    }
    if (field.isState) {
        if ( ! this.isState(text) ) {
            throw new Error(field.isState);
        }
    }
    if (field.isZip) {
        if ( ! this.isZip(text) ) {
            throw new Error(field.isZip);
        }
    }
    if (field.isPhone) {
        if ( ! this.isPhone(text) ) {
            throw new Error(field.isPhone);
        }
    }
    if (field.isBirth) {
        if ( ! this.isBirth(text) ) {
            throw new Error(field.isBirth);
        }
    }
    if (field.isDate) {
        if ( ! this.isDate(text) ) {
            throw new Error(field.isDate);
        }
    }

}

// Error message methods
// This will set a detailed error message next to the input
newsletterForm.prototype.resetErrors = function () {
    var message;
    for ( var fieldName in this.fields ) {
        $(fieldName + "_error").className = "";
        message = this.fields[fieldName].message;
        $(fieldName + "_error").firstChild.nodeValue =
            ( message ) ? message : "";
    }
}

// To clear the error messages next to the field
newsletterForm.prototype.clearError = function ( fieldName ) {
    $(fieldName + "_error").className = "";
    $(fieldName + "_error").firstChild.nodeValue = "";
}

// Method to validate form
// if we have any error, we will catch the event 
// and return a boolean telling the calling progam 
// so that it can decide what to do
newsletterForm.prototype.validateForm = function () {
    var hasErrors = false;
    for ( var fieldName in this.fields ) {
        this.clearError(fieldName);
        try {
            this.validateField(fieldName, $(fieldName).value );
        } catch (error) {
            hasErrors = true;
            $(fieldName + "_error").className = "error";
            $(fieldName + "_error").firstChild.nodeValue = error.message;
        }
    }
    return hasErrors;
}

