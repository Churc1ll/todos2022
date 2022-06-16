import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();

let form;

const AppProvider = ({ children }) => {
  // Set tasks
  const [tasks, setTasks] = useState([
    { name: 'Тестовое задание', isCompleted: false },
    { name: 'Прекрасный код', isCompleted: true },
    { name: 'Покрытие тестами', isCompleted: false },
  ]);

  const checkValue = (value) => {
    if (tasks.length <= 20) {
      if (!/[a-z]|[A-Z]|[а-я]|[А-Я]/.test(value)) {
        value = '';
        form.placeholder =
          'Invalid input: the task should contain some letters';
        return false;
      } else if (value.length < 3) {
        value = '';
        form.placeholder = 'Invalid input: the task is too short';
      } else if (value.length > 50) {
        value = '';
        form.placeholder = 'Is it a poem or ur keyboard is broken?';
      } else if (
        !/a|e|u|i|o|A|E|U|I|O|а|о|и|у|я|ю|ы|э|е|А|О|И|У|Я|Ю|Ы|Э|Е/.test(value)
      ) {
        value = '';
        form.placeholder =
          "Apparently it's not a valid word, try one more time";
      } else if (
        value[0] === value[Math.floor(value.length - 1 / 2)] &&
        value[0] === value[value.length - 1]
      ) {
        value = '';
        form.placeholder = 'Invalid input: is you kb button jammed?';
      } else {
        return true;
      }
    }
  };

  const writeValue = () => {
    const arrow = document.querySelector('.arrow');
    if (checkValue(form.value)) {
      arrow.style.animation = '1s ease-out moveArrow';
      setTasks([...tasks, { name: form.value, isCompleted: false }]);
      form.value = '';
      form.placeholder = 'What needs more to be done?';
      setTimeout(() => (arrow.style.animation = 'none'), 1000);
    } else {
      arrow.style.borderTopColor = 'red';
      arrow.style.borderRightColor = 'red';
      setTimeout(() => {
        arrow.style.borderTopColor = 'rgb(204, 204, 247)';
        arrow.style.borderRightColor = 'rgb(204, 204, 247)';
      }, 1000);
      form.value = '';
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') writeValue();
  };

  // Manage tasks
  const handleCheck = (e) => {
    let name;
    if (e.target.tagName === 'BUTTON') {
      name = e.target.parentNode.firstChild.name;
    } else {
      name = e.target.name;
    }
    const tempArray = tasks.slice();
    const isCompleted = tempArray[+name].isCompleted;
    tempArray[+name].isCompleted = !isCompleted;
    setTasks(tempArray);
  };

  // Filter results
  const [showing, setShowing] = useState({
    active: false,
    completed: false,
  });

  const highlightButton = (e) => {
    document
      .querySelector('.buttons-active')
      .classList.remove('buttons-active');
    e.target.parentNode.classList.add('buttons-active');
  };

  const showAll = (e) => {
    highlightButton(e);
    setShowing({ active: false, completed: false });
  };

  const showActive = (e) => {
    highlightButton(e);
    setShowing({ active: true, completed: false });
  };

  const showCompleted = (e) => {
    highlightButton(e);
    setShowing({ all: false, active: false, completed: true });
  };

  const clearCompleted = () => {
    const tempArray = tasks.filter((task) => {
      const { isCompleted } = task;
      return !isCompleted;
    });
    setTasks(tempArray);
  };

  // Set up elements
  useEffect(() => {
    form = document.querySelector('input');
    form.focus();
    document.querySelector('.buttons').classList.add('buttons-active');
    let inputs = document.querySelectorAll('input');
    inputs[2].checked = true;
  }, []);

  return (
    <AppContext.Provider
      value={{
        tasks,
        showing,
        writeValue,
        handleEnterPress,
        handleCheck,
        showAll,
        showActive,
        showCompleted,
        clearCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
