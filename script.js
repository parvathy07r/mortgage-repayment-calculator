const formData = document.querySelector("#form_data");
const mortgageAmountError = document.querySelector(".amount-error");
const mortgageTermError = document.querySelector(".term-error");
const interestRateError = document.querySelector(".rate-error");
const mortgageTypeError = document.querySelector(".type-error");
const monthlyRepayment = document.querySelector(".monthly-repayment-result");
const totalRepayment = document.querySelector(".total-repayment-result");
const secondPage = document.querySelector(".display-result-section");
const secondPageComputedStyle = window.getComputedStyle(secondPage);
const firstPage = document.querySelector(".result-section-default");
const totalPayment = document.querySelector(".total-repayment-result");

formData.addEventListener("submit", function(event) {
    event.preventDefault();

    const form = event.target;
    const mortgageAmount = form["amount"].value;
    let mortgageTerm = form["term"].value;
    let interestRate = form["rate"].value;
    const repaymentRadioButton = form.querySelector("#repayment").checked;
    const interestOnlyRadioButton = form.querySelector("#interest").checked;



    const isValid = validateInputFields(mortgageAmount, mortgageTerm, interestRate, repaymentRadioButton, interestOnlyRadioButton);

    if(isValid) {
        if(repaymentRadioButton) {
            if(secondPageComputedStyle.display === 'none') {
                secondPage.style.display = "inline-flex";
                firstPage.style.display = "none";
            }
            interestRate = interestRate/100/12;
            mortgageTerm = mortgageTerm * 12;
            let M = mortgageAmount * interestRate * Math.pow(1 + interestRate, mortgageTerm)/(Math.pow(1 + interestRate, mortgageTerm) - 1);
            let t = M * mortgageTerm;
            monthlyRepayment.innerHTML = '£' + M;
            totalPayment.innerHTML = '£' + t;
        }
    }
    
});

function validateInputFields(mortgageAmount,mortgageTerm, interestRate, repaymentRadioButton, interestOnlyRadioButton) {
    
    let isValid = true;

    if(!mortgageAmount) {
        isValid = setBlankError(mortgageAmountError, "This field is required");
    }

    if(!mortgageTerm) {
        isValid = setBlankError(mortgageTermError, "This field is required");
    }

    if(!interestRate) {
        isValid = setBlankError(interestRateError, "This field is required");
    }

    if(!repaymentRadioButton && ! interestOnlyRadioButton) {
        isValid = setBlankError(mortgageTypeError, "This field is required");
    } 

    return isValid;

}

function setBlankError(errorElement, errorMessage) {
    errorElement.innerHTML = errorMessage;
    errorElement.style.color = "red";
    return false;
}
