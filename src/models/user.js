import { formDataToJson, authorizationHeaders} from "../utilities/service"
import Response from "./response"
import { USER_ACTION } from "./../actions/user"

class User {
    static async authenticate(username, password) {
        const credentials = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
        const bodyData = new URLSearchParams(credentials);
        
        let response, respBody;
        let error = null;
        try {
            response = await fetch("/auth/login", { method: 'POST', body: bodyData });
            if (!response.ok || response.status !== 200) throw new Error(`Неправильний логін або пароль`);
            respBody = await response.json();
        } catch (err) {
            error = err;
        }
        return new Response(respBody, error);
    }

    static async create(form_data) {
        let json_data = formDataToJson(form_data);
        let response, respBody;
        let error = null;
        try {
            if (json_data.password1 !== json_data.password2) throw new Error(`Паролі не співпадають!`);
            
            response = await fetch("/auth/register", { 
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: json_data
            });
            if (!response.ok || response.status !== 200) throw new Error(`Сталася помилка під час реєстрації`);
        } catch (err) {
            error = err;
        }
        return new Response(respBody, error);
    }

    static async me(jwt) {
        const reqOptions = authorizationHeaders(jwt);
        reqOptions.method = 'GET';
        let response, respBody;
        let error = null;
        try {
            response = await fetch("/api/me", reqOptions);
            if (!response.ok || response.status !== 200) throw new Error(`Сталася помилка під час авторизації`);
            respBody = await response.json();
        } catch (err) {
            error = err;
        }
        return new Response(respBody, error);
    }

    static async updateUser(user_id, souvenir_id, action, jwt) {
        const reqOptions = authorizationHeaders(jwt);
        reqOptions.method = 'POST';
        reqOptions.headers = {
            ...reqOptions.headers,
            'Content-Type': 'application/json'
        };
        reqOptions.body = JSON.stringify({
            user_id: user_id,
            souvenir_id: souvenir_id
        });
        
        let response, respBody;
        let error = null;
        try {
            if (action === USER_ACTION.INSERT_SOUVENIR) response = await fetch("/api/user/insert_souvenir", reqOptions);
            else response = await fetch("/api/user/remove_souvenir", reqOptions);
            if (!response.ok || response.status !== 200) throw new Error(`Сталася помилка під час оновлення користувача`);
            respBody = await response.json();
        } catch (err) {
            error = err;
        }
        return new Response(respBody, error);
    }
}


export default User;