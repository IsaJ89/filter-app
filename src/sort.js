import React, {Component} from 'react';

class Sort extends Component{
    state = {
        checked: 0
    }

    onCheckSort(event){
        // get status of checkbox
        let statusOfCheckbox = event.target.checked;

        this.setState({
            checked: statusOfCheckbox
        })

        this.props.onSort(statusOfCheckbox);
        
    }

    render(){
        return(
            <div>
                <div className='form-check'>
                    <input onChange={this.onCheckSort.bind(this)} className='form-check-input' checked={this.state.checked} type='checkbox'></input>
                    <label className='form-check-label'>Sort price from low to high</label>
                </div>
            </div>  
        )
    }
}

export default Sort;