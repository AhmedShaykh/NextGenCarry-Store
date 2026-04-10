import { BRANDS_API_1, BRANDS_API_2, BRANDS_API_3, BRANDS_API_4, BRANDS_API_5, BRANDS_API_6 } from "./contants";
import axios from "axios";

export async function LV_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_1}/lv`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function GUCCI_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_1}/gucci`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function CHANEL_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_2}/chanel`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function DIOR_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_2}/dior`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function PRADA_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_3}/prada`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function HERMES_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_3}/hermes`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function BALENCIAGA_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_4}/balenciaga`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function NIKE_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_4}/nike`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function ADIDAS_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_5}/adidas`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function FENDI_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_5}/fendi`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function YSL_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_5}/ysl`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function CELINE_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_6}/celine`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function VALENTINO_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_6}/valentino`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};

export async function ROLEX_API(formData: any) {

    try {

        const response = await axios.post(`${BRANDS_API_6}/rolex`, formData);

        return response.data;

    } catch (error) {

        console.log(error);

        throw error;

    }

};