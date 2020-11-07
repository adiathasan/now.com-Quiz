import React from 'react';
import styles from '../pages/order/order.module.css';

const Input = ({ type, id, value, setValue, handleDown, handleUp }) => {
  return (
    <div>
      <input
        required
        className={styles.order__input}
        type={type}
        value={value}
        placeholder={id + '...'}
        id={id}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="swipe">
        {handleUp && (
          <button onClick={handleUp} className={styles.btn__up}>
            up
          </button>
        )}
        {handleDown && (
          <button onClick={handleDown} className={styles.btn__down}>
            Down
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
