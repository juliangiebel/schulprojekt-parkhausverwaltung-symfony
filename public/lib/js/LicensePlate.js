class LicensePlate {

    _partFor = {
        district: null,
        custom:   null,
        number:   null,
        addition: null,
    }

    _regexPartFor = {
        district: /^[a-z]{1,3}$/i,
        custom:   /^[a-z]{1,2}$/i,
        number:   /^[0-9]{1,4}$/,
        addition: /^(e|h)?$/i,
    }

    _illegalRegexPartFor = {
        custom: /^(kz|hj|ns|sa|ss|hh)$/i,
    };

    constructor()
    {

    }

    set(data)
    {
        this._partFor.district = data.district !== undefined ? data.district : this._partFor.district;
        this._partFor.custom   = data.custom   !== undefined ? data.custom   : this._partFor.custom;
        this._partFor.number   = data.number   !== undefined ? data.number   : this._partFor.number;
        this._partFor.addition = data.addition !== undefined ? data.addition : this._partFor.addition;
    }

    isValid()
    {
        return (
            (
                   this._partFor.district !== null
                && this._partFor.district.match(this._regexPartFor.district)
            ) && (
                   this._partFor.custom !== null
                && this._partFor.custom.match(this._regexPartFor.custom)
            ) && (
                   this._partFor.number !== null
                && this._partFor.number.match(this._regexPartFor.number)
            ) && (
                   this._partFor.addition === null
                || this._partFor.addition.match(this._regexPartFor.addition)
            )
        );
    }

    isLegal()
    {
        return this._partFor.custom === null || this._illegalRegexPartFor.custom === null || !this._partFor.custom.match(this._illegalRegexPartFor.custom);
    }

    toString(useSpaces)
    {
        return '' +
            (this._partFor.district !== null && this._partFor.district.length >= 1 ? this._partFor.district : '---') + (useSpaces ? ' ' : '') +
            (this._partFor.custom   !== null && this._partFor.custom  .length >= 1 ? this._partFor.custom   : '---') + (useSpaces ? ' ' : '') +
            (this._partFor.number   !== null && this._partFor.number  .length >= 1 ? this._partFor.number   : '---') + (useSpaces ? ' ' : '') +
            (this._partFor.addition !== null && this._partFor.addition.length >= 1 ? this._partFor.addition : ''   )
        ;
    }

}
