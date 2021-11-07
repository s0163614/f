function selectType(sel) {
    let radioDiv = document.querySelector(".options");
    let checkDiv = document.querySelector(".properties");

    if (sel.value == "1") {
      radioDiv.style.display = "none";
      checkDiv.style.display = "none";
      let radios = document.querySelectorAll(".options input");
      radios.forEach(function(radio) {
        radio.checked = false;
      });
      let checkboxes = document.querySelectorAll(".properties input");
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
      });
    } else if (sel.value == "2") {
      radioDiv.style.display = "block";
      checkDiv.style.display = "none";
      let checkboxes = document.querySelectorAll(".properties input");
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
      });
    } else {
      checkDiv.style.display = "block";
      radioDiv.style.display = "none";
      let radios = document.querySelectorAll(".options input");
      radios.forEach(function(radio) {
        radio.checked = false;
      });
    }
}

function updatePrice() {
  let count = document.querySelector('#count').value.match(/^\d+$/);
  if (count === null) {
    document.querySelector('.result').innerHTML = '<span style="color: red;">Введи коррекнтые данные</span>';
  }
  else {
    var select = document.querySelector('select[name=prodType]');
  var price = 0;
  var prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
  }

  let radios = document.querySelectorAll(".options input");
  radios.forEach(function(radio) {
    if (radio.checked) {
      console.log(prices.prodOptions[1]);
      let optionPrice = prices.prodOptions[radio.value - 1];
      console.log(optionPrice + " опшион прайс");
      if (optionPrice !== undefined) {
        price += optionPrice;
      }
    }
  });

  let checkboxes = document.querySelectorAll(".properties input");
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name - 1];
      if (propPrice !== undefined) {
        price += propPrice;
      }
    }
  });
  document.querySelector('.result').innerHTML = count * price + " рублей";
  }
}

function getPrices() {
    return {
        prodTypes: [1000, 2000, 3000],
        prodOptions: [500, 750],
        prodProperties: [200, 300]
    }
}


window.addEventListener('DOMContentLoaded', function (event) {
    let calculate = document.querySelector('#calculate');
    let s = document.getElementsByName("prodType");
    let select = s[0];

    selectType(select);

    select.addEventListener("change", function(event) {
      let target = event.target;
      console.log(target.value);
      selectType(select);
    });

    let radios = document.getElementsByName("opt");
    radios.forEach(function(radio) {
      radio.addEventListener("change", function(event) {
        let r = event.target;
        console.log(r.value);
      });
    });

    let checkboxes = document.querySelectorAll(".properties input");
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener("change", function(event) {
        let c = event.target;
        console.log(c.name);
        console.log(c.value);
      });
    });

    calculate.onclick = function() {
    updatePrice();
}});