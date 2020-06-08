import React, { Component } from "react";
class Block extends Component {
    render() {
        const { block } = this.props;
        return (
            <div className="row mb-4 d-flex justify-content-center">
                <div className="col-sm-6 align-self-center">
                    <div class="card text-center">
                        <h4 className="text-center">BLOCK {block.index}</h4>
                        <div className="container">
                            <label>Previous Hash</label>
                            <p className="text-success">{block.previousHash}</p>
                            <label>Hash</label>
                            <p className="text-success">{block.hash}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Block;
