const initialList = (data) => {
    console.log("actionssss",data)
    return {
        type:"INITIAL_FETCH",
        payload:data
    }
}

export default initialList;