import React from "react";
import { TextField } from '@material-ui/core';

export default function FP2({ title, label1, label2, btnText, onClickHandler, fieldValue1, setFieldValue1, fieldValue2, setFieldValue2 }) {
    return (
        <>
            <div className="container">
                <p style={{fontWeight: 600}}>{title}</p>
                <TextField
                    color="secondary"
                    label={label1}
                    id="outlined-margin-dense"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    className="roundedTextBox"
                    value={fieldValue1}
                    onChange={e => setFieldValue1(e.target.value)}
                />

                <TextField
                    color="secondary"
                    label={label2}
                    id="outlined-margin-dense"
                    margin="dense"
                    fullWidth
                    variant="outlined"
                    className="roundedTextBox"
                    value={fieldValue2}
                    onChange={e => setFieldValue2(e.target.value)}
                />
                <button className="loginBtn" onClick={onClickHandler}>{btnText}</button>
            </div>
        </>
    );
}