import { useState } from 'react';
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

const INITIAL_DATA = [
  {
    id: 1,
    title: 'Подготовка к обновлению курсов',
    text: 'Сегодня провёл весь день за...',
    date: new Date(),
  },
  {
    id: 2,
    title: 'Поход в годы',
    text: 'Думал, что очень много време...',
    date: new Date(),
  },
];

function App() {
  const [journals, setJournals] = useState(INITIAL_DATA);

  const addJournalHandler = (journal) => {
    setJournals((oldJournals) => [
      ...oldJournals,
      {
        text: journal.text,
        title: journal.title,
        date: new Date(journal.date),
        id: Math.max(...oldJournals.map((journal) => journal.id)) + 1,
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
