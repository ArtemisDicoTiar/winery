function getTargetDate(delta) {
    var curday = function(sp){
        var today = new Date();
        var yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - delta)

        var dd = yesterday.getDate();
        var mm = yesterday.getMonth()+1; //As January is 0.
        var yyyy = yesterday.getFullYear();

        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return (yyyy+sp+mm+sp+dd);
    }
    return curday('-')
}

export default getTargetDate;
