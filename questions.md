1. What is the difference between Component and PureComponent? Give
   an example where it might break my app.
* The main difference between Component and PureComponent is the re-rendering of the components. PureComponent perform a shallow comparison of the props and state in shouldComponentUpdate method. This means that the component will re-render only if the props or state has changed
   App will break in scenarios where state is an object which is mutated and setting the object back to the state will not detect the change and prevent the re-render. For example,

   ```js
   const [fullName, setFullName] = useState({ firstName: 'John', lastName: ‘Doe’ });
   
   const handleClick = () => {
        // Mutating the object
         fullName.firstName = ‘Jane’;
         setFullName(fullName); // This would not trigger re-render with PureComponent
   };
   ```

2. Context + ShouldComponentUpdate might be dangerous. Why is that?
* The Context updates may be blocked by the component as `shouldComponentUpdate` will not be able to pick up the context changes when the state of component is improperly updated or a shallow comparison is performed in case of PureComponents and a deeply nested object is updated. Due to this nature the context update would not reach the nested component which is using the context
3. Describe 3 ways to pass information from a component to its PARENT.
* **Using callback**: Callback function can be used to pass to children as prop. In child component the callback function can be invoked and pass the data as a parameter. For example,
   ```jsx
   <ChildComponent onData={//handler for function in parent} />
           
   function ChildComponent({ onData }) {
       const handleClick = () => { onData('Passing data to parent');  };
       return <button onClick={handleClick}>Send Data</button>;
   }
   ```
* **Using Context API**: Context can be created in the parent component and using useContext the context can be accessed in the child component. The context can have method to set data which can be invoked and pass data from child to parent
   ```jsx
   import React, { useContext } from 'react';
   const DataContext = React.createContext();
   
   function ParentComponent() {
     const [data, setData] = useState('');
   
     return (
       <DataContext.Provider value={{ data, setData }}>
         <ChildComponent />
         <p>Data from child: {data}</p>
       </DataContext.Provider>
     );
   }
   
   function ChildComponent() {
     const { setData } = useContext(DataContext);
   
     const handleClick = () => {
       setData('Data from child');
     };
   
     return <button onClick={handleClick}>Send Data</button>;
   }
   ```
* **Lifting the state**: A local state can be create in the parent component and pass the function to set state to child component. Invoking this function in child component when passed as prop would set the data in the parent component.
    ```jsx
    function ParentComponent() {
      const [data, setData] = useState('');
    
      const handleChildData = (childData) => {
        setData(childData);
      };
    
      return (
        <div>
          <ChildComponent onData={handleChildData} />
          <p>Data from child: {data}</p>
        </div>
      );
    }
    
    function ChildComponent({ onData }) {
      const handleClick = () => {
        onData('Data from child');
      };
    
      return <button onClick={handleClick}>Send Data</button>;
    }
    ```
4. Give 2 ways to prevent components from re-rendering.
* A functional component can be optimized to prevent re-rendering by using `useMemo` hook. The component can be wrapped using `useMemo` and return the memoized component.
* Using a PureComponent can prevent unnecessary re-renders. Also, custom implementation can be used in `shouldComponentUpdate` to check for changes and avoid re-renders
5. What is a fragment and why do we need it? Give an example where it might
   break my app.
* Fragment is a built-in react component which helps to group or wrap multiple elements without adding additional DOM elements.
* When fragments are used in rendering a list of items which wrap other DOM elements we will not be able to provide `key` which will result in performance issues.
6. Give 3 examples of the HOC pattern.
* HOC pattern can be used for Authentication, Loader and ErrorHandling
* **Authentication HOC**: Using this the app can be wrapped to protect routes which can be accessed only after login
* **Loader HOC**: Loader HOC can be used to display a loading indicator while data is being fetched
* **ErrorHandling HOC**: ErrorHandling HOC can be used to handle errors that occur within a component and display an error message or fallback UI to the user
7. What's the difference in handling exceptions in promises, callbacks
   and async...await?
* Promises handle exceptions using `.catch()` method which is chained to the `.then()` block. Any errors which occur can be parsed using the `error` argument which is available in the function
```js
promise()
.then(response => {
    //success 
})
.catch((error) => {
    //error
});
```
* Callback handle exceptions using the arguments passed to the function. The first argument is usually referred as the error. Exception can be handles using `if` condition for the error.
```js
callback((error, response) => {
    if(error){
        //error
    }else{
        //success
    }
})
```
* Async/Await handles exception using `catch` similar to promises but instead of using chaining a `try-catch` block is used.
```js
async function fetchData(){
    try{
        const response = await fetchCall();
        //success
    }catch (error) {
        //error
    }
}
```
8. How many arguments does setState take and why is it async.
* `setState` takes two arguments. First argument is `updater` and second argument is `callback`
* First argument is an object which is updated and need to be merged into the current state.
* Second argument is a callback function which gets executed after the state is updated
* The async nature of `setState` is due to the batching state updates. `setState` when called does not get executed immediately instead react checks for other state updates and if any the updates are batched into a single update. This is done to optimise the performance and minimize the re-renders
9. List the steps needed to migrate a Class to Function Component.
* Change the class declaration to function implementation
* Change the state usage from `setState` to `useState`
* Remove any lifecycle methods and utilize equivalent hooks such as `useEffect` to perform operation from the lifecycle methods previously used
* Change the function declaration
* Pass the props to the functional component and use from `props` instead of `this.props`
* Move the `return` statement outside of `render()` method and remove the `render()` method
* Update the documentation and tests for the miggrated component

10. List a few ways styles can be used with components.
* Using `style` attribute on the element directly
    ```jsx
    const Component = () => {
      return (
        <div style={{
                color: 'gray',
                fontSize: '12px'
            }}
        >
                Inline Style
        </div>
      );
    };
    ```
* Using `CSS Modules` we can create a CSS file and add our styles in the same and import the file into the component and use as below
    ```jsx
    import styles from './styles.module.css';
    const Component = () => {
        return(
            <div className={styles.container}></div>
        )
    }
    ```
* Using `Styled Components` we can directly include styles in JS file using template literals
    ```jsx
    import styled from 'styled-components';
    
    const StyledDiv = styled.div`
      color: gray;
      font-size: 10px;
    `;
    
    const Component = () => {
      return <StyledDiv>Styled component</StyledDiv>;
    };
    ```
11. How to render an HTML string coming from the server.
* We can render HTML string coming from server using `dangerouslySetInnerHTML`. But, setting such string directly would put the application vulnerable to XSS attacks.
* The HTML string has to be sanitized and then set it to the element.
```jsx
const Component = ({ htmlString }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};
```