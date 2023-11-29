import React from 'react'

function Form(props) {
  console.log(props);
  return (
    <div>
    <div class="form-outline form-white mb-4">
        <input type={props.type} id={props.id} class="form-control form-control-lg" />
        <label class="form-label" for={props.id}>{props.value}</label>
    </div>
    </div>
  )
}

export default Form