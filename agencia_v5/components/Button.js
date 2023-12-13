import React from 'react';
import Link from "next/link";

function Button({url, title}) {
    return (
        <Link href={url} className="btn btn-warning p-3">
            {title}
        </Link>
    );
}

export default Button;
