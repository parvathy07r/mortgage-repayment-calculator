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

    validateInputFields(mortgageAmount, mortgageTerm, interestRate, repaymentRadioButton, interestOnlyRadioButton);
    
});

function validateInputFields(mortgageAmount,mortgageTerm, interestRate, repaymentRadioButton, interestOnlyRadioButton) {
    
    let isValid = true;

    if(!mortgageAmount) {
        mortgageAmountError.innerHTML = "This field is required";
        isValid = false;
    }

    if(!mortgageTerm) {
        mortgageTermError.innerHTML = "This field is required";
        isValid = false;
    }

    if(!interestRate) {
        interestRateError.innerHTML = "This field is required";
        isValid = false;
    }

    if(!repaymentRadioButton || ! interestOnlyRadioButton) {
        mortgageTypeError.innerHTML = "This field is required";
        isValid = false;
    } 

    return isValid;

}