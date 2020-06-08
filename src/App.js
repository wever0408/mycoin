import React, { Component } from "react";
import "./App.css";
import User from "./components/User";
import Wallet from "./components/Wallet";
import Recipt from "./components/Recipt";
import Blockchain from "./components/Blockchain";
import Miner from "./components/Miner";
class App extends Component {
    render() {
        return (
            <div>
                <div className="container mt-4">
                    <div>
                        <button name="" id="" className="btn btn-primary">
                            Add wallet
                        </button>
                    </div>
                    <hr />
                    <div className="row">
                        <User />
                        <User />
                        <User />
                    </div>
                    <hr />
                    <div className="row">
                        <Wallet />
                        <Recipt />
                        <Miner />
                    </div>
                </div>
                <hr />
                <div className="container">
                    <Blockchain />
                </div>
            </div>
        );
    }
}

export default App;
