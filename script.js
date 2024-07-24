const formData = document.querySelector("#form_data");
const mortgageAmountError = document.querySelector(".amount-error");
const mortgageTermError = document.querySelector(".term-error");
const interestRateError = document.querySelector(".rate-error");
const mortgageTypeError = document.querySelector(".type-error");

formData.addEventListener("submit", function(event) {
    event.preventDefault();

    const form = event.target;
    const mortgageAmount = form["amount"].value;
    const mortgageTerm = form["term"].value;
    const interestRate = form["rate"].value;
    const repaymentRadioButton = form.querySelector("#repayment").checked;
    const interestOnlyRadioButton = form.querySelector("#interest").checked;

    if(!mortgageAmount) {
        mortgageAmountError.innerHTML = "This field is required";
    }

    if(!mortgageTerm) {
        mortgageTermError.innerHTML = "This field is required";
    }

    if(!interestRate) {
        interestRateError.innerHTML = "This field is required";
    }

    if(!repaymentRadioButton || ! interestOnlyRadioButton) {
        mortgageTypeError.innerHTML = "This field is required";
    } 

});