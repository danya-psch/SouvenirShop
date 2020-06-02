import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPartOfSouvenirs } from '../../actions/souvenirs';
import { updateUser , USER_ACTION} from '../../actions/user'
const STEP = 6;

function Souvenir(props) {
    return (
        <a className="card souvenir_card" id={props.id} data-toggle="modal" data-target="#modal" onClick={() => props.souvenirsTable.handleSouvenirOpenModal(props.souvenir)}>
            <img className="card-img-top" src={props.souvenir.ava_url} alt={props.souvenir.name}/>
            <div className="card-body">
                <h5 className="card-title">
                    {props.souvenir.name}
                    { props.userFavorites ?
                        <img className="star_icon" src="https://image.flaticon.com/icons/png/512/52/52018.png" alt="star"></img> :
                        <div></div> }
                </h5>
                <p className="card-text">{props.souvenir.description}</p>
            </div>
        </a>
    );
}

function ObjectRow(props) {
    return (
        <li className={props.className} onClick={() => props.souvenirsTable.handleChoosePage(props.number)}>
            <a className="page-link" href="#">{props.number + 1}</a>
        </li>
    );
}

function create_list(text, page, items) {
    let list = [];
    if (text !== '') {
        for (let task of items) {
            if (task.name.toUpperCase().indexOf(text.toUpperCase()) > -1) list.push(task);
        }
    } else {
        list = items;
    }
    let start = parseInt(page) * STEP;
    start = start >= list.length ? 0 : start;
    const finish = (start + STEP > list.length) ?  list.length : start + STEP;
    
    let page_list = [];
	for (let i = start; i < finish ; i++) {
		page_list.push(list[i]);
    }
    return {souvenirs: page_list, max_page : Math.floor(list.length/STEP) + 1};
}

// function handleSouvenirOpenModal(souvenir) {
//     console.log(props);
// }

class SouvenirsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display_of_user_souvenirs : false,
            souvenir: null,
            user_souvenirs: [],
            souvenirs: [],
            page: 0,
            max_page : 0,
            text: ''
        }

        this.handleСheckboxChange = this.handleСheckboxChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextSubmit = this.handleTextSubmit.bind(this);
        this.handleSouvenirOpenModal = this.handleSouvenirOpenModal.bind(this);
        this.handleInsertSouvenirToUser = this.handleInsertSouvenirToUser.bind(this);
        this.handleRemoveSouvenirFromUser = this.handleRemoveSouvenirFromUser.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleChoosePage = this.handleChoosePage.bind(this);
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let new_user_souvenirs = [];
        if (nextProps.user.user_object !== null) {
            for (let souvenir of nextProps.user.user_object.favorite_souvenirs) {
                new_user_souvenirs.push(souvenir._id);
            }
        }

        if (!this.state.display_of_user_souvenirs) 
        {
            this.setState({souvenirs: nextProps.souvenirs.souvenirs_list,
                user_souvenirs: new_user_souvenirs,
                max_page : nextProps.souvenirs.max_page
            });
        } else {
            const data = create_list(this.state.text, this.state.page, nextProps.user.user_object.favorite_souvenirs);
            this.setState({ souvenirs : data.souvenirs, max_page: data.max_page});
        }
    }
    
    handleNextPage(event) {
        event.preventDefault(); 
        this.handleChoosePage(this.state.page + 1);
    }

    handlePreviousPage(event) {
        event.preventDefault();
        this.handleChoosePage(this.state.page - 1);
    }

    handleChoosePage(page) {
        if (page >= 0 && page < this.state.max_page ) {
            this.setState(()=> {
                return { page: page }
            });
            this.props.getPartOfSouvenirs(page, this.state.text);
        }
    }

    componentDidMount() {
        this.props.getPartOfSouvenirs(this.state.page, this.state.text);
    }    

    handleСheckboxChange(event) {

        this.state.page = 0;
        if (!this.state.display_of_user_souvenirs) {
            if (this.props.user.user_object !== null) {
                const data = create_list(this.state.text, this.state.page, this.props.user.user_object.favorite_souvenirs);
                this.setState(
                    {
                        souvenirs : data.souvenirs,
                        display_of_user_souvenirs : !this.state.display_of_user_souvenirs,
                        max_page: data.max_page
                    }
                );
            }
        } 
        else {
            this.props.getPartOfSouvenirs(this.state.page, this.state.text);
            event.persist();
            this.setState( () => {
                return { display_of_user_souvenirs : !this.state.display_of_user_souvenirs }
            });
        }
    }

    createNavigation() {
        let rows = [];
        for (let i = 0; i < this.state.max_page; i++) {
            let my_class = "page-item page_item";
            if (i == this.state.page) my_class += " active_page";

            rows.push(<ObjectRow key={i} number={i} className={my_class} souvenirsTable={this}/>);
        }

        return <div className="navigation_list">{rows}</div>
    }

    handleTextChange(event) {
        event.persist();
        this.setState( () => {
            return { text: event.target.value || '' }
        });
    }

    handleTextSubmit(event) {
        event.preventDefault();
        this.props.getPartOfSouvenirs(this.state.page, this.state.text);
        let text = this.state.text === '' ? "Пошук за текстом не ведеться" : `Ведеться пошук за текстом : ${this.state.text}`;
        document.getElementById("searching_text").innerText = text;
    }

    handleSouvenirOpenModal(souvenir) {
        this.setState({ souvenir: souvenir || null})
    }

    handleInsertSouvenirToUser(event) {
        event.preventDefault();
        if (this.props.user.user_object === null) return; 

        let user = this.props.user.user_object;
        this.props.updateUser(user._id, this.state.souvenir._id, USER_ACTION.INSERT_SOUVENIR);
    }

    handleRemoveSouvenirFromUser(event) {
        event.preventDefault();
        if (this.props.user.user_object === null) return; 
        if (this.state.display_of_user_souvenirs) document.getElementById("modal_close_button").click();

        let user = this.props.user.user_object;
        this.props.updateUser(user._id, this.state.souvenir._id, USER_ACTION.REMOVE_SOUVENIR);
    }

    static mapStateToProps(store) {
        return { souvenirs: store.souvenirs, user: store.user };
    }

    static mapDispatchToProps(dispatch) {
        return { 
            getPartOfSouvenirs: (page, text) => dispatch(getPartOfSouvenirs(page, text)),
            updateUser: (user_id, souvenir_id, action) => dispatch(updateUser(user_id, souvenir_id, action))
        };
    }

    render() {
        return (
            <div>
                <form className="souvenir_menu">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Введіть текст" aria-label="Recipient's username"
                        onChange={this.handleTextChange}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={this.handleTextSubmit}>Знайти</button>
                        </div>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="checkbox" onChange={this.handleСheckboxChange} checked={this.state.display_of_user_souvenirs}/>
                        <label className="form-check-label" htmlFor="checkbox">Перегляд моїх сувенірів</label>
                    </div>
                    
                </form>
                <small id="searching_text" className="form-text text-muted souvenir_menu_small">Пошук за текстом не ведеться</small>
                <div className="souvenirs_list">
                    {this.state.souvenirs.map(souvenir => {
                        return (
                            <Souvenir userFavorites={ this.state.user_souvenirs.includes(souvenir._id) ? true : false} souvenirsTable={this} souvenir={souvenir} key={souvenir._id} id={souvenir._id}/>
                        );
                    })}
                </div>
                <nav className="navigation">
                    <ul className="pagination">
                        <li className={this.state.page == 0 ? "page-item disabled" : "page-item"} onClick={this.handlePreviousPage}>
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {this.createNavigation()}
                        <li className={this.state.page + 1 == this.state.max_page ? "page-item disabled" : "page-item"} onClick={this.handleNextPage}>
                            <a className="page-link" href="#" aria-label="Next" disabled={this.state.page + 1 == this.state.max_page}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                {/* Modal1 */}
                <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {this.state.souvenir ? this.state.souvenir.name : 'Тут повинно бути ім\'я'}
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img className="modal_img" src={this.state.souvenir ? this.state.souvenir.ava_url : ''}
                                    alt={this.state.souvenir ? this.state.souvenir.name : 'Сувенір'}/>
                                <div className="modal_text">
                                    {this.state.souvenir ? this.state.souvenir.description : 'Тут повинен бути опис'}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button id="modal_close_button" type="button" className="btn btn-secondary" data-dismiss="modal">Закрити</button>
                                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#buy_modal">Купити</button>
                                {
                                    this.props.user.user_object && this.state.souvenir ?
                                    ( 
                                        // this.props.user.user_object.favorite_souvenirs.reduce((accumulator, currentValue) => {
                                        //     let bool = false;
                                        //     if (currentValue._id == this.state.souvenir._id) {
                                        //         bool = true
                                        //     }
                                        //     return accumulator && bool;
                                        // }) ? <button type="button" className="btn btn-danger" onClick={this.handleAddSouvenirToUser}>Видалити з обраного</button> :
                                        // <button type="button" className="btn btn-dark" onClick={this.handleAddSouvenirToUser}>Додати в обране</button>
                                        this.state.user_souvenirs.includes(this.state.souvenir._id) ?
                                        <button type="button" className="btn btn-danger" onClick={this.handleRemoveSouvenirFromUser}>Видалити з обраного</button> :
                                        <button type="button" className="btn btn-dark" onClick={this.handleInsertSouvenirToUser}>Додати в обране</button>
                                    ) :
                                    <div></div>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal2 */}
                <div className="modal fade" id="buy_modal" tabIndex="-1" role="dialog" aria-labelledby="buy_modalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="buy_modalLabel">Вы купили {this.state.souvenir ? this.state.souvenir.name : ""}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-dismiss="modal">Вітаємо</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const Table = connect(SouvenirsTable.mapStateToProps, SouvenirsTable.mapDispatchToProps)(SouvenirsTable);

export default Table;