import { Component, createRef, useRef } from "react";
import 'smart-webcomponents-react/source/styles/smart.default.css';
import './schedular.css'
import Scheduler from "smart-webcomponents-react/scheduler";
import Rating from "smart-webcomponents-react/rating";
import ProgressBar from "smart-webcomponents-react/progressbar";
import { dataSource, resources } from "./datajson";

function BookingSchedularv2() {
    const scheduler = useRef();

    // const dataSource = dataSource;

    const view = 'day';

    const views = ['day', {
        label: 'Work Week',
        value: 'workWeek',
        type: 'week',
        shortcutKey: 'W'
    }, 'month'];

    const hideAllDay = true;

    const hourStart = 0;

    const hourEnd = 23;

    const nonworkingDays = [0, 6];

    const nonworkingHours = [
        0, 23
    ];

    const hideNonworkingWeekdays = true;

    const firstDayOfWeek = 1;

    const viewSelectorType = 'auto';

    const groups = ['doctorId'];

    const groupTemplate = 'groupTemplate';

    const timelineDayScale = 'halfHour';


    const handleEditDialogOpen = (event) => {
        const editors = event.detail.editors;
        console.log('editors>>', editors)

        if (!editors) {
            return;
        }

        const schedulerEvent = event.detail.item,
            descriptionEditor = editors.description,
            dateStartEditor = editors.dateStart,
            dateEndEditor = editors.dateEnd,
            labelEditor = editors.label,
            allDayEditor = editors.allDay,
            repeatEditor = editors.repeat,
            notificationsEditor = editors.notifications,
            consferenceEditor = editors.conference,
            editorsContainer = editors.description.parentElement;

        dateStartEditor.querySelector('.smart-element').disabled = true;
        dateEndEditor.querySelector('.smart-element').disabled = true;

        // repeatEditor.classList.add('smart-hidden');
        allDayEditor.classList.add('smart-hidden');
        labelEditor.classList.add('smart-hidden');
        descriptionEditor.classList.add('smart-hidden');
        labelEditor.classList.add('smart-hidden');
        notificationsEditor.classList.add('smart-hidden');
        consferenceEditor.classList.add('smart-hidden');

        labelEditor.querySelector('.smart-element').placeholder = 'Enter a label...';
        descriptionEditor.querySelector('.smart-element').placeholder = 'Enter a description for the event..';

    }

    // crud operation
    // function handleItemChange(event) {
    //     // console.log('item change', e)
    //     const detail = event.detail,
    //         item = detail.item,
    //         type = detail.type;
    // }
    // scheduler?.current?.componentRef?.current?.closeWindow();

    return (
        <Scheduler ref={scheduler} id="scheduler" dataSource={dataSource} view={view} views={views}
            hideAllDay={hideAllDay} hourStart={hourStart} hourEnd={hourEnd} nonworkingDays={nonworkingDays}
            nonworkingHours={nonworkingHours} hideNonworkingWeekdays={hideNonworkingWeekdays} firstDayOfWeek={firstDayOfWeek}
            viewSelectorType={viewSelectorType} groups={groups} timelineDayScale={timelineDayScale}
            resources={resources}
            onEditDialogOpen={(e) => handleEditDialogOpen(e)}
        ></Scheduler>
    );
}
export default BookingSchedularv2;
