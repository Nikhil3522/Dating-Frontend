import { useEffect, useState } from "react";
import ButtonComponent from "../component/ButtonComponent";
import Banner from '../assets/images/banner1.png';

function Welcome(){

    return(
        <div>
          <img src={Banner} width="300px"/>
          <ButtonComponent 
            title="LOGIN"
          />
          <ButtonComponent 
            title="SIGN UP"
          />

        </div>
    )
}

export default Welcome;