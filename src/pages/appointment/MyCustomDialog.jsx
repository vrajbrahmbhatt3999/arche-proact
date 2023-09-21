import React from 'react';

function MyCustomDialog(props) {
    // const { item, onConfirm, onCancel } = props;
    console.log('custom render')
    return (
        <div>
            <h2>Edit Appointment</h2>
            <label>Subject:</label>
            {/* <input type="text" value={item.label} onChange={(e) => onConfirm({ ...item, label: e.target.value })} /> */}
            <br />
            {/* <button onClick={onCancel}>Cancel</button> */}
            {/* <button onClick={() => onConfirm(item)}>Save</button> */}
        </div>
    );
}

export default MyCustomDialog;
