import React, { Component } from "react";
class Wallet extends Component {
    render() {
        const { user, checkWallet } = this.props;
        return (
            <div className="col-sm-4">
                <div className="card">
                    <span className="text-center">{user.name}</span>

                    <div className="card-body">
                        <h5 className="card-title text-center">
                            {checkWallet(user.name)}
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wallet;
