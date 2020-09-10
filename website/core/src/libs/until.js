export function formartOnlyDate(time) {
    if (!time) return ''
    let d = new Date(time);
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1;
    let curr_year = d.getFullYear();

    curr_date = (curr_date < 10) ? '0' + curr_date : curr_date;
    curr_month = (curr_month < 10) ? '0' + curr_month : curr_month;

    return "Ngày "+curr_date + " Tháng " + curr_month + " Năm " + curr_year;
}