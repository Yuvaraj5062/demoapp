import React from 'react'
import { Pagination } from 'react-bootstrap'
import { evaluateDate } from '../../helper/jsHelper'
import { UseVoucherModal } from '../../_metronic/layout/components/voucher/UseVoucherModal'
export const MyVouchers = (props) => {

    return(
        <div>
            <div className="row">
                {props.vouchers !== null
                  ? props.vouchers.map((item) => (
                      <div className="col-md-6 mb-10">
                        <div className={"pt-0 pl-5"}>
                          <div className={props.classes.borderIncommonvocher}>
                            <div class="row">
                              <div class="col-md-6" style={{ paddingRight: "0px" }}>
                                <div className={props.classes.pricevocher}>
                                  <img
                                    src={item.voucherImage}
                                    className={props.classes.giftVocher}
                                  />
                                  <div className={props.classes.MyDiscouter}>
                                    <h3 className={"pl-5 pt-5"}>{item.title}</h3>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-6" style={{ paddingLeft: "0px" }}>
                                <p className={"pt-1 pl-1 pr-1"}>
                                  <b>{item.details}</b>
                                </p>
                                <p
                                  className={"pt-0 pl-1 pr-1"}
                                  style={{ fontSize: "11px" }}
                                >
                                  Valid till: {evaluateDate(item.expiron)}
                                </p>
                                <div
                                  className={"pt-0 pr-1"}
                                  style={{ textAlign: "right" }}
                                >
                                  <UseVoucherModal openModal={props.openModal} closeModal={props.handleCloseModal} voucher={item}></UseVoucherModal>
                                  <button className={props.classes.UseInformation} onClick={props.handleUseVoucher}>
                                    Use
                                  </button>
                                </div>
                              </div>
                              <div class="col-md-6"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    ))
                : null}
            </div>     
            {/* {main.myVouchers && main.myVouchers !== null && (
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <Pagination
                      size="large"
                      variant="outlined"
                      color="secondary"
                      className="primary"
                      count={Math.ceil(
                        main.myVouchers && main.myVouchers.length / pageSize
                      )}
                      page={page}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
            )}   */}
            {props.vouchers && props.vouchers !== null && (
                <div className="row">
                  <div className="col-md-12 d-flex justify-content-center">
                    <Pagination
                      size="large"
                      variant="outlined"
                      color="secondary"
                      className="primary"
                      count={Math.ceil(
                        props.vouchers && props.vouchers.length / pageSize
                      )}
                      page={page}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
              )}
        </div>
        
    )
} 