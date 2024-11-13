const getUserTodosList = async () => {
    try {
        const response = await fetch (`https://playground.4geeks.com/todo/users/Felipe`);
        const result = await response.json()
        setListTask(result.todos)
        
    } catch (error) {
        console.log(error);
    }
}

getUserTodosList();