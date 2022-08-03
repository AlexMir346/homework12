const handleChange = (key) => {
  const pressedKey = document.querySelector(`.key-${key}`);
  if (pressedKey) {
    document.getElementsByClassName('active')[0]?.classList.remove('active');
    pressedKey.classList.add('active');
    console.log(key);
  }
};

document.addEventListener('keypress', (e) => {
  handleChange(e.key);
});
