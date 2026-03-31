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
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContext, UserContextProvider } from './context/user.context';

function mapJournals(journals) {
  if (!journals) {
    return [];
  }

  return journals.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
  const [journals, setJournals] = useLocalStorage('data');
  const addJournalHandler = (journal) => {
    setJournals([
      ...mapJournals(journals),
      {
        ...journal,
        date: new Date(journal.date),
        id: journals.length > 0 ? Math.max(...journals.map((i) => i.id)) + 1 : 1,
      },
    ]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList journals={mapJournals(journals)} />
        </LeftPanel>
        <Body>
          <JournalForm addJournalHandler={addJournalHandler} />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
