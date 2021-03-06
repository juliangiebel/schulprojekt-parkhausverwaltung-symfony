class Display {

    constructor(objectId)
    {
        this.objectDisplay = $(objectId);
    }

    updateDate()
    {
        let date     = new Date();
        let shortDay = {
            0: 'So',
            1: 'Mo',
            2: 'Di',
            3: 'Mi',
            4: 'Do',
            5: 'Fr',
            6: 'Sa',
        }
        [date.getDay()];

        this.objectDisplay.find('div#display-date').text(shortDay + ' ' +
            (date.getDate()      <= 9 ? '0' +  date.getDate()       :  date.getDate()      ) + '.' +
            (date.getMonth() + 1 <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' +
             date.getFullYear()
        );
    }

    updateTime()
    {
        var time = new Date();

        this.objectDisplay.find('div#display-time').text(
            (time.getHours()   <= 9 ? '0' + time.getHours()   : time.getHours()  ) + ':' +
            (time.getMinutes() <= 9 ? '0' + time.getMinutes() : time.getMinutes()) + ':' +
            (time.getSeconds() <= 9 ? '0' + time.getSeconds() : time.getSeconds())
        );
    }

    setMessage(msg, style)
    {
        this.objectDisplay.find('div#display-message').text(msg);

        if (style !== undefined) {
            this.objectDisplay.find('div#display-message').css(style);
        }
    }

    resetMessage()
    {
        this.objectDisplay.find('div#display-message').html('&nbsp;').css({width: '100%'});
    }

    setLtpId(id)
    {
        this.objectDisplay.find('#display-ltp-id').text(id);
    }

    setPlate(plate)
    {
        this.objectDisplay.find('#display-plate').text(plate.toString(true));

        if (!plate.isValid()) {
            this.objectDisplay.find('#display-plate').css({color: 'red'});
        }
        else {
            this.objectDisplay.find('#display-plate').css({color: 'navajowhite'});
        }
    }
}
