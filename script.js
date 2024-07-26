//select form
const formData = document.querySelector("#form_data");

//select html elemnts to display error messages
const mortgageAmountError = document.querySelector(".amount-error");
const mortgageTermError = document.querySelector(".term-error");
const interestRateError = document.querySelector(".rate-error");
const mortgageTypeError = document.querySelector(".type-error");

//select html elemnts to display monthly and total repayment amounts
const monthlyRepayment = document.querySelector(".monthly-repayment-result");
const totalRepayment = document.querySelector(".total-repayment-result");

//select html elemnts to display monthly and total interest amounts
const monthlyInterestAmount = document.querySelector(".monthly-interest-result");
const totalInterestAmount = document.querySelector(".total-interest-result");

//select result page and get its computed style
const secondPage = document.querySelector(".display-result-section");
const secondPageComputedStyle = window.getComputedStyle(secondPage);

// select the default result page
const firstPage = document.querySelector(".result-section-default");

// select the html elemnt to display repayment amounts and get its computed style
const repaymentResults = document.querySelector(".display-result-repayment");
const repaymentResultsComputedStyle = window.getComputedStyle(repaymentResults);

// select the html elemnt to display interest amounts and get its computed style
const interestResults = document.querySelector(".display-result-interest");
const interestResultsComputedStyle = window.getComputedStyle(interestResults);

//select the clear button
const clearButton = document.querySelector(".clear-button");

//select the input fields
const amountInputField = document.querySelector(".amount-input-field-style");
const termInputField = document.querySelector(".term-input-field-style");
const rateInputField = document.querySelector(".rate-input-field-style");

//select the icons
const iconAmount = document.querySelector(".icon_amount");
const iconTerm = document.querySelector(".icon_term");
const iconRate = document.querySelector(".icon_rate");

//added an eventlistener to the clear button
clearButton.addEventListener("click", function() {
    location.reload();
});

//form submission handler
formData.addEventListener("submit", function(event) {
    event.preventDefault();

    //extract the input values
    const form = event.target;
    const mortgageAmount = form["amount"].value;
    let mortgageTerm = form["term"].value;
    let interestRate = form["rate"].value;
    const repaymentRadioButton = form.querySelector("#repayment").checked;
    const interestOnlyRadioButton = form.querySelector("#interest").checked;

    //calling the validation function
    const isValid = validateInputFields(mortgageAmount, mortgageTerm, interestRate, repaymentRadioButton, interestOnlyRadioButton);

    if(isValid) {

        //display the second page
        if(secondPageComputedStyle.display === 'none') {
            secondPage.style.display = "inline-flex";
            firstPage.style.display = "none";
        }

        //calculate the monthly interest rate and total months
        let monthlyInterestRate = interestRate / 100 / 12;
        let totalMonths = mortgageTerm * 12;

        if(repaymentRadioButton) {

            //display the section to display the repayment amounts
            if(repaymentResultsComputedStyle.display === 'none') {
                repaymentResults.style.display = "inline-flex";
                interestResults.style.display = "none";
            }

            //calling the function to calculate repayment amounts
            calculateRepaymentAmount(mortgageAmount, monthlyInterestRate, totalMonths);

        }

        if(interestOnlyRadioButton) {

            //display the section to display the interest amounts
            if(interestResultsComputedStyle.display === 'none') {
                interestResults.style.display = "inline-flex";
                repaymentResults.style.display = "none";
            }

            //calling the function to calculate INTEREST amounts
            calculateInterest(mortgageAmount, monthlyInterestRate, totalMonths);

        }

    }
   
});

/*

description: function to validate input fields
parameters:
1. amount
2. term in years
3. interest rate
4. raepayment radio button
5. interest only radio button

*/
function validateInputFields(mortgageAmount,mortgageTerm, interestRate, repaymentRadioButton, interestOnlyRadioButton) {
    
    let isValid = true;

    //calling set balnk error function if the amount field is empty and storing its value
    if(!mortgageAmount) {
        isValid = setBlankError(mortgageAmountError, "This field is required", amountInputField, iconAmount);
    }

    //calling set balnk error function if the amount is not a number and storing its value
    if(isNaN(mortgageAmount)) {
        isValid = setBlankError(mortgageAmountError, "Enter a valid number", amountInputField, iconAmount);
    }
    
    //calling set balnk error function if the term field is empty and storing its value
    if(!mortgageTerm) {
        isValid = setBlankError(mortgageTermError, "This field is required", termInputField, iconTerm);
    }

    //calling set balnk error function if the term is not a number and storing its value
    if(isNaN(mortgageTerm)) {
        isValid = setBlankError(mortgageTermError, "Enter a valid number", termInputField, iconTerm);
    }
   
    //calling set balnk error function if the interest rate field is empty and storing its value
    if(!interestRate) {
        isValid = setBlankError(interestRateError, "This field is required", rateInputField, iconRate);
    }
    
    //calling set balnk error function if the rate is not a number and storing its value
    if(isNaN(interestRate)) {
        isValid = setBlankError(interestRateError, "Enter a valid number", rateInputField, iconRate);
    }

    //calling set balnk error function if the radio buttons are not checked and storing its value
    if(!repaymentRadioButton && ! interestOnlyRadioButton) {
        isValid = setBlankError(mortgageTypeError, "This field is required");
    } 

    return isValid;

}

/*

description: function to display error messages 
parameters:
1. html element to display error messages
2. error messages
3. input field element
5. icon elements

*/
function setBlankError(errorElement, errorMessage, inputElement, icon) {
    errorElement.innerHTML = errorMessage;
    errorElement.style.color = "red";
    errorElement.style.fontSize = "12px";
    inputElement.style.border = "1px solid red";
    icon.style.backgroundColor = "red";
    icon.style.color = "white";
    return false;
}

/*

description: function to calculate repayment amount
parameters:
1. amount
2. monthly interest rate
3. total months

*/
function calculateRepaymentAmount(mortgageAmount, monthlyInterestRate, totalMonths) {

    let M = mortgageAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    M = M.toFixed(2);
    let totalRepaymentAmount = M * totalMonths;
    totalRepaymentAmount = totalRepaymentAmount.toFixed(2);
    monthlyRepayment.innerHTML = '£' + M;
    totalRepayment.innerHTML = '£' + totalRepaymentAmount;

}

/*

description: function to calculate interest amounts
parameters:
1. amount
2. monthly interest rate
3. total months

*/
function calculateInterest(mortgageAmount, monthlyInterestRate, totalMonths) {

    let monthlyInterest = mortgageAmount * monthlyInterestRate;
    monthlyInterest = monthlyInterest.toFixed(2);
    let totalInterest = monthlyInterest * totalMonths;
    totalInterest = totalInterest.toFixed(2);
    monthlyInterestAmount.innerHTML = '£' + monthlyInterest;
    totalInterestAmount.innerHTML = '£' + totalInterest;

}

