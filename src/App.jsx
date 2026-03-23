import { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

function App() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setJournals(
        data.map((item) => ({
          ...item,
          date: new Date(item.date),
        })),
      );
    }
  }, []);

  useEffect(() => {
    if (journals.length) {
      localStorage.setItem('data', JSON.stringify(journals));
    }
  }, [journals]);

  const addJournalHandler = (journal) => {
    setJournals((oldJournals) => [
      ...oldJournals,
      {
        text: journal.text,
        title: journal.title,
        date: new Date(journal.date),
        id: oldJournals.length > 0 ? Math.max(...oldJournals.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList journals={journals} />
      </LeftPanel>
      <Body>
        <JournalForm addJournalHandler={addJournalHandler} />
      </Body>
    </div>
  );
}

export default App;
