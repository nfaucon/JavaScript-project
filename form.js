var newsletterForm;

var registerClick = function () {
    $("register").blur();
    if ( newsletterForm.validateForm() ) {
        alert("Please correct the errors on the page.");
    } else {
        $("newsletter_form").submit();
    }
}

var resetClick = function () {
    $("reset_form").blur();
    $("newsletter_form").reset();
    newsletterForm.resetErrors();
}

window.onload = function () {
    newsletterForm = new newsletterForm();
    $("register").onclick = registerClick;
    $("reset_form").onclick = resetClick;
}