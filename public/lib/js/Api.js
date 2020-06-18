class Api {

    getLtParkerCollectionCall() {
        return new ApiCall('get', '/schulprojekt-parkhausverwaltung-symfony/public/index.php/api/lt_parkers');
    }

    getLtParkerById(id) {
        return new ApiCall('get', '/schulprojekt-parkhausverwaltung-symfony/public/index.php/api/lt_parkers/' + id);
    }

    callCreateOccupancyEntry(data) {
        return new ApiCall('post', '/schulprojekt-parkhausverwaltung-symfony/public/index.php/api/occupancies', data);
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

    send() {
        this._requestObject.open(this._callType, this._targetUrl);
        this._requestObject.setRequestHeader('Content-Type', 'application/json');
        this._requestObject.send(this._data);
    }
}
