import { formDataToJson, authorizationHeaders} from "../utilities/service"
import Response from "./response"

class Souvenir {
    static async getPartOfSouvenirs(jwt, page, text) {
        const reqOptions = authorizationHeaders(jwt);
        reqOptions.method = 'GET';
        let response, respBody;
        let error = null;
        try {
            response = await fetch(`/api/souvenirs?page=${page}&text=${text}`, reqOptions);
            if (!response.ok || response.status !== 200) throw new Error(response.statusText);
            respBody = await response.json();
        } catch (err) {
            error = err;
        }
        return new Response(respBody, error);
    }

    static async create(formData) {
    }

    static async me(jwt) {
    }
}

export default Souvenir;