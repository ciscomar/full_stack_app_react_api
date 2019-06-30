import React, { Component } from 'react';

//Error component with validation errors
class ValidationErrors extends Component {
    render() {

        const { errors } = this.props;
 
        if (errors) {
            if (errors.length > 1) {
            }
            return (
                <div>
                    <div className="validation-errors">
                        <ul>
                            {errors.map((msg, i) => {
                                return <li key={i}>{msg}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default ValidationErrors;