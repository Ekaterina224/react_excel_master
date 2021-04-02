import React, { Component } from "react";
import { forwardRef } from "react";
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
      teamSorting: false,
      collapseState: 'All Expand'
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

  handleSorting = () => {
    if (this.state.teamSorting === true)
      this.setState({ teamSorting: false });
    else
      this.setState({ teamSorting: true });
  }

  handleOpen = (e) => {
    this.setOpen(true);
    var index = e.target.getAttribute("data-index");
    if (typeof index === 'undefined' || index === null) {
      index = e.target.parentElement.getAttribute("data-index");
    }
    this.setState({ selectedItem: this.state.excelRows[index] });
  };

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
    //this.productlist.shift();
    for (var i = 1; i < this.state.excelRows.length - 1; i++) {
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
          sort_list[item[sub_key]].push(item);
        }
        else {
          sort_list[item[sub_key]] = [item];
        }
      }
      return (sort_list);
    }
    var data = []
    var data_index = 1
    var sortList = [];
    if (this.state.teamSorting === true) {
      var result = proList.reduce(function (r, a) {
        r[a.val6] = r[a.val6] || [];
        r[a.val6].push(a);
        return r;
      }, Object.create(null));
      for (var key of Object.keys(result)) {
        sortList = sortSubList(result[key], '1')
        for (var item2 in sortList) {
          var id2 = data_index;
          data.push({ 'id': data_index++, val1: item2, val2: "", val3: "", val4: "", btn: "", val6: sortList[item2][0].val6, no: sortList[item2][0].no })
          sortList[item2] = sortSubList(sortList[item2], '2');
          for (var item3 in sortList[item2]) {
            var id3 = data_index
            data.push({ 'id': data_index++, val2: item3, val1: "", val3: "", val4: "", btn: "", parentId: id2, val6: sortList[item2][item3][0].val6, no: sortList[item2][item3][0].no })
            sortList[item2][item3] = sortSubList(sortList[item2][item3], '3');
            for (var item4 in sortList[item2][item3]) {
              var id4 = data_index
              data.push({ 'id': data_index++, val3: item4, val1: "", val2: "", val4: "", btn: "", parentId: id3, val6: sortList[item2][item3][item4][0].val6, no: sortList[item2][item3][item4][0].no })
              sortList[item2][item3][item4] = sortSubList(sortList[item2][item3][item4], '4');
              for (var item5 in sortList[item2][item3][item4]) {
                data.push({ 'id': data_index++, val4: item5, val2: "", val3: "", val1: "", btn: "View", parentId: id4, val6: sortList[item2][item3][item4][item5][0].val6, no: sortList[item2][item3][item4][item5][0].no })
              }
            }
          }
        }
      }

    }
    else {
      sortList = sortSubList(proList, '1')
      for (var item2 in sortList) {
        var id2 = data_index;
        data.push({ 'id': data_index++, val1: item2, val2: "", val3: "", val4: "", btn: "", val6: sortList[item2][0].val6, no: sortList[item2][0].no })
        sortList[item2] = sortSubList(sortList[item2], '2');
        for (var item3 in sortList[item2]) {
          var id3 = data_index
          data.push({ 'id': data_index++, val2: item3, val1: "", val3: "", val4: "", btn: "", parentId: id2, val6: sortList[item2][item3][0].val6, no: sortList[item2][item3][0].no })
          sortList[item2][item3] = sortSubList(sortList[item2][item3], '3');
          for (var item4 in sortList[item2][item3]) {
            var id4 = data_index
            data.push({ 'id': data_index++, val3: item4, val1: "", val2: "", val4: "", btn: "", parentId: id3, val6: sortList[item2][item3][item4][0].val6, no: sortList[item2][item3][item4][0].no })
            sortList[item2][item3][item4] = sortSubList(sortList[item2][item3][item4], '4');
            for (var item5 in sortList[item2][item3][item4]) {
              data.push({ 'id': data_index++, val4: item5, val2: "", val3: "", val1: "", btn: "View", parentId: id4, val6: sortList[item2][item3][item4][item5][0].val6, no: sortList[item2][item3][item4][item5][0].no })
            }
          }
        }
      }
    }
    console.log(sortList);
    return (
      <div style={{ maxWidth: "90%", margin: "5vh auto", }} >
        <FormControlLabel
          control={<Checkbox checked={this.state.teamSorting} onChange={this.handleSorting} name="team sorting" />}
          label="Team Sorting"
        />
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
                rowData && (
                  <Button data-index={rowData.no} color="secondary" className="btn_view" >{rowData.btn}</Button>
                )
            }
          ]}
          data={data}
          onRowClick={(event, rowData, togglePanel) => rowData.btn === "View" && togglePanel()}
        />
      </div >
    )
  };
}
export default MaterialTableDemo;
