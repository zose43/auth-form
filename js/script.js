$('document').ready(function ()
{
    let wrapper = $('.auth-wrapper');
    validate();

    $(wrapper).on('click', '#toggle', function ()
    {

        wrapper.toggleClass('reg');
        $('.form').remove();

        if (!wrapper.hasClass('reg'))
        {
            $('.auth-wrapper').append(`
                <form class="row g-3 needs-validation p-2 form" novalidate>
                            <div class="form-block">
                                <div class="auth-block row p-2">
                                    <div class="col-md-6">
                                        <label for="validationCustom01" class="form-label">Логин</label>
                                        <input type="text" class="form-control" id="validationCustom01" name="login" required>
                                        <div class="invalid-feedback">
                                            Пожалуйста, напишите ваш логин.
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="validationCustom02" class="form-label">Пароль</label>
                                        <input type="password" class="form-control" id="validationCustom02" name="password" required>
                                        <div class="invalid-feedback">
                                            Пароль должен быть заполнен.
                                        </div>
                                    </div>
                                </div>    
                            </div>
                            <div class="col-12 text-center text-md-start" id="toggle">Войти в личный кабинет</div>
                            <div class="col-12 d-flex justify-content-center mt-3">
                                <button class="btn btn-primary" type="submit">Зарегистрироваться</button>
                            </div>
                </form>
            `);

            $('#toggle').text('Зарегистрироваться');
            $('.btn').text('Войти');

        } else
        {
            $('.auth-wrapper').append(`
                <form class="row g-3 needs-validation p-2 form" novalidate>
                    <div class="form-block">
                        <div class="reg-block row p-2">
                            <div class="col-md-6">
                                <label for="validationCustom01" class="form-label">Логин</label>
                                <input type="text" class="form-control" id="validationCustom01" name="login" minlength="3" pattern="^[a-z,A-Z,а-я,А-Я]{1,10}$" required>
                                <div class="invalid-feedback"></div>
                                <div class="valid-feedback">
                                    Все хорошо!
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="validationCustom02" class="form-label">Пароль</label>
                                <input type="password" class="form-control" id="validationCustom02" name="password" minlength="7" pattern="(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{7,}" required>
                                <div class="invalid-feedback"></div>
                                <div class="valid-feedback">
                                    Все хорошо!
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="validationCustom03" class="form-label">О себе</label>
                                <input type="text" class="form-control" id="validationCustom03" name="message">
                            </div>
                            <div class="col-md-6">
                                <label for="validationCustom05" class="form-label">Возраст</label>
                                <input type="number" class="form-control" name="age" id="validationCustom05" max="85" min="10" required>
                                <div class="invalid-feedback"></div>
                                <div class="valid-feedback">
                                    Все хорошо!
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 text-center text-md-start" id="toggle">Войти в личный кабинет</div>
                    <div class="col-12 d-flex justify-content-center mt-3">
                        <button class="btn btn-primary" type="submit">Зарегистрироваться</button>
                    </div>
                </form>
            `);

            $('#toggle').text('Войти в личный кабинет');
            $('.btn').text('Зарегистрироваться');

        }

        validate();
    });
})

function validate()
{
    let forms = document.querySelectorAll('.needs-validation'),
        login = document.getElementById('validationCustom01'),
        age = document.getElementById('validationCustom05'),
        password = document.getElementById('validationCustom02'),
        descr = document.getElementById('validationCustom03'),
        trigger = document.querySelectorAll('.reg')[0],
        inputs = document.querySelectorAll('.form-control');

    Array.prototype.slice.call(forms)
        .forEach(function (form)
        {
            if (age)
            {
                form.age.addEventListener('invalid', function (e)
                {
                    let el = age.parentElement.childNodes[5];

                    if (age.value > 10 || age.value < 85 && age.value !== "")
                        el.textContent = 'Допустимый интервал от 10 до 85.';
                    else
                        el.textContent = 'Пожалуйста, напишите ваш возраст.';
                });
            }

            if (!trigger)
            {
                form.login.addEventListener('invalid', function (e)
                {
                    let el = login.parentElement.childNodes[5];

                    if (!login.value)
                        el.textContent = 'Логин должен быть заполнен.';
                });

                form.password.addEventListener('invalid', function (e)
                {
                    let el = password.parentElement.childNodes[5];

                    if (!password.value)
                        el.textContent = 'Пароль должен быть заполнен.';
                });

            } else
            {
                form.login.addEventListener('invalid', function (e)
                {
                    let el = login.parentElement.childNodes[5];

                    if (login.value.match(/(\d+)/g))
                        el.textContent = 'Логин должен состоять без чисел.';
                    else
                        el.textContent = 'Логин должен быть заполнен.';
                });

                form.password.addEventListener('invalid', function (e)
                {
                    let el = password.parentElement.childNodes[5];

                    if (!password.value.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{7,}/g) && password.value)
                        el.textContent = 'Пароль должен содержать как минимум 1 число, 1 спец символ и быть не меньше 7 знаков.';
                    else
                        el.textContent = 'Пароль должен быть заполнен.';
                });
            }

            form.addEventListener('submit', function (event)
            {
                event.preventDefault();

                if (!form.checkValidity())
                    event.stopPropagation();
                else
                    sendRequest();

                form.classList.add('was-validated');

            }, false);
        });
}

function getAlert(msg)
{
    let body = document.getElementsByTagName('body')[0],
        success = '',
        error = '';

    if (msg.success)
    {
        success = msg.success;
        $(body).append(`
        <div class="container mt-3">
            <div class="row">
                <div class="col">
                    <div class="alert alert-success" role="alert">
                        <h4 class="alert-heading">Успех</h4>
                        <div>${success}</div>
                        <hr>
                        <a href="../personal.php">Смотреть статистику</a>
                    </div>
                </div>
            </div>
        </div> 
    `);
        setTimeout(() => location.href = location + '/personal.php', 5000);
    }
    if (msg.err)
    {
        error = msg.err;
        $(body).append(`
            <div class="container mt-3">
                <div class="row">
                    <div class="col">
                        <div class="alert alert-danger" role="alert">
                            <h4 class="alert-heading">Ошибка</h4>
                            <div>${error}</div>
                        </div>
                    </div>
                </div>
            </div> 
    `);
    }
    setTimeout(() => $('.alert').remove(), 5000);
}

function sendRequest()
{
    let form = document.querySelectorAll('.form')[0],
        data = {};

    data = Object.fromEntries(new FormData(form).entries());

    $.ajax({
        url: document.location + '/ajax.php',
        method: "POST",
        data: {auth: data},
        success: function(data)
        {
            if (data)
                data = JSON.parse(data);

            if (data.success || data.err)
                getAlert(data);
        }
    });
}