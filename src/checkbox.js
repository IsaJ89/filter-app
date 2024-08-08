// incomplete

import React, {Component} from 'react';

class Checkbox extends Component {
    state = {
        checked: 0
    }

    onCheckChange(event) {

        // get the state of the checkbox after change
        let currentState = event.target.checked;

        // get the brand name
        let brandName = this.props.name;

        console.log(`event.target.checked is ${currentState}`)
        
        this.setState({
            checked: currentState
        })
    
        
        this.props.onCheck(currentState, brandName);
    
    
    }


    render() {
        return(
            <div>
                <div className='form-check' key={this.props.index}>
                    <input onChange={this.onCheckChange.bind(this)} checked={this.state.checked} className='form-check-input' type='checkbox'></input>
                    <label className='form-check-label'>{this.props.name}</label>
                </div>
            </div>            
        )
    }
}

export default Checkbox;