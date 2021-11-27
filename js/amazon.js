function determinePage() {
  const url = window.location.href;

  if (url.indexOf('/gp/cart') !== -1) {
    return 'cart';
  }

  return 'product';
}

function getPriceWithTax(page) {
  if (page === 'product') {
    const priceElem = document.querySelectorAll('.apexPriceToPay .a-offscreen')[0];
    const price = priceElem.innerHTML;
    const priceAsFloat = price.replace('$', '');
    return priceAsFloat * 1.0675;
  }

  return null;
}

function appendPriceToProductPage(priceWithTax) {
  const tableRow = document.createElement('tr');
  const tableDataText = document.createElement('td');
  const tableDataPrice = document.createElement('td');
  const span = document.createElement('span');

  tableDataText.className = 'a-color-secondary a-size-base a-text-right a-nowrap';
  tableDataText.innerText = 'With Tax: ';

  tableDataPrice.className = 'a-span12 a-color-price a-size-base';

  span.className = 'a-price a-text-price a-size-base';
  span.innerText = `$${priceWithTax.toFixed(2)}`;

  tableDataPrice.append(span);

  tableRow.append(tableDataText);
  tableRow.append(tableDataPrice);

  document.querySelectorAll('.apexPriceToPay .a-offscreen')[0].closest('tbody').append(tableRow);
}

function addPriceToPage(page, priceWithTax) {
  if (page === 'product') {
    appendPriceToProductPage(priceWithTax);
  }
}

(function main() {
  const page = determinePage();

  if (page) {
    const priceWithTax = getPriceWithTax(page);
    if (priceWithTax) {
      addPriceToPage(page, priceWithTax);
    }
  }
}());
