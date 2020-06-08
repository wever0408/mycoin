import React, { Component } from "react";
import Block from "./Block";

class Blockchain extends Component {
    render() {
        const { blockchain, unconfirmBlocks } = this.props;
        const listblock = blockchain.map((item) => {
            return (
                <div className="container">
                    <Block block={item} />
                </div>
            );
        });
        const listUn = unconfirmBlocks.map((item) => {
            return (
                <div className="card text-center  align-self-center mb-4">
                    <h6 className="text-center">Data</h6>
                    <div className="container">
                        From '{item.userFrom}' to '{item.userTo}' , amount :{" "}
                        {item.amount}, fund: {item.fund}
                    </div>
                </div>
            );
        });
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        <h2 className="text-center">UNCONFIRMED</h2>
                        {listUn}
                    </div>
                    <div className="col-sm-6">
                        <h2 className="text-center">BLOCKCHAIN</h2>
                        {listblock}
                    </div>
                </div>
            </div>
        );
    }
}

export default Blockchain;
