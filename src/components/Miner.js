import React, { Component } from "react";
class Miner extends Component {
    render() {
        return (
            <div class="col-sm-4 ">
                <div className="card">
                    <span className="text-center">Mining</span>

                    <div className="card-body d-flex justify-content-center">
                        <a
                            name=""
                            id=""
                            className="btn btn-primary"
                            href="./"
                            role="button"
                        >
                            Mine
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Miner;
