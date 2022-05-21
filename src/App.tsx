import React from 'react';
import {
  Button,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import TrashIcon from '@material-ui/icons/Delete';
import { createRef } from 'react';
import { useReactiveVar } from '@apollo/client';
import { toggleComplete, addTodo, removeTodo, todoListVar } from './todoState';

const useStyles = makeStyles((theme) => ({
  titleStyles: {
    textAlign: 'center',
    marginBottom: theme.spacing(3)
  },
  listStyles: {
    marginTop: theme.spacing(2)
  },
  listItemStyles: {
    padding: theme.spacing(1, 0)
  },
  completedTextStyle: {
    textDecoration: 'line-through'
  },
  addFirstItemStyle: {
    textAlign: 'center',
    marginTop: theme.spacing(2)
  },
  root: {
    padding: theme.spacing(2, 0)
  }
}));

function App() {
  const todoTextRef = createRef<HTMLInputElement>();
  const todoList = useReactiveVar(todoListVar);
  console.log({ todoList });

  const { titleStyles, listStyles, listItemStyles, root, completedTextStyle, addFirstItemStyle } = useStyles();
  return (
    <Container className={root} maxWidth="xs">
      <Typography className={titleStyles} variant="h3">
        To Do List
      </Typography>
      <TextField inputRef={todoTextRef} fullWidth variant="outlined" label="To Do Description" />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => {
          if (todoTextRef.current && todoTextRef.current.value.length > 0) {
            addTodo(todoTextRef.current.value);
            todoTextRef.current.value = '';
          }
        }}
      >
        Add Item
      </Button>

      {todoList.length > 0 ? (
        <List className={listStyles}>
          {todoList.map((todo, index) => (
            <ListItem className={listItemStyles} key={todo.id} button>
              <ListItemIcon>
                <Checkbox value={todo.completed} onChange={() => toggleComplete(index)} />
              </ListItemIcon>
              <ListItemText className={todo.completed ? completedTextStyle : ''} primary={todo.description} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => removeTodo(index)}>
                  <TrashIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography className={addFirstItemStyle} variant="h5">
          Please Add Your First Item
        </Typography>
      )}
    </Container>
  );
}

export default App;
