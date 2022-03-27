//привязка элементов для дальнейшего взаимодействия в качестве функций 
let modal = document.getElementById("myModal");
let btn = document.getElementById("button_open");
let back = document.getElementById("modalbackid");
let span = document.getElementsByClassName("close-modal")[0];
let cancel = document.getElementsByClassName("cancel_button")[0];
let backbody = document.getElementById("bodyid");
let modalcontent = document.getElementById("modal___content");
let spinner = document.getElementById("spinner");


btn.onclick = function () { //открываем модальное окно при клике 
    modal.style.display = "block"; //меняем стиль модального окна на видимый 
    back.style.display = "block";// затемняем фон
    backbody.style.overflow = "hidden";// убираем скролл при открытом модальном окне

}

span.onclick = function () { // логика кнопки закрытия мод. окна
    modal.style.display = "none";
    back.style.display = "none";
    backbody.style.overflow = "scroll"; // возвращаем скролл при закрытии мод окна
}
cancel.onclick = function () { //так же закрытие мод.окна,но уже по кнопке
    modal.style.display = "none";
    back.style.display = "none";
    backbody.style.overflow = "scroll";
}

window.onclick = function (event) {// закрытие модального окна путем нажатия за границами мод окна 
    if (event.target == back) {
        modal.style.display = "none";
        back.style.display = "none";
        backbody.style.overflow = "scroll";
    }
}


//Валидация 
let submitButton = document.getElementsByClassName("submit_button")[0];
let inputPhone = [];// массив для проверки корректности ввода номера телефона 
submitButton.onclick = () => { //стрелочная функция для обработчика

    //функция проверки ввода имени пользователя
    function validateName() {
        let mass = []; //массив для проверки количества введенных символов (должно быть не меньше 3)
        let validName = document.getElementById("input___name").value; //получаем номер телефона пользователся
        mass = validName.split('');//разбиваем вводимые данные на элементы,чтобы вследствии проверить их количество
        if (mass.length < 3 || mass.length == '') { // проверка сколько было введено символов или не является ли строка пустой
            alert('Имя пользователя должно состоять из 3 или более символов');
            let validNameFocus = document.getElementById("input___name");
            validNameFocus.style.border = '0.630345px solid #ff0000'; // задаем фокус для поля ввода имени
        } else {
            true
        }
    }
    validateName();

    //функция для проверки корректности номера телефона 
    function validatePhone(validPhone) {
        let regex = /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/; // формат ввода номера
        return regex.test(validPhone)
    }
    let validPhone = document.getElementById("input___phone").value; //получаем данные из input (имя пользователя)
    if (!validatePhone(validPhone) || validPhone == '') { // проверка ввода с форматом 
        alert('Номер телефона не соответсвует! Допустимый формат +7 или 8 ');
        let validPhoneFocus = document.getElementById("input___phone");
        validPhoneFocus.style.border = '0.630345px solid #ff0000'; // задаем фокус для поля ввода номера
        return validatePhone();
    }





    modal.style.display = "none";
    spinner.style.display = "block";
    function clearModal() { // очищаем содержимое модального окна 
        spinner.style.display = "none";
        modal.style.display = "block";
        modalcontent.parentNode.removeChild(modalcontent);

    }
    setTimeout(clearModal, 3000); // таймер 3 секунды на врещение спиннера 
    // очищаем поля input'ов
    document.getElementById("input___name").value = '';
    document.getElementById("input___phone").value = '';
    modalcontent.parentNode.removeChild(modalcontent); // очищаем мод окно
    let newModal = document.getElementById('new_modal'); // заливаем в модальное окно новый контент
    newModal.style.display = 'block';
}



const url = 'https://jsonplaceholder.typicode.com/todos'; // задаем ссылку

const xhr = new XMLHttpRequest(); // создаем переменную через конструктор глобального класса 

xhr.open('GET', url); // открываем соединения методом GET 

xhr.onload = () => {
    let users = JSON.parse(xhr.response); // парсим запрос, чтобы результат с сервера вернулся в виде объяекта а не строки 
    console.log(users);
    const newUsers = users.filter(users => { // перебтраем резуьтат и фильтруем по заданным параметрам 
        if (users.userId == 5 && users.completed == false) {
            return true
        }
    })
    document.querySelector('.newModal').innerHTML = `<table class="table"></table>`; // создаем новый html элемент для создания таблицы
    for (let i = 0; i < newUsers.length; i++) { // цикл вывода всех элементов нового массива
        let row = document.createElement('tr');
        row.innerHTML = `<td>${Object.entries(newUsers[i])}</td>`;
        document.querySelector('.table').appendChild(row);
    }
    // const newMass = [];
    // for (let i = 0; i < users.length; i++) {
    //     if (users[i].userId == 5 && users[i].completed == false) {
    //         newMass.push(users[i]);
    //     }
    // }
    // console.log(newMass);
}
xhr.onerror = () => { //вывод сообщения при ошибке в запросе
    document.querySelector('.newModal').innerHTML = `<div class="error">ERROR</div>`;
}
xhr.send();













