### useSelector()
```javascript
import { useSelector } from  'react-redux';

```javascript
import { useDispatch } from  'react-redux';

//TodoList React Component
const  TodoList  = () => {

//Use for all the dispatch actions
const  dispatch  =  useDispatch();

//Add new todo item into List with the action
dispatch({type:'ADD_TODO',payload:newTodoObject});

}
```
if you want run the app

1 ) should be connect you are internet, with out internet this app wont't run 
    because we are making dynamic api, this api came get it from https://reqres.in/;


2) should be check Node js available or not your using pc,

3) if you have allready installed node js in your pc,

4) npm install ----

5) npm start

6) after npm install and npm start, app is ruuning in http://localhost:3000/ in this port.


## License
[MIT](https://github.com/microsoft/vscode-test/blob/master/LICENSE)



