import React, { useState } from 'react';
import styles from './App.module.scss';

function App() {
  const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addToList = (todo) => {
    setList(list.concat(todo))
  }

  return (
    <div className={styles.App}>
      <input
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

      <ul>
        {list.map((item, index) => <li className={styles.tile}>
            <div className={styles.completeButtonWrapper}>
              <button className={styles.completeButton} />
            </div>
            <div className={styles.text}>
              {item}
            </div>
            <div className={styles.removeButtonWrapper} >
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
