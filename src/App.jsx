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
import { useState } from 'react';

function mapJournals(journals) {
  if (!journals) {
    return [];
  }

  return journals.map((i) => ({ ...i, date: new Date(i.date) }));
}

function App() {
  const [journals, setJournals] = useLocalStorage('data');
  const [selectedItem, setSelectedItem] = useState(null);

  const addJournalHandler = (journal) => {
    if (!journal.id) {
      setJournals([
        ...mapJournals(journals),
        {
          ...journal,
          date: new Date(journal.date),
          id: journals.length > 0 ? Math.max(...journals.map((i) => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setJournals([
        ...mapJournals(journals).map((i) => {
          if (i.id === journal.id) {
            return {
              ...journal,
            };
          }
          return i;
        }),
      ]);
    }
  };

  const deleteItem = (id) => {
    setJournals([...journals.filter((i) => i.id !== id)]);
  };

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton clearForm={() => setSelectedItem(null)} />
          <JournalList journals={mapJournals(journals)} setItem={setSelectedItem} />
        </LeftPanel>
        <Body>
          <JournalForm
            addJournalHandler={addJournalHandler}
            onDelete={deleteItem}
            data={selectedItem}
          />
        </Body>
      </div>
    </UserContextProvider>
  );
}

export default App;
