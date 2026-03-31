import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { UserContext } from '../../context/user.context';
import { useContext } from 'react';

function JournalList({ journals }) {
  const { userId } = useContext(UserContext);

  if (journals.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }
  const sortItems = (a, b) => b.date - a.date;

  return (
    <>
      {[...journals]
        .filter((el) => el.userId === userId)
        .sort(sortItems)
        .map((el) => (
          <CardButton key={el.id}>
            <JournalItem title={el.title} text={el.text} date={el.date} />
          </CardButton>
        ))}
    </>
  );
}

export default JournalList;
