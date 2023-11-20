import React from "react";
export default function FormProvider({children, onSubmit, methods}){
    return(
        <form{...methods}>
        <form onSubmit={onSubmit}>
            {children}
        </form>
    </form>
    )
}