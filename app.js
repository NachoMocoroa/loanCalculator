var loanCalculator = (function() {
  var self = this,
    module = {
      calculateResults: function() {
        const amount = document.getElementById('amount'),
              interest = document.getElementById('interest'),
              years = document.getElementById('years'),
              monthlyPayment = document.getElementById('monthly-payment'),
              totalPayment = document.getElementById('total-payment'),
              totalInterest = document.getElementById('total-interest'),
              principal = parseFloat(amount.value),
              calculatedInterest = parseFloat(interest.value) / 100 / 12,
              calculatedPayments = parseFloat(years.value) * 12,
              x = Math.pow(1 + calculatedInterest, calculatedPayments),
              monthly = (principal*x*calculatedInterest)/(x-1);

        if(isFinite(monthly)) {
          monthlyPayment.value = monthly.toFixed(2);
          totalPayment.value = (monthly * calculatedPayments).toFixed(2);
          totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
          document.getElementById('results').style.display = 'block';
          document.getElementById('loading').style.display = 'none';
        } else {
          module.showError('Please check your numbers');
        }
      },
      showError: function(error) {
        const errorDiv = document.createElement('div'),
              card = document.querySelector('.card'),
              heading = document.querySelector('.heading');

        document.getElementById('results').style.display = 'none';
        document.getElementById('loading').style.display = 'none';
        errorDiv.className = 'alert alert-danger';
        errorDiv.appendChild(document.createTextNode(error));
        card.insertBefore(errorDiv, heading);
        setTimeout(module.clearError, 3000);
      },
      clearError: function() {
        document.querySelector('.alert').remove();
      },
      submitForm: function(e) {
        document.getElementById('results').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        setTimeout(module.calculateResults, 2000);
        e.preventDefault();
      },
      addListeners: function() {
        document.getElementById('loan-form').addEventListener('submit', module.submitForm);
      },
      init: function() {
        module.addListeners();
        console.log('- loanCalculator initialized');
      }
  };
  return {
      init: module.init
  };
})();

document.addEventListener('DOMContentLoaded', loanCalculator.init());