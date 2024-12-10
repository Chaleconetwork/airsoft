import HTTPMETHOD from "../consts/httpMethods";
import TYPEHEADER from "../consts/TypeHeaders";

export const Fetch = {
    async get(url: string) {
        return await this.handleRequest(url, HTTPMETHOD.GET)
    },

    async post(url: string, body: any) {
        console.log(body)
        return await this.handleRequest(url, HTTPMETHOD.POST, body);
    },

    async put(url: string, body: any) {
        console.log(body)
        return await this.handleRequest(url, HTTPMETHOD.PUT, body);
    },

    async noBodyPost(url: string) {
        return await this.handleRequest(url, HTTPMETHOD.POST);
    },

    async download(url: string, body: any, filename: string) {
        return await this.handleRequest(url, HTTPMETHOD.POST, body, filename);
    },

    async handleRequest(url: string, method: string, body: any | null = null, filename: string | null = null) {
        
        let headers = {}
        const token = localStorage.getItem('authToken')
        const resetPasswordToken = localStorage.getItem('resetPasswordToken')
        console.log('token: ', token)
        console.log('resetPasswordToken: ', resetPasswordToken)
        if (token) {
            headers = {
                'Accept': `application/${filename ? TYPEHEADER.stream : TYPEHEADER.json}`,
                'Content-Type': `application/${TYPEHEADER.json}`,
                'Authorization': `Bearer ${token}`
            };
        } else {
            headers = {
                'Accept': `application/${filename ? TYPEHEADER.stream : TYPEHEADER.json}`,
                'Content-Type': `application/${TYPEHEADER.json}`,
                'Authorization': `Bearer ${resetPasswordToken}`
            };
        }

        try {
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body ? JSON.stringify(body) : undefined
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.statusText}`);
            }

            // if (filename) {
            //     const blob = await response.blob();
            //     const urlObject = window.URL.createObjectURL(blob);
            //     const a = document.createElement('a')
            //     a.href = urlObject;
            //     a.download = filename;
            //     document.body.appendChild(a);
            //     a.click();
            //     a.remove();
            //     window.URL.revokeObjectURL(urlObject);
            // }

            const jsonResponse = await response.json();
            return jsonResponse;

        } catch (error: any) {
            console.log("Error en la solicitud", error)
            return null;
        }
    }
}