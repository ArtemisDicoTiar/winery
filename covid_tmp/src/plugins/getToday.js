function getTargetDate(delta) {
    var curday = function(sp){
        var today = new Date();
        if (today.getUTCHours() < 10) {
            today.setDate(today.getDate() - delta - 1)
        } else {
            today.setDate(today.getDate() - delta)
        }

        var dd = today.getDate();
        var mm = today.getMonth()+1; //As January is 0.
        var yyyy = today.getFullYear();

        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;

        return (yyyy+sp+mm+sp+dd);
    }
    return curday('-')
}

export default getTargetDate;
