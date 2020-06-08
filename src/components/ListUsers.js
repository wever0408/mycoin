import React, { Component } from "react";
import User from "./User";
class ListUsers extends Component {
    render() {
        const { entries } = this.props;
        const { selectUser } = this.props;
        const listusers = entries.map((item) => {
            return <User name={item.name} selectUser={selectUser} />;
        });
        return <div className="row"> {listusers} </div>;
    }
}
export default ListUsers;
