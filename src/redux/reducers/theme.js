const themeReducer=(state=true,action )=>{
    switch(action.type){
        case "TOGGLETHEME":
            return !state;
        default:
            return state;    
    }

}
export default themeReducer;