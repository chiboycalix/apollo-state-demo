import { makeVar } from '@apollo/client';
import { Todo } from './todo';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';


/** @type {*} state initialization*/
export const todoListVar = makeVar<Todo[]>([]);


/**
 * 
 * @description add Todo to List
 * @param {string} description
 */
export const addTodo = (description: string) => {
  todoListVar(
    produce(todoListVar(), (draft) => {
      draft.push({
        id: uuidv4(),
        description,
        completed: false
      });
    })
  );
};

/**
 *
 * @description remove a todo from the list
 * @param {number} index
 */
export const removeTodo = (index: number) => {
  todoListVar(
    produce(todoListVar(), (draft) => {
      draft.splice(index, 1);
    })
  );
};

/**
 *
 * @description toggle completed todo
 * @param {number} index
 */
export const toggleComplete = (index: number) => {
  todoListVar(
    produce(todoListVar(), (draft) => {
      draft[index].completed = !draft[index].completed;
    })
  );
};