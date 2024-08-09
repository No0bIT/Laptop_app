// CheckRole.js
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckRole = ({ roles, requiredRole, children }) => {
    const [hasAccess, setHasAccess] = useState(false);
    const navigate = useNavigate();

    
    
    useEffect(() => {
        // Kiểm tra nếu người dùng có role cần thiết
        const userHasRole = roles.some(role => role.role_name === requiredRole);

        if (userHasRole) {
            setHasAccess(true);
        } else {
            setHasAccess(false);
            // Chuyển hướng về trang khác nếu không có quyền
            navigate('/login');
        }
    }, [roles, requiredRole, navigate]);
    console.log(roles);

    return hasAccess ? children : null;
};

export default CheckRole;
