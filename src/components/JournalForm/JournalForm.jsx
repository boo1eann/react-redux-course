import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useReducer, useEffect, useRef } from 'react';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './JournalForm.state';

function JournalForm({ addJournalHandler }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();

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
    }
  }, [isFormReadyToSubmit, addJournalHandler, values]);

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

  return (
    <form className={styles.journalForm} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          ref={titleRef}
          onChange={onChange}
          value={values.title}
          name="title"
          className={cn(styles['input-title'], {
            [styles.invalid]: !isValid.title,
          })}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <input
          id="date"
          type="date"
          ref={dateRef}
          onChange={onChange}
          value={values.date}
          name="date"
          className={`${styles.input} ${isValid.date ? '' : styles.invalid}`}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="/folder.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <input
          id="tag"
          type="text"
          onChange={onChange}
          value={values.tag}
          name="tag"
          className={styles.input}
        />
      </div>

      <textarea
        name="text"
        ref={textRef}
        onChange={onChange}
        value={values.text}
        className={`${styles.input} ${isValid.text ? '' : styles.invalid}`}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
