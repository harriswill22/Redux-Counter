const {createStore} = require('redux')
const uuid = required('uuid/v4');



// #1 Write out an example/default version of my application state

const defaultState  ={
    counters:[
        {   
            id: uuid(),
            count: 0
        }
    ]
}

// #2a describe the ways that state can change
// - count can go up by 1 
// - count can go down by 1
// 2b - find single words or short phrases for those changes
// -increment 
// -decrement 
// #2c - translate those into objects 

const ACTION_INC ={
    type: 'INCREMENT' // common to uppercase type

};


const ACTION_DEC ={
    type: 'DECREMENT '
};
// "Action Creators"
// When you need to configure an action, write a function
const incrementCounter =(id) =>{
    return{
        ...ACTION_INC,
        id
    }
};


const decrementCounter =(id) =>{
    return{
        ...ACTION_DEC,
        id
    }
};
// #3 - Write a pure function that accepts the current state and action then return the new version of state

const counter = (state=defaultState, action) =>{
    // check the action.type
    switch(action.type){
        // if it's 'INCREMENT', return a new state object with th e count +1
        case ACTION_INC.type:
        return{
            //count: state.count +1
            counters: state.counters.map(oneCounter =>{
                if (oneCounter.id === action.id){
                    return{
                        ...oneCounter,
                        count: oneCounter.count + 1
                    }
                }else{
                    return oneCounter;
                }
            })
        };
    
        case ACTION_DEC.type:
        // if it's 'DECREMENT', return a new state object with th e count -1
        return{
            count: state.count -1
        };
    
        default:
    // else return the state as -is\
        return state;
    }
};
// #4 - Create your store that knows how to use your reducer function
const store = createStore(counter);

// You can subscribe to notifications of any changes to the state
store.subscribe(() =>{
    const theState = store.getState();
    console.log(`The state is now: ${theState.count}`);
});

module.exports ={
    store,
    ACTION_INC,
    ACTION_DEC
};




