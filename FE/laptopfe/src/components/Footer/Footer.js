import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer-container'>
        <footer className="footer">
            <div className="footer-column"></div>
            <div className="footer-column">
                <h3>Thiết kế mỏng nhẹ</h3>
                <p>Laptop mỏng nhẹ phù hợp với nhu cầu di chuyển.</p>
                <p>Trọng lượng nhẹ giúp dễ dàng mang theo bên mình.</p>
                <p>Thiết kế tinh tế, sang trọng cho người dùng hiện đại.</p>
            </div>
            <div className="footer-column">
                <h3>Hiệu năng mạnh mẽ</h3>
                <p>Trang bị CPU mới nhất cho hiệu năng cao.</p>
                <p>RAM lớn hỗ trợ đa nhiệm mượt mà.</p>
                <p>Ổ cứng SSD giúp khởi động và truy xuất dữ liệu nhanh chóng.</p>
            </div>
            <div className="footer-column">
                <h3>Màn hình chất lượng cao</h3>
                <p>Màn hình Full HD cho hình ảnh sắc nét.</p>
                <p>Công nghệ chống chói giúp giảm mỏi mắt.</p>
                <p>Góc nhìn rộng cho trải nghiệm tốt hơn.</p>
            </div>
            <div className="footer-column">
                <h3>Thời lượng pin dài</h3>
                <p>Pin dung lượng cao cho thời gian sử dụng lâu dài.</p>
                <p>Công nghệ tiết kiệm năng lượng tiên tiến.</p>
                <p>Sạc nhanh giúp tiết kiệm thời gian.</p>
            </div>
            <div className="footer-column"></div>
        </footer>
        <div className="footer-thanks">
            <p>Cảm ơn bạn đã truy cập trang web của chúng tôi!</p>
        </div>
    </div>
  );
};

export default Footer;