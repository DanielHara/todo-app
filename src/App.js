import React, { useState } from 'react';
import clsx from 'clsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './App.module.scss';

let id = 1;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function App() {
  const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addToList = (todo) => {
    setList(list.concat({
      text: todo,
      complete: false,
      id: `${id++}`
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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newList = reorder(
      list,
      result.source.index,
      result.destination.index
    );

    setList(newList);
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


        <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
               <ul className={styles.list}>
          {list.map(( { text, complete, id }, index) => <Draggable key={id} draggableId={id} index={index}>
            {(provided, snapshot) => (
              <li key={id} className={styles.tile} ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}>
              <div className={styles.completeButtonWrapper}>  
                <button className={clsx(styles.completeButton, {[styles.completedButton]: complete})}
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
            </Draggable>
          )}
        </ul>
        </div>)}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
