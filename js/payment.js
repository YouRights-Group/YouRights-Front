//  https://www.youtube.com/watch?v=Vw-RuREf_sM
//  https://stripe.com/docs/terminal/sdk/js
//  https://stripe.com/docs/payments/accept-a-payment#web


// Create a Stripe client.
var stripe = Stripe('pk_test_omVVYBt4xvf42UG7jURQIiM800OPQemJ4S');

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('cardNumber', {
  classes:{
    base: "form-control",
    focus: "green",
    invalid: "error"
  }
});
var exp = elements.create('cardExpiry', {
  classes:{
    base: "form-control",
    focus: "green",
    invalid: "error"
  }
});
var cvc = elements.create('cardCvc', {
  classes:{
    base: "form-control",
    focus: "green",
    invalid: "error"
  }
});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-number');
cvc.mount('#card-cvc');
exp.mount('#card-exp');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error.
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server.
      stripeTokenHandler(result.token);
    }
  });
});

// Submit the form with the token ID.
function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}

fetchConnectionToken(),
function fetchConnectionToken() {
  // Your backend should call /v1/terminal/connection_tokens and return the JSON response from Stripe
  return fetch('https://{YOUR_BACKEND_URL}/connection_token', { method: "POST" })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return data.secret;
    });
}
var terminal = StripeTerminal.create({
  onFetchConnectionToken: fetchConnectionToken,
  onUnexpectedReaderDisconnect: unexpectedDisconnect,
});
connectReaderHandler(),
function connectReaderHandler() {
  var config = {simulated: true};
  terminal.discoverReaders(config).then(function(discoverResult) {
    if (discoverResult.error) {
      console.log('Failed to discover: ', discoverResult.error);
    } else if (discoverResult.discoveredReaders.length === 0) {
      console.log('No available readers.');
    } else {
      // Just select the first reader here.
      var selectedReader = discoverResult.discoveredReaders[0];

      terminal.connectReader(selectedReader).then(function(connectResult) {
        if (connectResult.error) {
          console.log('Failed to connect: ', connectResult.error);
        } else {
          console.log('Connected to reader: ', connectResult.reader.label);
        }
      });
    }
  });
}