import { render, screen } from '@testing-library/react';
import App from './App';
import { AppProvider } from './Context';
import userEvent from '@testing-library/user-event';

const renderApp = () => {
  return render(
    <AppProvider>
      <App />
    </AppProvider>
  );
};

describe('App', () => {
  it('renders App', () => {
    renderApp();

    // Checking presence of title, placeholder, value of input and focus on input
    expect(screen.getByText(/todos/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/what needs to be done/i)
    ).toBeInTheDocument();

    expect(screen.getByDisplayValue('')).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toHaveFocus();
  });
});

describe('Input', () => {
  it('test input and placeholder', () => {
    renderApp();

    // 3 tasks initially
    expect(screen.getAllByRole('radio').length).toEqual(3);

    // accepts letters
    userEvent.type(
      screen.getByRole('textbox'),
      'All the world’s a stage{enter}'
    );
    expect(screen.getByText(/All the world’s a stage/)).toBeInTheDocument();

    // and russian letters
    userEvent.type(screen.getByRole('textbox'), 'Весь мир - театр{enter}');
    expect(screen.getByText(/весь мир - театр/i)).toBeInTheDocument();

    // check new message of placeholder
    expect(
      screen.getByPlaceholderText(/what needs more to be done/i)
    ).toBeInTheDocument();

    // no numbers only
    userEvent.type(screen.getByRole('textbox'), '1101{enter}');
    expect(screen.queryByText(/1101/)).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/the task should contain some letters/)
    ).toBeInTheDocument();

    // no consonants only
    userEvent.type(screen.getByRole('textbox'), 'bcdfghlmpqxz{enter}');
    expect(screen.queryByText(/bcdf/)).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        /Apparently it's not a valid word, try one more time/
      )
    ).toBeInTheDocument();

    // no short or empty messages less then 3 symbols
    userEvent.type(screen.getByRole('textbox'), 'ab{enter}');
    expect(screen.queryByText(/ab/)).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/the task is too short/)
    ).toBeInTheDocument();

    // no strings more than 50 symbols
    userEvent.type(
      screen.getByRole('textbox'),
      ' All the world’s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts{enter}'
    );
    expect(
      screen.queryByText(/all the men and women merely players/)
    ).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Is it a poem/)).toBeInTheDocument();

    // no jammed buttons
    userEvent.type(screen.getByRole('textbox'), 'aaaaaaaaaaaaaaaaa{enter}');
    expect(screen.queryByText(/aaa/)).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/is you kb button jammed/)
    ).toBeInTheDocument();

    // 2 tasks were added to the list
    expect(screen.getAllByRole('radio').length).toEqual(5);
  });
});

describe('List', () => {
  it('Manage list', () => {
    renderApp();

    const activeItemsCount = screen.getByText(/items left/);
    const allButton = screen.getByText(/all/i);
    const ActiveButton = screen.getByText(/active/i);
    const completedButton = screen.getByText(/Completed/);
    const clearCopletedButton = screen.getByText(/Clear completed/);

    const tasktsOnScreenCount = () => screen.getAllByRole('radio').length;

    // Initially one task is checked
    expect(screen.getAllByRole('radio')[1]).toBeChecked();
    userEvent.type(screen.getByRole('textbox'), 'test task1{enter}');
    userEvent.type(screen.getByRole('textbox'), 'test task2{enter}');

    const newTask = screen.getAllByRole('radio')[4];

    // check 2nd task
    userEvent.click(newTask);
    expect(newTask).toBeChecked();

    // show only completed tasks
    userEvent.click(completedButton);
    expect(tasktsOnScreenCount()).toEqual(2);

    // show only active taskts
    userEvent.click(ActiveButton);

    // sum of tasks on screen === value of active items on screen
    expect(tasktsOnScreenCount()).toEqual(+activeItemsCount.textContent[0]);

    // show all taskts again
    userEvent.click(allButton);
    expect(tasktsOnScreenCount()).toEqual(5);

    // clear copleted tasks and check how many tasks are shown on the screen
    userEvent.click(clearCopletedButton);
    expect(tasktsOnScreenCount()).toEqual(3);

    // check again equality of quantity of tasks and sum 'items left'
    expect(tasktsOnScreenCount()).toEqual(+activeItemsCount.textContent[0]);
  });
});
