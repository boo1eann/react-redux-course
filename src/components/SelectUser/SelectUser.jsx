import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function SelectUser() {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <select name="user" value={userId} id="user" onChange={changeUser}>
      <option value="1">Bob</option>
      <option value="2">Jhon</option>
    </select>
  );
}

export default SelectUser;
