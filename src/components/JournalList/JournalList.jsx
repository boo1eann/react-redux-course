import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({ journals }) {
  if (journals.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>;
  }

  const sortJournals = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  if (journals.length > 0) {
    return (
      <>
        {[...journals].sort(sortJournals).map((el) => (
          <CardButton key={el.id}>
            <JournalItem title={el.title} text={el.text} date={el.date} />
          </CardButton>
        ))}
      </>
    );
  }

  // return <div className="journal-list">{list}</div>;
}

export default JournalList;
