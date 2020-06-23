class Api {

    constructor() {
        this.baseUrl = '/schulprojekt-parkhausverwaltung-symfony/public/index.php';
    }

    getLtParkerCollectionCall() {
        return new ApiCall('get', this.baseUrl + '/api/lt_parkers');
    }

    getLtParkerById(id) {
        return new ApiCall('get', this.baseUrl + '/api/lt_parkers/' + id);
    }

    //
    callLongTermParkerById(id) {
        return new ApiCall('get', this.baseUrl + '/api/lt_parkers/' + id);
    }

    //
    callCreateOccupancy(data) {
        return new ApiCall('post', this.baseUrl + '/api/occupancies', data);
    }

    //
    callCreateTicket(data) {
        return new ApiCall('post', this.baseUrl + '/api/tickets', data);
    }

    //
    callDeleteTicket(id) {
        return new ApiCall('delete', this.baseUrl + '/api/tickets/' + id);
    }

    //
    callOpenOccupancyWithLtParker(id) {
        return new ApiCall('get', this.baseUrl + '/api/occupancies?ltParker=' + id + '&exists%5BexitDate%5D=false');
    }

    //
    callOpenOccupancyWithLicensePlate(licensePlate) {
        return new ApiCall('get', this.baseUrl + '/api/occupancies?licensePlate=' + licensePlate + '&exists%5BexitDate%5D=false');
    }

    //
    callUpdateOccupancy(occupancyId, data) {
        return new ApiCall('put', this.baseUrl + '/api/occupancies/' + occupancyId, data);
    }

    //
    callGetOccupancy(data) {

        if (data.id !== undefined) {
            return new ApiCall('get', this.baseUrl + '/api/occupancies/' + data.id);
        }

        let getDataFor = {
            licensePlate:   'licensePlate',
            ltParker:       'ltParker',
            existsExitDate: 'exists%5BexitDate%5D'
        };

        let urlGetData  = '';
            urlGetData += data.licensePlate   !== undefined ? getDataFor.licensePlate   + '=' + data.licensePlate   : '';
            urlGetData += urlGetData.length >= 1 ? '&' : '';
            urlGetData += data.ltParker       !== undefined ? getDataFor.ltParker       + '=' + data.ltParker       : '';
            urlGetData += urlGetData.length >= 1 ? '&' : '';
            urlGetData += data.existsExitDate !== undefined ? getDataFor.existsExitDate + '=' + data.existsExitDate : '';

        return new ApiCall('get', this.baseUrl + '/api/occupancies' + (urlGetData.length >= 1 ? '?' + urlGetData : ''));
    }

    //
    callGetTicket(data) {

        if (data.id !== undefined) {
            return new ApiCall('get', this.baseUrl + '/api/tickets/' + data.id);
        }

        let getDataFor = {
            occupancy:  'occupancy',
            existsPaid: 'exists%5Bpaid%5D'
        };

        let urlGetData  = '';
            urlGetData += data.occupancy  !== undefined ? getDataFor.occupancy  + '=' + data.occupancy  : '';
            urlGetData += urlGetData.length >= 1 ? '&' : '';
            urlGetData += data.existsPaid !== undefined ? getDataFor.existsPaid + '=' + data.existsPaid : '';

        return new ApiCall('get', this.baseUrl + '/api/tickets' + (urlGetData.length >= 1 ? '?' + urlGetData : ''));
    }
}

class ApiCall {

    constructor(callType, targetUrl, data) {
        this._requestObject = new XMLHttpRequest();
        this._callType      = callType;
        this._targetUrl     = targetUrl;
        this._data          = data !== undefined ? data : {};
    }

    setOnStart(callback) {
        this._requestObject.addEventListener('loadstart', () => { callback(this._requestObject); });
        return this;
    }

    setOnAbort(callback) {
        this._requestObject.addEventListener('abort', () => { callback(this._requestObject); });
        return this;
    }

    setOnError(callback) {
        this._requestObject.addEventListener('error', () => { callback(this._requestObject); });
        return this;
    }

    setOnLoad(callback) {
        this._requestObject.addEventListener('load', () => { callback(this._requestObject); });
        return this;
    }

    setOnTimeout(callback) {
        this._requestObject.addEventListener('timeout', () => { callback(this._requestObject); });
        return this;
    }

    getResponse() {
        return JSON.parse(this._requestObject.responseText);
    }

    getStatus() {
        return this._requestObject.status;
    }

    send(reqHeader) {
        this._requestObject.open(this._callType, this._targetUrl, false);
        this._requestObject.setRequestHeader('Content-Type', 'application/json');
        this._requestObject.send(JSON.stringify(this._data));

        return this;
    }
}
