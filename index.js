const { createStore } = require('redux');
const uuid = require('uuid/v4');

// #1 - Write out an example/default version of my application state
const defaultState = {
    // count: 0
    counters: [
        { 
            id: uuid(),
            count: 0
        }
    ]
};

// #2a - Describe the ways that state can change
// - count can go up by one
// - count can go down by one
// #2b - find single words or short phrases for those changes
// - increment
// - decrement
// #2c - translate those into objects

// Also good to all-caps the variable for an action
const ACTION_INC = {
    type: 'INCREMENT'  // common to all-caps type
};

const ACTION_DEC = {
    type: 'DECREMENT'
};

const ACTION_ADD = {
    type: 'ADD_COUNTER'
};

const ACTION_DEL = {
    type: 'DEL_COUNTER'
};

// "Action Creators"
// When you need to configure an action, write a function
const incrementCounter = (id) => {
    return {
        ...ACTION_INC,
        id
    }
};
// example: store.dispatch(incrementCounter('abc-123-do-re-me'))

const decrementCounter = (id) => {
    return {
        ...ACTION_DEC,
        id
    }
};
// example: store.dispatch(decrementCounter('abc-123-do-re-me'))

const addCounter = () => {
    return {
        ...ACTION_ADD
    };
};

const delCounter = (id) => {
    return {
        ...ACTION_DEL,
        id
    }
}


// #3 - Write a pure function that accepts the current state and an action, then returns the new version state

const counter = (state=defaultState, action) => {
    // check the action.type
    switch (action.type) {
        // if (action.type === ACTION_INC.type) {}
        case ACTION_INC.type:
        // if it's 'INCREMENT', return a new state object with the count + 1
            return {
                // count: state.count + 1
                // we want to return the array of counters
                // but we want to modify the one where its id === action.id
                counters: state.counters.map(oneCounter => {
                    if (oneCounter.id === action.id) {
                        // return a new version of oneCounter
                        return {
                            ...oneCounter,
                            count: oneCounter.count + 1
                        }
                    } else {
                        // these are not the droids i'm looking for
                        return oneCounter;
                    }
                })
            };
            // break;  // no need to break, since we're returning
            // if you're not returning, use break to make sure other cases
            // aren't triggered

        case ACTION_DEC.type:
        // if it's 'DECREMENT', return a new state object with the count - 1
            // return {
            //     count: state.count - 1
            // };
            return {
                // count: state.count + 1
                // we want to return the array of counters
                // but we want to modify the one where its id === action.id
                counters: state.counters.map(oneCounter => {
                    if (oneCounter.id === action.id) {
                        // return a new version of oneCounter
                        return {
                            ...oneCounter,
                            count: oneCounter.count - 1
                        }
                    } else {
                        // these are not the droids i'm looking for
                        return oneCounter;
                    }
                })
            };
        case ACTION_ADD.type:
            // return all the existing counters, but also a new one!
            return {
                counters: [
                    ...state.counters,
                    {
                        id: uuid(),
                        count: 0   
                    }
                ]
            }
        case ACTION_DEL.type:
            return {
                // we want all the counters, except the one
                // whose id matches action.id
                counters: state.counters.filter(oneCounter => {
                    const canGoIntoClub = oneCounter.id !== action.id;
                    return canGoIntoClub;
                })
            }
        default:
        // else return the state as-is
            return state;
    }
};

// #4 - Create your store that knows how to use your reducer function
const store = createStore(counter);

// You can subscribe to notifications of any changes to the state
store.subscribe(() => {
    const theState = store.getState();
    console.log(`The state is now`);
    console.log(theState);
});

module.exports = {
    store,
    incrementCounter,
    decrementCounter,
    addCounter,
    delCounter,
};

/*
const {
    store,
    ACTION_INC,
    ACTION_DEC
} = require('./index');
*/