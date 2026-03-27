import styles from './Input.module.css';
import cn from 'classnames';

function Input({ className, isValid = true, appearance, ...rest }) {
  return (
    <input
      {...rest}
      className={cn(className, styles['input'], {
        [styles.invalid]: !isValid,
        [styles['input-title']]: appearance === 'title',
      })}
    />
  );
}

export default Input;
