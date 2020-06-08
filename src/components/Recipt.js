import React, { Component } from "react";
class Recipt extends Component {
    render() {
        return (
            <div class="col-sm-4">
                <div className="card">
                    <span className="text-center">Recipt</span>

                    <div className="card-body">
                        <label>Select user</label>
                        <select className="custom-select">
                            <option value={1}>One</option>
                            <option value={2}>Two</option>
                            <option value={3}>Three</option>
                        </select>

                        <label>Amount</label>
                        <input type="text" className="form-control" />
                        <label>Fund</label>
                        <input type="text" className="form-control" />
                        <div className="text-center">
                            <a href="./" className="btn btn-primary mt-3">
                                Pay
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Recipt;
