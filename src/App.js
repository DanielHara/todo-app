import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './App.module.scss';

function App() {
  const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addToList = (todo) => {
    setList(list.concat({
      text: todo,
      complete: false
    }))
  }

  const removeIndex = (index) => {
    setList(list.slice(0, index).concat(list.slice(index + 1)));
  }

  const completeIndex = (index) => {
    const updatedList = [...list];
    updatedList[index].complete = true;
    setList(updatedList);
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
        {list.map(( { text, complete }, index) => <li className={styles.tile}>
            <div className={styles.completeButtonWrapper}>
              <button className={styles.completeButton}
                onClick={() => { completeIndex(index); }}
              />
            </div>
            <div className={clsx(styles.text, {[styles.completedText]: complete})}>
              {text}
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
