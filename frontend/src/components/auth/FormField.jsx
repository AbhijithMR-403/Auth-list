import React from 'react'

function Form(props) {
  return (
    <div>
    <div class="form-outline form-white mb-4">
        <input type={props.type} id={props.id} name={props.name} class="form-control form-control-lg" />
        <label class="form-label" for={props.id}>{props.value}</label>
    </div>
    </div>
  )
}

export default Form