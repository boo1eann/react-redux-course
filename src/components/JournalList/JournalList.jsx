import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { UserContext } from '../../context/user.context';
import { useContext, useMemo } from 'react';

function JournalList({ journals, setItem }) {
  const { userId } = useContext(UserContext);
  const sortItems = (a, b) => b.date - a.date;
  const filteredJournals = useMemo(() => {
    return [...journals].filter((el) => el.userId === userId).sort(sortItems);
  }, [journals, userId]);

  if (journals.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }

  return (
    <>
      {filteredJournals.map((el) => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <JournalItem title={el.title} text={el.text} date={el.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;
