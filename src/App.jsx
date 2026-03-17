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
    title: 'Подготовка к обновлению курсов',
    text: 'Сегодня провёл весь день за...',
    date: '2024-04-23',
  },
  {
    title: 'Поход в годы',
    text: 'Думал, что очень много време...',
    date: '2025-05-31',
  },
];

function App() {
  const [journals, setJournals] = useState(INITIAL_DATA);

  const addJournalHandler = (journal) => {
    setJournals([...journals, journal]);
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          {journals.map((el) => (
            <CardButton>
              <JournalItem title={el.title} text={el.text} date={el.date} />
            </CardButton>
          ))}
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm addJournalHandler={addJournalHandler} />
      </Body>
    </div>
  );
}

export default App;
