import React from "react";
import { TextField } from '@material-ui/core';

export default function FP1({ title, label, btnText, onClickHandler, fieldValue, setFieldValue }) {
    return (
        <>
            <div className="container">
                <p style={{ color: '#c2c2c2' }}>{title}</p>
                <TextField
                    color="secondary"
                    label={label}
                    id="outlined-margin-dense"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    className="roundedTextBox"
                    value={fieldValue}
                    onChange={e => setFieldValue(e.target.value)}
                />
                <button className="loginBtn" onClick={onClickHandler}>{btnText}</button>
            </div>
        </>
    );
}