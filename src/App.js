import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { AgGridReact /*AgGridColumn*/ } from "ag-grid-react";
import { LicenseManager } from "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

class App extends Component {
	constructor(props) {
		super(props);
		LicenseManager.setLicenseKey(
			"Evaluation_License-_Not_For_Production_Valid_Until_25_May_2019__MTU1ODczODgwMDAwMA==156057ec2a5212d3fc17b2c425718067"
		);
		// this.state = {
		// 	gridOptions: {
		// 		columnDefs: [
		// 			{ make: "Toyota", model: "Celica", price: 35000 },
		// 			{ make: "Ford", model: "Mondeo", price: 32000 },
		// 			{ make: "Porsche", model: "Boxter", price: 72000 }
		// 		]
		// 	}
		// };
		this.state = {
			columnDefs: [
				{
					headerName: "Make",
					field: "make",
					sortable: false,
					filter: true,
					checkboxSelection: true,
					rowGroup: true
				},
				{
					headerName: "Model",
					field: "model",
					sortable: true,
					filter: true,
					checkboxSelection: true
				},
				{
					headerName: "Price",
					field: "price",
					sortable: true,
					filter: true,
					checkboxSelection: true
				}
			]
			// rowData: [
			// 	{
			// 		make: "Toyota",
			// 		model: "Celica",
			// 		price: 35000
			// 	},
			// 	{
			// 		make: "Ford",
			// 		model: "Mondeo",
			// 		price: 32000
			// 	},
			// 	{
			// 		make: "Porsche",
			// 		model: "Boxter",
			// 		price: 72000
			// 	}
			// ]
		};
		this.onGridReady = this.onGridReady.bind(this);
	}

	componentDidMount() {
		// fetch("https://api.myjson.com/bins/15psn9")
		// 	.then(result => result.json())
		// 	.then(rowData => this.setState({ rowData }));
		fetch("https://api.myjson.com/bins/ly7d1")
			.then(result => result.json())
			.then(rowData => this.setState({ rowData }));
	}

	onGridReady(e) {
		const { api, columnApi } = e;
		this.gridApi = api;
		console.log(api);
		console.log(columnApi);
	}

	onButtonClick = e => {
		const selectedNodes = this.gridApi.getSelectedNodes();
		const selectedData = selectedNodes.map(node => node.data);
		const selectedDataStringPresentation = selectedData
			.map(node => node.make + " " + node.model)
			.join(", ");
		console.log(`Selected nodes: ${selectedDataStringPresentation}`);
	};

	render() {
		const { columnDefs, rowData } = this.state;
		return (
			<div className="App">
				<button onClick={this.onButtonClick}>Get Selected Rows</button>
				<div className="ag-theme-balham data-grid">
					<AgGridReact
						columnDefs={columnDefs}
						rowData={rowData}
						onGridReady={this.onGridReady}
						rowSelection="multiple"
					/>
				</div>
			</div>
		);
	}
}

export default App;
