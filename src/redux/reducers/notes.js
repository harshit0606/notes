const noteReducer=(state=true,action )=>{
    switch(action.type){
        case "TOGGLENOTES":
            return !state;
        default:
            return state;    
    }

}
export default noteReducer;