import React, { Component } from "react";
class Miner extends Component {
    render() {
        const { hasUnconfrim, confirmBlock } = this.props;

        return (
            <div className="col-sm-4 ">
                <div className="card">
                    <span className="text-center">Mining</span>
                    {hasUnconfrim ? (
                        <span className="badge badge-warning text-center">
                            Has unconfirmed block
                        </span>
                    ) : (
                        ""
                    )}
                    <div className="card-body d-flex justify-content-center">
                        <button
                            name=""
                            id=""
                            className="btn btn-primary"
                            onClick={confirmBlock}
                        >
                            Mine
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Miner;
