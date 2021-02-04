$(function () {


    // Helpful jQuery objects for later use
    const $monthlyViewDiv = $('.month-views');




    function buildCalendarHTML(month, year, today) {
        const weekdayArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsArray = ['January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'November', 'December'];

        // Build header
        const $calendarHead = $(`
        <table class="table table-bordered py-2 my-2" width="100%" cellspacing="0">
            <thead class="font-weight-bold">
                <tr>
                    <th class="text-center text-light bg-primary" colspan="7">${monthsArray[month]}</th>
                </tr>
                <tr class="table-primary text-light">
                    <th class="calendar-col">Sun.</th>
                    <th class="calendar-col">Mon.</th>
                    <th class="calendar-col">Tues.</th>
                    <th class="calendar-col">Wed.</th>
                    <th class="calendar-col">Thur.</th>
                    <th class="calendar-col">Fri.</th>
                    <th class="calendar-col">Sat.</th>
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
            const $dayCountRow = $('<tr></tr>');
            const $eventRow = $('<tr class="event-row">');

            for (let i = 0; i < weekdayArray.length; i++) {

                // Append blanks
                if (block_count < firstDayOfMonth || day_count >= daysInMonth) {
                    $dayCountRow.append($('<td class="table-secondary py-1"></td>'));
                    $eventRow.append($('<td class="table-secondary p-1"></td>'));
                } else {
                    if (today.getDay() === day_count + 1 && today.getMonth() === month) {
                        $dayCountRow.append($(`<td class="table-warning py-1">${day_count + 1}</td>`));
                        $eventRow.append($(`
                        <td class="table-warning event-space p-1">
                            <button type="button" class="btn btn-success btn-block event p-0">Go shopping!!!!!!!!!</button>
                        </td>`));
                    } else {
                        $dayCountRow.append($(`<td class="py-1">${day_count + 1}</td>`));
                        $eventRow.append($('<td class="event-space p-1">'));
                    }
                    day_count++;
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


    $monthlyViewDiv.on('click', 'td.event-space', function (event) {
        if (event.target.nodeName === "BUTTON") {
            console.log('button')
        } else {
            $newEvent = $(`
            <div class="dropright">
                <button type="button" class="btn btn-secondary btn-block event p-0 my-1"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    New Event
                </button>
                <div class="dropdown-menu dropdown-menu-right shadow p-1 m-1"
                    aria-labelledby="dropdown">
                    <!-- Dropdown menu links -->
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-pencil-alt fa-sm fa-fw mr-2 text-info"></i>
                        Update
                    </a>
                    <a class="dropdown-item" href="#">
                        <i class="fas fa-trash-alt fa-sm fa-fw mr-2 text-danger"></i>
                        Rubbish
                    </a>
                </div>
            </div>
            `)
            $(this).append($newEvent)
        }
    })




    const numberOfMonthsToShow = 3;
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    for (let i = 0; i < numberOfMonthsToShow; i++) {
        buildCalendarHTML(currentMonth + i, currentYear, today)
    }


})