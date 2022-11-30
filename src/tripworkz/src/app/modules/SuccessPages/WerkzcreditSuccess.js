import React, { useEffect } from 'react'
import { Card } from '@material-ui/core';
import { toAbsoluteUrl } from '../../../_metronic/_helpers';


export function WerkzcreditSuccess(props) {
    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        const id = params.get('id');
    },[])

    return (
    //     <div className="mainHeading">
    //         <div className="col-md-12 text-center">
    //             <p className="mainHeadingFont"></p>
    //         </div>
    //         <div className="col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-10 offset-xs-1">
    //         <Card>
    //             <div className="card-body">
    //                 <div className="container">
    //                     Hello
    //                 </div>
    //             </div>
    //         </Card>
    //         </div>
    //   </div>
    <div className="d-flex flex-column flex-root">
      <div
        className="d-flex flex-row-fluid flex-column bgi-size-cover bgi-position-center bgi-no-repeat p-10 p-sm-30"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("/media/error/bg1.jpg")})`
        }}
      >
        <h1
          className="font-size-sm-100 font-weight-boldest text-dark-75 mt-15"
          style={{ fontSize: "50px" }}
        >
          Success
        </h1>
        <p className="font-size-h3 font-weight-light" style={{color:'green'}}>
          Werkzcredit points successfully extended.
        </p>
      </div>
    </div>
    );
  }