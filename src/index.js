import { _typeof, _objectSpread2, _defineProperty, _toPropertyKey, _toPrimitive, _regeneratorRuntime, _asyncToGenerator } from './core/compiled-babel.js'; 
import * as constants from './constants/constants.js';
import { asString } from './units/asString.js';
import { delayShowChallengeData } from './units/delayShowChallengeData.js';
import { sendCandidate } from './services/sendCandidate.js';
import { setRunStatus } from './services/setRunStatus.js';
import { runChallenge } from './services/runChallenge.js';
import { handleMobile } from './handlers/handleMobile.js';
import { handleWeb } from './handlers/handleWeb.js';
import { postMessageWithContentHeight } from './messaging/postMessageWithContentHeight.js';



// Функция для начала выполнения задачи
function startChallengeExecution() {
  // Возвращает процесс, который включает выполнение функции runChallengeProcess
  return _regeneratorRuntime().wrap(runChallengeProcess, startChallengeExecution, null, [[2, 14]]);
}


// Основной процесс выполнения задачи
function runChallengeProcess(props) {
  let token, challengeValue, incidentValue, responseData, challengeElement, incidentElement, challengeResult, errorData, errorStack, urlParams, isMobileMode, candidateResponse;
  
  // Основной цикл выполнения с использованием генератора и переходов в коде
  while (true) {
    switch (props.prev = props.next) {
      case 0:
        // Отправка сообщения с высотой контента
        return postMessageWithContentHeight(),
        
        // Задержка перед показом данных задачи
        delayShowChallengeData(),
        
        // Установка предыдущего состояния выполнения задачи
        props.prev = 2,
        
        // Получение значений из элементов на странице для данных задачи и инцидента
        challengeValue = null === (challengeElement = document.getElementById('challenge')) || void 0 === challengeElement ? void 0 : challengeElement.value,
        incidentValue = null === (incidentElement = document.getElementById('incident')) || void 0 === incidentElement ? void 0 : incidentElement.value,
        
        // Устанавливаем статус выполнения задачи на "в ожидании"
        setRunStatus("⧗"),
        
        // Переход к выполнению самой задачи
        props.next = 8,
        runChallenge();

      // Когда выполнение задачи завершилось
      case 8:
        // Если задача выполнена успешно, сохраняем результат
        challengeResult = props.sent ? props.set : 8,
        
        // Обновляем статус выполнения задачи на "выполнено"
        setRunStatus("✔"),
        
        // Извлекаем токен из результата выполнения задачи
        token = challengeResult.token,
        
        // Создаём объект данных с результатом выполнения
        responseData = _objectSpread2(_objectSpread2({}, challengeResult), {}, { error: "" }),
        
        // Переход к следующему этапу
        props.next = 21;
        break;

      // Если произошла ошибка в процессе выполнения
      case 14:
        props.prev = 14,
        // Ловим ошибку и выводим её в консоль
        props.t0 = props.catch(2),
        console.error(props.t0),
        
        // Устанавливаем статус выполнения на "ошибка"
        setRunStatus("✖"),
        
        // Формируем данные для отчёта об ошибке
        errorData = {
          level: 'critical',
          build_ts: '2024-10-15T09:22:43.174Z',
          lib_version: '0.3.2',
          challenge_id: asString(incidentValue, 128),
          user_agent: asString(window.navigator.userAgent, 384),
          url: asString(window.location.href, 512),
          client_ts: (new Date).toISOString()
        },

        // Если ошибка является объектом Error, извлекаем сообщение и стек ошибки
        props.t0 instanceof Error ? (errorData.message = asString(props.t0.message, 256),
        errorStack = props.t0.stack,
        errorData.stack_trace = asString("string" == typeof errorStack ? errorStack.split(window.location.href).join("") : errorStack, 1024)) :
        errorData.message = asString(props.t0, 1024),
        
        // Обновляем responseData с информацией об ошибке
        responseData = {
          token: challengeValue,
          fp: "",
          error: JSON.stringify(errorData)
        };

      case 21:
        // Получаем параметры из URL
        urlParams = new URLSearchParams(document.location.search),
        
        // Проверяем, на мобильном ли устройстве пользователь
        isMobileMode = urlParams.get(constants.MODE_PARAM) === constants.MOBILE_MODE,
        
        // Отправляем данные кандидата
        props.next = 25,
        sendCandidate(responseData);

      case 25:
        // Получаем ответ от отправки данных кандидата
        candidateResponse = props.sent,
        
        // В зависимости от того, мобильное ли устройство, обрабатываем данные по-разному
        isMobileMode ? handleMobile(candidateResponse) : handleWeb(candidateResponse, token);

      // Завершение работы функции
      case 27:
      case 'end':
        // Останавливаем выполнение
        return props.stop();
    }
  }
}

// Главная функция, которая будет вызвана при загрузке страницы
function main() {
  // Асинхронно запускает выполнение задачи
  return _asyncToGenerator(_regeneratorRuntime().mark(startChallengeExecution)).apply(this, arguments);
}

// Добавляем обработчик события на загрузку страницы, чтобы начать выполнение задачи
window.addEventListener('load', main);
