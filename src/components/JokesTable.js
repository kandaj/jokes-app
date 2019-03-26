import React, { Component } from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import Loading from '../utils/Loading'
import {HTTP} from '../utils/http-commons'
import EditIcon from 'react-icons/lib/fa/edit';

class JokesTable extends Component {
    state = {
        loading:true,
        jokes:null,
        msg:null,
    }

    componentDidMount = () => {
        this.fetchData()
    }


    onCellEdit = (row, fieldName, value) => {
        if(value) {
            HTTP.post(`/joke/update/${row.id}`, {joke:value})
                .then(response => {
                    let msg = "Joke edited successfully";
                    this.fetchData(msg)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    onAddRow = (row) => {
        HTTP.post(`/joke/add`, row)
            .then(response => {
                let msg = "Joke added successfully";
                this.fetchData(msg)
            })
            .catch(e => {
                console.log(e)
            })
    }

    fetchData = (msg=null) => {
        HTTP.get(`/jokes/list`)
        .then(response => {
            let state = {...this.state}

            state.loading  = false
            state.jokes  = response.data
            state.msg = msg
            this.setState(state)
            console.log(this.state)
        })
        .catch(e => {
            console.log(e)
        })
    }

    addIcon = () => {
        return <EditIcon />;
    }

    render () {
        let loading = null
        let msg = null
        let table = <div><h3>No data available</h3></div>
        if(this.state.loading) {
            loading = <div className="col-lg-12 col-md-12 col-sm-12 mt-3 d-flex justify-content-center"><Loading /></div>
        }

        if(this.state.msg) {
            msg = <div className="alert alert-success" role="alert">{this.state.msg}</div>
        }

        if(!this.state.loading && this.state.jokes) {
            const cellEditProp = {
                mode: 'click'
            };
            let options = {
                sortName: 'id',
                sortOrder: 'asc',
                onCellEdit:this.onCellEdit,
                onAddRow: this.onAddRow,
                insertText: 'Add Joke',
            }
            table = <BootstrapTable
                keyField='id'
                data={ this.state.jokes }
                options={ options }
                cellEdit={ cellEditProp }
                insertRow={ true }
                pagination
                search={ true }>
                <TableHeaderColumn  dataField='id' dataSort={ true } width={'0%'} hiddenOnInsert>ID</TableHeaderColumn>
                <TableHeaderColumn  dataField='joke' >Joke</TableHeaderColumn>
                <TableHeaderColumn  dataField=''  width={'10%'} editable={false} hiddenOnInsert dataFormat={this.addIcon}></TableHeaderColumn>
            </BootstrapTable>
        }

        return (

            <div>
                <div className="row mt-3">
                    {loading}
                </div>
                <div className="row mt-3">
                    <div className="col-2"></div>
                    <div className="col-8">
                        {msg}
                        <h2>Jokes Table</h2>
                        {table}
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>

        )

    }

}


export default JokesTable