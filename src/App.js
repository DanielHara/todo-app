import React, { useState } from 'react';
import styles from './App.module.scss';

function App() {
  const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addToList = (todo) => {
    setList(list.concat(todo))
  }

  const removeIndex = (index) => {
    setList(list.slice(0, index).concat(list.slice(index + 1)));
  }

  return (
    <div className={styles.App}>
        <div className={styles.inputTile}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              placeholder="Create a new todo..."
              value={newTodo}
              onChange={ (event) => {
                setNewTodo(event.target.value);
              } }
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  addToList(newTodo);
                  setNewTodo('');
                }
              }}
            />
          </div>
        </div>

      <ul className={styles.list}>
        {list.map((item, index) => <li className={styles.tile}>
            <div className={styles.completeButtonWrapper}>
              <button className={styles.completeButton} />
            </div>
            <div className={styles.text}>
              {item}
            </div>
            <div className={styles.removeButtonWrapper} >
              <button className={styles.removeButton} onClick={() => removeIndex(index)}>
                X
              </button>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
