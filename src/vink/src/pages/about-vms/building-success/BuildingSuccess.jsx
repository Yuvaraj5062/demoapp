import React from "react";
import Button from "../../../components/button/Button";
import style from "./BuildingSuccess.module.scss"
import { buildingSuccessData } from '../../../data/data';
import ParagraphCard from "../../../components/paragraph-card/ParagraphCard";


const BuildingSuccess = () => {
  return (<>
    <ParagraphCard data={buildingSuccessData} />
  </>);
};

export default BuildingSuccess;
