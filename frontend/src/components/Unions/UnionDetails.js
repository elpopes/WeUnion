import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUnion } from "../../store/union";
import Griefs from "../Griefs";
import GriefCompose from "../GriefCompose";
import GriefBox from "../GriefBox";
import NavBar from "../NavBar";

const UnionDetails = () => {
    const dispatch = useDispatch();
    const { unionId } = useParams();
    const union = useSelector((state) => state.union);
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        dispatch(getUnion(unionId)).then(() => setLoaded(true));
    }, [dispatch, unionId]);
    
    if (!loaded) {
        return null;
    }
    
    return (
        <div>
        <NavBar />
        <h1>{union.name}</h1>
        <Griefs />
        <GriefCompose />
        <GriefBox />
        </div>
    );
    }

export default UnionDetails;
