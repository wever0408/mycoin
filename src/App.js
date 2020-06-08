import React, { Component } from "react";
import "./App.css";
import Blockchain from "./components/Blockchain";
import ListUsers from "./components/ListUsers";
import crypto from "crypto-js";
import Info from "./components/Info";
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
            difficulty: 1,
            selectedUser: { name: "htnguyen" },
            unconfirmBlocks: [],
        };
    }

    getGenesis = () => {
        const geBlock = this.newBlock(
            0,
            "0",
            1508270000000,
            "GENESIS BLOCK",
            "000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf",
            2020,
            1
        );
        return geBlock;
    };

    confirmBlock = () => {
        const topUnconfirmIndex = this.state.unconfirmBlocks[0].index;
        const array = this.state.blockchain;
        array[topUnconfirmIndex] = { ...array[topUnconfirmIndex], status: 1 };
        const temp = this.state.unconfirmBlocks;
        temp.splice(0, 1);
        this.setState({
            blockchain: array,
            unconfirmBlocks: temp,
        });
    };

    getLatestBlock = () => {
        return this.state.blockchain[this.state.blockchain.length - 1];
    };
    hash(index, previousHash, timestamp, data, nonce) {
        return (
            crypto
                .SHA256(index + previousHash + timestamp + JSON.stringify(data))
                .toString() + nonce.toString()
        );
    }
    newBlock = (index, previousHash, timestamp, data, hash, nonce, status) => {
        const Block = {
            index,
            previousHash,
            timestamp,
            data,
            hash,
            nonce,
            status,
        };
        return Block;
    };
    isValidHashDifficulty = (hash) => {
        for (var i = 0; i < hash.length; i++) {
            if (hash[i] !== "0") {
                break;
            }
        }
        return i >= this.state.difficulty;
    };
    gerenateBlock = (userFrom, userTo, amount, fund, status) => {
        let nonce = 0;
        const data = {
            userFrom,
            userTo,
            amount,
            fund,
        };

        const previousBlock = this.getLatestBlock();
        const nextIndex = previousBlock.index + 1;
        let nextTimestamp = new Date().getTime();
        let nextHash = this.hash(
            nextIndex,
            previousBlock.hash,
            nextTimestamp,
            data,
            nonce
        );

        while (!this.isValidHashDifficulty(nextHash)) {
            nonce = nonce + 1;
            nextTimestamp = new Date().getTime();
            nextHash = this.hash(
                nextIndex,
                previousBlock.hash,
                nextTimestamp,
                data,
                nonce
            );
        }

        const newBlock = this.newBlock(
            nextIndex,
            previousBlock.hash,
            nextTimestamp,
            data,
            nextHash,
            nonce,
            status
        );
        const listblocks = [...this.state.blockchain, newBlock];
        const unconfirmBlocks = [...this.state.unconfirmBlocks, newBlock];
        this.setState({
            blockchain: listblocks,
            unconfirmBlocks: unconfirmBlocks,
        });
    };
    checkWallet = (name) => {
        let amount = 0;
        for (const block of this.state.blockchain) {
            if (block.status == 1) {
                if (block.data.userTo == name) {
                    amount = amount + +block.data.amount;
                }
                if (block.data.userFrom == name) {
                    amount = amount - +block.data.amount;
                }
            }
        }
        return amount;
    };
    addUser = () => {
        if (this.state.index <= 7) {
            const newName = this.state.dicU[this.state.index].name;
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
    selectUser = (name) => {
        this.setState({
            selectedUser: { name },
        });
    };
    inital = () => {
        this.gerenateBlock("admin", "htnguyen", 25, 0, 0);
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
                            className="btn btn-dark btn-sm ml-4"
                            onClick={this.inital}
                        >
                            Try intital data
                        </button>
                    </div>
                    <hr />
                    <ListUsers
                        entries={this.state.listusers}
                        selectUser={this.selectUser}
                    />
                    <hr />
                    <Info
                        user={this.state.selectedUser}
                        listusers={this.state.listusers}
                        gerenateBlock={this.gerenateBlock}
                        hasUnconfrim={this.state.unconfirmBlocks.length !== 0}
                        confirmBlock={this.confirmBlock}
                        checkWallet={this.checkWallet}
                    />
                </div>
                <hr />
                <Blockchain
                    blockchain={this.state.blockchain}
                    unconfirmBlocks={this.state.unconfirmBlocks}
                />
            </div>
        );
    }
}

export default App;
