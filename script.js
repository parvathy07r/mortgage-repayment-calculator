const formData = document.querySelector("#form_data");
const mortgageAmountError = document.querySelector(".amount-error");
const mortgageTermError = document.querySelector(".term-error");
const interestRateError = document.querySelector(".rate-error");
const mortgageTypeError = document.querySelector(".type-error");

const monthlyRepayment = document.querySelector(".monthly-repayment-result");
const totalRepayment = document.querySelector(".total-repayment-result");

const monthlyInterestAmount = document.querySelector(".monthly-interest-result");
const totalInterestAmount = document.querySelector(".total-interest-result");

const secondPage = document.querySelector(".display-result-section");
const secondPageComputedStyle = window.getComputedStyle(secondPage);

const firstPage = document.querySelector(".result-section-default");
const repaymentResults = document.querySelector(".display-result-repayment");
const repaymentResultsComputedStyle = window.getComputedStyle(repaymentResults);
const interestResults = document.querySelector(".display-result-interest");
const interestResultsComputedStyle = window.getComputedStyle(interestResults);

const clearButton = document.querySelector(".clear-button");

const amountInputField = document.querySelector(".amount-input-field-style");
const termInputField = document.querySelector(".term-input-field-style");
const rateInputField = document.querySelector(".rate-input-field-style");
const iconAmount = document.querySelector(".icon_amount");
const iconTerm = document.querySelector(".icon_term");
const iconRate = document.querySelector(".icon_rate");


clearButton.addEventListener("click", function() {
    location.reload();
});

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

        if(secondPageComputedStyle.display === 'none') {
            secondPage.style.display = "inline-flex";
            firstPage.style.display = "none";
        }

        let monthlyInterestRate = interestRate / 100 / 12;
        let totalMonths = mortgageTerm * 12;

        if(repaymentRadioButton) {

            if(repaymentResultsComputedStyle.display === 'none') {
                repaymentResults.style.display = "inline-flex";
                interestResults.style.display = "none";
            }

            interestRate = interestRate/100/12;
            mortgageTerm = mortgageTerm * 12;
            let M = mortgageAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
            M = M.toFixed(2);
            let totalRepaymentAmount = M * totalMonths;
            totalRepaymentAmount = totalRepaymentAmount.toFixed(2);
            monthlyRepayment.innerHTML = '£' + M;
            totalRepayment.innerHTML = '£' + totalRepaymentAmount;

        }

        if(interestOnlyRadioButton) {

            if(interestResultsComputedStyle.display === 'none') {
                interestResults.style.display = "inline-flex";
                repaymentResults.style.display = "none";
            }

            let monthlyInterest = mortgageAmount * monthlyInterestRate;
            monthlyInterest = monthlyInterest.toFixed(2);
            let totalInterest = monthlyInterest * totalMonths;
            totalInterest = totalInterest.toFixed(2);
            monthlyInterestAmount.innerHTML = '£' + monthlyInterest;
            totalInterestAmount.innerHTML = '£' + totalInterest;

        }

    }

    
});

function validateInputFields(mortgageAmount,mortgageTerm, interestRate, repaymentRadioButton, interestOnlyRadioButton) {
    
    let isValid = true;

    if(!mortgageAmount) {
        isValid = setBlankError(mortgageAmountError, "This field is required", amountInputField, iconAmount);
    }

    if(isNaN(mortgageAmount)) {
        isValid = setBlankError(mortgageAmountError, "Enter a valid number", amountInputField, iconAmount);
    }

    if(!mortgageTerm) {
        isValid = setBlankError(mortgageTermError, "This field is required", termInputField, iconTerm);
    }

    if(isNaN(mortgageTerm)) {
        isValid = setBlankError(mortgageTermError, "Enter a valid number", termInputField, iconTerm);
    }

    if(!interestRate) {
        isValid = setBlankError(interestRateError, "This field is required", rateInputField, iconRate);
    }

    if(isNaN(interestRate)) {
        isValid = setBlankError(interestRateError, "Enter a valid number", rateInputField, iconRate);
    }

    if(!repaymentRadioButton && ! interestOnlyRadioButton) {
        isValid = setBlankError(mortgageTypeError, "This field is required");
    } 

    return isValid;

}

function setBlankError(errorElement, errorMessage, inputElement, icon) {
    errorElement.innerHTML = errorMessage;
    errorElement.style.color = "red";
    inputElement.style.border = "1px solid red";
    icon.style.backgroundColor = "red";
    return false;
}


