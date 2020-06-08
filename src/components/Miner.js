import React, { Component } from "react";
class Miner extends Component {
    render() {
        const { hasUnconfrim, confirmBlock, user, miner } = this.props;
        return (
            <div className="col-sm-4 ">
                <div className="card">
                    <span className="text-center">
                        <strong>Mining</strong>
                    </span>
                    {/* {miner === user.name ? (
                        <div className="alert alert-warning alert-dismissible fade show">
                            Successful mining!
                            <button
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    ) : (
                        ""
                    )} */}
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
                            onClick={() => {
                                confirmBlock();
                            }}
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
