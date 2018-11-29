import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Board } from '../../components/Notes';

class LawModule extends React.Component {
    handleFilterChange = (index, e) => {
        let filterParams = Object.assign({}, this.state.filterParams);
        filterParams[index] = e.target.value;
        this.setState({ filterParams: filterParams });
    }
    
    render() {
      return (
            <div>
                <Board count={50}></Board>
            </div>     
        )
    }

    handleFilter = (exportJson) => {

        // for (var key in this.state.filterParams) {
        //     exportJson = exportJson.filter(line => line[key].toString().toLowerCase().includes(this.state.filterParams[key].toString().toLowerCase()));
        // }

        Object.keys(this.state.filterParams)
            .map(key => 
                exportJson = exportJson
                    .filter(line => line[key].toString().toLowerCase().includes(this.state.filterParams[key].toString().toLowerCase())));
                
        return exportJson;
    }
}

const mapStateToProps = (state) => {
    return {

    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        pure: false
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LawModule));