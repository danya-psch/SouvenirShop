
import React from 'react';
import { NavLink } from 'react-router-dom';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';
 
const Breadcrumbs = ({ breadcrumbs }) => ( 
    <React.Fragment>
        {breadcrumbs.length > 1 ?  
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {breadcrumbs.map(({ match, breadcrumb }) => (
                    <li className="breadcrumb-item" key={match.url}>
                        <NavLink aria-current="page" to={match.url}>{breadcrumb} </NavLink>
                    </li>
                    ))}
                </ol>
            </nav>
        : null}
    </React.Fragment>
);
 
export default withBreadcrumbs()(Breadcrumbs);