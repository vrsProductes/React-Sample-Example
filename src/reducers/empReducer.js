
const todoReducer = (state = [], action) => {
    const EmpLodData = action.payload;
    console.log("sasasasa",action)
    let dataname = ''
    if (action.type === 'CHANGE_NAME') {
        console.log(EmpLodData)
    }
    switch (action.type) {
        case 'loadData':
            return {
                ...state,
                empDataLoad: action.payload

            }
        case 'update_EMP_Data':
            return {
                ...state,
                name: action.payload
            }
        case 'REMOVE_EMP_DATA':
            return {
                ...state,
                todoList: action.payload
            }
        default:
            return state
    }
}

export default todoReducer;