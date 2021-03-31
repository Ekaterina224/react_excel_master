import React, { Component, ReactModal } from "react";
import $ from "jquery";
import { forwardRef } from "react";
import MaterialTable from "material-table";
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
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Table } from "material-ui";

class MaterialTableDemo extends Component {
  constructor(props) {
    super();
    this.tableRef = React.createRef();
    this.state = {
      excelRows: props.data,
      modal_open: false,
      curIndex: -1,
      selectedItem: [],
      collapseState: 'All Expand'
    }
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.setOpen = this.setOpen.bind(this);
  }

  setOpen = (state) => {
    this.setState({ modal_open: state });
  }

  handleClose = () => {
    this.setOpen(false);
  };

  handleOpen = (e) => {
    this.setOpen(true);
    var index = e.target.getAttribute("data-index");
    if (typeof index == 'undefined' || index == null) {
      index = e.target.parentElement.getAttribute("data-index");
    }
    this.setState({ selectedItem: this.state.excelRows[index] });
  };

  componentDidMount() {
    $(".btn_collapse").click(function () {
      if ($(this).html() == "All Expand")
        $(this).html("All Collapse");
      else
        $(this).html("All Expand");
    });
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
    var proList = [];
    for (var item in this.state.excelRows) {
      if (item == 0)
        continue;
      proList.push({
        No: item,
        Phase: this.state.excelRows[item][0],
        Service: this.state.excelRows[item][1],
        Activity: this.state.excelRows[item][2],
        Task: this.state.excelRows[item][3],
        Action: ''
      });
    }


    return (
      <div style={{ maxWidth: "90%", margin: "5vh auto" }} >
        <button className="btn_collapse" onClick={() => {
          var strBuf = '';
          if (this.state.collapseState == "All Expand")
            strBuf = 'All Collapse';
          else
            strBuf = 'All Expand';
          var item;
          for (item = 0; item < this.state.excelRows.length - 1; item++) {
            this.tableRef.current.onToggleDetailPanel([item], rowData =>
              <div>
                <table className="col_table">
                  <thead>
                    <tr>
                      <th className="col_th" style={{ width: '15%' }}>Description</th>
                      <th className="col_th" style={{ width: '15%' }}>Team</th>
                      <th className="col_th" style={{ width: '25%' }}>P&SC KPI</th>
                      <th className="col_th" style={{ width: '25%' }}>Artefacts (Procedures/Forms etc. )</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="col_td">{this.state.excelRows[rowData.No][4]}</td>
                      <td className="col_td">{this.state.excelRows[rowData.No][5]}</td>
                      <td className="col_td">{this.state.excelRows[rowData.No][6]}</td>
                      <td className="col_td">{this.state.excelRows[rowData.No][7]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>);
          }
        }}>{this.state.collapseState}</button>
        <MaterialTable
          tableRef={this.tableRef}
          title="Product List"
          icons={tableIcons}
          expandedRows={true}
          columns={[
            { title: 'No', field: 'No' },
            { title: 'Phase', field: 'Phase' },
            { title: 'Service', field: 'Service' },
            { title: 'Activity', field: 'Activity' },
            { title: 'Task', field: 'Task', },
            {
              title: "Action",
              render: (rowData) =>
                rowData && (
                  <Button data-index={rowData.No} color="secondary" className="btn_view" onClick={this.handleOpen} >View</Button>
                )
            }
          ]}
          data={proList}
          detailPanel={rowData => {
            return (
              <div>
                <table className="col_table">
                  <thead>
                    <tr>
                      <th className="col_th" style={{ width: '15%' }}>Description</th>
                      <th className="col_th" style={{ width: '15%' }}>Team</th>
                      <th className="col_th" style={{ width: '25%' }}>P&SC KPI</th>
                      <th className="col_th" style={{ width: '25%' }}>Artefacts (Procedures/Forms etc. )</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="col_td">{this.state.excelRows[rowData.No][4]}</td>
                      <td className="col_td">{this.state.excelRows[rowData.No][5]}</td>
                      <td className="col_td">{this.state.excelRows[rowData.No][6]}</td>
                      <td className="col_td">{this.state.excelRows[rowData.No][7]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          }}
        />
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.modal_open}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose} style={{ textAlign: 'center' }}>
            More Information
          </DialogTitle>
          <DialogContent dividers >
            <table className='md_table'>
              <tbody>
                <tr>
                  <td className='mdb_td_w3'>Phase</td><td className='mdb_td_w7'>{this.state.selectedItem[0]}</td>
                </tr>
                <tr>
                  <td className='mdb_td_w3'>Service</td><td className='mdb_td_w7'>{this.state.selectedItem[1]}</td>
                </tr>
                <tr>
                  <td className='mdb_td_w3'>Activity</td><td className='mdb_td_w7'>{this.state.selectedItem[2]}</td>
                </tr>
                <tr>
                  <td className='mdb_td_w3'>Task</td><td className='mdb_td_w7'>{this.state.selectedItem[3]}</td>
                </tr>
                <tr>
                  <td className='mdb_td_w3'>Description</td><td className='mdb_td_w7'>{this.state.selectedItem[4]}</td>
                </tr>
                <tr>
                  <td className='mdb_td_w3'>KPI</td><td className='mdb_td_w7' >{this.state.selectedItem[5]}</td>
                </tr>
                <tr>
                  <td className='mdb_td_w3'>Artefact(s)</td><td className='mdb_td_w7'>{this.state.selectedItem[6]}</td>
                </tr>
              </tbody>
            </table>
          </DialogContent>
          <DialogActions >
            <Button autoFocus onClick={this.handleClose} color="secondary">
              OK
          </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  };
}
export default MaterialTableDemo;
