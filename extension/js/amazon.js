function determinePage() {
  const url = window.location.href;

  if (url.indexOf('/gp/cart') !== -1) {
    return 'cart';
  }

  if (url.indexOf('/s?') !== -1) {
    return 'search';
  }

  return 'product';
}

function parsePriceElement(elem) {
  const price = elem.innerHTML;
  const priceAsFloat = price.replace('$', '');
  return (priceAsFloat * 1.0675).toFixed(2);
}

function appendPriceToProductPage(elem, priceWithTax) {
  const tableRow = document.createElement('tr');
  const tableDataText = document.createElement('td');
  const tableDataPrice = document.createElement('td');
  const span = document.createElement('span');

  tableDataText.className = 'a-color-secondary a-size-base a-text-right a-nowrap';
  tableDataText.innerText = 'With Tax: ';

  tableDataPrice.className = 'a-span12 a-color-price a-size-base';

  span.className = 'a-price a-text-price a-size-base';
  span.innerText = `$${priceWithTax}`;

  tableDataPrice.append(span);

  tableRow.append(tableDataText);
  tableRow.append(tableDataPrice);

  elem.closest('tbody').append(tableRow);
}

function appendPriceToSearchPage(elem, priceWithTax) {
  const div = document.createElement('div');
  const span = document.createElement('span');

  div.className = 'a-section a-spacing-none a-spacing-top-small';

  span.className = 'a-price-fraction';
  span.innerText = `With Tax: $${priceWithTax}`;

  div.append(span);

  const noTaxPriceContainer = elem.closest('.a-section .a-spacing-none .a-spacing-top-small');
  noTaxPriceContainer.after(div);
}

function appendPriceToCartPage(elem, priceWithTax) {
  const div = document.createElement('div');
  const span = document.createElement('span');

  div.className = 'a-section a-spacing-none a-spacing-top-small';

  span.className = 'a-price-fraction';
  span.innerText = `With Tax: $${priceWithTax}`;

  div.append(span);

  elem.parentNode.after(div);
}

function getPriceWithTax(page) {
  if (page === 'product') {
    const elem = document.querySelectorAll('.apexPriceToPay .a-offscreen')[0];
    const price = parsePriceElement(elem);

    if (price && price !== 'NaN') {
      appendPriceToProductPage(elem, price);
    }
  }

  if (page === 'search') {
    const priceElems = document.querySelectorAll('.sg-col-inner .a-price .a-offscreen');
    priceElems.forEach((d) => {
      if (!d.parentNode.getAttribute('data-a-strike')) {
        const price = parsePriceElement(d);

        if (price && price !== 'NaN') {
          appendPriceToSearchPage(d, price);
        }
      }
    });
  }

  if (page === 'cart') {
    const priceElems = document.querySelectorAll('[class*=sc-price]');
    priceElems.forEach((d) => {
      if (!d.parentNode.getAttribute('data-a-strike')) {
        const price = parsePriceElement(d);

        if (price && price !== 'NaN') {
          appendPriceToCartPage(d, price);
        }
      }
    });
  }
}

(function main() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const page = determinePage();

  if (page) {
    getPriceWithTax(page);
  }
}());
