"use client";

import { ResponseGetCampDetail } from "@/lib/types/camps/response";

interface CampDetailProps {
    camp: ResponseGetCampDetail;
}

function CampDetail({ camp }: CampDetailProps ) {
    return (
        <div>
            <h2>{camp.facltNm}</h2>
            <p>{camp.intro}</p>
            <p>Location: {camp.hvofBgnde}</p>
            <p>Rating: {camp.hvofEnddle}</p>
        </div>
    );
}
export default CampDetail;