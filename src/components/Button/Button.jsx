import './Button.css';

function Button() {
  const clicked = () => {
    console.log('hello!');
  };

  return (
    <button onClick={clicked} className="button accent">
      Save
    </button>
  );
}

export default Button;
