import React, { Component } from 'react';
import XLSX from "xlsx";
import Table from "./components/Table";
import "./App.css";

class Home extends Component {
  constructor() {
    super();
    this.wrapper = React.createRef();
    this.state = {
      data: [],
      excelRows: [],
      showResults: false,
    }
  };

  async componentDidMount() {
    fetch("Catalgoue.xlsx")
      .then(res => res.arrayBuffer())
      .then(ab => {
        var data = [];
        const wb = XLSX.read(ab, { type: "array" });
        var sheet_name_list = wb.SheetNames;
        sheet_name_list.forEach(function (y) {
          let worksheet = wb.Sheets[y];
          var arrBuf = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: '',
            blankrows: true
          });
          data = arrBuf;
        });
        this.setState({ excelRows: data });
        this.setState({ showResults: true });
      });
  }

  render() {
    return (
      <div >
        { this.state.showResults ? <Table data={this.state.excelRows} ref={this.inputRef} /> : null}
      </div>
    );
  };
}


export default Home;
