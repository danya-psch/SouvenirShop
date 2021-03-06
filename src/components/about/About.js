import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Contact extends Component {
    render() {
        return (
            
            <div class="about_main">
                <div>
                    <picture>
                        <source media="(min-width: 800px)" srcset="https://media-cdn.tripadvisor.com/media/photo-s/16/c5/a8/a7/highlights-of-kiev-private.jpg"/>
                        <img src="http://a.rgbimg.com/users/c/co/columbine/300/n7kPWXg.jpg" alt="Flowers" className="about_img"/>
                    </picture> 
                    <div>
                        <h5 className="about_header_footer">Українські сувеніри та подарунки</h5>
                        <p className="about_text">Ви шукаєте оригінальні та незвичайні подарунки? Ми допоможемо вам у цьому! Адже що може бути оригінальніше, ніж українські сувеніри та подарунки, зроблені і розписані вручну народними майстрами!</p>
                        <p className="about_text">Якщо ви хочете створити неповторну атмосферу з національним колоритом у себе вдома або в заміському будинку, ми радимо вам українські сувеніри купити. Ми пропонуємо широкий асортимент оригінальних та незвичайних подарунків та сувенірів, а також даємо можливість купити українські сувеніри оптом. Асортимент сувенірної продукції з детальним описом і фото ви можете знайти на нашому сайті. Якщо вас цікавить додаткова інформація за запитом «українські сувеніри та подарунки в Києві» телефонуйте, ми будемо раді відповісти на всі ваші запитання!</p> 
                    </div>
                </div>
                <p className="about_text">У разі якщо Ви шукайте подарунок для чоловіка або подарунок для жінки, folkmart, зможе Вам допомогти і в цьому випадку. Широкий асортимент подарунків для чоловіків нашого інтернет-магазину сувенірів, дозволить Вам знайти гідний презент для Вашого начальника, друга або чоловіка.</p>
                <p className="about_text">В нашому інтернет магазині сувенірів можна придбати продукцію за запитом «українські сувеніри та подарунки Київ»:</p>
                <ul>
                        <li>шкатулки, тарілки, свічники, писанки, настінні годиники і інші сувеніри, розписані в стилі Петриківський розпис;</li>
                        <li>вишиванки жіночі, вишиванки чоловічі і національний одяг;</li>
                        <li>біжутерія ручної роботи і жіночі аксесуари;</li>
                        <li>розписане кухонне приладдя;</li>
                        <li>ляльки ручної роботи і матрьошки;</li>
                        <li>сувеніри зі спортивною і футбольною атрибутикою;</li>
                        <li>слов'янські обереги;</li>
                        <li>VIP і елітні подарунки;</li>
                        <li>сувеніри ручної роботи;</li>
                        <li>подарунки і сувеніри з видами Києва;</li>
                    </ul>
                <p className="about_text">Всі подарунки і сувеніри, Ви зможемо забрати з шоурума нашого інтернет-магазинів в Києві, або вони будуть доставлені Вам за допомогою кур'єра. Якщо ж Ви, перебуваєте в Харкові, Дніпрі, Одесі, Запоріжжі, Миколаєві, Черкасах або в будь-якому іншому місті України, доставка буде здійснена за допомогою "Нової пошти".</p>
                <NavLink className="about_header_footer" to="/about/contact">Наші контакти</NavLink>
            </div>
            
        );
    }
}

export default Contact;
