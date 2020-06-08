import React, { Component } from "react";
class Block extends Component {
    render() {
        return (
            <div className="row mb-4 d-flex justify-content-center">
                <div className="col-sm-6 align-self-center">
                    <div class="card text-center">
                        <div className="container">
                            <label>Previous Hash</label>
                            <p className="text-success">8789790jhkj</p>
                            <label>Hash</label>
                            <p className="text-success">8789790jhkj</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Block;
