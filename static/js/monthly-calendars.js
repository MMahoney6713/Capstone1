$(function () {
    // Helpful jQuery objects for later use
    const $monthlyViewDiv = $('.month-views');

    function buildCalendarHTML(month, year, today) {
        const weekdayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsArray = ['January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'November', 'December'];

        // Build header
        const $calendarHead = $(`
        <table class="table table-bordered" width="100%" cellspacing="0">
            <thead class="font-weight-bold">
                <tr>
                    <th class="text-center table-primary" colspan="7">${monthsArray[month]}</th>
                </tr>
                <tr class="">
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
            </thead>
        </table>
        `);

        // Body
        const $calendarBody = $('<tbody>');


        // Build each row of calendar day blocks
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const blocks_needed = calendarBlocksNeeded(firstDayOfMonth, daysInMonth);
        let block_count = 0;
        let day_count = 0;

        for (let j = 0; j < blocks_needed / 7; j++) {
            const $dayCountRow = $('<tr>');
            const $eventRow = $('<tr>');

            for (let i = 0; i < weekdayArray.length; i++) {

                // Append blanks
                if (block_count < firstDayOfMonth || day_count >= daysInMonth) {
                    $dayCountRow.append($('<td class="table-secondary"></td>'));
                    $eventRow.append($('<td class="table-secondary"></td>'));
                } else {
                    $dayCountRow.append($(`<td>${day_count + 1}</td>`));
                    day_count++;
                    $eventRow.append($('<td>'));
                }

                block_count++;
            }

            $calendarBody.append($dayCountRow);
            $calendarBody.append($eventRow);

        }

        $calendarHead.append($calendarBody);
        $monthlyViewDiv.append($calendarHead);

    }

    function calendarBlocksNeeded(firstDayOfMonth, daysInMonth) {
        // Sum the number of blanks to the first day, plus days in month, plus blanks to end of calendar
        const numberBlanksToFirstDay = firstDayOfMonth;
        const numberBlanksAtEnd = 7 - (numberBlanksToFirstDay + daysInMonth) % 7;

        return numberBlanksToFirstDay + numberBlanksAtEnd + daysInMonth;
    }

    const numberOfMonthsToShow = 3;
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    for (let i = 0; i < numberOfMonthsToShow; i++) {
        buildCalendarHTML(currentMonth + i, currentYear, today)
    }


})