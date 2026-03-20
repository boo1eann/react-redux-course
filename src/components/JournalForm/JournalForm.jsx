import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import cn from 'classnames';

function JournalForm({ addJournalHandler }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true,
  });

  const addJournalItem = (e) => {
    console.log(styles);
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    let isFormValid = true;
    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.text?.trim().length) {
      setFormValidState((state) => ({ ...state, text: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, text: true }));
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    if (!isFormValid) {
      return;
    }

    addJournalHandler(formProps);
  };

  return (
    <form className={styles.journalForm} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          className={cn(styles['input-title'], {
            [styles.invalid]: !formValidState.title,
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
          name="date"
          className={`${styles.input} ${formValidState.date ? '' : styles.invalid}`}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']}>
          <img src="/folder.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <input id="tag" type="text" name="tag" className={styles.input} />
      </div>

      <textarea
        name="text"
        className={`${styles.input} ${formValidState.text ? '' : styles.invalid}`}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
