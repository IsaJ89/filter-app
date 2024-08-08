import React, {Component} from 'react';

class Slider extends Component {
    state = {
        value: 100000
    }

    onSlideChange(event) {
        let value = event.target.value;

        this.setState({
            value: value
        },
            () => {
                this.props.onSlide(this.state.value)
            }
        )
    }

    render() {
        return(
            <div>
                <input onChange={this.onSlideChange.bind(this)} className='form-range form-control' type='range' min='1000' max='100000' value={this.state.value}></input>
                <br></br>
                <p>Current value: {this.state.value}</p>
            </div>
        )
    }

}

export default Slider;
