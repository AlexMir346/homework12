document.addEventListener('DOMContentLoaded', () => {
  const [...ingredients] = document.querySelectorAll('.draggable');

  const price = document.querySelector('.price > p');
  const sauces = document.querySelector('.sauces > p');
  const topings = document.querySelector('.topings > p');

  const [...pizzaSize] = document.querySelectorAll('.radioIn');

  let priceRez;
  pizzaSize.map((size) => {
    size.addEventListener('click', (e) => {
      priceRez = e.target.value;
      price.innerHTML = `ЦІНА: ${priceRez} ₴`;
    });
  });

  let ingredientUrl;
  let ingredientSauceData;
  let ingredientTopingsData;
  //слухач Drag and drop старт
  ingredients.map((ingredient) => {
    ingredient.addEventListener(
      'dragstart',
      (evt) => {
        ingredient.style.border = '3px dotted #000';
        evt.dataTransfer.effectAllowed = 'move';
        ingredientUrl = ingredient.src;
        ingredientSauceData = ingredient.getAttribute('data-saucePrice');
        ingredientTopingsData = ingredient.getAttribute('data-price');
      },
      false,
    );
    // Виходимо з області обраного елементу
    ingredient.addEventListener(
      'dragend',
      function () {
        this.style.border = '';
      },
      false,
    );
  });

  const target = document.querySelector('.table');
  //Покидаємо область цільвого елементу
  target.addEventListener(
    'dragleave',
    function () {
      this.style.border = '';
    },
    false,
  );
  //Заходимо в область цільвого елементу
  target.addEventListener(
    'dragenter',
    function () {
      this.style.border = '3px solid red';
    },
    false,
  );
  //Знаходимось над областю цільвого елементу
  target.addEventListener(
    'dragover',
    function (evt) {
      if (evt.preventDefault) evt.preventDefault();
      return false;
    },
    false,
  );
  // let totalPrice = 0;
  let totalSauses = 0;
  let totalTopings = 0;
  //Опускаємо елемент на цільовий елемент
  target.addEventListener(
    'drop',
    function (evt) {
      if (evt.preventDefault) evt.preventDefault();
      if (evt.stopPropagation) evt.stopPropagation();
      this.style.border = '';

      let img = document.createElement('img');
      img.src = `${ingredientUrl}`;

      this.appendChild(img);
      if (ingredientSauceData) {
        sauces.innerHTML = `СОУСИ: ${(totalSauses += parseInt(ingredientSauceData))} ₴`;
      } else if (ingredientTopingsData) {
        topings.innerHTML = `ТОПIНГИ: ${(totalTopings += parseInt(ingredientTopingsData))} ₴`;
      }

      // price.innerHTML = `ЦIНА: ${(totalPrice += parseInt(
      //   ingredientTopingsData + parseInt(ingredientSauceData),
      // ))} ₴`;
    },
    false,
  );

  const [...allInputs] = document.querySelectorAll('.grid > input');
  //Обираємо усі інпути для валідації окрім кнопок
  const inputRez = allInputs
    .map((input) => {
      return input;
    })
    .filter((element) => {
      return element.classList != 'button';
    });
  //Валідація даних
  const validate = (target) => {
    switch (target.id) {
      case 'name':
        return /^[A-z]{2,}$/i.test(target.value);
      case 'phone':
        return /^\+380\d{9}$/.test(target.value);
      case 'email':
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(target.value);
      default:
        throw new Error('Невірний виклик регулярного виразу');
    }
  };
  //функція валідації отримуємо true або false
  inputRez.forEach((input) => {
    input.addEventListener('change', (event) => {
      console.log(validate(event.target));
    });
  });
  //Якщо пройдена валідація відправляємо заказ
  const sendOrder = document.getElementById('sendOrder');

  sendOrder.addEventListener('click', () => {
    let validateInputRez = inputRez.map((element) => {
      return validate(element);
    });
    if (!validateInputRez.includes(false)) {
      window.location.replace(
        'http://127.0.0.1:5500/12_Lesson%2012/homework/pattern%20pizza/thank-you.html',
      );
    } else {
      alert('Please, check data you entered');
    }
  });
  // Відміняємо заказ
  const cancelOrder = document.getElementById('cancel');

  cancelOrder.addEventListener('click', () => {
    inputRez.forEach((element) => {
      element.value = '';
    });
  });
  //тікаючий банер зі знижкою
  let bannerLeft, bannerTop, maxBannerTop, maxBannerLeft, banner;

  banner = document.getElementById('banner');

  maxBannerLeft = document.documentElement.clientWidth - banner.offsetWidth;
  maxBannerTop = document.documentElement.clientHeight - banner.offsetHeight;

  banner.addEventListener('mousemove', handler);

  function handler() {
    bannerLeft = Math.random() * maxBannerLeft;
    banner.style.left = bannerLeft + 'px';
    bannerTop = Math.random() * maxBannerTop;
    banner.style.top = bannerTop + 'px';
    // console.log(bannerLeft + ' - ' + bannerTop);
  }
});
