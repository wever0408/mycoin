import React, { Component } from "react";
import moment from "moment";
class Wallet extends Component {
    render() {
        const { user, checkWallet, checkHistoty } = this.props;
        const his = checkHistoty(user.name).map((item) => {
            const time = moment(item.timestamp).toString();
            return (
                <div className="card text-center  align-self-center mb-4">
                    <h6 className="text-center">{time}</h6>
                    <div className="container">
                        From '{item.data.userFrom}' to '{item.data.userTo}' ,
                        amount : {item.data.amount}, fund: {item.data.fund}
                    </div>
                </div>
            );
        });

        return (
            <div className="col-sm-4">
                <div className="card">
                    <span className="text-center">
                        <strong>{user.name}</strong>
                    </span>

                    <div className="card-body">
                        <h5 className="card-title text-center">
                            {checkWallet(user.name)}
                        </h5>
                    </div>

                    <div className="d flex align-self-center mb-3">
                        <button
                            name=""
                            id=""
                            className="btn btn-primary btn-sm"
                            data-toggle="modal"
                            data-target="#historyModal"
                        >
                            Show history
                        </button>
                        <div
                            className="modal fade"
                            id="historyModal"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="historyModal"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5
                                            className="modal-title"
                                            id="exampleModalLongTitle"
                                        >
                                            History
                                        </h5>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                        >
                                            <span aria-hidden="true">
                                                &times;
                                            </span>
                                        </button>
                                    </div>
                                    <div className="modal-body">{his}</div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Wallet;
