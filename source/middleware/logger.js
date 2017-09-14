
export default function logger({ getState }) {
  return (next) => (action) => {
  	if (__DEV__){
		  console.log('logger dispatching', action);
  	}
    const result = next(action);
    if (__DEV__){
		  console.log('next state 23333', getState());
  	}
    return result;
  };
}
