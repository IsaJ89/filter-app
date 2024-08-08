import React, {Component} from 'react';

class Search extends Component {
    state = {
        value: ""
    }

    onTextChange(event) {
        let value = event.target.value;
        
        // Update state
        // refer notes.txt for explanation of the code below
        this.setState( {
            value: value
        },
            () => {
                    this.props.onSearch(this.state.value)
            }
        )
    }
    
    render() {
        return(
            <div>
                <input onChange={this.onTextChange.bind(this)} className='form-control' type='text' value={this.state.value}></input>
            </div>
            
        )
    }
}

export default Search;