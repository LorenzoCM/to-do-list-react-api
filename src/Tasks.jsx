import React from 'react';
import PropType from 'prop-types';

const Tasks = ({task, index, deleteTask}) => {
    return (
        <li key={index} className="texts">{task}</li>
    );
}

Tasks.propTypes = {        
    task: PropType.string,
    index: PropType.number,
    deleteTask: PropType.func 
}

export default Tasks;