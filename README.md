# Итоги выполнения тестового задания

> 0. ___выполнено___
> 1. ___выполнено___
> 2. ___выполнено___
> 3. ___выполнено___



# Ход выполнения тестового задания

> 1. Сперва я проанализировал при помощи ИИ код программы
> 2. Вывел все функции и нормально отформатировал код
>       - Функции не должны обьявляться в параметрах другой функции
>       - Так же функции не должны работать с переменными из внешней области видимости а только с переданными параметрами
> 3. Обьявил необьявленные функции а так же константы
> 4. Заменил некоторые неуместные конструкции к примеру цикл `for` в котором не использован ни один из блоков обьявления, условия, действия на более подходящий `while`
> 5. Затем переименовал все неназванные переменные а так же функции с непонятными именами
> 6. Проанализировав код я понял что код программы в основном состоит из служебных функций вроде `_objectSpread2` или  `_asyncToGenerator` которые генерирует `babel`  при сборке проекта, поэтому я создал пустой проект с похожей структурой и сгенерировал эти служебные функции которые позже подставил в файл программы
> 7. После проверки, скрипт отработал без ошибок и я создал более удобную структуру для работы в команде, а именно вывел все вспомогательные функции в отдельные модули.
> 8. При помощи ИИ создал парсер который строит `AST` и сохраняет его в формате `JSON`  в `./output`
> 9. Затем при помощи ИИ создал скрипт для построения графа зависимостей а так же очередности исполения который сохраняет графы в текстовом формате в `./output`
> 10. В конце при помощи инструмента `Dot`  из `Graphviz` на основе сгенерированных графов создается визуальное представление  в `./output`
> 11. И наконец добавил скрипт исполнения последних 4 пунктов в `package.json` `npm run generate`
>
>