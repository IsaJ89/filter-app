import React, {Component} from 'react';

class Card extends Component {

    state = {}

    render() {

        return(
            <div className='card'>
                <div className='card-body'>
                    <h1>{this.props.name}</h1>
                    <h5>Rs {this.props.price}</h5>
                </div>
            </div>
        )
    }
}

export default Card;