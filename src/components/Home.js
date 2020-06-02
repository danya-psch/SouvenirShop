import React, { Component } from "react";

class Home extends Component {
   

    render() {
        return (
            <div className="center_list_page">
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item">
                        <img src="https://7sky.kiev.ua/wp-content/uploads/2017/08/kiev-at-night.jpg" className="d-block w-100" alt="Kiev"/>
                        </div>
                        <div className="carousel-item active">
                        <img src="https://img2.akspic.com/image/1641-noch-kievo_pecherskoj_lavry-pamyatnik-sofijskij_sobor-kiev-1920x1080.jpg" className="d-block w-100" alt="Kiev"/>
                        </div>
                        <div className="carousel-item">
                        <img src="https://s1.1zoom.ru/b4544/520/Kiev_Ukraine_Temples_Church_Pechersk_Lavra_Clouds_524688_1920x1080.jpg" className="d-block w-100" alt="Kiev"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <h1>USSR - магазин українських сувенірів і подарунків у Києві з 1922 року</h1>
                <p className="home_page_text" align="justify">Якщо ви хочете створити неповторну атмосферу з національним колоритом у себе вдома або в заміському будинку, ми радимо вам українські сувеніри купити. Ми пропонуємо широкий асортимент оригінальних та незвичайних подарунків та сувенірів, а також даємо можливість купити українські сувеніри оптом. Асортимент сувенірної продукції з детальним описом і фото ви можете знайти на нашому сайті. Якщо вас цікавить додаткова інформація за запитом «українські сувеніри та подарунки в Києві» телефонуйте, ми будемо</p>
            </div>
        );
    }
}

export default Home;