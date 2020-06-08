import React, { Component } from "react";
import Block from "./Block";
class Blockchain extends Component {
    render() {
        const { blockchain } = this.props;
        const listblock = blockchain.map((item) => {
            return (
                <div className="container">
                    <Block block={item} />
                </div>
            );
        });
        return (
            <div className="container">
                <h1 className="text-center">BLOCKCHAIN</h1>
                {listblock}
            </div>
        );
    }
}

export default Blockchain;
