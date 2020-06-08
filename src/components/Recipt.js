import React, { Component } from "react";
class Recipt extends Component {
    newPay = (userFrom) => {
        const { gerenateBlock } = this.props;
        const userTo = document.getElementById("slect").value;
        const amount = document.getElementById("amount").value;
        const fund = document.getElementById("fund").value;

        gerenateBlock(userFrom, userTo, amount, fund, 0);
    };
    render() {
        const { user, listusers } = this.props;
        const list = listusers
            .filter((item) => item.name !== user.name)
            .map((item) => {
                return <option value={item.name}>{item.name}</option>;
            });

        return (
            <div className="col-sm-4">
                <div className="card">
                    <span className="text-center">Recipt</span>

                    <div className="card-body">
                        <label>Select user</label>
                        <select className="custom-select" id="slect">
                            {list}
                        </select>

                        <label>Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            min="0"
                        />
                        <label>Fund</label>
                        <input
                            type="number"
                            className="form-control"
                            id="fund"
                            min="0"
                        />
                        <div className="text-center">
                            <button
                                onClick={this.newPay.bind(this, user.name)}
                                className="btn btn-primary mt-3"
                            >
                                Pay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipt;
