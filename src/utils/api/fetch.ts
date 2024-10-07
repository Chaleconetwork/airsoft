import HTTPMETHOD from "../consts/httpMethods";
import TYPEHEADER from "../consts/TypeHeaders";

export const Fetch = {
    async get(url: string) {
        return await this.handleRequest(url, HTTPMETHOD.GET)
    },

    async post(url: string, body: any) {
        return await this.handleRequest(url, HTTPMETHOD.POST, body);
    },

    async download(url: string, body: any, filename: string) {
        return await this.handleRequest(url, HTTPMETHOD.POST, body, filename);
    },

    async handleRequest(url: string, method: string, body: any | null = null, filename: string | null = null) {
        const headers = {
            'Accept': `application/${filename ? TYPEHEADER.stream : TYPEHEADER.json}`,
            'Content-Type': `application/${TYPEHEADER.json}`,
            // 'Authorization': `Bearer ${token}`
        };

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
            console.log("Se ha producido un error", error)
            return null;
        }
    }
}