import React, { Component } from "react";
import "./App.css";
import Wallet from "./components/Wallet";
import Recipt from "./components/Recipt";
import Blockchain from "./components/Blockchain";
import Miner from "./components/Miner";
import ListUsers from "./components/ListUsers";
import crypto from "crypto-js";
class App extends Component {
    constructor() {
        super();
        this.state = {
            blockchain: [this.getGenesis()],
            listusers: [{ name: "xtam" }, { name: "lannhi" }],
            dicU: [
                { name: "anthai" },
                { name: "phuonganh" },
                { name: "thuyquynh" },
                { name: "thuong" },
                { name: "thoi" },
                { name: "phuong" },
                { name: "thai" },
                { name: "tam" },
            ],
            index: 0,
            difficulty: 3,
        };
    }
    getGenesis = () => {
        return {
            index: 0,
            previousHash: "0",
            timestamp: 1508270000000,
            data: "GENESIS BLOCK",
            hash:
                "000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf",
            nonce: 2020,
        };
    };
    getLatestBlock = () => {
        return this.state.blockchain[this.state.blockchain.length - 1];
    };
    hash(index, previousHash, timestamp, data, nonce) {
        // return crypto
        //     .createHash("sha256")
        //     .update(index + previousHash + timestamp + data + nonce)
        //     .digest("hex");
        return (
            crypto
                .SHA256(previousHash + timestamp + JSON.stringify(data))
                .toString() + nonce.toString()
        );
    }
    newBlock = (index, previousHash, timestamp, data, hash, nonce) => {
        const Block = {
            index,
            previousHash,
            timestamp,
            data,
            hash,
            nonce,
        };
        return Block;
    };
    gerenateBlock = () => {
        const previousBlock = this.getLatestBlock();
        const nextIndex = previousBlock.index + 1;
        const nextTimestamp = new Date().getTime() / 1000;
        const nextHash = this.hash(
            nextIndex,
            previousBlock.hash,
            nextTimestamp,
            "data",
            987
        );
        const newBlock = this.newBlock(
            nextIndex,
            previousBlock.hash,
            nextTimestamp,
            "data",
            nextHash,
            987
        );
        const listblocks = [...this.state.blockchain, newBlock];
        this.setState({
            blockchain: listblocks,
        });
    };
    addUser = () => {
        if (this.state.index <= 7) {
            const listusers = [
                ...this.state.listusers,
                this.state.dicU[this.state.index],
            ];
            const temp = this.state.index + 1;
            this.setState({
                listusers,
                index: temp,
            });
        }
    };

    render() {
        return (
            <div>
                <div className="container mt-4">
                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={this.addUser}
                        >
                            Add Wallet
                        </button>
                        <button
                            className="btn btn-primary ml-4"
                            onClick={this.gerenateBlock}
                        >
                            Add Block
                        </button>
                    </div>
                    <hr />
                    <ListUsers entries={this.state.listusers} />
                    <hr />
                    <div className="row">
                        <Wallet />
                        <Recipt />
                        <Miner />
                    </div>
                </div>
                <hr />
                <Blockchain blockchain={this.state.blockchain} />
            </div>
        );
    }
}

export default App;
