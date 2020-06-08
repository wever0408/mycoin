import React, { Component } from "react";
import userlogo from "../userlogo.png";
class User extends Component {
    render() {
        const { name } = this.props;
        return (
            <div className="col-sm-2 mb-2">
                <div className="card">
                    <img className="card-img-top" src={userlogo} alt=".." />
                    <span className="text-center">{name}</span>
                    <div className="card-body align-self-center">
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={this.props.selectUser.bind(this, name)}
                        >
                            View
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
