import './Button.css';
import { useState } from 'react';

function Button() {
  const [text, setText] = useState('Save');
  console.log('Rerender');

  const clicked = () => {
    setText('Close');
    console.log(text);
  };

  return (
    <button onClick={clicked} className="button accent">
      {text}
    </button>
  );
}

export default Button;
