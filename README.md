# mail.ru-test-internship


# Masked Number Component

компонент создан на основе web components

## API

### .value getter

в случае если одно или несколько input полей не заполнено или в хотя бы одном введено не число возвращает null, в противном случае возвращает маскировочную строку где I заменены на введенные числа

### .resetForm()

сбрасывает значения в полях для ввода

### .displayError()

- при использовании метода .displayError() поведение совпадает с макетом в пункте error
- после использования метода .displayError() для того чтобы убрать сообщение об ошибке требуется ввести любые значения в поля ввода, и, если были введены неверные значения, удалить их

## Использование

при использовании необходимо добавить класс MaskedNumber для декларирования компонента и после этого добавить в DOM элемент <masked-input></masked-input> с указанным атрибутом mask, по которому будет создан элемент

таким образом для маски из примера - "+7(985)0II-**" будет

    <masked-input mask="+7(985)0II-**-**"></masked-input>

## Поведение компонента при неверном вводе

- при вводе в поля для ввода невозможно ввести больше одного символа
- при вводе не цыфры в поле ввода вокруг данного поля ввода появится красный border и появится надпись "Неверный номер, попробуйте еще раз"
- при использовании метода .displayError() поведение совпадает с макетом в пункте error
- после использования метода .displayError() для того чтобы убрать сообщение об ошибке требуется ввести любые значения в поля ввода, и, если были введены неверные значения, удалить их