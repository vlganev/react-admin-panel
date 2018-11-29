import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { InputGroup } from '@blueprintjs/core';
import { Board } from '../../components/Notes';

import exportJson from '/var/www/apanel/src/export.json';

const head = [
    ['Вид дело', '60px'], ['Статус на случая', '60px'], ['Кредитор', '60px'], ['ЕИК Кредитор', '80px'], ['Клиентски номер /creid/', '60px'], ['Дата ID номер', '60px'], ['Име', '140px'], 
    ['ЕГН', '80px'], ['Постоянен адрес', '300px'], ['Настоящ адрес', '300px'], ['Телефон', '100px'], ['Работодател Име', '200px'], ['Работодател ЕИК', '120px'], ['Работодател Адрес', '200px'], 
    ['Осигурителен доход при последен работодател', '90px'], ['Тип продукт', '60px'], ['Номер на договора за кредит', '100px'], ['Дата подписване договор', '80px'], 
    ['Предоставена сума по кредит/размер на главницата по кредита', '100px'], ['Дата на възлагане на случая по чл.1, ал.2 от Договора', '100px'], 
    ['Дело', '60px'], ['Година', '60px'], ['Състав', '60px'], ['Размер на задължението към датата на възлагане на случая', '80px'], ['ДТ 2%', '50px'], 
    ['Адвокатски хонорар за издаване на ИЛ', '80px'], ['Съд', '80px'], ['Преупълномощен адвокат', '80px'], ['Вътрешно разпределение', '100px'], ['Преприети действия', '100px'], 
    ['Платени такси', '100px'], ['Входящ номер', '60px'], ['Дата на подаване на заявлението в съда', '60px'], ['Дата на подаване на последно дело в съда', '60px'], 
    ['Статус на производството по издаване на ИЛ', '80px'], ['Дата на получаване на Решението', '60px'], ['Арбитър', '60px'], 
    ['Дата на входиране на молба за ОФГ', '60px'], ['Дата на снабдяване с ИЛ', '60px'], ['Възражени', '60px'], ['главница', '60px'], ['договорна лихва', '60px'], ['наказателна лихва', '80px'], 
    ['Законна лихва към дата на експорт', '60px'], ['административни разноски', '120px'], ['Гаранция', '60px'], ['ДТ- за образуване на дело', '60px'], 
    ['Държавна такса', '60px'], ['Държавна такса за издаване на ИЛ', '60px'], ['Депозит за вещо лице', '60px'], ['Адвокатски хонорар- съд', '70px'], ['Адвокатски хонорар- УИ', '70px'], ['Общо', '60px']
];

class FSO extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        selectedDate: new Date().toISOString().slice(0,10),
        navbarTabId: 'edit',
        filterParams: {},
      };
    }

    handleFilterChange = (index, e) => {
        let filterParams = Object.assign({}, this.state.filterParams);
        filterParams[index] = e.target.value;
        this.setState({ filterParams: filterParams });
    }
    
    render() {
      return (
            <div>
                <Board count={50}></Board>
                <table className="bp3-html-table bp3-html-table-striped bp3-html-table-bordered bp3-interactive">
                    <thead>
                        <tr>
                            {
                                
                                head.map((cellInfo, index) => 
                                    <th>
                                        <div style={{width: cellInfo[1]}}>
                                            {cellInfo[0]}
                                        </div>
                                    </th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                head.map((cellInfo, index) =>
                                    <td>
                                    {
                                        <InputGroup
                                            // disabled={disabled}
                                            // large={large}
                                            leftIcon="filter"
                                            onChange={(e) => this.handleFilterChange(index, e)}
                                            placeholder="Филтрирай..."
                                            // rightElement={maybeSpinner}
                                            // value={filterValue[index]}
                                        />
                                    }
                                    </td>
                                )
                            }
                        </tr>
                        {
                            this.handleFilter(exportJson)
                                .map((line, index) =>
                            <tr>
                                {line.map(((cellInfo, index) => 
                                    <td>
                                        {cellInfo.toString()}
                                    </td>
                                    ))
                                }
                            </tr>
                            )
                        }
                    </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FSO));