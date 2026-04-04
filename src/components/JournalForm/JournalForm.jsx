import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useReducer, useEffect, useRef } from 'react';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';
import { useContext } from 'react';

function JournalForm({ addJournalHandler, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
    dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
  }, [data]);

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      addJournalHandler(values);
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
  }, [isFormReadyToSubmit, addJournalHandler, values, userId]);

  useEffect(() => {
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  }, [userId]);

  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: {
        [e.target.name]: e.target.value,
      },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: 'CLEAR' });
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  };

  return (
    <form className={styles.journalForm} onSubmit={addJournalItem}>
      <div className={styles['form-row']}>
        <Input
          type="text"
          ref={titleRef}
          onChange={onChange}
          value={values.title}
          name="title"
          appearance="title"
          isValid={isValid.title}
        />
        {data?.id && (
          <button className={styles['delete']} type="button" onClick={deleteJournalItem}>
            <img src="/archive.svg" alt="Кнопка удалить" />
          </button>
        )}
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <Input
          id="date"
          type="date"
          ref={dateRef}
          onChange={onChange}
          value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
          name="date"
          isValid={isValid.date}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="/folder.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <Input id="tag" type="text" onChange={onChange} value={values.tag} name="tag" />
      </div>

      <textarea
        name="text"
        ref={textRef}
        onChange={onChange}
        value={values.text}
        className={`${styles.input} ${isValid.text ? '' : styles.invalid}`}
      ></textarea>
      <Button>Сохранить</Button>
    </form>
  );
}

export default JournalForm;
