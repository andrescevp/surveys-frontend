import {Configuration} from "../@questionnaire_api";

export const getConfiguration = () => new Configuration({
    basePath: 'http://localhost:8000',
});