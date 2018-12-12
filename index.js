// #1 Write out an example/default version of my application state

const defaultState  ={
    count: 0

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
// #3 - Write a pure function that accepts the current state and action then return the new version of state

const counter = (state=defaultState, action) =>{
    // check the action.type
    switch(action.type){
        // if it's 'INCREMENT', return a new state object with th e count +1
        case ACTION_INC.type:
        return{
            count: state.count +1
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
}