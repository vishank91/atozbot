import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="list-group">
            <Link to="/admin" className="list-group-item list-group-item-action" aria-current="true">Home</Link>
            <Link to="/admin/feature" className="list-group-item list-group-item-action" aria-current="true">Features</Link>
            <Link to="/admin/faq" className="list-group-item list-group-item-action" aria-current="true">Faq</Link>
            <Link to="/admin/pricing" className="list-group-item list-group-item-action" aria-current="true">Pricing</Link>
            <Link to="/admin/setting" className="list-group-item list-group-item-action" aria-current="true">Setting</Link>
            <Link to="/admin/user" className="list-group-item list-group-item-action" aria-current="true">User</Link>
        </div>
    )
}
