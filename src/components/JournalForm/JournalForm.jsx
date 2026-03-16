import { useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

function JournalForm() {
  const [inputData, setInputData] = useState('');
  const [state, setState] = useState({
    age: 31,
  });

  const inputChange = (event) => {
    setInputData(event.target.value);
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react-hooks/immutability
    state.age = 40;
    setState({ ...state });
    console.log(state);
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
  };

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      {state.age}
      <input type="text" name="title" />
      <input type="date" name="date" />
      <input type="text" name="tag" value={inputData} onChange={inputChange} />
      <textarea name="post" id=""></textarea>
      <Button
        text="Сохранить"
        onClick={() => {
          console.log('Clicked!');
        }}
      />
    </form>
  );
}

export default JournalForm;
