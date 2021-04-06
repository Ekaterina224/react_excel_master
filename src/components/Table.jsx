import React, { Component } from "react";
import { forwardRef } from "react";
import $ from "jquery";
import MaterialTable from 'material-table';
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class MaterialTableDemo extends Component {
  constructor(props) {
    super();
    this.tableRef = React.createRef();
    this.state = {
      excelRows: props.data,
      modal_open: false,
      curIndex: -1,
      selectedItem: [],
      collapseState: 'All Expand',
      constPathColors : {
        1: 'rgb(255 0 0 / 60%)',
        2: 'rgb(255 211 51 / 63%)',
        3: '#FFFF66',
        4: '#FFFFFF',
        5: '#FFFFCC'
      },
      teamList: []//[{ name: "DC Supply", status: true }, { name: "Hospital Supply", status: true }, { name: "Hospital Procurement Directors", status: true }]
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.handleSorting = this.handleSorting.bind(this);
  }

  setOpen = (state) => {
    this.setState({ modal_open: state });
  }

  handleClose = () => {
    this.setOpen(false);
  };

  handleSorting = async event => {
    event.preventDefault();
    event.persist();
    var id = event.target.value;
    var teamListBuf = this.state.teamList;

    if (teamListBuf[id].status === true)
      teamListBuf[id].status = false;
    else
      teamListBuf[id].status = true;
    this.setState({ teamList: teamListBuf })
  }

  handleOpen = (e) => {
    this.setOpen(true);
    var index = e.target.getAttribute("data-index");
    if (typeof index === 'undefined' || index === null) {
      index = e.target.parentElement.getAttribute("data-index");
    }
    this.setState({ selectedItem: this.state.excelRows[index] });
  };

  allCollapseFunc = (e) =>{
    var arrBuf = this.state.excelRows;
    this.setState({ excelRows: [] });
    this.setState({ excelRows: arrBuf });
  }

  componentDidMount() {

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("btn_close");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function () {
      modal.style.display = "none";
    };
    span.onclick = function () {
      modal.style.display = "none";
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  render() {
    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
      )),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
      )),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
      )),
      ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
      )),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    var proList = []
    var data = []
    var data_index = 1
    var sortList = []
    var teamListBuf = this.state.teamList;

    function checkTeam(value) {
      if (teamListBuf === [])
        return 0;
      for (var i of teamListBuf)
        if (i.name === value && i.status === true)
          return 1;
      return 0;
    }

    function searchTeam(value) {
      if (teamListBuf === [])
        return 0;
      for (var i of teamListBuf)
        if (i.name === value)
          return 1;
      return 0;
    }

    for (var i = 1; i < this.state.excelRows.length - 1; i++) {
      if (searchTeam(this.state.excelRows[i][5]) === 0) {
        var teamListBuf = this.state.teamList;
        teamListBuf.push({ name: this.state.excelRows[i][5], status: true });
        this.setState({ teamList: teamListBuf });
      }
      proList.push({
        "no": i,
        "id": -1,
        "val1": this.state.excelRows[i][0],
        "val2": this.state.excelRows[i][1],
        "val3": this.state.excelRows[i][2],
        "val4": this.state.excelRows[i][3],
        "val5": this.state.excelRows[i][4],
        "val6": this.state.excelRows[i][5],
        "val7": this.state.excelRows[i][6],
        "val8": this.state.excelRows[i][7],
      });
    }

    function sortSubList(subList, index) {
      var sub_key = 'val' + index;
      var sort_list = {};
      for (var item of subList) {
        if (item[sub_key] in sort_list) {
          if (checkTeam(item.val6) === 1)
            sort_list[item[sub_key]].push(item);
        }
        else
          sort_list[item[sub_key]] = [item];
      }
      return (sort_list);
    }

    var sortList = sortSubList(proList, '1')
    for (var item2 in sortList) {
      var id2 = data_index;
      data.push({ 'id': data_index++, val1: item2, val2: "", val3: "", val4: "", btn: "", val6: "", no: sortList[item2][0].no })
      sortList[item2] = sortSubList(sortList[item2], '2');
      for (var item3 in sortList[item2]) {
        var id3 = data_index
        data.push({ 'id': data_index++, val2: item3, val1: "", val3: "", val4: "", btn: "", parentId: id2, val6: "", no: sortList[item2][item3][0].no })
        sortList[item2][item3] = sortSubList(sortList[item2][item3], '3');
        for (var item4 in sortList[item2][item3]) {
          var id4 = data_index
          data.push({ 'id': data_index++, val3: item4, val1: "", val2: "", val4: "", btn: "", parentId: id3, val6: "", no: sortList[item2][item3][item4][0].no })
          sortList[item2][item3][item4] = sortSubList(sortList[item2][item3][item4], '4');
          for (var item5 in sortList[item2][item3][item4]) {
            data.push({ 'id': data_index++, val4: item5, val2: "", val3: "", val1: "", btn: "View", parentId: id4, val6: sortList[item2][item3][item4][item5][0].val6, no: sortList[item2][item3][item4][item5][0].no })
          }
        }
      }
    }

    return (
      <div style={{ maxWidth: "90%", margin: "5vh auto", }} >
        {this.state.teamList.map((object, i) =>
          <FormControlLabel
            control={<Checkbox checked={object.status} onChange={this.handleSorting} name={object.name} value={i} />}
            label={object.name}
          />
        )}
        <Button onClick={this.allCollapseFunc} variant="contained" style={{float:'right'}} color="secondary">All Collapse</Button>
        <MaterialTable
          detailPanel={[
            {
              icon: () => null,
              disabled: true,
              render: rowData => <div style={{ float: 'right', width: '60%' }}>
                <table className="col_table" >
                  <thead>
                    <tr>
                      <th className="col_th" style={{ width: '50%' }}>Description</th>
                      <th className="col_th" style={{ width: '25%' }}>P&SC KPI</th>
                      <th className="col_th" style={{ width: '25%' }}>Artefacts</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="col_td">{this.state.excelRows[rowData.no][4]}</td>
                      <td className="col_td">{this.state.excelRows[rowData.no][6]}</td>
                      <td className="col_td">{this.state.excelRows[rowData.no][7]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            }]
          }
          tableRef={this.tableRef}
          title="Product List"
          icons={tableIcons}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
          options={{
            selection: false,
            rowStyle: rowData => {
              if(rowData.tableData.isTreeExpanded === false && rowData.tableData.path.length === 1) {
                return {};
              }
              const rowBackgroundColor =this.state.constPathColors[rowData.tableData.path.length];
              return {backgroundColor: rowBackgroundColor};
            }
          }}

          columns={[
            { title: 'Phase', field: 'val1' },
            { title: 'Service', field: 'val2', sorting: false },
            { title: 'Activity', field: 'val3', sorting: false },
            { title: 'Task', field: 'val4', sorting: false },
            { title: 'Team', field: 'val6', sorting: false },
            {
              title: "Action",
              render: (rowData) =>
                rowData && rowData.btn !== "" && (
                  <button className="btn_view custom_btn">{rowData.btn}</button>
                )
            }
          ]}
          data={data}
          onRowClick={(event, rowData, togglePanel) =>  (
            rowData.btn !== "View" && event.target.parentElement.firstElementChild.firstElementChild.click(),
            rowData.btn === "View" && (document.getElementById("myModal").style.display = "block",
            document.getElementById("m_val1").innerHTML = this.state.excelRows[rowData.no][0],
            document.getElementById("m_val2").innerHTML = this.state.excelRows[rowData.no][1],
            document.getElementById("m_val3").innerHTML = this.state.excelRows[rowData.no][2],
            document.getElementById("m_val4").innerHTML = this.state.excelRows[rowData.no][3],
            document.getElementById("m_val5").innerHTML = this.state.excelRows[rowData.no][4],
            document.getElementById("m_val6").innerHTML = this.state.excelRows[rowData.no][5],
            document.getElementById("m_val7").innerHTML = this.state.excelRows[rowData.no][6],
            document.getElementById("m_val8").innerHTML = this.state.excelRows[rowData.no][7])
          )}
        />
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <table className='md_table'>
              <tbody>
                <tr><td className='mdb_td_w3'>Phase</td><td className='mdb_td_w7' id="m_val1"></td></tr>
                <tr><td className='mdb_td_w3'>Service</td><td className='mdb_td_w7' id="m_val2"></td></tr>
                <tr><td className='mdb_td_w3'>Activity</td><td className='mdb_td_w7' id="m_val3"></td></tr>
                <tr><td className='mdb_td_w3'>Task</td><td className='mdb_td_w7' id="m_val4"></td></tr>
                <tr><td className='mdb_td_w3'>Description</td><td className='mdb_td_w7' id="m_val5"></td></tr>
                <tr><td className='mdb_td_w3'>Team</td><td className='mdb_td_w7' id="m_val6"></td></tr>
                <tr><td className='mdb_td_w3'>KPI</td><td className='mdb_td_w7' id="m_val7"></td></tr>
                <tr><td className='mdb_td_w3'>Artefact(s)</td><td className='mdb_td_w7' id="m_val8"></td></tr>
              </tbody>
            </table>
            <div align="center">
              <button id="btn_close" className="custom_btn">OK</button>
            </div>
          </div>
        </div>
      </div >
    )
  };
}
export default MaterialTableDemo;
