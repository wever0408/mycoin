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
            selectedUser: { name: "xtam" },
            unconfirmBlocks: [],
            reward: 1,
            miner: "",
            forMiner: {
                name: "",
                reward: 0,
                fund: 0,
            },
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
    giveReward = (fund) => {
        this.setState({
            miner: this.state.selectedUser.name,
        });
        this.gerenateBlock(
            "admin",
            this.state.selectedUser.name,
            +fund + +this.state.reward,
            0,
            1
        );
    };
    confirmBlock = () => {
        if (this.state.unconfirmBlocks.length !== 0) {
            const topdata = this.state.unconfirmBlocks[0];
            this.gerenateBlock(
                topdata.userFrom,
                topdata.userTo,
                topdata.amount,
                topdata.fund,
                1
            );
            const temp = this.state.unconfirmBlocks;
            temp.splice(0, 1);
            this.setState(
                {
                    unconfirmBlocks: temp,
                    miner: this.state.selectedUser.name,
                },
                () => {
                    this.giveReward(topdata.fund);
                }
            );
        } else alert("No block to confrim");
    };

    getLatestBlock = () => {
        return this.state.blockchain[this.state.blockchain.length - 1];
    };
    hash(index, previousHash, timestamp, data, nonce) {
        return crypto
            .SHA256(
                index +
                    previousHash +
                    timestamp +
                    JSON.stringify(data) +
                    nonce.toString()
            )
            .toString();
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
    newUnconfirmblock = (userFrom, userTo, amount, fund) => {
        const data = {
            userFrom,
            userTo,
            amount,
            fund,
        };
        const temp = [...this.state.unconfirmBlocks, data];
        this.setState({
            unconfirmBlocks: temp,
        });
    };
    isValidHashDifficulty = (hash) => {
        for (var i = 0; i < hash.length; i++) {
            if (hash[i] !== "0") {
                break;
            }
        }
        return i >= this.state.difficulty;
    };
    newdata = (userFrom, userTo, amount, fund) => {
        const data = {
            userFrom,
            userTo,
            amount,
            fund,
        };
        return data;
    };
    gerenateBlock = (userFrom, userTo, amount, fund, status) => {
        let nonce = 0;
        const data = this.newdata(userFrom, userTo, amount, fund);

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
        this.setState({
            blockchain: listblocks,
        });
    };

    checkWallet = (name) => {
        let amount = 0;
        for (const block of this.state.blockchain) {
            if (block.status === 1) {
                if (block.data.userTo === name) {
                    amount = amount + +block.data.amount;
                }
                if (block.data.userFrom === name) {
                    amount = amount - +block.data.amount;
                    amount = amount - +block.data.fund;
                }
            }
        }
        return amount;
    };
    checkHistoty = (name) => {
        let history = [];
        for (const block of this.state.blockchain) {
            if (block.status === 1) {
                if (
                    block.data.userTo === name ||
                    block.data.userFrom === name
                ) {
                    const tx = block;
                    history.push(tx);
                }
            }
        }
        return history;
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
    selectUser = (name) => {
        this.setState({
            selectedUser: { name },
        });
    };
    inital = () => {
        this.gerenateBlock("admin", "xtam", 25, 0, 1);
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
                            Mock data
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
                        newUnconfirmblock={this.newUnconfirmblock}
                        giveReward={this.giveReward}
                        miner={this.state.miner}
                        checkHistoty={this.checkHistoty}
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
