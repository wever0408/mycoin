import React, { Component } from "react";
import moment from "moment";
class Block extends Component {
    render() {
        const { block } = this.props;
        const data = block.data;
        const time = moment(block.timestamp).toString();
        return (
            <div className="card text-center  align-self-center mb-4">
                <h4 className="text-center">BLOCK {block.index}</h4>
                <div className="container">
                    <label>Previous Hash</label>
                    <p className="text-success">{block.previousHash}</p>
                    <label>Hash</label>
                    <p className="text-success">{block.hash}</p>
                    {block.index !== 0 ? (
                        <div>
                            <label>Data</label>
                            <p>
                                From '{data.userFrom}' to '{data.userTo}
                                ', amount: {data.amount}, fund: {data.fund}
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
                    {block.status === 0 ? (
                        <span className="badge badge-danger badge-lg">
                            Unconfimed
                        </span>
                    ) : (
                        ""
                    )}
                    <span className="badge badge-primary ml-3">
                        {block.nonce}
                    </span>
                    <p>{time}</p>
                </div>
            </div>
        );
    }
}

export default Block;
